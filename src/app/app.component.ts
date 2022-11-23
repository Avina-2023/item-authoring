import { Component, OnInit } from '@angular/core';
import { LoadingService } from './services/loading.service';
import { LicenseManager } from 'ag-grid-enterprise';
LicenseManager.setLicenseKey('CompanyName=LARSEN & TOUBRO LIMITED,LicensedGroup=L&T EduTech,LicenseType=MultipleApplications,LicensedConcurrentDeveloperCount=3,LicensedProductionInstancesCount=3,AssetReference=AG-017299,ExpiryDate=15_July_2022_[v2]_MTY1NzgzOTYwMDAwMA==d6a472ece2e8481f35e75c20066f8e49');

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'QA_Authoring';

  loading: boolean = true;
  constructor(private _loading: LoadingService,) {

  }
  ngOnInit() {
    // this.listenToLoading();
  }

  // listenToLoading(): void {
  //   this._loading.loadingSub
  //     .pipe(delay(0)) // This prevents a ExpressionChangedAfterItHasBeenCheckedError for subsequent requests
  //     .subscribe((loading) => {
  //       this.loading = loading;
  //     });
  // }

}