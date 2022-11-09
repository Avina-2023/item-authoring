import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AppConfigService } from 'src/app/utils/app-config.service';
import { APP_CONSTANTS } from 'src/app/utils/app-constants.service';

@Component({
  selector: 'app-common-sidebar',
  templateUrl: './common-sidebar.component.html',
  styleUrls: ['./common-sidebar.component.scss']
})
export class CommonSidebarComponent implements OnInit {
  isExpanded = false;
  @ViewChild('matDialog', { static: false }) matDialogRef: any;
  constructor(
    private appConfig: AppConfigService,
    private dialog: MatDialog,
  ) { }

  ngOnInit(): void {

  }

  navigateTo(value: any) {
    if (value == 'jobslist') {
      this.appConfig.routeNavigation(APP_CONSTANTS.ENDPOINTS.ADMIN.JOBSLIST)
    } else {
      this.appConfig.routeNavigation(APP_CONSTANTS.ENDPOINTS.ADMIN.DASHBOARD)
    }
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
    // this.appConfig.clearLocalData();
    // this.appConfig.routeNavigation(APP_CONSTANTS.ENDPOINTS.LOGIN)
  }
  closepopup() {
    this.dialog.closeAll();
  }
}
