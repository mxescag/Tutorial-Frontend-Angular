import { inject, Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Category } from './model/Category';
import { CATEGORY_DATA } from './model/mock-categories';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})

/* RECUERDA: en la capa de SERVICIO es donde se realizan las operaciones de recuperación, guardado y toda la pesca. */

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
    const { id } = category; /* Extraemos el id de la categoría que queremos guardar. */
    let url = this.baseUrl; /* Importante!! Inicializar la URL con la baseUrl. Si no, dará error al guardar */
    if (id) { /* Si el id existe, significa que estamos actualizando una categoría existente, por lo que construimos la URL para actualizar esa categoría específica. */
      url = `${this.baseUrl}/${id}`; 
    } 
    return this.http.put<Category>(url, category); /* Si el id no existe, 
    significa que estamos creando una nueva categoría, 
    por lo que utilizamos la URL base para crear una nueva categoría. */

  }

  deleteCategory(idCategory: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${idCategory}`); /* Esto hace una solicitud HTTP DELETE a la URL construida con el id de la categoría que queremos eliminar. */
  }
}
