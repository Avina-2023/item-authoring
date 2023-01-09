import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AppConfigService } from 'src/app/utils/app-config.service';
import { APP_CONSTANTS } from 'src/app/utils/app-constants.service';
import { GridApi } from '@ag-grid-enterprise/all-modules';
import { ApiService } from 'src/app/services/api.service';
import { ActivatedRoute } from '@angular/router'
import { ToastrService } from 'ngx-toastr';
import { LoadingService } from 'src/app/services/loading.service';
import { WebSocketService } from 'src/app/services/web-socket.service';
@Component({
  selector: 'app-viewjob',
  templateUrl: './viewjob.component.html',
  styleUrls: ['./viewjob.component.scss']
})
export class ViewjobComponent implements OnInit {
  progress = 0;
  newList: any;
  callFrom: any = 'View Job';
  public gridColumnApi: any;
  private gridApi!: GridApi;
  length: any;
  pageSize: any;
  taobatch: any;
  paginationPageSize = 500;
  rowData: any;
  columnDefs: any = [];
  batchId: any = ""
  public sideBar = 'filters';
  batchInfo: any;
  timesync = false;
  taoBatchId: any;
  isButtonenble = true;
  createdAt: any;
  completed: any;
  public defaultColDef = {
    flex: 1,
    minWidth: 100,
    enableValue: true,
    enablePivot: true,
    sortable: true,
    filter: true,
    resizable: false,
  };
  commontitle: any = [
    "test1"
  ];
  @ViewChild('matDialog', { static: false }) matDialogRef: any;
  @ViewChild('matDialogtao', { static: false }) matDialogRefTao: any;

  constructor(
    private appconfig: AppConfigService,
    private dialog: MatDialog,
    private http: ApiService,
    private route: ActivatedRoute,
    public toastr: ToastrService,
    private loading: LoadingService,
    private webSocket: WebSocketService,
  ) { }

  ngOnInit(): void {
    this.getRouterPath()
    this.tableview();
    this.viewJobDetails();
    this.socketInitiazion();
  }


  // BreadCrumb Routing
  breadCrumData: any = {
    previousPage: 'Batch Process > Jobs List >',
    currentPage: 'View Job',
    previousUrl: `${APP_CONSTANTS.ROUTES.ADMIN.VIEWJOB}`
  };

  // Tao Socket.io Method Functionality
  socketInitiazion() {
    this.webSocket.getPercentage();
    this.webSocket.progress.subscribe((data: any) => {
      this.createdAt = data.updatedAt;
      this.progress = data?.taoSyncPercentage;
      this.taoBatchId = data?.batchId;
      if (data == this.taoBatchId || this.progress == 100 && this.progress == data?.taoSyncPercentage) {
        this.viewJobDetails();
        this.timesync = true;
        this.webSocket.socketOf();
      }
    })
  }

