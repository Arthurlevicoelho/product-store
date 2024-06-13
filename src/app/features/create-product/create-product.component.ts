import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from "@angular/material/form-field"
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-create-product',
  standalone: true,
  imports: [ReactiveFormsModule, MatFormFieldModule, MatIconModule, MatInputModule, MatButtonModule],
  templateUrl: './create-product.component.html',
  styleUrl: './create-product.component.scss'
})
export class CreateProductComponent {

  productForm = new FormGroup({
    flavor: new FormControl<string>('', {
      nonNullable: true,
      validators: [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(30)
      ]
    }),
    availableQuantity: new FormControl<number | null>(null),

    price: new FormControl<number | null>(null, {
      validators: [
        Validators.required
      ]
    }),
    description: new FormControl<string>('', {
      nonNullable: true,
      validators: [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(100)
      ]
    })
  });

  onSubmit() {
    this.productForm.controls.flavor.value;
    this.productForm.controls.availableQuantity.value;
    this.productForm.controls.price.value;
    this.productForm.controls.description.value;
  }

}
