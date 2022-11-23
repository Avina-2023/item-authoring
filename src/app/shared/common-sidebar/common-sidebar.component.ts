import { Component, OnInit, ViewChild } from '@angular/core';
import { AppConfigService } from 'src/app/utils/app-config.service';
import { APP_CONSTANTS } from 'src/app/utils/app-constants.service';

@Component({
  selector: 'app-common-sidebar',
  templateUrl: './common-sidebar.component.html',
  styleUrls: ['./common-sidebar.component.scss']
})
export class CommonSidebarComponent implements OnInit {

  isExpanded = false;

  constructor(
    private appConfig: AppConfigService,
  ) { }
  ngOnInit(): void { }
  navigateTo(value: any) {
    if (value == 'jobslist') {
      this.appConfig.routeNavigation(APP_CONSTANTS.ENDPOINTS.ADMIN.JOBSLIST)
    } else {
      this.appConfig.routeNavigation(APP_CONSTANTS.ENDPOINTS.ADMIN.JOBSLIST)
    }
  }

}
