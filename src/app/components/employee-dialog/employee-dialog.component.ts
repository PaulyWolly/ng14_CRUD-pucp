import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiService } from '../../_services/api.service';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { Employee } from '../../_models/employee';
// import { Option } from '../../_models/option.interface';
import { ToastrService } from 'ngx-toastr';
import { DataService } from 'src/app/_services/data.service';

@Component({
  selector: 'app-employee-dialog',
  templateUrl: './employee-dialog.component.html',
  styleUrls: ['./employee-dialog.component.css']
})
export class EmployeeDialogComponent implements OnInit {

  levelList: string[] = ["Junior", "Major", "Senior"];
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
      name: ['', Validators.required],
      position: ['', Validators.required],
      level: ['', Validators.required]
    });

    if (this.editData) {

      this.actionBtn = "Update";
      this.employeeForm.controls['name'].setValue(this.editData.name);
      this.employeeForm.controls['position'].setValue(this.editData.position);
      this.employeeForm.controls['level'].setValue(this.editData.level);
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
                { timeOut: 5000 }
              );

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
