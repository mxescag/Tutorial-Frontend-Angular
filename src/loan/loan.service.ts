import { Injectable, inject } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Pageable } from '../core/model/page/Pageable';
import { PaginatedData } from '../core/model/page/PaginatedData'
import { Loan } from '../loan/model/Loan'
import { HttpClient } from '@angular/common/http'

@Injectable({
  providedIn: 'root',
})
export class LoanService {
  protected readonly http = inject(HttpClient);
  private baseUrl = 'http://localhost:8080/loan';


  /* En esta función, los ? significan que los parámetros que lo lleven son opcionales. */
  getLoans(pageable: Pageable, title?: string, clientId?: number, date?: string): Observable<PaginatedData<Loan>> {
    return this.http.post<PaginatedData<Loan>>(this.baseUrl, {pageable,
      title: title ?? null, // Si title es undefined, envía null
      clientId: clientId ?? null, // Ídem
      date: date ?? null // Ídem
    });
  }


  saveLoan(loan: Loan): Observable<Loan> {

    const { id } = loan;

    let url = this.baseUrl;

    if (id) {
      url = `${this.baseUrl}/${id}`;
    }

    return this.http.put<Loan>(url, loan)
  }

  deleteLoan(idLoan: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${idLoan}`);
  }
}
