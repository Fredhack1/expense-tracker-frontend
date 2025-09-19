import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ExpenseService {
  private apiUrl = 'http://localhost:8080/api/expenses';

  constructor(private http: HttpClient) { }

  getExpenses(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  getExpenseById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }
  
  addExpense(expense: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, expense);
  }

  updateExpense(expense: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${expense.id}`, expense);
  }

  deleteExpense(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }

}
