import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-commonupload',
  templateUrl: './commonupload.component.html',
  styleUrls: ['./commonupload.component.scss']
})

export class CommonuploadComponent implements OnInit {
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
  constructor(
    private http: ApiService,
    public toastr: ToastrService,
  ) { }

  ngOnInit(): void {
  }

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
        alert("no")
      }
    }
  }
  uploadDoc() {
    const fd = new FormData();
    fd.append('fileName', this.fileName);
    fd.append('uploadFile', this.selectedImage);
    this.http.uploaded(fd).subscribe((response: any) => {
      if (response.success == true) {
        this.fileName = response;
      } else {
        this.toastr.error(response.message);
      }
    })
  }

  delete() {
    this.fileName = false;
    this.selectedImage = false;
  }

}
