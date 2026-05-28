import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Pageable } from '../core/model/page/Pageable';
import { PaginatedData } from '../core/model/page/PaginatedData'
import { Loan } from '../loan/model/Loan'


@Injectable({
  providedIn: 'root',
})
export class LoanService {

  constructor(){}

  getLoans(pageable: Pageable): Observable<PaginatedData<Loan>> {
    return;
  }

  saveLoan(loan: Loan): Observable<void> {
    return;
  }

  deleteLoan(idLoan: number): Observable<void> {
    return;
  }
}
