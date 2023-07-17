import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../services/auth.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-updatepopup',
  templateUrl: './updatepopup.component.html',
  styleUrls: ['./updatepopup.component.css']
})
export class UpdatepopupComponent implements OnInit {

  registerUpdateForm!: FormGroup;

  constructor(
    private builder: FormBuilder,
    private service: AuthService,
    private toastr: ToastrService,
    private dialogref: MatDialogRef<UpdatepopupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.service.getuserrole().subscribe(res => {
      this.rolelist = res;
    });
  }

  ngOnInit(): void {

    this.registerUpdateForm = this.builder.group({
      id: this.builder.control(''),
      name: this.builder.control(''),
      password: this.builder.control(''),
      email: this.builder.control(''),
      gender: this.builder.control('male'),
      role: this.builder.control('', Validators.required),
      isactive: this.builder.control(false)
    });

    if (this.data.usercode != '' && this.data.usercode != null) {
      this.loaduserdata(this.data.usercode);
    }

  }

  rolelist: any;
  editdata: any;

  loaduserdata(code: any) {
    this.service.GetUserbyCode(code)
      .subscribe(
        res => {
          this.editdata = res;
          console.log(this.editdata);
          this.registerUpdateForm.setValue({
            id: this.editdata.id,
            name: this.editdata.name,
            password: this.editdata.password,
            email: this.editdata.email,
            gender: this.editdata.gender,
            role: this.editdata.role,
            isactive: this.editdata.isactive
          });
    });
  }

  UpdateUser() {
    this.service.updateuser(this.registerUpdateForm.value.id, this.registerUpdateForm.value).subscribe(res => {
      this.toastr.success('Updated successfully.');
      this.dialogref.close();
    });
  }

}
