import { Component, OnInit } from '@angular/core';
import { ConsumingAPIService } from '../../services/consuming-api.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  products: any[] = [];
  currentPage = 1;
  pageSize = 10;
  totalPages = 0;
  totalItems = 0;

  constructor(private apiService: ConsumingAPIService) {}

  ngOnInit(): void {
    this.loadPage(this.currentPage);
  }

  loadPage(page: number): void {
    this.apiService.getDadosDaApi(page, this.pageSize).subscribe(response => {
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
