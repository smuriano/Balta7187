import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { take, delay, tap } from 'rxjs/operators';

import { environment } from 'src/environments/environment';
import { SecurityUtils } from '../utils/security.util';
import { Product } from '../models/product.model';
import { Pet } from '../models/pet.model';
import { Account } from '../models/account.model';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  public productApi = `${environment.apiUrl}/v1/products`;
  public petApi = `${environment.apiUrl}/v1/pets`;
  public accountApi = `${environment.apiUrl}/v1/accounts`;

  constructor(private http: HttpClient) { }

  public composeHeaders(): HttpHeaders {
    const token = SecurityUtils.getToken();
    const headers = new HttpHeaders().set('Authorization', `bearer ${token}`);
    return headers;
  }

  getProducts() {
    return this.http.get<Product[]>(`${this.productApi}`).pipe(
      delay(800), // Simular uma demora no retorno da API
      tap((res: any) => console.log('getProducts:', res))
    );
  }

  getPets() {
    return this.http.get<Pet[]>(`${this.petApi}`).pipe(
      delay(800) // Simular uma demora no retorno da API
    );
  }

  authenticate(data) {
    return this.http.post(`${this.accountApi}/authenticate`, data).pipe(
      take(1) // Após a ida ao servidor, já faz o unsubscribe
    );
  }

  refreshToken() {
    return this.http.post(
      `${this.accountApi}/refresh-token`,
      null,
      { headers: this.composeHeaders() }
    ).pipe(
      take(1)
    );
  }

  create(data) {
    return this.http.post(`${this.accountApi}`, data).pipe(
      delay(500),
      take(1)
    );
  }

  resetPassword(data) {
    return this.http.post(`${this.accountApi}/reset-password`, data).pipe(
      delay(5000),
      take(1)
    );
  }

  getProfile() {
    return this.http.get<Account>(`${this.accountApi}`, { headers: this.composeHeaders() }).pipe(
      delay(1200)
    );
  }

  updateProfile(data) {
    return this.http.put(`${this.accountApi}`, data, { headers: this.composeHeaders() }).pipe(
      delay(500),
      take(1)
    );
  }
}
