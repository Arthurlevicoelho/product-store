import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';
import { ProductsService } from '../../shared/services/products.service';
import { Product } from '../../shared/interfaces/product.interface';
import { CardComponent } from './componentes/card/card.component';
import { Router, RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-confirmation-dialog',
  template: `
  <h2 mat-dialog-title>Deletar produto</h2>
  <mat-dialog-content>
    Tem certeja que quer deletar o produto?
  </mat-dialog-content>
  <mat-dialog-actions align="end">
    <button mat-raised-button (click)="onNot()">Não</button>
    <button mat-raised-button color="accent" (click)="onYes()" cdkFocusInitial>Sim</button>
  </mat-dialog-actions>
  
  `,
  standalone: true,
  imports: [MatButtonModule, MatDialogActions, MatDialogClose, MatDialogTitle, MatDialogContent],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConfirmationDialogComponent {

  matDialogRef = inject(MatDialogRef);

  onNot() {
    this.matDialogRef.close(false)
  }

  onYes() {
    this.matDialogRef.close(true)
  }
}

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [CardComponent, RouterLink, MatButtonModule],
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  [x: string]: any;
  matSnackBar = inject(MatSnackBar);

  products: Product[] = [];
  currentPage = 0;
  pageSize = 10;
  totalPages = 0;
  totalItems = 0;
  matDialog = inject(MatDialog)

  constructor(private apiService: ProductsService) { }
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

  onEdit(product: Product) {
    this.router.navigate(['/edit-product', product.id]);
  }

  onDelete(product: Product) {
    this.matDialog.open(ConfirmationDialogComponent)
      .afterClosed()
      .subscribe((answer: Boolean) => {
        if (answer) {
          this.apiService.delete(product.id)
            .subscribe((successMessage: string) => {
              this.matSnackBar.open(successMessage, 'OK');
              this.loadPage(this.currentPage);
            });
        }
      });
  }

}
