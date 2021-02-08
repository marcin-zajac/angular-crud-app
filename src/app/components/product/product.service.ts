import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EMPTY, Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { ProductModel } from './product-model';


@Injectable({
  providedIn: 'root'
})
export class ProductService {

  // baseUrl = 'http://localhost:3001/api/products';
  baseUrl = '/api/products';


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


  create(product: ProductModel): Observable<ProductModel> {
    return this.http.post<ProductModel>(this.baseUrl, product).pipe(
      map(data => data),
      catchError(error => this.errorHandler(error))
    );
  }

  read(): Observable<ProductModel[]> {
    return this.http.get<ProductModel[]>(this.baseUrl).pipe(
      map(data => data),
      catchError(error => this.errorHandler(error))
    );
  }


  readById(id: string): Observable<ProductModel> {
    const url = `${this.baseUrl}/${id}`;
    
    return this.http.get<ProductModel>(url).pipe(
      map(data => data),
      catchError(error => this.errorHandler(error))
    );
  }

  update(product: ProductModel): Observable<ProductModel> {
    return this.http.put<ProductModel>(`${this.baseUrl}/${product._id}`, product).pipe(
      map(data => data),
      catchError(error => this.errorHandler(error))
    );
  }

  delete(product: ProductModel): Observable<ProductModel> {
    return this.http.delete<ProductModel>(`${this.baseUrl}/${product._id}`).pipe(
      map(data => data),
      catchError(error => this.errorHandler(error))
    );
  }

  errorHandler(error: any): Observable<any> {
    this.showMessage(`ERROR: ${error.message}`, true);
    return EMPTY;
  }

}

