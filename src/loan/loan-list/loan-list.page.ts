import { Component, OnInit, inject, signal } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { LoanEdit } from '../loan-edit/loan-edit';
import { LoanService } from '../loan.service';
import { Loan } from '../model/Loan';
import { Game } from '../../game/model/Game';
import { GameService } from '../../game/game.service'
import { Client } from '../../client/model/Client'
import { ClientService } from '../../client/client.service'
import { Pageable } from '../../core/model/page/Pageable';
import { DialogConfirmation } from '../../core/dialog-confirmation/dialog-confirmation';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-loan-list',
  standalone: true,
  imports: [
    MatButtonModule,
    MatIconModule,
    MatTableModule,
    FormsModule,
    CommonModule,
    MatPaginator,
    MatFormField,
    MatLabel,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule, MatInputModule
  ],
  templateUrl: './loan-list.page.html',
  styleUrl: './loan-list.page.scss',
})
export class LoanListPage implements OnInit {
  pageNumber: number = 0;
  pageSize: number = 5;
  totalElements: number = 0;

  dataSource = new MatTableDataSource<Loan>();
  displayedColumns: string[] = ['id', 'game', 'client', 'startDate', 'endDate', 'action'];

  constructor(
    private loanService: LoanService,
    public dialog: MatDialog,
  ) {}

  protected readonly gameService = inject(GameService);
  protected readonly clientService = inject(ClientService);
  protected readonly clients = signal<Client[]>([]);
  protected readonly games = signal<Game[]>([]);

  /* Filtros para títulos, juegos y fechas */
  protected readonly filterClient = signal<Client | null>(null);
  protected readonly filterTitle = signal<Game | null>(null);
  protected readonly filterDate = signal<string | null>(null);

  ngOnInit(): void {
    this.loadPage();
    this.gameService.getGames().subscribe((games) => this.games.set(games));

    this.clientService.getClients().subscribe((clients) => this.clients.set(clients));
  }

  loadPage(event?: PageEvent) {
    const pageable: Pageable = {
      pageNumber: this.pageNumber,
      pageSize: this.pageSize,
      sort: [
        {
          property: 'id',
          direction: 'ASC',
        },
      ],
    };

    if (event != null) {
      pageable.pageSize = event.pageSize;
      pageable.pageNumber = event.pageIndex;
    }

    this.loanService.getLoans(pageable).subscribe((data) => {
      this.dataSource.data = data.content;
      this.pageNumber = data.pageable.pageNumber;
      this.pageSize = data.pageable.pageSize;
      this.totalElements = data.totalElements;
    });
  }

  /* Función para filtrar */
  filter() {
    /* Crea un objeto con las instrucciones de paginación */
    const pageable: Pageable = {
      pageNumber: 0, // al filtrar se empieza por la primera pág
      pageSize: this.pageSize, // cuántos elementos por pág
      sort: [ 
        { // ordena los resultados por id ascendente
          property: 'id',
          direction: 'ASC',
        },
      ],
    };

    /* Envía la petición al backend con el objeto pageable. */
    this.loanService.getLoans(pageable,
      this.filterTitle()?.id ?? null, // id del juego seleccionado
      this.filterClient()?.id ?? null, // id cliente selec
      this.filterDate() ?? null // fecha selec
    ).subscribe((data) => { /* Cuando llegue la respuesta... */
      this.dataSource.data = data.content; // Mete los préstamos recibidos en el datsource de la tabla
      this.pageNumber = 0; // vuelve a la primer página
      this.totalElements = data.totalElements; // le dice al paginador cuántos resultados en total hay
    });
  }

  /* Función para limpiar filtro */
  clean() {
    /* Settea todos los filtros a null y lo deja limpio */
    this.filterTitle.set(null);
    this.filterClient.set(null);
    this.filterDate.set(null);
    this.filter();
  }

  createLoan() {
    const dialogRef = this.dialog.open(LoanEdit, {
      data: {},
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.ngOnInit();
    });
  }

  editLoan(loan: Loan) {
    const dialogRef = this.dialog.open(LoanEdit, {
      data: { loan: loan },
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.ngOnInit();
    });
  }

  deleteLoan(loan: Loan) {
    const dialogRef = this.dialog.open(DialogConfirmation, {
      data: {
        title: 'Eliminar préstamo',
        description:
          '¡Atención! Si borra el préstamo, se perderán sus datos.<br> ¿Desea eliminar el préstamo?',
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.loanService.deleteLoan(loan.id).subscribe((result) => {
          this.ngOnInit();
        });
      }
    });
  }
}