  // Params ID pass In URL Method
  getRouterPath() {
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.batchId = params['id'];
      } else {
        this.GobackJoblist()
      }
    });
  }

  // Ag Grid Table Dats
  tableview() {
    this.columnDefs = [
      {
        headerName: 'Reference Id',
        width: 130,
        minWidth: 165,
        pinned: 'left',
        sortable: true,
        field: 'queReferance',
        filter: 'agTextColumnFilter',
        tooltipField: 'queReferance',
        filterParams: {
          buttons: ['reset'],
          closeOnApply: true,
          filterOptions: ['contains'],
          suppressAndOrCondition: true,
        },
      },
      {
        headerName: 'Subject',
        minWidth: 160,
        field: 'Topic',
        filter: 'agTextColumnFilter',
        tooltipField: 'Topic',
        filterParams: {
          buttons: ['reset'],
          closeOnApply: true,
          filterOptions: ['contains'],
          suppressAndOrCondition: true,
        },
      },
      {
        headerName: 'Category',
        field: 'Section',
        minWidth: 120,
        filter: 'agTextColumnFilter',
        tooltipField: 'Section',
        filterParams: {
          buttons: ['reset'],
          closeOnApply: true,
          filterOptions: ['contains'],
          suppressAndOrCondition: true,
        },
      },
      {
        headerName: 'Sub-Category',
        filter: 'agTextColumnFilter',
        field: 'SubTopic',
        minWidth: 190,
        tooltipField: 'SubTopic',
        filterParams: {
          buttons: ['reset'],
          closeOnApply: true,
          filterOptions: ['contains'],
          suppressAndOrCondition: true,
        },
      },
      {
        headerName: 'Topic',
        minWidth: 160,
        field: 'Topic',
        tooltipField: 'Topic',
        filterParams: {
          buttons: ['reset'],
          closeOnApply: true,
          filterOptions: ['contains'],
          suppressAndOrCondition: true,
        },
      },
      {
        headerName: 'Difficulty Level',
        minWidth: 150,
        field: 'DifficultyLevel',
        tooltipField: 'DifficultyLevel',
        filterParams: {
          buttons: ['reset'],
          closeOnApply: true,
          filterOptions: ['contains'],
          suppressAndOrCondition: true,
        },
      },
      {
        headerName: 'Question Type',
        field: 'queType',
        minWidth: 230,
        tooltipField: 'queType',
        filterParams: {
          buttons: ['reset'],
          closeOnApply: true,
          filterOptions: ['contains'],
          suppressAndOrCondition: true,
        },
      },
      {
        headerName: 'Compentency',
        minWidth: 140,
        field: 'competency',
        tooltipField: 'competency',
        filterParams: {
          buttons: ['reset'],
          closeOnApply: true,
          filterOptions: ['contains'],
          suppressAndOrCondition: true,
        },
      },
      {
        headerName: 'Skill',
        minWidth: 120,
        field: 'skill',
        tooltipField: 'skill',
        filterParams: {
          buttons: ['reset'],
          closeOnApply: true,
          filterOptions: ['contains'],
          suppressAndOrCondition: true,
        },
      },
      {
        headerName: 'Area',
        minWidth: 120,
        field: 'area',
        tooltipField: 'area',
        filterParams: {
          buttons: ['reset'],
          closeOnApply: true,
          filterOptions: ['contains'],
          suppressAndOrCondition: true,
        },
      },
      {
        headerName: 'Blooms Classification',
        minWidth: 200,
        field: 'BloomsLevel',
        tooltipField: 'BloomsLevel',
        filterParams: {
          buttons: ['reset'],
          closeOnApply: true,
          filterOptions: ['contains'],
          suppressAndOrCondition: true,
        },
      },
      {
        headerName: 'Sub-Classification',
        minWidth: 180,
        field: 'subClassification',
        tooltipField: 'subClassification',
        filterParams: {
          buttons: ['reset'],
          closeOnApply: true,
          filterOptions: ['contains'],
          suppressAndOrCondition: true,
        },
      },
      {
        headerName: 'Version Number',
        minWidth: 160,
        field: 'version',
        tooltipField: 'version',
        filterParams: {
          buttons: ['reset'],
          closeOnApply: true,
          filterOptions: ['contains'],
          suppressAndOrCondition: true,
        },
      },
      {
        headerName: 'Status',
        pinned: 'right',
        minWidth: 120,
        width: 100,
        field: 'status',
        tooltipField: 'status',
        filterParams: {
          buttons: ['reset'],
          closeOnApply: true,
          filterOptions: ['contains'],
          suppressAndOrCondition: true,
        },
        cellRenderer: (params: any) => {
          if (params.value == 'Processed') {
            return `<span style="color:#5CB646">${params.data.status} </span>`;
          } else {
            return `<span style="color:#FFCE00">${params.data.status} </span>`;
          }
        }
      },
      {
        headerName: 'Message',
        pinned: 'right',
        minWidth: 160,
        width: 100,
        field: 'message',
        tooltipField: 'message',
        filterParams: {
          buttons: ['reset'],
          closeOnApply: true,
          filterOptions: ['contains'],
          suppressAndOrCondition: true,
        },
        cellRenderer: (params: any) => {
          if (params.value == 'Item Insterted' || params.value == 'Item Updated') {
            return `<span style="color:#000000">` + params.value + `</span>`;
          } else {
            return `<img src="/assets/images/Icon material-error-outline.svg"></img> <span style="color:#C02222">` + params.value + `</span>`;
          }
        }
      },
    ];
  }

  // Pop Up's
  showUpload() {
    this.matDialogOpen();
  }
  openTao() {
    this.matDialogOpentao();
  }
  matDialogOpen() {
    const dialogRef = this.dialog.open(this.matDialogRef, {
      data: { type: "view" },
      width: '680px',
      height: '325px'
    });
  }
  matDialogOpentao() {
    const dialogRef = this.dialog.open(this.matDialogRefTao, {
      data: { type: "view" },
      width: '448px',
      height: '315px'
    });
  }
  closePop() {
    this.dialog.closeAll();
  }
  GobackJoblist() {
    this.appconfig.routeNavigation(APP_CONSTANTS.ENDPOINTS.ADMIN.JOBSLIST)
  }

  onGridReady(params: any) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    this.gridApi.closeToolPanel();
  }

  // View Page API Method Calling
  viewJobDetails() {
    this.loading.setLoading(true);
    let viewJob = {
      batchId: +this.batchId
    }
    this.http.jobDetails(viewJob).subscribe((data: any) => {
      if (data.success) {
        this.loading.setLoading(false);
        this.newList = data.data[0].Questions;
        this.batchInfo = data.data[0];
        this.completed = data.data[0].taoBatchSync;
        this.createdAt = data.data[0].createdAt;
        this.isButtonenble = true;
      } else {
        this.toastr.error('Something went wrong, please try after sometime')
      }
    })
  }
  // Tao Sync method Functionality (YES or CANCEL BUTTON)
  movetotav() {
    let batchId = { "batchId": +this.batchId };
    this.http.toa(batchId).subscribe((response: any) => {
      if (response.success) {
        this.socketInitiazion();
        this.closePop();
        this.viewJobDetails()
        this.toastr.success("Sync process started successfully.")
      } else {
        this.toastr.error(response.message)
      }
    })
  }
}


