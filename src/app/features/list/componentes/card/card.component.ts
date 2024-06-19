import { Component, EventEmitter, Output, computed, input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { Product } from '../../../../shared/interfaces/product.interface';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [MatCardModule, MatButtonModule],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss'
})
export class CardComponent {

  product = input.required<Product>();

  productFlavor = computed(() => this.product().flavor);
  productPrice = computed(() => this.product().price);
  productDescription = computed(() => this.product().description);
  productImage = computed(() => this.product().image)

  @Output() edit = new EventEmitter();

}
