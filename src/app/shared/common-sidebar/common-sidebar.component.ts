import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-common-sidebar',
  templateUrl: './common-sidebar.component.html',
  styleUrls: ['./common-sidebar.component.scss']
})
export class CommonSidebarComponent implements OnInit {
  sidebarOpen: any;
  constructor() { }

  ngOnInit(): void {
    this.sidebarOpen = true;
  }

  sidebar() {
    this.sidebarOpen = !this.sidebarOpen;
  }


}
