import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AppConfigService } from 'src/app/utils/app-config.service';
import { APP_CONSTANTS } from 'src/app/utils/app-constants.service';
import { GridApi } from '@ag-grid-enterprise/all-modules';
import { ApiService } from 'src/app/services/api.service';
import { ActivatedRoute } from '@angular/router'
import { ToastrService } from 'ngx-toastr';
import { LoadingService } from 'src/app/services/loading.service';
const incr = 1;
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
  gettao: any;
  isSyncButtonenable = false;
  timesync = false;
  today: number = Date.now();
  dateObj: number = Date.now();
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
    private loading: LoadingService
  ) { }

  ngOnInit(): void {
    this.getRouterPath()
    this.tableview();
    this.viewJobDetails();
    setInterval(() => this.manageProgress(), 150)
  }

  // BreadCrumb Routing
  breadCrumData: any = {
    previousPage: 'Batch Process > Jobs List >',
    currentPage: 'View Job',
    previousUrl: `${APP_CONSTANTS.ROUTES.ADMIN.VIEWJOB}`
  };

  getRouterPath() {
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.batchId = params['id'];
      } else {
        this.GobackJoblist()
      }
    });
  }
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
      },
      {
        headerName: 'Subject',
        minWidth: 160,
        field: 'Topic',
        filter: 'agTextColumnFilter',
        tooltipField: 'Topic',
      },
      {
        headerName: 'Category',
        field: 'Section',
        minWidth: 120,
        filter: 'agTextColumnFilter',
        tooltipField: 'Section',
      },
      {
        headerName: 'Sub-Category',
        filter: 'agTextColumnFilter',
        field: 'SubTopic',
        minWidth: 190,
        tooltipField: 'SubTopic',
      },
      {
        headerName: 'Topic',
        minWidth: 160,
        field: 'Topic',
        tooltipField: 'Topic',
      },
      {
        headerName: 'Difficulty Level',
        minWidth: 150,
        field: 'DifficultyLevel',
        tooltipField: 'DifficultyLevel',
      },
      {
        headerName: 'Question Type',
        field: 'queType',
        minWidth: 230,
        tooltipField: 'queType',
      },
      {
        headerName: 'Compentency',
        minWidth: 140,
        field: 'competency',
        tooltipField: 'competency',
      },
      {
        headerName: 'Skill',
        minWidth: 120,
        field: 'skill',
        tooltipField: 'skill',
      },
      {
        headerName: 'Area',
        minWidth: 120,
        field: 'area',
        tooltipField: 'area',
      },
      {
        headerName: 'Blooms Classification',
        minWidth: 200,
        field: 'BloomsLavel',
        tooltipField: 'BloomsLavel',
      },
      {
        headerName: 'Sub-Classification',
        minWidth: 180,
        field: 'subClassification',
        tooltipField: 'subClassification',
      },
      {
        headerName: 'Version Number',
        minWidth: 160,
        field: 'version',
        tooltipField: 'version',
      },
      {
        headerName: 'Status',
        pinned: 'right',
        minWidth: 120,
        width: 100,
        field: 'status',
        tooltipField: 'status',
        cellRenderer: (params: any) => {
          if (params.value == true) {
            return `<span style="color:#5CB646"> Processed </span>`;
          } else {
            return `<span style="color:#FFCE00"> In Progress </span>`;
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

  viewJobDetails() {
    let viewJob = {
      batchId: +this.batchId
    }
    this.http.jobDetails(viewJob).subscribe((data: any) => {
      if (data.success) {
        this.loading.setLoading(false);
        this.newList = data.data[0].Questions;
        this.batchInfo = data.data[0];
      } else {
        this.toastr.error('Something went wrong, please try after sometime')
      }
    })
  }
  movetotav() {
    let batchId = { "batchId": +this.batchId };
    this.http.toa(batchId).subscribe((response: any) => {
      if (response.success) {
        this.isSyncButtonenable = true;
        this.closePop();
        this.viewJobDetails()
        this.toastr.success("Sync process started successfully.")
      } else {
        this.toastr.error(response.message)
      }
    })
  }

  manageProgress() {
    if (this.progress === 100) {
      this.progress = 100;
      this.timesync = true;
    } else {
      this.progress = this.progress + incr;
    }
  }
}




