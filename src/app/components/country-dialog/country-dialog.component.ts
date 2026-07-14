import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from '../../_services/api.service';

@Component({
  selector: 'app-country-dialog',
  templateUrl: './country-dialog.component.html',
  styleUrls: ['./country-dialog.component.css']
})
export class CountryDialogComponent implements OnInit {

  countryForm!: FormGroup;
  actionBtn = 'Save';

  constructor(
    private formBuilder: FormBuilder,
    private apiSrvc: ApiService,
    private toastr: ToastrService,
    private dialogRef: MatDialogRef<CountryDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public editData: any
  ) { }

  ngOnInit(): void {
    this.countryForm = this.formBuilder.group({
      name: ['', Validators.required],
      code: ['', [Validators.required, Validators.maxLength(3)]]
    });

    if (this.editData) {
      this.actionBtn = 'Update';
      this.countryForm.patchValue({
        name: this.editData.name,
        code: this.editData.code
      });
    }
  }

  saveCountry(): void {
    if (!this.countryForm.valid) {
      return;
    }

    if (!this.editData) {
      this.apiSrvc.addCountry(this.countryForm.value).subscribe({
        next: () => {
          this.toastr.success('Country added successfully', 'Country added');
          this.countryForm.reset();
          this.dialogRef.close('save');
        },
        error: () => {
          alert('Error while adding country');
        }
      });
      return;
    }

    this.apiSrvc.updateCountry(this.countryForm.value, this.editData.id).subscribe({
      next: () => {
        this.toastr.success('Country updated successfully', 'Country Update');
        this.countryForm.reset();
        this.dialogRef.close('update');
      },
      error: () => {
        alert('Error while updating country');
      }
    });
  }
}
