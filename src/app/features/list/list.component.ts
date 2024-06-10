import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../shared/services/products.service';
import { HttpClient } from '@angular/common/http';
import { Product } from '../../shared/interfaces/product.interface';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  products: Product[] = [];
  currentPage = 1;
  pageSize = 10;
  totalPages = 0;
  totalItems = 0;

  constructor(private apiService: ProductsService) {}

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
}
