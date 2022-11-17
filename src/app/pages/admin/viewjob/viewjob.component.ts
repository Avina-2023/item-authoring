import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AppConfigService } from 'src/app/utils/app-config.service';
import { APP_CONSTANTS } from 'src/app/utils/app-constants.service';
import { GridApi } from '@ag-grid-enterprise/all-modules';

@Component({
  selector: 'app-viewjob',
  templateUrl: './viewjob.component.html',
  styleUrls: ['./viewjob.component.scss']
})
export class ViewjobComponent implements OnInit {
  public gridColumnApi: any;
  private gridApi!: GridApi;
  length: any;
  pageSize: any;
  paginationPageSize = 500;
  columnDefs: any;
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
      "JopId": "Batch Jop Id - 121",
      "TotalItemsCount": 180,
      "Processed": 0,
      "Errors": 20
    },
  ]
  toaster: any;

  constructor(
    private appconfig: AppConfigService,
    private dialog: MatDialog
  ) {

  }

  ngOnInit(): void {
    this.tableview();

  }
  // BreadCrumb Routing
  breadCrumData: any = {
    previousPage: 'Batch Process >',
    currentPage: 'Jobs List > View Job',
    previousUrl: `${APP_CONSTANTS.ROUTES.ADMIN.VIEWJOB}`
  };
  // Example Json For AG Grid
  rowData: any =
    [{
      "ReferenceId": "9899805",
      "Subject": "Quantitative",
      "Category": "Aptitude",
      "SubCategory": "Analytics",
      "Topic": "Assesment",
      "DifficultyLevel": "High",
      "QuestionType": "MCQ",
      "Compentency": "Software Developer",
      "Skill": "GET Drive",
      "Area": "Flow Chart",
      "Status": "Processed",
      "Message": "Item Updated"
    },
    {
      "ReferenceId": "9899805",
      "Subject": "Quantitative",
      "Category": "Aptitude",
      "SubCategory": "Analytics",
      "Topic": "Assesment",
      "DifficultyLevel": "Low",
      "QuestionType": "True/False",
      "Compentency": "Software Developer",
      "Skill": "GET Drive",
      "Area": "Flow Chart",
      "Status": "Processed",
      "Message": "Item Insterted"
    },
    {
      "ReferenceId": "9899805",
      "Subject": "Quantitative",
      "Category": "Aptitude",
      "SubCategory": "Analytics",
      "Topic": "Assesment",
      "DifficultyLevel": "High",
      "QuestionType": "Short Answer",
      "Compentency": "Software Developer",
      "Skill": "GET Drive",
      "Area": "Flow Chart",
      "Status": "In Progress",
      "Message": "Question type is missing"
    },
    {
      "ReferenceId": "9899805",
      "Subject": "Quantitative",
      "Category": "Aptitude",
      "SubCategory": "Analytics",
      "Topic": "Assesment",
      "DifficultyLevel": "Low",
      "QuestionType": "Numerical",
      "Compentency": "Software Developer",
      "Skill": "GET Drive",
      "Area": "Flow Chart",
      "Status": "Processed",
      "Message": "Item Insterted"
    },
    {
      "ReferenceId": "9899805",
      "Subject": "Quantitative",
      "Category": "Aptitude",
      "SubCategory": "Analytics",
      "Topic": "Assesment",
      "DifficultyLevel": "High",
      "QuestionType": "Short Answer",
      "Compentency": "Software Developer",
      "Skill": "GET Drive",
      "Area": "Flow Chart",
      "Status": "Processed",
      "Message": "Question type is missing"
    },
    {
      "ReferenceId": "9899805",
      "Subject": "Quantitative",
      "Category": "Aptitude",
      "SubCategory": "Analytics",
      "Topic": "Assesment",
      "DifficultyLevel": "Low",
      "QuestionType": "Numerical",
      "Compentency": "Software Developer",
      "Skill": "GET Drive",
      "Area": "Flow Chart",
      "Status": " In Processed",
      "Message": "Item Insterted"
    },
    {
      "ReferenceId": "9899805",
      "Subject": "Quantitative",
      "Category": "Aptitude",
      "SubCategory": "Analytics",
      "Topic": "Assesment",
      "DifficultyLevel": "High",
      "QuestionType": "Short Answer",
      "Compentency": "Software Developer",
      "Skill": "GET Drive",
      "Area": "Flow Chart",
      "Status": "In Progress",
      "Message": "Item Insterted"
    },
    {
      "ReferenceId": "9899805",
      "Subject": "Quantitative",
      "Category": "Aptitude",
      "SubCategory": "Analytics",
      "Topic": "Assesment",
      "DifficultyLevel": "Low",
      "QuestionType": "Numerical",
      "Compentency": "Software Developer",
      "Skill": "GET Drive",
      "Area": "Flow Chart",
      "Status": "In Processed",
      "Message": "Area field is missing"
    },
    {
      "ReferenceId": "9899805",
      "Subject": "Quantitative",
      "Category": "Aptitude",
      "SubCategory": "Analytics",
      "Topic": "Assesment",
      "DifficultyLevel": "Low",
      "QuestionType": "Numerical",
      "Compentency": "Software Developer",
      "Skill": "GET Drive",
      "Area": "Flow Chart",
      "Status": "In Processed",
      "Message": "skill field is missing"
    },
    {
      "ReferenceId": "9899805",
      "Subject": "Quantitative",
      "Category": "Aptitude",
      "SubCategory": "Analytics",
      "Topic": "Assesment",
      "DifficultyLevel": "Low",
      "QuestionType": "Numerical",
      "Compentency": "Software Developer",
      "Skill": "GET Drive",
      "Area": "Flow Chart",
      "Status": "Processed",
      "Message": "Item already exists"
    },
    {
      "ReferenceId": "9899805",
      "Subject": "Quantitative",
      "Category": "Aptitude",
      "SubCategory": "Analytics",
      "Topic": "Assesment",
      "DifficultyLevel": "Low",
      "QuestionType": "Numerical",
      "Compentency": "Software Developer",
      "Skill": "GET Drive",
      "Area": "Flow Chart",
      "Status": "Processed",
      "Message": "subject filed is missing"
    },
    ];
  // json End

  tableview() {
    this.columnDefs = [
      {

        headerName: 'Reference ID',
        width: 130,
        minWidth: 120,
        pinned: 'left',
        // floatingFilter: true,
        sortable: true,
        field: 'ReferenceId',
        filter: 'agTextColumnFilter',
      },
      {
        headerName: 'Subject',
        minWidth: 120,
        field: 'Subject',
        // floatingFilter: true,
        filter: 'agTextColumnFilter',
      },
      {
        headerName: 'Category',

        field: 'Category',
        minWidth: 120,
        filter: 'agTextColumnFilter',

      },
      {
        headerName: 'Sub-Category',
        filter: 'agTextColumnFilter',
        field: 'SubCategory',
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

        field: 'QuestionType',
        minWidth: 140,
      },
      {
        headerName: 'Compentency',

        minWidth: 140,
        field: 'Compentency',
      },
      {
        headerName: 'Skill',

        minWidth: 120,
        field: 'Skill',
      },
      {
        headerName: 'Area',

        minWidth: 120,
        field: 'Area',
      },
      {
        headerName: 'Blooms Classification',

        minWidth: 200,
        field: 'Subject',
      },
      {
        headerName: 'Sub-Classification',

        minWidth: 180,
        field: 'Subject',
      },
      {
        headerName: 'Updated By',

        minWidth: 140,
        field: 'Subject',

      },
      {
        headerName: 'Updated On',

        minWidth: 140,
        field: 'Subject',

      },
      {
        headerName: 'Version Number',
        minWidth: 160,
        field: 'Subject',
      },
      {
        headerName: 'Status',
        pinned: 'right',
        minWidth: 120,
        width: 100,
        field: 'Status',
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
        field: 'Message',
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

  GobackJoblist() {
    this.appconfig.routeNavigation(APP_CONSTANTS.ENDPOINTS.ADMIN.JOBSLIST)
  }

  onGridReady(params: any) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    this.gridApi.closeToolPanel();
  }
}




