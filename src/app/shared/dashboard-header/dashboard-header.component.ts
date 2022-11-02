import { Component, OnInit } from '@angular/core';
import { AppConfigService } from 'src/app/utils/app-config.service';

@Component({
  selector: 'app-dashboard-header',
  templateUrl: './dashboard-header.component.html',
  styleUrls: ['./dashboard-header.component.scss']
})
export class DashboardHeaderComponent implements OnInit {
  username: any;


  constructor(private give: AppConfigService) { }

  ngOnInit(): void {
    this.username = this.give.getLocalValue('firstname') ? this.give.getLocalValue('firstname') : 'NA';
  }

}
