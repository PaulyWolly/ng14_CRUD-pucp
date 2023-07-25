import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ApiService } from '../../_services/api.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { EmployeeInterface } from 'src/app/_models/employee.interface';
import { EmployeeDialogComponent } from '../employee-dialog/employee-dialog.component';
import { DataService } from 'src/app/_services/data.service';


@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['.//employees.component.css']
})
export class EmployeesComponent implements OnInit {
  @Input() buttonLabel!: string;

  employees!: EmployeeInterface[];
  isLoading = true;

  displayedColumns: string[] = [ "name", "position", "level", "action"];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private apiService: ApiService,
    private dataSrvc: DataService,
    private dialog: MatDialog,
    private _liveAnnouncer: LiveAnnouncer
  ) { }

  ngOnInit(): void {
    this.getAllEmployees();
  }

  getAllEmployees() {
    this.dataSrvc.getEmployees()
      .subscribe({
        next: (res: any) => {
          console.log('Our Employees: ', res);

          this.isLoading = false;

          this.dataSource = new MatTableDataSource(res);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;

        },
        error: (res: any) => {
          this.isLoading = false;
          alert('Error occurred while fetching Employees');
        }
      });
  }


  onEditEmployee(row: any) {
    this.dialog.open(EmployeeDialogComponent, {
      width: '37%',
      data: row
    }).afterClosed().subscribe(val => {
      if (val === 'update') {

        this.getAllEmployees();
      }
    });
  }

  onDeleteEmployee(id: any) {
    let text = "Are you sure you want to delete employee " + id + " ?? \nOK or Cancel.";
    if (confirm(text) == true) {
      this.deleteTheEmployee(id);
    }
  }

  deleteTheEmployee(id: any) {
    this.dataSrvc.deleteEmployee(id)
      .subscribe({
        next: (res) => {
          console.log('employee deleted');
          this.getAllEmployees();
        },
        error: () => {
          alert('Error deleting employee');
        }
      });

  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  /** Announce the change in sort state */
  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }

}
