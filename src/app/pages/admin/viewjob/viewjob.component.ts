import { Component, OnInit } from '@angular/core';
import { AppConfigService } from 'src/app/utils/app-config.service';

@Component({
  selector: 'app-viewjob',
  templateUrl: './viewjob.component.html',
  styleUrls: ['./viewjob.component.scss']
})
export class ViewjobComponent implements OnInit {

  constructor(
    private appconfig: AppConfigService,
  ) { }

  ngOnInit(): void {
  }

}
