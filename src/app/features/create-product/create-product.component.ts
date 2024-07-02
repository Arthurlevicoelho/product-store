import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from "@angular/material/form-field"
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ProductsService } from '../../shared/services/products.service';
import { Router, RouterLink } from '@angular/router';
import { Product } from '../../shared/interfaces/product.interface';
import { FormComponent } from "../../shared/components/form/form.component";


@Component({
    selector: 'app-create-product',
    standalone: true,
    templateUrl: './create-product.component.html',
    styleUrl: './create-product.component.scss',
    imports: [ReactiveFormsModule, MatFormFieldModule, MatIconModule, MatInputModule, MatButtonModule, RouterLink, FormComponent]
})
export class CreateProductComponent {

  apiService = inject(ProductsService)
  matSnackBar = inject(MatSnackBar)
  router = inject(Router)
  product!: Product;

  onSubmit(product: Product) {

    const formData = new FormData();
    formData.append('flavor', product.flavor);
    formData.append('availableQuantity', product.availableQuantity.toString());
    formData.append('price', product.price.toString());
    formData.append('description', product.description);
    if (product.image) {
      formData.append('image', product.image);
    }
    this.apiService.post(formData).subscribe(() => {
      this.matSnackBar.open("Produto criado com sucesso!", 'OK');
      this.router.navigateByUrl('/');
    })
  }

  onFileChange(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length) {
      const file = input.files[0];
      this.product['patchValue']({
        image: file
      });
    }
}
}