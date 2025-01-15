import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CLOFund } from './fund.model';

@Injectable({
  providedIn: 'root'
})
export class WarfCalculatorService {

  constructor(private http: HttpClient) { }

  private apiUrl = "http://localhost:3000/fundsInfo";

  getCLOFunds(): Observable<CLOFund[]> {
    return this.http.get<CLOFund[]>(this.apiUrl);
  }
}
