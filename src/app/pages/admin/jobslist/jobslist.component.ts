import { HttpParams } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ApiService } from 'src/app/services/api.service';
import { LoadingService } from 'src/app/services/loading.service';
import { AppConfigService } from 'src/app/utils/app-config.service';
import { APP_CONSTANTS } from 'src/app/utils/app-constants.service';
import { ToastrService } from 'ngx-toastr';
import * as moment from 'moment';
@Component({
  selector: 'app-jobslist',
  templateUrl: './jobslist.component.html',
  styleUrls: ['./jobslist.component.scss'],

})
export class JobslistComponent implements OnInit {
  @ViewChild('matDialog', { static: false }) matDialogRef: any;
  getBatchStatus: any;
  public gridColumnApi: any;
  gridApi: any;
  length: any;
  pageSize: any;
  taobatch: any;
  paginationPageSize = 500;
  rowData: any;
  columnDefs: any = [];
  taoBatchSync: any;
  rootNode: any;
  Joblist: any = '';
  nodata: any;
  quickSearchValue = '';
  sideBar = {
    toolPanels: [
      {
        id: 'filters',
        labelDefault: 'Filters',
        labelKey: 'filters',
        iconKey: 'filter',
        toolPanel: 'agFiltersToolPanel',
      }
    ], defaultToolPanel: ''
  };
  public defaultColDef = {
    flex: 1,
    minWidth: 100,
    enableValue: true,
    enablePivot: true,
    sortable: true,
    filter: true,
    resizable: true,
    suppressFilterButton: false
  };
  callFromJob: any = 'View Job List';
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
  onGridReady(params: any) {
    this.gridApi = params.api;
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
        filterParams: {
          buttons: ['reset'],
          closeOnApply: true,
          filterOptions: ['contains'],
          suppressAndOrCondition: true,

        },
        cellRenderer: (params: any) => {
          if (params.data.errorCount == 0) {
            return `<span>${params.data.batchId}</span><em style=" position: relative; left: 20px; top: 1px;" class="icon-warning-green"></em>`;
          } else {
            return `<span>${params.data.batchId}</span><em style=" position: relative; left: 20px;  top: 1px;" class="icon-warning-red"></em>`;
          }
        }
      },
      {
        headerName: 'Source To',
        width: 130,
        minWidth: 220,
        field: 'sourceTo',
        tooltipField: 'sourceTo',
      },
      {
        headerName: 'File Name',
        minWidth: 360,
        field: 'fileName',
        filter: 'agTextColumnFilter',
        tooltipField: 'fileName',
        filterParams: {
          buttons: ['reset'],
          closeOnApply: true,
          filterOptions: ['contains'],
          suppressAndOrCondition: true,
        },
      },
      {
        headerName: 'Uploaded By',
        field: 'createdBy',
        minWidth: 140,
        filter: 'agTextColumnFilter',
        tooltipField: 'createdBy',
        filterParams: {
          buttons: ['reset'],
          closeOnApply: true,
          filterOptions: ['contains'],
          suppressAndOrCondition: true,
        },
      },
      {
        headerName: 'Uploaded On',
        filter: 'agTextColumnFilter',
        field: 'createdAt',
        minWidth: 200,
        tooltipField: 'createdAt',
        filterParams: {
          buttons: ['reset'],
          closeOnApply: true,
          filterOptions: ['contains'],
          suppressAndOrCondition: true,
        },
        cellRenderer: (params: any) => {
          return moment(params.data.createdAt).format('DD MMM YYYY h:mm:ss A')
        }
      },
      {
        headerName: 'Items Count',
        minWidth: 140,
        field: 'totalCount',
        tooltipField: 'totalCount',
        filterParams: {
          buttons: ['reset'],
          closeOnApply: true,
          filterOptions: ['contains'],
          suppressAndOrCondition: true,
        },
      },
      {
        headerName: 'Processed',
        minWidth: 150,
        field: 'processedCount',
        tooltipField: 'processedCount',
        filterParams: {
          buttons: ['reset'],
          closeOnApply: true,
          filterOptions: ['contains'],
          suppressAndOrCondition: true,
        },
      },
      {
        headerName: 'Errors',
        field: 'errorCount',
        minWidth: 140,
        tooltipField: 'errorCount',
        filterParams: {
          buttons: ['reset'],
          closeOnApply: true,
          filterOptions: ['contains'],
          suppressAndOrCondition: true,
        },
      },
      {
        headerName: 'Sync Status',
        minWidth: 180,
        field: 'taoBatchSync',
        tooltipField: 'taoBatchSync',
        filterParams: {
          buttons: ['reset'],
          closeOnApply: true,
          filterOptions: ['contains'],
          suppressAndOrCondition: true,
        },

        cellRenderer: (params: any) => {
          if (params.data.batchStatus === false) {
            return ` --- `;
          }
          else if (params.data.taoBatchSync === 'Ready to Sync') {
            return `<span  style="color:#08558C">${params.data.taoBatchSync}</span>`;
          }
          else if (params.data.taoBatchSync === 'In Progress') {
            return `<span style="color:#FFCE00">${params.data.taoBatchSync}</span>`;
          }
          else (params.data.taoBatchSync === 'Synced')
          {
            return `<span style="color:#5CB646">${params.data.taoBatchSync}</span>`;
          }
        }
      },
      {
        headerName: 'Sync Updated Date',
        minWidth: 200,
        field: 'updatedAt',
        tooltipField: 'updatedAt',
        filterParams: {
          buttons: ['reset'],
          closeOnApply: true,
          filterOptions: ['contains'],
          suppressAndOrCondition: true,
        },
        cellRenderer: (params: any) => {
          if (params.data.batchStatus === false) {
            return ` --- `;
          }
          return moment(params.data.updatedAt).format('DD MMM YYYY h:mm:ss A');
        }
      },
      {
        headerName: 'Actions',
        minWidth: 120,
        tooltipField: 'Actions',
        filterParams: {
          buttons: ['reset'],
          closeOnApply: true,
          filterOptions: ['contains'],
          suppressAndOrCondition: true,
        },
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
    if (event && event.column && event.column.userProvidedColDef && event.column.userProvidedColDef.headerName == 'Actions') {
      this.appConfig.routeNavigationParams(APP_CONSTANTS.ENDPOINTS.ADMIN.VIEWJOB, event.data.batchId);
    }

  }
  showUpload() {
    this.matDialogOpen();
  }
  matDialogOpen() {
    const dialogRef = this.dialog.open(this.matDialogRef, {
      width: '600px',
      height: '420px'
    });
  }
  closePop(e: any) {
    this.dialog.closeAll();
  }
  // getModel(e: any) {
  //   const filteredArray = this.gridApi.getModel().rootNode.childrenAfterFilter;
  //   if (filteredArray && filteredArray.length === 0) {
  //     this.toastr.warning('No search results found');
  //   }
  // }

  batchData() {
    let listid = this.Joblist;
    this.http.Joblist(listid).subscribe((response: any) => {
      if (response.data == undefined) {
        this.loader.setLoading(false);
        this.nodata = response.message;
        this.toastr.error(response.message,"",{
          closeButton:false
        })
        this.Joblist = [];
      }
      else {
        this.Joblist = response.data;
        this.taoBatchSync = response.data[0].taoBatchSync;
        this.nodata = "";
        this.loader.setLoading(false);
      }
    })
  }
}



