import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AppConfigService } from 'src/app/utils/app-config.service';
import { APP_CONSTANTS } from 'src/app/utils/app-constants.service';
import { GridApi } from '@ag-grid-enterprise/all-modules';
import { ApiService } from 'src/app/services/api.service';
import { ActivatedRoute } from '@angular/router'
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-viewjob',
  templateUrl: './viewjob.component.html',
  styleUrls: ['./viewjob.component.scss']
})
export class ViewjobComponent implements OnInit {
  newList: any;
  callFrom: any = 'View Job';
  public gridColumnApi: any;
  private gridApi!: GridApi;
  length: any;
  pageSize: any;
  paginationPageSize = 500;
  rowData: any;
  columnDefs: any = [];
  batchId: any = ""
  public sideBar = 'filters';
  batchInfo: any;
  public defaultColDef = {
    flex: 1,
    minWidth: 100,
    enableValue: true,
    enableRowGroup: true,
    enablePivot: true,
    sortable: true,
    filter: true,
  };
  commontitle: any = [
    "test1"
  ];
  @ViewChild('matDialog', { static: false }) matDialogRef: any;
  constructor(
    private appconfig: AppConfigService,
    private dialog: MatDialog,
    private http: ApiService,
    private route: ActivatedRoute,
    public toastr: ToastrService,
  ) {

  }

  ngOnInit(): void {
    this.getRouterPath()
    this.tableview();
    this.viewJobDetails();
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
        minWidth: 120,
        pinned: 'left',
        sortable: true,
        field: 'queReferance',
        filter: 'agTextColumnFilter',
        tooltipField: 'queReferance',
      },
      {
        headerName: 'Subject',
        minWidth: 120,
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
        minWidth: 140,
        tooltipField: 'SubTopic',
      },
      {
        headerName: 'Topic',
        minWidth: 120,

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
        minWidth: 140,
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
        headerName: 'Updated By',

        minWidth: 140,
        field: '',
        tooltipField: '',
      },
      {
        headerName: 'Updated On',
        minWidth: 140,
        field: '',
        tooltipField: '',
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
        minWidth: 200,
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
  matDialogOpen() {
    const dialogRef = this.dialog.open(this.matDialogRef, {
      data: { type: "view" },
      width: '680px',
      height: '325px'

    });
  }
  closePop(e: any) {
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
        this.newList = data.data[0].Questions;
        this.batchInfo = data.data[0];
      } else {
        this.toastr.error('Something went wrong, please try after sometime')
      }
    })
  }
}




