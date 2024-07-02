import { Component, OnInit, inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductsService } from '../../shared/services/products.service';
import { Product } from '../../shared/interfaces/product.interface';
import { CommonModule } from '@angular/common';
import { FormComponent } from '../../shared/components/form/form.component';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',standalone: true,
  imports:[
    CommonModule,
    ReactiveFormsModule,
    FormComponent
  ],
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {
  productForm!: FormGroup;
  product!: Product;
  apiService = inject(ProductsService);
  matSnackBar = inject(MatSnackBar);
  router = inject(Router);
  route = inject(ActivatedRoute);

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.route.data.subscribe(data => {
      this.product = data['product'];
      console.log('Resolved Product:', this.product); // Verificação
      this.initForm();
    });
  }

  initForm(): void {
    this.productForm = this.fb.group({
      flavor: [this.product.flavor, [Validators.required, Validators.minLength(3), Validators.maxLength(30)]],
      availableQuantity: [this.product.availableQuantity, [Validators.required, Validators.min(0)]],
      price: [this.product.price, [Validators.required, Validators.min(0)]],
      description: [this.product.description, [Validators.required, Validators.minLength(3), Validators.maxLength(100)]],
      image: [null]
    });
  }

  onSubmit(product: Product): void {
    const formData = new FormData();
    formData.append('flavor', product.flavor);
    formData.append('availableQuantity', product.availableQuantity.toString());
    formData.append('price', product.price.toString());
    formData.append('description', product.description);
    if (product.image) {
      formData.append('image', product.image);
    }

    this.apiService.put(this.product['data'].id, formData).subscribe({
      next: () => {
        this.matSnackBar.open("Produto atualizado com sucesso!", 'OK');
        this.router.navigateByUrl('/');
      },
      error: err => {
        console.error('Erro ao atualizar produto:', err);
        this.matSnackBar.open("Erro ao atualizar produto.", 'OK');
      }
    });
  }
}