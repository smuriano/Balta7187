import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { environment } from 'src/environments/environment';
import { SecurityUtils } from '../utils/security.util';
import { Product } from '../models/product.model';
import { Pet } from '../models/pet.model';

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
    return this.http.get<Product[]>(`${this.productApi}`);
  }

  getPets() {
    return this.http.get<Pet[]>(`${this.petApi}`);
  }

  authenticate(data) {
    return this.http.post(`${this.accountApi}/authenticate`, data);
  }

  refreshToken() {
    return this.http.post(
      `${this.accountApi}/refresh-token`,
      null,
      { headers: this.composeHeaders() }
    );
  }

  create(data) {
    return this.http.post(`${this.accountApi}`, data);
  }

  resetPassword(data) {
    return this.http.post(`${this.accountApi}/reset-password`, data);
  }

  getProfile() {
    return this.http.get(`${this.accountApi}`, { headers: this.composeHeaders() });
  }

  updateProfile(data) {
    return this.http.put(`${this.accountApi}`, data, { headers: this.composeHeaders() });
  }
}
