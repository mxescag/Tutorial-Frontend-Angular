import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Category } from './model/Category';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  constructor() {}

  getCategories(): Observable<Category[]> {
    // Aquí se implementaría la lógica para obtener las categorías desde un servicio o API.
    return new Observable();
  }
}
