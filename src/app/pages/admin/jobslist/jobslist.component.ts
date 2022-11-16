import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AppConfigService } from 'src/app/utils/app-config.service';
import { APP_CONSTANTS } from 'src/app/utils/app-constants.service';

@Component({
  selector: 'app-jobslist',
  templateUrl: './jobslist.component.html',
  styleUrls: ['./jobslist.component.scss']
})
export class JobslistComponent implements OnInit {
  @ViewChild('matDialog', { static: false }) matDialogRef: any;

  jodlist: any = [
    {
      "JopId": "Batch Jop Id - 121",
      "FileName": "Aptitude_Assesment_01_09_2022_09_30_45_09.zip",
      "UploadedBy": "Prabu",
      "UploadedOn": "01 Sep 2022",
      "TotalItemsCount": 200,
      "Processed": 0,
      "Errors": 20
    },
    {
      "JopId": "Batch Jop Id - 120",
      "FileName": "English_QP_01_09_2022_09_30_45_09.zip",
      "UploadedBy": "Prabu",
      "UploadedOn": "01 Sep 2022",
      "TotalItemsCount": 200,
      "Processed": 100,
      "Errors": 20
    },
    {
      "JopId": "Batch Jop Id - 119",
      "FileName": "CSE_QP_Model_Paper_01_09_2022_09_30_45_09.zip",
      "UploadedBy": "Prabu",
      "UploadedOn": "20 Aug 2022",
      "TotalItemsCount": 150,
      "Processed": 150,
      "Errors": 0
    },
    {
      "JopId": "Batch Jop Id - 118",
      "FileName": "CSE_QP_Model_Paper_01_09_2022_09_30_45_09.zip",
      "UploadedBy": "Prabu",
      "UploadedOn": "20 Aug 2022",
      "TotalItemsCount": 200,
      "Processed": 0,
      "Errors": 20
    },
    {
      "JopId": "Batch Jop Id - 117",
      "FileName": "CSE_QP_Model_Paper_01_09_2022_09_30_45_09.zip",
      "UploadedBy": "Prabu",
      "UploadedOn": "19 Aug 2022",
      "TotalItemsCount": 200,
      "Processed": 0,
      "Errors": 20
    }
  ];

  breadCrumData: any = {
    previousPage: 'Batch Process >',
    currentPage: 'Jobs List',
    previousUrl: `${APP_CONSTANTS.ROUTES.ADMIN.JOBSLIST}`
  };


  constructor(private appConfig: AppConfigService,
    private dialog: MatDialog,) {

  }

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
  closeDialog(e: any) {
    this.dialog.closeAll();
  }
  closepopup() {
    this.dialog.closeAll();
  }
  showviewjob() {
    this.appConfig.routeNavigation(APP_CONSTANTS.ENDPOINTS.ADMIN.VIEWJOB)
  }

}

