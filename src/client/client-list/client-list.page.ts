import { Component, inject, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Client } from '../model/Client';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { ClientService } from '../client.service';
import { MatDialog } from '@angular/material/dialog';
import { ClientEdit } from '../client-edit/client-edit';
import { DialogConfirmation } from '../../core/dialog-confirmation/dialog-confirmation';
import da from '@angular/common/locales/da';

@Component({
  selector: 'app-client-list',
  imports: [CommonModule, MatTableModule, MatIconModule, MatButtonModule],
  templateUrl: './client-list.page.html',
  styleUrl: './client-list.page.scss',
})
export class ClientListPage implements OnInit {
  dataSource = new MatTableDataSource<Client>();
  displayedColumns: string[] = ['id', 'name', 'action'];

  protected readonly clientService = inject(ClientService);
  protected readonly dialog = inject(MatDialog);

  loadData(): void {
    this.clientService.getClients().subscribe((clients) => (this.dataSource.data = clients));
  }

  ngOnInit(): void {
    this.loadData();
  }

  createClient() {
    const dialogRef = this.dialog.open(ClientEdit, {
      data: {},
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (!result) return;

      this.loadData();
    });
  }

  editClient(client: Client) {
    const dialogRef = this.dialog.open(ClientEdit, {
      data: { client },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (!result) return;
      this.loadData();
    });
  }

  deleteClient(client: Client) {
    const dialogRef = this.dialog.open(DialogConfirmation, {
      data: {
        title: 'Eliminar cliente',
        description:
          '¡Atención! Si borra el cliente, se perderán todos sus datos. <br> ¿Desea eliminar el cliente?',
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.clientService.deleteClient(client.id).subscribe((result) => {
          this.loadData();
        });
      }
    });
  }
}
