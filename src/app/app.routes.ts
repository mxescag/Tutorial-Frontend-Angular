import { Routes } from '@angular/router';

/* Aquí añadimos las rutas a los componentes que vayamos añadiendo. */
export const routes: Routes = [
    /* Explicación de la falla:
     - path: cómo se llamará en URL
     - loadComponent: () : función anónima que importará la página de category-list 
     - .then() : entonces, una vez esté importada, se utilizará el componente que está en esa clase */
     { path: '', redirectTo: '/games', pathMatch: 'full'}, /* Añadimos esta ruta para que vaya a games por defecto la página inicial. */
    { path: 'categories', 
        loadComponent: () => import('../category/category-list/category-list.page').then(m => m.CategoryListPage)
    },
    {
        path: 'authors',
        loadComponent: () => import ('../author/author-list/author-list.page').then(m => m.AuthorListPage)
    },
    {
        path: 'games',
        loadComponent: () => import ('../game/game-list/game-list.page').then(m => m.GameListPage)
    },
    {
        path: 'clients', 
        loadComponent: () => import ('../client/client-list/client-list.page').then(m => m.ClientListPage)
    }
];
