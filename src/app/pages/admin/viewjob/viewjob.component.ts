import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AppConfigService } from 'src/app/utils/app-config.service';
import { APP_CONSTANTS } from 'src/app/utils/app-constants.service';
import { GridApi } from '@ag-grid-enterprise/all-modules';
import { ApiService } from 'src/app/services/api.service';

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
  columnDefs: any = [];
  public defaultColDef = {
    flex: 1,
    minWidth: 100,
    enableValue: true,
    enableRowGroup: true,
    enablePivot: true,
    sortable: true,
    filter: true,
  };
  public sideBar = 'filters';
  batchList: any = [
    {
      "JopId": "Batch Job Id - 121",
      "TotalItemsCount": 180,
      "Processed": 0,
      "Errors": 20
    },
  ]
  toaster: any;
  commontitle: any = [
    "test1"
  ];
  @ViewChild('matDialog', { static: false }) matDialogRef: any;
  constructor(
    private appconfig: AppConfigService,
    private dialog: MatDialog,
    private http: ApiService,
  ) {

  }

  ngOnInit(): void {
    this.tableview();
    this.viewJobDetails();
  }
  // BreadCrumb Routing
  breadCrumData: any = {
    previousPage: 'Batch Process >',
    currentPage: 'Jobs List > View Job',
    previousUrl: `${APP_CONSTANTS.ROUTES.ADMIN.VIEWJOB}`
  };
  // Example Json For AG Grid
  rowData: any;
  // json End

  tableview() {
    this.columnDefs = [
      {
        headerName: 'Reference Id',
        width: 130,
        minWidth: 120,
        pinned: 'left',
        sortable: true,
        field: 'queId',
        filter: 'agTextColumnFilter',
        tooltipField: 'queId',
      },
      {
        headerName: 'Subject',
        minWidth: 120,
        field: 'Topic',
        filter: 'agTextColumnFilter',
      },
      {
        headerName: 'Category',
        field: 'Section',
        minWidth: 120,
        filter: 'agTextColumnFilter',
      },
      {
        headerName: 'Sub-Category',
        filter: 'agTextColumnFilter',
        field: 'SubTopic',
        minWidth: 140,
      },
      {
        headerName: 'Topic',
        minWidth: 120,

        field: 'Topic',
      },
      {
        headerName: 'Difficulty Level',
        minWidth: 150,
        field: 'DifficultyLevel',
      },
      {
        headerName: 'Question Type',

        field: 'queType',
        minWidth: 140,
      },
      {
        headerName: 'Compentency',

        minWidth: 140,
        field: 'Topic',
      },
      {
        headerName: 'Skill',

        minWidth: 120,
        field: 'Topic',
      },
      {
        headerName: 'Area',

        minWidth: 120,
        field: 'Topic',
      },
      {
        headerName: 'Blooms Classification',

        minWidth: 200,
        field: 'BloomsLavel',
      },
      {
        headerName: 'Sub-Classification',

        minWidth: 180,
        field: 'BloomsLavel',
      },
      {
        headerName: 'Updated By',

        minWidth: 140,
        field: 'BloomsLavel',

      },
      {
        headerName: 'Updated On',

        minWidth: 140,
        field: 'BloomsLavel',

      },
      {
        headerName: 'Version Number',
        minWidth: 160,
        field: 'BloomsLavel',
      },
      {
        headerName: 'Status',
        pinned: 'right',
        minWidth: 120,
        width: 100,
        field: 'status',
        cellRenderer: (params: any) => {
          if (params.value == 'Processed') {
            return `<span style="color:#5CB646">` + params.value + `</span>`;
          } else {
            return `<span style="color:#FFCE00">` + params.value + `</span>`;
          }

        }
      },
      {
        headerName: 'Message',
        pinned: 'right',
        minWidth: 200,
        width: 100,
        field: 'message',
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
      batchId: 33
    }
    this.http.jobDetails(viewJob).subscribe((data: any) => {
      this.newList = data.queId;
      console.log(this.newList, "response is");
    })
  }
}




