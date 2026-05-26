import { inject, Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Category } from './model/Category';
import { CATEGORY_DATA } from './model/mock-categories';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  /*  -- INYECCIONES --*/

  protected readonly http = inject(HttpClient);
  private baseUrl = 'http://localhost:8080/category'

  constructor() {}

  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(this.baseUrl);
    /* Explicación paso por paso de lo que hace esto:
    this.http.get<Category[]>(this.baseUrl) hace una solicitud HTTP GET a la URL especificada en this.baseUrl. 
    El método get devuelve un Observable que emitirá un array de objetos Category cuando se reciba la respuesta del servidor. 
    El tipo <Category[]> indica que se espera (!!!) que la respuesta sea un array de objetos Category.
    */
  }

  saveCategory(category: Category): Observable<Category> {
    return of(null);
  }

  deleteCategory(idCategory: number): Observable<any> {
    return of(null);
  }
}
