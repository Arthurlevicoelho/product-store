import { ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { ListComponent } from './features/list/list.component';
import { CreateProductComponent } from './features/create-product/create-product.component';
import { ProductsService } from './shared/services/products.service';
import { inject } from '@angular/core';

export const routes: Routes = [{
    path: '',
    component: ListComponent,
},
{
    path: 'create-product',
    loadComponent: () =>
        import('./features/create-product/create-product.component').then(m => m.CreateProductComponent),
},
{
    path: 'edit-product/:id',
    resolve: {
        product: (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {            const productsService = inject(ProductsService);
            const id = route.paramMap.get('id') as string;
            return productsService.get(id);
        },
    },
    loadComponent: () =>
        import('./features/edit/edit.component').then((m) => m.EditComponent),
},
];
