import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiService } from '../../_services/api.service';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { EmployeeInterface } from '../../_models/employee.interface';
// import { Option } from '../../_models/option.interface';
import { ToastrService } from 'ngx-toastr';
import { DataService } from 'src/app/_services/data.service';

@Component({
  selector: 'app-employee-dialog',
  templateUrl: './employee-dialog.component.html',
  styleUrls: ['./employee-dialog.component.css']
})
export class EmployeeDialogComponent implements OnInit {

  freshSelection!: string;
  freshnessList: string[] = ["Brand New", "Second Hand", "Refurbished"];

  employeeForm!: FormGroup;
  dialogTitle: string = 'Add an Employee';
  actionLabel: string = 'Add';
  actionBtn: string = "Save";
  // radioButtonOptions: Option[] = [];

  model1!: any;
  model2!: any;


  @Output() callParent = new EventEmitter();

  constructor(
    private formBuilder: FormBuilder,
    private apiSrvc: ApiService,
    private dataSrvc: DataService,
    private toastr: ToastrService,
    private dialog: MatDialog,
    private dialogRef: MatDialogRef<EmployeeDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public editData: any
  ) { }

  ngOnInit(): void {
    this.employeeForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', Validators.required],
      phone: ['', Validators.required]
    });

    if (this.editData) {

      this.actionBtn = "Update";
      this.employeeForm.controls['firstName'].setValue(this.editData.firstName);
      this.employeeForm.controls['lastName'].setValue(this.editData.lastName);
      this.employeeForm.controls['email'].setValue(this.editData.email);
      this.employeeForm.controls['phone'].setValue(this.editData.phone);
    }
  }


  addEmployee() {

    if (!this.editData) {

      if (this.employeeForm.valid) {
        this.dataSrvc.addEmployee(this.employeeForm.value)
          .subscribe({
            next: (res) => {

              this.toastr.success(
                'Employee added successfully',
                'Employee added',
                { timeOut: 5000 });

              this.employeeForm.reset();
              this.dialogRef.close('save');

            },
            error: () => {
              alert('Error while adding employee');
            }
          });
      }
    } else {
      this.actionLabel = "Update"
      this.updateEmployee();
    }

  }


  updateEmployee() {
    this.dataSrvc.updateEmployee(this.employeeForm.value, this.editData.id)
      .subscribe({
        next: (res) => {

          this.toastr.success(
            'Employee updated successfully',
            'Employee Update',
            { timeOut: 5000 });

          this.employeeForm.reset();
          this.dialogRef.close('update');
        },
        error: () => {
          alert("Error while updating employee");
        }
      });
  }

}
