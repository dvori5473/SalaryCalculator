import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SalaryRequest } from '../models/salary-request.model';
import { SalaryResult } from '../models/salary-result.model';

import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SalaryService {

    private apiUrl = 'http://localhost:5062/api/salary/calculate';

  constructor(private http: HttpClient) {}

  calculateSalary(request: SalaryRequest): Observable<SalaryResult> {
    return this.http.post<SalaryResult>(this.apiUrl, request);
  }
}
