import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiService } from '../../_services/api.service';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { ProductInterface } from '../../_models/product.interface';
import { Option } from '../../_models/option.interface';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-product-dialog',
  templateUrl: './product-dialog.component.html',
  styleUrls: ['./product-dialog.component.css']
})
export class ProductDialogComponent implements OnInit {

  freshSelection!: string;
  freshnessList: string[] = ["Brand New", "Second Hand", "Refurbished"];

  productForm!: FormGroup;
  dialogTitle: string = 'Add a Product';
  actionLabel: string = 'Add';
  actionBtn: string = "Save";
  radioButtonOptions: Option[] = [];

  model1!: any;
  model2!: any;


  @Output() callParent = new EventEmitter();

  constructor(
    private formBuilder: FormBuilder,
    private apiSrvc: ApiService,
    private toastr: ToastrService,
    private dialog: MatDialog,
    private dialogRef: MatDialogRef<ProductDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public editData: any
  ) { }

  ngOnInit(): void {
    this.productForm = this.formBuilder.group({
      productName: ['', Validators.required],
      category: ['', Validators.required],
      date: [''],
      freshness: ['', Validators.required],
      price: ['', Validators.required],
      comment: ['', Validators.required],
    });

    if (this.editData) {
      this.actionBtn = "Update";
      this.productForm.controls['productName'].setValue(this.editData.productName);
      this.productForm.controls['category'].setValue(this.editData.category);
      this.productForm.controls['date'].setValue(this.editData.date);
      this.productForm.controls['freshness'].setValue(this.editData.freshness);
      this.productForm.controls['price'].setValue(this.editData.price);
      this.productForm.controls['comment'].setValue(this.editData.comment);
    }
  }


  addProduct() {

    if (!this.editData) {

      if (this.productForm.valid) {
        this.apiSrvc.addProduct(this.productForm.value)
          .subscribe({
            next: (res) => {

              this.toastr.success(
                'Product added successfully',
                'Product added',
                { timeOut: 5000 });

              this.productForm.reset();
              this.dialogRef.close('save');

            },
            error: () => {
              alert('Error while adding product');
            }
          });
      }
    } else {
      this.actionLabel = "Update"
      this.updateProduct();
    }

  }


  updateProduct() {
    this.apiSrvc.updateProduct(this.productForm.value, this.editData.id)
      .subscribe({
        next: (res) => {

          this.toastr.success(
            'Product updated successfully',
            'Product Update',
            { timeOut: 5000 });

          this.productForm.reset();
          this.dialogRef.close('update');
        },
        error: () => {
          alert("Error while updating product");
        }
      });
  }

}
