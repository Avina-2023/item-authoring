import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/services/api.service';
import { AppConfigService } from 'src/app/utils/app-config.service';
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
  name: string = '';
  validFile = false;
  url = null;
  showSizeError = {
    image: false,
    size: false
  };
  dateFormatExist: boolean | undefined;
  selectedImage: any;
  @Input() commontitle: string | undefined;

  constructor(
    private fb: FormBuilder,
    private http: ApiService,
    public toastr: ToastrService,
    private authConfig: AppConfigService,
  ) {
  }

  ngOnInit(): void {
    if (this.commontitle == 'View Job') {
      this.dialogTitle = "Clear the errors and upload the file here. Items with same Reference Id will get replaced with the existing one.";
    }
    if (this.commontitle == 'View Job List') {
      this.dialogTitle = "Items with same Reference Id will get replaced with the existing one.";
    }
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
      }
      else {
        this.showSizeError.image = false;
        this.showSizeError.size = true;
      }
    }
  }
  uploadDoc() {
    var userDetails: any = this.authConfig.getLocalValue('userDetails');
    var userDetailsobj = JSON.parse(userDetails)
    var orgId = userDetailsobj.organisations[0].orgId
    const fd = new FormData();
    fd.append('fileName', this.fileName);
    fd.append('uploadFile', this.selectedImage);
    fd.append('orgId', orgId ? orgId : 1);
    this.http.uploaded(fd).subscribe((response: any) => {
      this.newFile = response;
    })
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
}
