import { HttpParams } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { GridApi } from 'ag-grid-community';
import { ApiService } from 'src/app/services/api.service';
import { LoadingService } from 'src/app/services/loading.service';
import { AppConfigService } from 'src/app/utils/app-config.service';
import { APP_CONSTANTS } from 'src/app/utils/app-constants.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-jobslist',
  templateUrl: './jobslist.component.html',
  styleUrls: ['./jobslist.component.scss'],

})
export class JobslistComponent implements OnInit {
  @ViewChild('matDialog', { static: false }) matDialogRef: any;
  // Ag grid variables
  public sideBar = 'filters';
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
    public loader: LoadingService,
    public toastr: ToastrService,
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
        tooltipField: 'batchId',
        cellRenderer: (params: any) => {
          if (params.data.errorCount == 0) {
            return `<span>${params.data.batchId}</span><em style=" position: relative; left: 15px; top: 1px;" class="icon-warning-green"></em>`;
          } else {
            return `<span>${params.data.batchId}</span><em style=" position: relative; left: 15px" class="icon-warning-red"></em>`;
          }
        }
      },
      {
        headerName: 'File Name',
        minWidth: 360,
        field: 'fileName',
        filter: 'agTextColumnFilter',
        tooltipField: 'fileName',
      },
      {
        headerName: 'Uploaded By',
        field: 'createdBy',
        minWidth: 140,
        filter: 'agTextColumnFilter',
        tooltipField: 'createdBy',
      },
      {
        headerName: 'Uploaded On',
        filter: 'agTextColumnFilter',
        field: 'updatedAt',
        minWidth: 140,
        tooltipField: 'updatedAt',
        cellRenderer: (params: any) => {
          return (params.data.updatedAt.split(" ")[0])
        }
      },
      {
        headerName: 'Items Count',
        minWidth: 140,
        field: 'totalCount',
        tooltipField: 'totalCount',
      },
      {
        headerName: 'Processed',
        minWidth: 150,
        field: 'processedCount',
        tooltipField: 'processedCount',
      },
      {
        headerName: 'Errors',
        field: 'errorCount',
        minWidth: 140,
        tooltipField: 'errorCount',
      },
      {
        headerName: 'Sync Status',
        minWidth: 140,
      },
      {
        headerName: 'Sync Updated Date',
        minWidth: 170,
      },
      {
        headerName: 'Actions',
        minWidth: 120,
        tooltipField: 'Actions',
        cellRenderer: (params: any) => {
          return '<div  style="color:#08558C; text-decoration: underline; cursor: pointer" > View </div>'
        }
      },
    ];
  }
  httpParams = new HttpParams({
    fromObject: {
      batchid: 12
    }
  })
  onCellClicked(event: any) {
    this.appConfig.routeNavigationParams(APP_CONSTANTS.ENDPOINTS.ADMIN.VIEWJOB, event.data.batchId);
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
        this.toastr.error(response.message)
        this.Joblist = [];
      }
      else {
        this.Joblist = response.data;
        this.nodata = "";
        this.loader.setLoading(false);
      }
    })
  }
}

