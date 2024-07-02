import { Component, EventEmitter, Input, OnInit, Output, input } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { Product } from '../../interfaces/product.interface';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [ReactiveFormsModule, MatFormFieldModule, MatIconModule, MatInputModule, MatButtonModule],
  templateUrl: './form.component.html',
  styleUrl: './form.component.scss'
})
export class FormComponent implements OnInit {
  @Input() product: Product | null = null;
  @Output() done = new EventEmitter<Product>();
  productForm!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.productForm = this.fb.group({
      flavor: [this.product?.flavor || '', [Validators.required, Validators.minLength(3), Validators.maxLength(30)]],
      availableQuantity: [this.product?.availableQuantity || 0, [Validators.required, Validators.min(0)]],
      price: [this.product?.price || 0, [Validators.required, Validators.min(0)]],
      description: [this.product?.description || '', [Validators.required, Validators.minLength(3), Validators.maxLength(100)]],
      image: [null]
    });
  }

  onSubmit(): void {
    if (this.productForm.valid) {
      const product = { ...this.productForm.value } as Product;
      product.image = this.productForm.get('image')?.value;
      this.done.emit(product);
    }
  }

  onFileChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length) {
      const file = input.files[0];
      this.productForm.patchValue({ image: file });
    }
  }
}