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
import { DialogConfirmation } from '../../core/dialog-confirmation/dialog-confirmation';

@Component({
  selector: 'app-category-list',
  imports: [MatButtonModule, MatIconModule, MatTableModule, CommonModule],
  templateUrl: './category-list.page.html',
  styleUrl: './category-list.page.scss',
})
export class CategoryListPage implements OnInit {
  dataSource = new MatTableDataSource<Category>();
  displayedColumns: string[] = ['id', 'name', 'action'];

  protected readonly categoryService =
    inject(CategoryService); /* Inyección del servicio de categorías para acceder a sus métodos. */
  protected readonly dialog =
    inject(
      MatDialog,
    ); /* Inyección del servicio de diálogo para abrir el formulario de edición de categorías. */

  loadData(): void {
    /* Método para cargar las categorías desde el servicio y actualizar la tabla. */
    this.categoryService
      .getCategories()
      .subscribe((categories) => (this.dataSource.data = categories));
  }

  ngOnInit(): void {
    /* Método del ciclo de vida del componente que se ejecuta al inicializar el componente. Aquí se llama al método loadData para cargar las categorías. */
    this.loadData();
  }

  createCategory() {
    /* Método para abrir el formulario de creación de una nueva categoría. 
    Se utiliza el servicio de diálogo para abrir el componente CategoryEdit. */
    const dialogRef = this.dialog.open(CategoryEdit, {
      data: {} /* Se pueden pasar datos al componente de edición si es necesario, en este caso se pasa un objeto vacío para indicar que se está creando una nueva categoría. */,
    });
    /* Después de cerrar el diálogo, se recarga la lista de categorías si se ha guardado una nueva categoría. */
    dialogRef.afterClosed().subscribe((result) => {
      if (!result)
        return; /* Si el resultado es falso, no se hace nada. Esto puede ocurrir si el usuario cancela la operación de creación. */
      this.loadData(); /* Si se ha guardado una nueva categoría, se llama al método loadData para actualizar la tabla con la nueva categoría. */
    });
  }

  editCategory(category: Category) {
    /* Método para abrir el formulario de edición de una categoría existente. Se recibe la categoría a editar como parámetro. */
    const dialogRef = this.dialog.open(CategoryEdit, {
      data: { category },
    });

    dialogRef.afterClosed().subscribe((result) => {
      /* Después de cerrar el diálogo, se recarga la lista de categorías si se ha guardado la categoría editada. */
      if (!result) return;
      this.loadData();
    });
  }

  deleteCategory(category: Category) {    
    const dialogRef = this.dialog.open(DialogConfirmation, {
      data: { title: "Eliminar categoría", description: "¡Atención! Si borra la categoría, se perderán sus datos.<br> ¿Desea eliminar la categoría?" }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) { /* Si el resultado es verdadero (si se ha pulsado sí), se elimina la categoría. */
        this.categoryService.deleteCategory(category.id).subscribe(result => {
          this.loadData();
        }); 
      }
    });
  }  

}
