import { Component, inject } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, RouterLink } from '@angular/router';
import { ProductsService } from '../../shared/services/products.service';

@Component({
  selector: 'app-edit',
  standalone: true,
  imports: [ReactiveFormsModule, MatFormFieldModule, MatIconModule, MatInputModule, MatButtonModule, RouterLink],
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.scss'
})
export class EditComponent {

  apiService = inject(ProductsService)
  matSnackBar = inject(MatSnackBar)
  router = inject(Router)


  productForm = new FormGroup({
    flavor: new FormControl<string>('', {
      nonNullable: true,
      validators: [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(30)
      ]
    }),
    availableQuantity: new FormControl<number>(0, {
      nonNullable: true,
      validators: [Validators.required, Validators.min(0)]
    }),
    price: new FormControl<number>(0, {
      nonNullable: true,
      validators: [Validators.required, Validators.min(0)]
    }),
    description: new FormControl<string>('', {
      nonNullable: true,
      validators: [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(100)
      ]
    }),
    image: new FormControl<File | null>(null, {
      validators: [Validators.required]
    })


  });

  onSubmit() {

    const formData = new FormData();
    formData.append('flavor', this.productForm.controls.flavor.value);
    formData.append('availableQuantity', this.productForm.controls.availableQuantity.value.toString());
    formData.append('price', this.productForm.controls.price.value.toString());
    formData.append('description', this.productForm.controls.description.value);
    if (this.productForm.controls.image.value) {
      formData.append('image', this.productForm.controls.image.value);
    }
    this.apiService.put(formData).subscribe(() => {
      this.matSnackBar.open("Produto criado com sucesso!", 'OK');
      this.router.navigateByUrl('/');
    })
  }

  onFileChange(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length) {
      const file = input.files[0];
      this.productForm.patchValue({
        image: file
      });
    }

  }
}
