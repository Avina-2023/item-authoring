import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ColDef, ColumnApi, GridApi } from 'ag-grid-community';
import { AppConfigService } from 'src/app/utils/app-config.service';

@Component({
  selector: 'app-viewjob',
  templateUrl: './viewjob.component.html',
  styleUrls: ['./viewjob.component.scss']
})
export class ViewjobComponent implements OnInit {
  length: any;
  pageSize: any;
  paginationPageSize = 500;
  columnDefs: any = [];
  rowData: any;
  @ViewChild('matDialog', { static: false }) matDialogRef: any;
  batchList: any = [
    {
      "JopId": "Batch Jop Id - 121",
      "TotalItemsCount": 180,
      "Processed": 0,
      "Errors": 20
    },
  ]
  constructor(
    private appconfig: AppConfigService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.tableview();
  }
  tableview() {
    this.columnDefs = [
      {
        headerName: '#',
        colId: 'rowNum',
        valueGetter: 'node.id',
        width: 80,
        pinned: 'left',
      },
      { field: 'athlete', width: 150, pinned: 'left' },
      { field: 'age', width: 90, pinned: 'left' },
      { field: 'country', width: 150 },
      { field: 'year', width: 90 },
      { field: 'date', width: 110 },
      { field: 'sport', width: 150 },
      { field: 'gold', width: 100 },
      { field: 'silver', width: 100 },
      { field: 'bronze', width: 100 },
      { field: 'total', width: 100, pinned: 'right' },
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
  closeDialog(e: any) {
    this.dialog.closeAll();
  }
  closepopup() {
    this.dialog.closeAll();
  }

  onGridReady(e: any) {

  }

}




