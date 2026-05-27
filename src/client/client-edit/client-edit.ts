import { Component, OnInit, inject, signal } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ClientService } from '../client.service';
import { Client } from '../model/Client';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-client-edit',
  imports: [FormsModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule],
  templateUrl: './client-edit.html',
  styleUrl: './client-edit.scss',
})
export class ClientEdit implements OnInit {
  protected readonly dialogRef = inject(MatDialogRef<ClientEdit>);
  protected readonly data = inject(MAT_DIALOG_DATA) as { client: Client };
  protected readonly clientService = inject(ClientService);

  protected readonly id = signal<number | null>(
    null,
  ); /* Señal para almacenar el ID del cliente que se está editando. 
  Se inicializa con null, lo que indica que se está creando un nuevo cliente. */
  protected readonly name = signal<string | null>(
    null,
  ); /* Señal para almacenar el nombre del cliente que se está editando.
  Se inicializa con null, lo que indica que no se ha ingresado un nombre aún. */

  ngOnInit(): void {
    this.loadFormData(this.data.client ?? null);
  }
  /* Método para cargar los datos del cliente en el formulario. */
  loadFormData(initialData: Client | null): void {
    this.id.set(
      initialData?.id ?? null,
    ); /* Si se proporciona un cliente, se establece su ID en la señal id. 
        Si no se proporciona un cliente (es decir, se está creando un nuevo cliente), se establece null. */
    this.name.set(initialData?.name ?? null); /* Lo mismo de arriba, pero con name */
  }
  /* Método para guardar el cliente. Se llama cuando el usuario hace clic en el botón de guardar en el formulario. */
  onSave() {
    const id = this.id();
    const name = this.name();
    /* Se obtiene el valor actual de las señales id y name. Si el nombre es nulo o vacío, no se hace nada. Esto evita guardar un cliente sin un nombre válido. */
    if (!name) {
      return;
    }

    const client = { id, name } as Client;
    /* Se crea un objeto de tipo Client con el ID y el nombre obtenidos de las señales. 
        Este objeto se enviará al servicio para guardarlo. */
    this.clientService.saveClient(client).subscribe(() => {
      this.dialogRef.close(true);
    });
  }
  onClose() {
    this.dialogRef.close();
  }
}
