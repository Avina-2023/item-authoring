import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ApiService } from 'src/app/services/api.service';
import { AppConfigService } from 'src/app/utils/app-config.service';
import { APP_CONSTANTS } from 'src/app/utils/app-constants.service';
@Component({
  selector: 'app-homedashboard',
  templateUrl: './homedashboard.component.html',
  styleUrls: ['./homedashboard.component.scss']
})
export class HomedashboardComponent implements OnInit {

  constructor(
    private appConfig: AppConfigService,
    private dialog: MatDialog,
    private http: ApiService,
  ) { }

  ngOnInit(): void {

  }
  breadCrumData: any = {
    previousPage: 'Dashboard |',
    currentPage: 'Dashboard',
  };
}
