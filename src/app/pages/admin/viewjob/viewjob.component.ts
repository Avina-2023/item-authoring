import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ColDef, ColumnApi, GridApi, SideBarDef } from 'ag-grid-community';
import { NgxFileDropEntry } from 'ngx-file-drop';
import { AppConfigService } from 'src/app/utils/app-config.service';
import { APP_CONSTANTS } from 'src/app/utils/app-constants.service';

@Component({
  selector: 'app-viewjob',
  templateUrl: './viewjob.component.html',
  styleUrls: ['./viewjob.component.scss']
})
export class ViewjobComponent implements OnInit {
  public defaultColDef;
  // upload doc

  file: any;
  name: string = '';
  selectedCSVFile: File | undefined;
  csvFileName: string | undefined;
  csvRows: any = [];
  showCsvFileInformation: boolean | undefined;
  // sideBar = true;
  validFile = false;
  showSizeError = {
    image: false,
    size: false
  };
  signatureData: any;
  selectedImage: any;
  fileName: any;
  fileSize: any;

  // 
  length: any;
  pageSize: any;
  paginationPageSize = 500;
  columnDefs: any;



  @ViewChild('matDialog', { static: false }) matDialogRef: any;
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
    this.defaultColDef = {
      flex: 1,
      enableRowGroup: true,
      enablePivot: true,
      sortable: true,
      resizable: true,
      filter: true,
      enableFilter: true,
      minWidth: 220,
      sideBar: 'filter',
    };
  }

  ngOnInit(): void {
    this.tableview();

  }

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
      "Message": "Item Insterted"
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
      "DifficultyLevel": "Low",
      "QuestionType": "Numerical",
      "Compentency": "Software Developer",
      "Skill": "GET Drive",
      "Area": "Flow Chart",
      "Status": "Processed",
      "Message": "Item Insterted"
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

        field: 'Subject',
        minWidth: 120,
        filter: 'agTextColumnFilter',

      },
      {
        headerName: 'Sub-Category',
        filter: 'agTextColumnFilter',
        field: 'age', minWidth: 120,
        width: 180
      },
      {
        headerName: 'Topic',
        minWidth: 120,
        field: 'country',
      },
      {
        headerName: 'Difficulty Level',
        minWidth: 120,
        field: 'country',
      },
      {
        headerName: 'Question Type',
        field: 'year',
        minWidth: 120,
      },
      {
        headerName: 'Compentency',
        field: 'date',
        minWidth: 120,
      },
      {
        headerName: 'Skill',
        field: 'sport',
        minWidth: 120,
      },
      {
        headerName: 'Area',
        field: 'gold',
        minWidth: 120,
      },
      {
        headerName: 'Blooms Classification',
        field: 'silver',
        minWidth: 120,
      },
      {
        headerName: 'Sub-Classification',
        field: 'bronze',
        minWidth: 120,
      },
      {
        headerName: 'Updated By',
        field: 'total',
        minWidth: 120,

      },
      {
        headerName: 'Updated On',
        field: 'total',
        minWidth: 120,

      },
      {
        headerName: 'Version Number',
        field: 'total', minWidth: 120,

      },
      {
        headerName: 'Status',
        field: 'total', pinned: 'right',
        minWidth: 50,
        width: 100,
      },
      {
        headerName: 'Message',
        field: 'total', pinned: 'right',
        minWidth: 120,
        width: 100,
      },
    ];
  }

  showUpload() {
    this.matDialogOpen();
  }
  matDialogOpen() {
    const dialogRef = this.dialog.open(this.matDialogRef, {
      width: '550px',
      height: '325px'

    });
  }
  closePop(e: any) {
    this.dialog.closeAll();
  }
  closepopup() {
    this.dialog.closeAll();
  }

  onGridReady(e: any) {

  }
  GobackJoblist() {
    this.appconfig.routeNavigation(APP_CONSTANTS.ENDPOINTS.ADMIN.JOBSLIST)
  }

  // async onSelectFile(event: any) {
  //   this.validFile = false;
  //   if (event.target.files && event.target.files[0].name.includes('.csv')) {
  //     console.log(event.target.files)

  //   } else {
  //     alert("no")
  //   }
  // }


  getFile(event: any) {
    this.file = event.target.files[0];
  }
  uploadDoc() {
    let formData = new FormData();
    formData.set("name", this.name);
    formData.set("file", this.file);
    console.log(this.file);

  }
}




