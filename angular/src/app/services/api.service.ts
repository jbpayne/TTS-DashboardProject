import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  productUrl = environment.baseUrl + '/products/';
  categoryUrl = environment.baseUrl + '/categories/';
  supplierUrl = environment.baseUrl + '/suppliers/';
  header = { headers: new HttpHeaders({ 'Content-Type': 'application/hal+json;charset=UTF-8' })};

  constructor(private httpClient: HttpClient) { }

  getProductsCollectionSize() {
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

  deleteProduct(id: number) {
    return this.httpClient.delete(this.productUrl + id);
  }

  addProduct(formValue: Object) {
    return this.httpClient.post(this.productUrl, JSON.stringify(formValue),
      this.header);
  }

  updateProduct(id: number, formValue: Object) {
    return this.httpClient.patch(this.productUrl + id, JSON.stringify(formValue),
      this.header);
  }

  
  getCategoriesCollectionSize() {
    return this.httpClient.get(this.categoryUrl + '?size=1').pipe(map((res: any) => res.page.totalElements));
  }

  getCategories() {
    return this.httpClient.get(this.categoryUrl + '?size=100').pipe(map((res: any) => res._embedded.categories));
  }

  getCategoriesWithParams(size: number, page: number, sort: string[]) {
    return this.httpClient.get(`${this.categoryUrl}?size=${size}&page=${page + sort.map(sort => '&sort=' + sort).join('')}`)
      .pipe(map((response: any) => response._embedded.categories));
  }

  deleteCategory(id: number) {
    return this.httpClient.delete(this.categoryUrl + id);
  }

  addCategory(formValue: Object) {
    return this.httpClient.post(this.categoryUrl, JSON.stringify(formValue),
      this.header);
  }

  updateCategory(id: number, formValue: Object) {
    return this.httpClient.patch(this.categoryUrl + id, JSON.stringify(formValue),
      this.header);
  }


  getSuppliersCollectionSize() {
    return this.httpClient.get(this.supplierUrl + '?size=1').pipe(map((res: any) => res.page.totalElements));
  }

  getSuppliers() {
    return this.httpClient.get(this.supplierUrl + '?size=1000').pipe(map((res: any) => res._embedded.suppliers));
  }

  getSuppliersWithParams(size: number, page: number, sort: string[]) {
    return this.httpClient.get(`${this.supplierUrl}?size=${size}&page=${page + sort.map(sort => '&sort=' + sort).join('')}`)
      .pipe(map((response: any) => response._embedded.suppliers));
  }

  deleteSupplier(id: number) {
    return this.httpClient.delete(this.supplierUrl + id);
  }

  addSupplier(formValue: Object) {
    return this.httpClient.post(this.supplierUrl, JSON.stringify(formValue),
      this.header);
  }

  updateSupplier(id: number, formValue: Object) {
    return this.httpClient.patch(this.supplierUrl + id, JSON.stringify(formValue),
      this.header);
  }

}
