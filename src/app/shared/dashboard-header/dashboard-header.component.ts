import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AppConfigService } from 'src/app/utils/app-config.service';
import { APP_CONSTANTS } from 'src/app/utils/app-constants.service';

@Component({
  selector: 'app-dashboard-header',
  templateUrl: './dashboard-header.component.html',
  styleUrls: ['./dashboard-header.component.scss']
})
export class DashboardHeaderComponent implements OnInit {
  username: any;
  @ViewChild('matDialog', { static: false }) matDialogRef: any;

  constructor(private appConfig: AppConfigService,
    private routes: Router, private dialog: MatDialog,) { }

  ngOnInit(): void {
    this.username = this.appConfig.getLocalValue('firstname') ? this.appConfig.getLocalValue('firstname') : 'NA';
  }

  logOut() {
    this.matDialogOpen()
  }
  matDialogOpen() {
    const dialogRef = this.dialog.open(this.matDialogRef, {
      width: '448px',
      height: '315px'

    });
  }
  closeDialog(e: any) {
    this.dialog.closeAll();
    this.appConfig.clearLocalData();
    this.appConfig.routeNavigation(APP_CONSTANTS.ENDPOINTS.LOGIN)
  }

}
