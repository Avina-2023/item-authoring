import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-homedashboard',
  templateUrl: './homedashboard.component.html',
  styleUrls: ['./homedashboard.component.scss']
})
export class HomedashboardComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    // console.log(this.auth.getLocalValue('token'))
    // this.auth.canAccess()
  }

}
