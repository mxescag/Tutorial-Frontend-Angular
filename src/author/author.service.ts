import { inject, Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Pageable } from '../core/model/page/Pageable';
import { Author } from './model/Author';
import { PaginatedData } from '../core/model/page/PaginatedData';
import { AUTHOR_DATA } from './model/mock-authors';
import { HttpClient } from '@angular/common/http';
import { AUTHOR_DATA_LIST } from './model/mock-authors-list';

@Injectable({
  providedIn: 'root',
})
export class AuthorService {

  protected readonly http = inject(HttpClient);
  private baseUrl = 'http://localhost:8080/author';


  getAuthors(pageable: Pageable): Observable<PaginatedData<Author>> {
    return this.http.post<PaginatedData<Author>>(this.baseUrl, {pageable: pageable})
  }

  getAllAuthors(): Observable<Author[]> {
        return of(AUTHOR_DATA_LIST);
    }

  saveAuthor(author: Author): Observable<Author> {
    const { id } = author; /* Extraemos el id del autor que queremos guardar. */
    let url = this.baseUrl; /* Importante!! Inicializar la URL con la baseUrl. Si no, dará error al guardar */
    /* Si el ID existe, actualizamos autor y construimos la URL para actualizar ese autor específicamente. */
    if (id) {
      url = `${this.baseUrl}/${id}`;
    }

    /* Si el ID no existe, significa que estamos creando uno.
    Utilizamos la URL base con un PUT para crear uno nuevo. */
    return this.http.put<Author>(url, author)
  }

  deleteAuthor(idAuthor: number): Observable<void> {
    /* Construimos la URL con un DELETE. BaseURL más el ID del autor que queremos borrar. */
    return this.http.delete<void>(`${this.baseUrl}/${idAuthor}`)
  }
}
