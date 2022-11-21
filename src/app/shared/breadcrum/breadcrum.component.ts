import { Component, Input, OnInit } from '@angular/core';
import { AppConfigService } from 'src/app/utils/app-config.service';
import { APP_CONSTANTS } from 'src/app/utils/app-constants.service';

@Component({
  selector: 'app-breadcrum',
  templateUrl: './breadcrum.component.html',
  styleUrls: ['./breadcrum.component.scss']
})
export class BreadcrumComponent implements OnInit {
  @Input() breadCrumData: any
  constructor(
    private appConfig: AppConfigService
  ) { }

  ngOnInit(): void {
  }
  navigate(previusPage: any, currentPage: any, event: any) {
    if (event.target.innerText === 'Batch Process > Jobs List >') {
      this.appConfig.routeNavigation(APP_CONSTANTS.ENDPOINTS.ADMIN.JOBSLIST)
    }
  }
}
