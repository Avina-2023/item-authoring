import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-common-sidebar',
  templateUrl: './common-sidebar.component.html',
  styleUrls: ['./common-sidebar.component.scss']
})
export class CommonSidebarComponent implements OnInit {
  isExpanded = false;
  constructor() { }

  ngOnInit(): void {

  }



}
