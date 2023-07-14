import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnInit, ViewChild, EventEmitter, Output } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/services/api.service';
import { LoadingService } from 'src/app/services/loading.service';
import { AppConfigService } from 'src/app/utils/app-config.service';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-commonupload',
  templateUrl: './commonupload.component.html',
  styleUrls: ['./commonupload.component.scss']
})

export class CommonuploadComponent implements OnInit {
  dialogTitle: any;
  fileName: any;
  fileSize: any;
  newFile: any;
  file: any;
  names: string = '';
  batchId: any;
  validFile = false;
  url = null;
  showSizeError = {
    default: true,
    image: false,
    size: false
  };

  dateFormatExist: boolean | undefined;
  selectedImage: any;
  @Output() refresh = new EventEmitter<string>();
  @Input() commontitle: string | undefined;
  uploadForm: FormGroup | any;
  constructor(
    private http: ApiService,
    private fb: FormBuilder,
    public toastr: ToastrService,
    private authConfig: AppConfigService,
    public loading: LoadingService,
  ) {
  }

  ngOnInit(): void {
    this.formInitial();
    if (this.commontitle == 'View Job') {
      this.dialogTitle = "Clear the errors and upload the file here. Items with same Reference Id will get replaced with the existing one.";
    }
    if (this.commontitle == 'View Job List') {
      this.dialogTitle = "Items with same Reference Id will get replaced with the existing one.";
    }
  }

  formInitial() {
    this.uploadForm = this.fb.group({
      uplolad: ['', [Validators.required]],
    })
  }
  //  File Upload Functionality
  async onSelectFile(event: any) {
    this.validFile = false;
    if (event.target.files && event.target.files[0].name.includes('.zip')) {
      this.showSizeError.size = false;
      if (event.target.files[0].size < 2000000) {
        this.fileName = event.target.files[0]['name'];
        this.fileSize = (Number(event.target.files[0]['size']) / 1024).toFixed(2);
        this.selectedImage = event.target.files[0];
        this.showSizeError.default = true
      }
      else {
        this.showSizeError.default = false
        this.showSizeError.image = false;
        this.showSizeError.size = true;
      }
    } else {
      this.showSizeError.default = false
      this.showSizeError.image = true;
      this.showSizeError.size = false;
    }
  }
  uploadDoc() {
    this.loading.setLoading(true);
    var userDetails: any = this.authConfig.getLocalValue('userDetails');
    var userName: any = this.authConfig.getLocalValue('firstname');

    var userDetailsobj = JSON.parse(userDetails)
    var orgId = userDetailsobj?.organisations[0].orgId
    const fd = new FormData();

    fd.append('fileName', this.fileName);
    fd.append('uploadFile', this.selectedImage);
    fd.append('orgId', orgId ? orgId : 1);
    fd.append('firstName', userName);

    this.http.uploaded(fd).subscribe((response: any) => {
      if (response.success) {
        this.loading.setLoading(false);
        this.newFile = response.message
        this.batchId = response.data[0].batchId;
        this.refresh.next('refresh');
      }
      else {
        this.toastr.error(response.message);
        this.loading.setLoading(false);
      }
    },
      (error: HttpErrorResponse) => {
        this.toastr.error("Unexpected token ] in JSON at position 8900");
        this.loading.setLoading(false);
      }
    )
  }
  delete() {
    this.fileName = false;
    this.selectedImage = false;
  }
  returnUpload() {
    this.newFile = false
    this.fileName = "";
    this.fileSize = "";
    this.selectedImage = {};
  }

  get uplolad() {
    return this.uploadForm.get('uplolad');
  }
  CommomDrop =
    [
      { "instanceId": "1", "name": "Doapp authoring" },
      { "instanceId": "2", "name": "qp authoring" },
    ]

}
