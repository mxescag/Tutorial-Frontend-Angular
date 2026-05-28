import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { LoanEdit } from '../loan-edit/loan-edit';
import { LoanService } from '../loan.service';
import { Loan } from '../model/Loan';
import { Pageable } from '../../core/model/page/Pageable';
import { DialogConfirmation } from '../../core/dialog-confirmation/dialog-confirmation';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
    selector: 'app-loan-list',
    standalone: true,
    imports: [MatButtonModule, MatIconModule, MatTableModule, CommonModule, MatPaginator],
    templateUrl: './loan-list.page.html',
    styleUrl: './loan-list.page.scss',
})
export class LoanListPage implements OnInit {
    pageNumber: number = 0;
    pageSize: number = 5;
    totalElements: number = 0;

    dataSource = new MatTableDataSource<Loan>();
    displayedColumns: string[] = ['id', 'game', 'client', 'startDate', 'endDate', 'action'];

    constructor(private loanService: LoanService, public dialog: MatDialog) {}

    ngOnInit(): void {
        this.loadPage();
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