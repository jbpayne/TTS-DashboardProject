import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { Product } from 'src/models/product';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  productUrl = environment.baseUrl + '/products/';
  categoryUrl = environment.baseUrl + '/categories/';
  supplierUrl = environment.baseUrl + '/suppliers/';

  constructor(private httpClient: HttpClient) { }

  getCollectionSize() {
    return this.httpClient.get(this.productUrl + '?size=1').pipe(map((res: any) => res.page.totalElements));
  }

  getProducts(size: number, page: number, sort: string[]) {
  return this.httpClient.get(`${this.productUrl}?size=${size}&page=${page + sort.map(sort => '&sort=' + sort).join('')}`)
      .pipe(map((response: any) => response._embedded.products));
  }

  getProductsByCategory(id) {
    return this.httpClient.get(this.categoryUrl + id + '/products').pipe(map((res: any) => res._embedded.products));
  }

  getProductsBySupplier(id) {
    return this.httpClient.get(this.supplierUrl + id + '/products').pipe(map((res: any) => res._embedded.products));
  }

  getCategories() {
    return this.httpClient.get(this.categoryUrl + '?size=100').pipe(map((res: any) => res._embedded.categories));
  }

  getSuppliers() {
    return this.httpClient.get(this.supplierUrl + '?size=1000').pipe(map((res: any) => res._embedded.suppliers));
  }

  deleteProduct(id: number) {
    return this.httpClient.delete(this.productUrl + id);
  }

  addProduct(formValue: Object) {
    return this.httpClient.post(this.productUrl, JSON.stringify(formValue), 
    { headers: new HttpHeaders({ 'Content-Type':  'application/hal+json;charset=UTF-8' })});
  }

  updateProduct(id: number, formValue: Object) {
    return this.httpClient.patch(this.productUrl + id, JSON.stringify(formValue), 
    { headers: new HttpHeaders({ 'Content-Type':  'application/hal+json;charset=UTF-8' })});
  }

}
