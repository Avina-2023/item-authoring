import { HttpParams } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ApiService } from 'src/app/services/api.service';
import { AppConfigService } from 'src/app/utils/app-config.service';
import { APP_CONSTANTS } from 'src/app/utils/app-constants.service';

@Component({
  selector: 'app-jobslist',
  templateUrl: './jobslist.component.html',
  styleUrls: ['./jobslist.component.scss']
})
export class JobslistComponent implements OnInit {
  @ViewChild('matDialog', { static: false }) matDialogRef: any;
  callFromJob: any = 'View Job List';
  Joblist = new Array<any>();
  id: any;
  breadCrumData: any = {
    previousPage: 'Batch Process >',
    currentPage: 'Jobs List',
    previousUrl: `${APP_CONSTANTS.ROUTES.ADMIN.JOBSLIST}`
  };


  constructor(private appConfig: AppConfigService,
    private dialog: MatDialog,
    private http: ApiService,
  ) {

  }

  ngOnInit(): void {
    this.batchData();
  }
  httpParams = new HttpParams({
    fromObject: {
      batchid: 12
    }
  })
  showviewjob() {
    this.appConfig.routeNavigation(APP_CONSTANTS.ENDPOINTS.ADMIN.VIEWJOB)
  }

  showUpload() {
    this.matDialogOpen();
  }
  matDialogOpen() {
    const dialogRef = this.dialog.open(this.matDialogRef, {
      width: '530px',
      height: '325px'

    });
  }
  closePop(e: any) {
    this.dialog.closeAll();
  }

  batchData() {
    let listid = this.Joblist;
    this.http.Joblist(listid).subscribe((response: any) => {
      this.Joblist = response.data;
    })
  }

}

