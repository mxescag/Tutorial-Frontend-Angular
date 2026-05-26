import { Routes } from '@angular/router';

/* Aquí añadimos las rutas a los componentes que vayamos añadiendo. */
export const routes: Routes = [
    /* Explicación de la falla:
     - path: cómo se llamará en URL
     - loadComponent: () : función anónima que importará la página de category-list 
     - .then() : entonces, una vez esté importada, se utilizará el componente que está en esa clase */
    { path: 'categories', 
        loadComponent: () => import('../category/category-list/category-list.page').then(m => m.CategoryListPage)},
    {
        path: 'authors',
        loadComponent: () => import ('../author/author-list/author-list.page').then(m => m.AuthorListPage)
    }
];
