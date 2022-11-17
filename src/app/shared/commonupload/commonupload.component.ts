import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AppConfigService } from 'src/app/utils/app-config.service';

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

  @ViewChild('matDialog', { static: false }) matDialogRef: any;
  constructor(
    private appconfig: AppConfigService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
  }



  showUpload() {
    this.matDialogOpen();
  }
  matDialogOpen() {
    const dialogRef = this.dialog.open(this.matDialogRef, {
      width: '550px',
      height: '325px'

    });
  }
  closePop(e: any) {
    this.dialog.closeAll();
  }
  closepopup() {
    this.dialog.closeAll();
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

    alert('Uploaded Successfully..!!!')

  }
  delete() {
    this.showSizeError.image = false;
    this.showSizeError.size = false;
    this.validFile = false;
    this.dateFormatExist = false;
    this.url = null;
  }

}
