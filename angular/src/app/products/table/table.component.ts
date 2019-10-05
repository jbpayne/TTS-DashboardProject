import { Component, OnInit } from '@angular/core';
import { Product } from '../../../models/product';
import { faEdit, faTrashAlt, faSort, faWindowClose, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { ApiService } from 'src/app/services/api.service';
import { FormBuilder, Validators } from '@angular/forms';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {

  categories: [];
  suppliers: [];
  products: Product[];

  collectionSize: number;
  page: number;
  size: number;
  sort: string[];

  faEdit: IconDefinition = faEdit;
  faTrashAlt: IconDefinition = faTrashAlt;
  faSort: IconDefinition = faSort;
  faWindowClose: IconDefinition = faWindowClose;

  alertSuccess: Element;
  alertInfo: Element;
  alertWarning: Element;

  productForm = this.fb.group({
    productName: ['', Validators.required],
    fullPrice: ['', [Validators.min(0.01), Validators.max(99.99), Validators.required]],
    salePrice: ['', [Validators.min(0.01), Validators.max(99.99), Validators.required]],
    availability: [true],
    category: ['', Validators.required],
    supplier: ['', Validators.required]
  });

  constructor(private api: ApiService, private fb: FormBuilder) { }

  ngOnInit() {
    this.page = 0;
    this.size = 5;
    this.sort = ['id,asc'];
    this.alertSuccess = document.getElementsByClassName("alert-success")[0];
    this.alertInfo = document.getElementsByClassName("alert-info")[0];
    this.alertWarning = document.getElementsByClassName("alert-warning")[0];

    this.showSortOrder();
    this.populateProductsArray();
    this.populateCategoriesArray();
    this.populateSuppliersArray();
  }

  private setCollectionSize() {
    this.api.getCollectionSize().subscribe(res => this.collectionSize = res);
  }

  private populateCategoriesArray() {
    this.api.getCategories().subscribe(res => this.categories = res);
  }

  private populateSuppliersArray() {
    this.api.getSuppliers().subscribe(res => this.suppliers = res);
  }

  populateProductsArray() {
    this.setCollectionSize();
    this.api.getProducts(this.size, this.page, this.sort).subscribe(res => {
      return this.products = res.map(this.createProduct());
    });
  }

  populateProductsByCategory(id, name) {
    this.alertSuccess.classList.add('d-none');
    this.alertInfo.classList.add('d-none');
    this.alertWarning.classList.remove('d-none');
    this.alertWarning.innerHTML = `Loading products from category: ${name}`;
    this.api.getProductsByCategory(id).subscribe((res: any) => {
      this.collectionSize = 1;
      this.alertSuccess.classList.add('d-none');
      this.alertWarning.classList.add('d-none');
      this.alertInfo.classList.remove('d-none');
      this.alertInfo.innerHTML = `<strong>Filter:</strong> All products in category: ${res[0]._embedded.category.categoryName}`;
      return this.products = res.map(this.createProduct());
    });
  }

  populateProductsBySupplier(id, name) {
    this.alertSuccess.classList.add('d-none');
    this.alertInfo.classList.add('d-none');
    this.alertWarning.classList.remove('d-none');
    this.alertWarning.innerHTML = `Loading products from supplier: ${name}`;
    this.api.getProductsBySupplier(id).subscribe((res: any) => {
      this.collectionSize = 1;
      this.alertSuccess.classList.add('d-none');
      this.alertWarning.classList.add('d-none');
      this.alertInfo.classList.remove('d-none');
      this.alertInfo.innerHTML = `<strong>Filter:</strong> All products from supplier: ${name}`;
      return this.products = res.map(this.createProduct());
    });
  }

  private createProduct(): any {
    return product => {
      const categoryId = product._embedded.category ? product._embedded.category.categoryId : 0;
      const categoryName = product._embedded.category ? product._embedded.category.categoryName : "None";
      const supplierId = product._embedded.supplier ? product._embedded.supplier.supplierId : 0;
      const supplierName = product._embedded.supplier ? product._embedded.supplier.supplierName : "None";
      return new Product(product.id, product.productName, { categoryId: categoryId, categoryName: categoryName }, product.fullPrice, product.salePrice, product.discount, product.availability, { supplierId: supplierId, supplierName: supplierName });
    };
  }

  onSubmit(id) {
    this.api.updateProduct(id, this.productForm.value).subscribe(res => {
      document.getElementsByClassName("alert-info")[0].classList.add('d-none');
      document.getElementsByClassName("alert-success")[0].classList.remove('d-none');
      document.getElementsByClassName("alert-success")[0].innerHTML = `Product "${this.productForm.value.productName}" successfully updated.`;
      this.populateProductsArray();
      return res;
    });
    $('.close').click();
  }

  deleteProduct(id: number, index: number) {
    this.api.deleteProduct(id).subscribe(() => {
      this.alertInfo.classList.add('d-none');
      this.alertSuccess.classList.remove('d-none');
      this.alertSuccess.innerHTML = `Product #${id}, ${this.products[index].$productName}, successfully removed.`
      this.populateProductsArray();
    });
    $('.close').click();
  }

  toggleSort(field) {
    if (!this.sort.includes(`${field},desc`) && !this.sort.includes(`${field},asc`)) {
      this.sort.push(`${field},asc`);
    }
    else if (this.sort.includes(`${field},asc`)) {
      this.sort[this.sort.indexOf(`${field},asc`)] = `${field},desc`;
    }
    else {
      this.sort.splice(this.sort.indexOf(`${field},desc`), 1)
    }
    this.showSortOrder();
    this.populateProductsArray();
  }

  private showSortOrder() {
    this.alertSuccess.classList.add('d-none');
    this.alertInfo.classList.remove('d-none');
    this.alertInfo.innerHTML =
      `Sort order:${this.sort.map((field, index) =>
        ' <strong>' + (index + 1) + '.</strong> '
        + field.replace("availability,asc", "Available: No")
          .replace("availability,desc", "Available: Yes")
          .replace("asc", " ascending")
          .replace("desc", " descending")
          .replace("id", "ID")
          .replace("productName", "Product Name")
          .replace("fullPrice", "Full Price")
          .replace("salePrice", "Sale Price"))}`;
  }
}
