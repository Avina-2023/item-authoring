import { HttpParams } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { GridApi } from 'ag-grid-community';
import { ApiService } from 'src/app/services/api.service';
import { LoadingService } from 'src/app/services/loading.service';
import { AppConfigService } from 'src/app/utils/app-config.service';
import { APP_CONSTANTS } from 'src/app/utils/app-constants.service';

@Component({
  selector: 'app-jobslist',
  templateUrl: './jobslist.component.html',
  styleUrls: ['./jobslist.component.scss'],

})
export class JobslistComponent implements OnInit {
  @ViewChild('matDialog', { static: false }) matDialogRef: any;
  // Ag grid variables
  sideBar = 'filters';
  public gridColumnApi: any;
  private gridApi!: GridApi;
  length: any;
  pageSize: any;
  taobatch: any;
  paginationPageSize = 500;
  rowData: any;
  columnDefs: any = [];
  public defaultColDef = {
    flex: 1,
    minWidth: 100,
    enableValue: true,
    enableRowGroup: true,
    enablePivot: true,
    sortable: true,
    filter: true,
    resizable: true,
  };
  callFromJob: any = 'View Job List';
  Joblist: any = '';
  nodata: any;
  breadCrumData: any = {
    previousPage: 'Batch Process >',
    currentPage: 'Jobs List',
    previousUrl: `${APP_CONSTANTS.ROUTES.ADMIN.JOBSLIST}`
  };

  constructor(private appConfig: AppConfigService,
    private dialog: MatDialog,
    private http: ApiService,
    public loader: LoadingService
  ) { }

  ngOnInit(): void {
    this.tablejoblist();
    this.batchData();
  }

  tablejoblist() {
    this.columnDefs = [
      {
        headerName: 'Job Id',
        width: 130,
        minWidth: 120,
        sortable: true,
        field: 'batchId',
        filter: 'agTextColumnFilter',
        tooltipField: 'Job Id',
        cellRenderer: (params: any) => {
          if (params.value == true) {
            return `<em class="icon-warning-red"></em>`;
          } else {
            return `<em class="icon-warning-green"></em>`;
          }

        }
      },
      {
        headerName: 'File Name',
        minWidth: 360,
        field: 'fileName',
        filter: 'agTextColumnFilter',
        tooltipField: 'File Name',
      },
      {
        headerName: 'Uploaded By',
        field: 'createdBy',
        minWidth: 140,
        filter: 'agTextColumnFilter',
        tooltipField: 'Uploaded By',
      },
      {
        headerName: 'Uploaded On',
        filter: 'agTextColumnFilter',
        field: 'updatedAt',
        minWidth: 140,
        tooltipField: 'Uploaded On',

      },
      {
        headerName: 'Items Count',
        minWidth: 140,
        field: 'totalCount',
        tooltipField: 'Items Count',
      },
      {
        headerName: 'Processed',
        minWidth: 150,
        field: 'processedCount',
        tooltipField: 'Processed',
      },
      {
        headerName: 'Errors',
        field: 'errorCount',
        minWidth: 140,
        tooltipField: 'Errors',
      },
      {
        headerName: 'Sync Status',
        minWidth: 140,
        field: 'competency',
        tooltipField: 'Sync Status',
      },
      {
        headerName: 'Sync Updated Date',

        minWidth: 170,
        // field: 'skill',
        tooltipField: 'Sync Updated Date',
      },
      {
        headerName: 'Actions',

        minWidth: 120,
        // field: 'area',
        tooltipField: 'Actions',
        cellRenderer: function (params: any) {
          return '<div> <button  style="color:#08558C" (click)="showviewjob(jobs.batchId)" >View</button> </div>'
        }
      },
    ];
  }
  httpParams = new HttpParams({
    fromObject: {
      batchid: 12
    }
  })
  showviewjob(batchId: any) {
    this.appConfig.routeNavigationParams(APP_CONSTANTS.ENDPOINTS.ADMIN.VIEWJOB, batchId)
  }

  showUpload() {
    this.matDialogOpen();
  }
  matDialogOpen() {
    const dialogRef = this.dialog.open(this.matDialogRef, {
      width: '530px',
      height: '325px'

    });
  }
  closePop(e: any) {
    this.dialog.closeAll();
  }

  batchData() {
    let listid = this.Joblist;
    this.http.Joblist(listid).subscribe((response: any) => {
      if (response.data == undefined) {
        this.loader.setLoading(false);
        this.nodata = response.message;
        this.Joblist = [];
      }
      else {
        this.Joblist = response.data;
        console.log(this.Joblist, 'iwygedu');
        this.nodata = "";
        this.loader.setLoading(false);
      }
    })
  }
}

