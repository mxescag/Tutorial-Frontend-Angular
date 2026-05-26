import { Component, OnInit, inject, signal } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CategoryService } from '../category.service';
import { Category } from '../model/Category';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-category-edit',
  imports: [FormsModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule],
  templateUrl: './category-edit.html',
  styleUrl: './category-edit.scss',
})
export class CategoryEdit implements OnInit {
  protected readonly dialogRef = inject(MatDialogRef<CategoryEdit>);
  protected readonly data = inject(MAT_DIALOG_DATA) as { category: Category };
  protected readonly categoryService = inject(CategoryService);

  protected readonly id = signal<number | null>(null); /* Señal para almacenar el ID de la categoría que se está editando. 
  Se inicializa con null, lo que indica que se está creando una nueva categoría. */
  protected readonly name = signal<string | null>(null); /* Señal para almacenar el nombre de la categoría que se está editando.
  Se inicializa con null, lo que indica que no se ha ingresado un nombre aún. */

  ngOnInit(): void {
    this.loadFormData(this.data.category ?? null); 
  }
/* Método para cargar los datos de la categoría en el formulario. */
    loadFormData(initialData: Category | null): void { 
        this.id.set(initialData?.id ?? null); /* Si se proporciona una categoría, se establece su ID en la señal id. 
        Si no se proporciona una categoría (es decir, se está creando una nueva categoría), se establece null. */
        this.name.set(initialData?.name ?? null); /* Lo mismo de arriba, pero con name */
    }
/* Método para guardar la categoría. Se llama cuando el usuario hace clic en el botón de guardar en el formulario. */
    onSave() { 
        const id = this.id();
        const name = this.name();
/* Se obtiene el valor actual de las señales id y name. Si el nombre es nulo o vacío, no se hace nada. Esto evita guardar una categoría sin un nombre válido. */
        if(!name) {
            return;
        }

        const category = { id, name } as Category;
         /* Se crea un objeto de tipo Category con el ID y el nombre obtenidos de las señales. 
        Este objeto se enviará al servicio para guardarlo. */
        this.categoryService.saveCategory(category).subscribe(() => {
            this.dialogRef.close(true);
        });
    }
    onClose() {
        this.dialogRef.close();
    }
}
