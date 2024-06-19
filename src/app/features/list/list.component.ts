import { Component, OnInit, inject } from '@angular/core';
import { ProductsService } from '../../shared/services/products.service';
import { Product } from '../../shared/interfaces/product.interface';
import { CardComponent } from './componentes/card/card.component';
import { Router, RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [CardComponent,RouterLink, MatButtonModule],
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  products: Product[] = [];
  currentPage = 0;
  pageSize = 10;
  totalPages = 0;
  totalItems = 0;

  constructor(private apiService: ProductsService) {}
  router = inject(Router)
  ngOnInit(): void {
    this.loadPage(this.currentPage);
  }

  loadPage(page: number): void {
    this.apiService.getAll(page, this.pageSize).subscribe(response => {
      this.products = response.data.content;
      this.totalPages = response.data.totalPages;
      this.totalItems = response.data.totalElements;
    });
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.loadPage(this.currentPage);
    }
  }

  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.loadPage(this.currentPage);
    }
  }

  onEdit(){
    this.router.navigateByUrl('/edit-product');
  }

}
