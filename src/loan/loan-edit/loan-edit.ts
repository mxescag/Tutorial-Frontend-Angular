import { Component, inject, OnInit, signal } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { LoanService } from '../loan.service';
import { Loan } from '../model/Loan';
import { Game } from '../../game/model/Game';
import { Client } from '../../client/model/Client'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select'
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { validateFields } from '../../core/helpers/validation.helper';
import { GameService } from '../../game/game.service';
import { ClientService } from '../../client/client.service';

@Component({
    selector: 'app-loan-edit',
    standalone: true,
    imports: [FormsModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatSelectModule],
    templateUrl: './loan-edit.html',
    styleUrl: './loan-edit.scss',
})
export class LoanEdit implements OnInit {
    protected readonly loanService = inject(LoanService);
    protected readonly dialogRef = inject(MatDialogRef<LoanEdit>);
    protected readonly data = inject(MAT_DIALOG_DATA);

    /* Inyectamos las listas de juegos y de clientes para que se carguen al iniciar la página */

    /* Señales que almacenan listas de juegos y clientes disponibles para el combo seleccionable */
    protected readonly games = signal<Game[]>([]); // Señal que contiene array de objetos Game, array está vacío al cargar
    protected readonly clients = signal<Client[]>([]); // Misma señal que arriba, pero con Client

    protected readonly gameService = inject(GameService);
    protected readonly clientService = inject(ClientService);


    protected readonly id = signal<number | null>(null);
    protected readonly game = signal<Game | null>(null);
    protected readonly client = signal<Client | null>(null);
    protected readonly startDate = signal<string | null>(null);
    protected readonly endDate = signal<string | null>(null);

    /* Atributo que devolverá error si las fechas no cumplen */
    protected readonly dateError = signal<string | null>(null);


    loadFormData(initialData: Loan | null) {
        if(initialData){
        this.id.set(initialData.id ?? null);
        this.game.set(initialData.game ?? null);
        this.client.set(initialData.client ?? null);
        this.startDate.set(initialData.startDate ?? null);
        this.endDate.set(initialData.endDate ?? null);
        }
    }

    ngOnInit(): void {
        this.loadFormData(this.data.loan ?? null);
        
        /* Cargamos las listas de juegos y clientes */
        this.gameService.getGames().subscribe(games => this.games.set(games)); // Cuando el backend responde, se rellenan con el .set()
        this.clientService.getClients().subscribe(clients => this.clients.set(clients)) // Mismo que arriba
    }

    onSave() {
        const id = this.id();
        const game = this.game();
        const client = this.client();
        const startDate = this.startDate();
        const endDate = this.endDate();
        let dateError = this.dateError.set(null); /* Lo ponemos a null al inicio por si antes había dado error, que lo descarte. */

    
        const requiredFields = ["game", "client", "startDate", "endDate"] as const
        const data = { game, client, startDate, endDate }

        if (!validateFields(data, requiredFields)) {
            return;
        }

        /* Esto valida que las fechas no son null, y que startDate no es mayor endDate */
        if (startDate && endDate && startDate > endDate) {
            this.dateError.set("La fecha de préstamo no puede ser mayor a la de devolución.") /* Si se da el caso, devolverá un error. */
        }

        const loan = {
            id,
            game,
            client,
            startDate,
            endDate
        } as Loan;
        this.loanService.saveLoan(loan).subscribe(() => {
            this.dialogRef.close(true);
        });
    }

    onClose() {
        this.dialogRef.close(false);
    }
}