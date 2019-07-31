import { Component, OnInit } from '@angular/core';
import { SelectionModel } from '@angular/cdk/collections';
import { MatTableDataSource } from '@angular/material/table';
import { PageEvent } from '@angular/material/paginator';

export interface PeriodicElement {
  position: number;
  name: string;
  amount: string;
  date: string;
  status: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'David Account', amount: '20.00', date: '2019-07-31',status: 'Open'},
  {position: 2, name: 'Plan B', amount: '156.00', date: '2019-07-31',status: 'Completed'},
  {position: 3, name: 'Plan B', amount: '14.00', date: '2019-07-31',status: 'Completed'},
  {position: 4, name: 'Temp Account', amount: '720.00', date: '2019-07-30',status: 'Completed'},
  {position: 5, name: 'Branch', amount: '50.00', date: '2019-06-28',status: 'Open'},
  {position: 6, name: 'Teller', amount: '50.00', date: '2019-06-28',status: 'Pushed'},
];

@Component({
  selector: 'app-list-deposits',
  templateUrl: './list-deposits.component.html',
  styleUrls: ['./list-deposits.component.css']
})
export class ListDepositsComponent implements OnInit {

  /* Paginator */
  // MatPaginator Inputs
  length = 100;
  pageSize = 10;
  pageSizeOptions: number[] = [5, 10, 25, 100];

  // MatPaginator Output
  pageEvent: PageEvent;

  setPageSizeOptions(setPageSizeOptionsInput: string) {
    this.pageSizeOptions = setPageSizeOptionsInput.split(',').map(str => +str);
  }

  /* Table */
  displayedColumns: string[] = ['select', 'position', 'name', 'amount', 'date', 'status'];
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
  selection = new SelectionModel<PeriodicElement>(true, []);

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
        this.selection.clear() :
        this.dataSource.data.forEach(row => this.selection.select(row));
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: PeriodicElement): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.position + 1}`;
  }

  constructor() { }

  ngOnInit() {
  }

}
