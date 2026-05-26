import { Component, inject, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Category } from '../model/Category';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { CategoryService } from '../category.service';
import { MatDialog } from '@angular/material/dialog';
import { CategoryEdit } from '../category-edit/category-edit';

@Component({
  selector: 'app-category-list',
  imports: [MatButtonModule, MatIconModule, MatTableModule, CommonModule],
  templateUrl: './category-list.page.html',
  styleUrl: './category-list.page.scss',
})
export class CategoryListPage implements OnInit {

  protected readonly categoryService = inject(CategoryService); /* Aquí se inyecta el servicio de categorías para poder obtener los datos de las categorías. */
  protected readonly dialog = inject(MatDialog); /* Aquí se inyecta el servicio de diálogo para poder abrir el diálogo de edición de categorías. */

  dataSource = new MatTableDataSource<Category>(); /* Aquí se almacenarán los datos que se mostrarán en la tabla. */
  displayedColumns: string[] = ['id', 'name', 'action']; /* Aquí se definen las columnas que se mostrarán en la tabla. */

  constructor() {}

  /* -- DEFINIMOS MÉTODOS POR AQUÍ -- */

  createCategory() {
    const dialogRef = this.dialog.open(CategoryEdit, {
      data:{}
    });

    dialogRef.afterClosed().subscribe(result => {
      if(!result) return; /* Si el resultado es falso, no se hace nada. Esto puede ocurrir si el usuario cierra el diálogo sin guardar. */
      this.loadData(); /* Si el resultado es verdadero, se recarga la lista de categorías para mostrar la nueva categoría creada. */
    });
  }

  ngOnInit(): void {
    this.categoryService.getCategories().subscribe((categories) => {
      this.dataSource.data = categories; /* Aquí se asignan los datos obtenidos al dataSource para que se muestren en la tabla. */
    });
  } /* Aquí se pueden cargar los datos desde un servicio o API. */
}
