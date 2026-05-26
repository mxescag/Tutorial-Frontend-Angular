import { Component, inject, signal } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog'
import { MatButtonModule } from '@angular/material/button'

@Component({
  selector: 'app-dialog-confirmation',
  imports: [MatButtonModule],
  templateUrl: './dialog-confirmation.html',
  styleUrl: './dialog-confirmation.scss',
})
export class DialogConfirmation {
  protected readonly title = signal<string | null>(null); /* Título puede ser null (así inicializado) o string */
  protected readonly description = signal<string | null>(null); /* Mismo con descripción */

  protected readonly dialogRef = inject(MatDialogRef<DialogConfirmation>);
  protected readonly data = inject(MAT_DIALOG_DATA);

  ngOnInit(): void {
    this.title.set(this.data.title); /* Asignamos el título recibido en data al signal title */
    this.description.set(this.data.description); /* Asignamos la descripción recibida en data al signal description */
  }

  /* Método para cerrar el diálogo, opcionalmente pasando un valor (por defecto false) */
  onClose(value = false) {
    this.dialogRef.close(value);
  }
}
