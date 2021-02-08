import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EMPTY, Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { ProductModel } from '../product/product-model';
import { CampaignModel } from './campaign-model';



@Injectable({
  providedIn: 'root'
})
export class CampaignService {

  // baseUrl = 'http://localhost:3001/api/campaigns';
  // productUrl = 'http://localhost:3001/api/products';
  baseUrl = '/api/campaigns';
  productUrl = '/api/products';


  constructor(
    private snackBar: MatSnackBar,
    private http: HttpClient
  ) { }

  showMessage(msg: string, isError: boolean = false): void {
    this.snackBar.open(msg, 'Close', {
      duration: 4000,
      horizontalPosition: 'right',
      verticalPosition: 'top',
      panelClass: isError ? ['msg-error'] : ['msg-sucess']
    });
  }

  create(campaign: CampaignModel): Observable<CampaignModel> {
    return this.http.post<CampaignModel>(this.baseUrl, campaign).pipe(
      map(data => data),
      catchError(error => this.errorHandler(error))
    );
  }

  read(): Observable<CampaignModel[]> {
    return this.http.get<CampaignModel[]>(this.baseUrl).pipe(
      map(data => data),
      catchError(error => this.errorHandler(error))
    );
  }

  readById(id: string): Observable<CampaignModel> {
    const url = `${this.baseUrl}/${id}`;
    
    return this.http.get<CampaignModel>(url).pipe(
      map(data => data),
      catchError(error => this.errorHandler(error))
    );
  }

  update(campaign: CampaignModel): Observable<CampaignModel> {
    return this.http.put<CampaignModel>(`${this.baseUrl}/${campaign._id}`, campaign).pipe(
      map(data => data),
      catchError(error => this.errorHandler(error))
    );
  }

  delete(campaign: CampaignModel): Observable<CampaignModel> {
    return this.http.delete<CampaignModel>(`${this.baseUrl}/${campaign._id}`).pipe(
      map(data => data),
      catchError(error => this.errorHandler(error))
    );
  }

  errorHandler(error: any): Observable<any> {
    this.showMessage(`ERROR: ${error.message}`, true);
    return EMPTY;
  }
}
