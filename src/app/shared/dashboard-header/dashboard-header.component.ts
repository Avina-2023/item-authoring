import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ApiService } from 'src/app/services/api.service';
import { AppConfigService } from 'src/app/utils/app-config.service';
import { APP_CONSTANTS } from 'src/app/utils/app-constants.service';

@Component({
  selector: 'app-dashboard-header',
  templateUrl: './dashboard-header.component.html',
  styleUrls: ['./dashboard-header.component.scss']
})
export class DashboardHeaderComponent implements OnInit {
  username: any;
  getOrganiz: any;
  @ViewChild('matDialog', { static: false }) matDialogRef: any;

  constructor(private appConfig: AppConfigService,
    private dialog: MatDialog,
    private http: ApiService) { }

  ngOnInit(): void {
    this.getorganiz();
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
    this.appConfig.logout();
  }

  getorganiz() {
    let data = '';
    this.http.getOrganiz(data).subscribe((response: any) => {
      this.getOrganiz = response.data[0].organization_name;
    })
  }
}
