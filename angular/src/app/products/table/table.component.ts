import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { Product } from '../../../models/product';
import { faEdit, faTrashAlt, faSort, faWindowClose, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { ApiService } from 'src/app/services/api.service';
import { FormBuilder, Validators } from '@angular/forms';
import { RefreshService } from 'src/app/services/refresh.service';

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

  @Output() alert = new EventEmitter();
  @Input() message: any;

  productForm = this.fb.group({
    productName: ['', Validators.required],
    fullPrice: ['', [Validators.min(0.01), Validators.max(99.99), Validators.required]],
    salePrice: ['', [Validators.min(0.01), Validators.max(99.99), Validators.required]],
    availability: [true],
    category: ['', Validators.required],
    supplier: ['', Validators.required]
  });

  constructor(private api: ApiService, private fb: FormBuilder, private refreshService: RefreshService) {
    refreshService.refresh.subscribe(res => {
      this.populateProductsArray();
      this.showSortOrder();
    });
  }

  ngOnInit() {
    this.page = 0;
    this.size = 3;
    this.sort = ['id,asc'];
    this.message = 'Sort order: <strong>1.</strong> ID, ascending';

    this.populateProductsArray();
    this.populateCategoriesArray();
    this.populateSuppliersArray();
    this.showSortOrder();
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
    $("#checkbox").prop("checked", false);
    this.api.getProducts(this.size, this.page, this.sort).subscribe(res => {
      return this.products = res.map(this.createProduct());
    });
  }

  populateProductsByCategory(id, name) {
    $("#checkbox").prop("checked", false);
    this.alert.emit({type: `warning`, message: `Loading products from category: ${name}`});
    this.api.getProductsByCategory(id).subscribe((res: any) => {
      this.collectionSize = 1;
      this.alert.emit({type: 'info', message: `<strong>Filter:</strong> All products in category: ${name}`});
      return this.products = res.map(this.createProduct());
    });
  }

  populateProductsBySupplier(id, name) {
    $("#checkbox").prop("checked", false);
    this.alert.emit({type: 'warning', message: `Loading products from supplier: ${name}`});
    this.api.getProductsBySupplier(id).subscribe((res: any) => {
      this.collectionSize = 1;
      this.alert.emit({type: 'info', message: `<strong>Filter:</strong> All products from supplier: ${name}`});
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

  showAvailable() {
    if ($("#checkbox").is(':checked')) {
      this.products = this.products.filter(product => product.$availability === true);
      this.alert.emit({type: 'info', message: this.message + `<strong> - Available: Yes</strong>`});
    }
    else {
      this.populateProductsArray();
      this.showSortOrder();
    }
  }

  updateProductForm(product: any) {
    const updateForm = {
      productName: product.productName,
      fullPrice: product.fullPrice,
      salePrice: product.salePrice,
      availability: product.availability,
      category: 'http://localhost:8080/categories/' + product.category.categoryId,
      supplier: 'http://localhost:8080/suppliers/' + product.supplier.supplierId
    };
    this.productForm.patchValue(updateForm);
  }

  onSubmit(id: number) {
    this.api.updateProduct(id, this.productForm.value).subscribe(res => {
      this.alert.emit({type: 'success', message: `Product "${this.productForm.value.productName}" successfully updated.`});
      this.populateProductsArray();
      return res;
    });
    $('.close').click();
  }

  deleteProduct(id: number, index: number) {
    this.api.deleteProduct(id).subscribe(() => {
      this.alert.emit({type: 'success', message: `Product #${id}, ${this.products[index].$productName}, successfully removed.`});
      this.populateProductsArray();
    });
    $('.close').click();
  }

  toggleSort(field: any) {
    if (!this.sort.includes(`${field},desc`) && !this.sort.includes(`${field},asc`)) {
      this.sort.unshift(`${field},asc`);
    }
    else if (this.sort.includes(`${field},asc`)) {
      this.sort[this.sort.indexOf(`${field},asc`)] = `${field},desc`;
    }
    else {
      this.sort.splice(this.sort.indexOf(`${field},desc`), 1)
    }
    this.populateProductsArray();
    this.showSortOrder();
  }

  showSortOrder() {
    this.alert.emit({type: "info", message:
      `Sort order:${this.sort.map((field, index) =>
        ' <strong>' + (index + 1) + '.</strong> '
        + field.replace("availability,asc", "Available: No")
          .replace("availability,desc", "Available: Yes")
          .replace("asc", " ascending")
          .replace("desc", " descending")
          .replace("id", "ID")
          .replace("productName", "Product Name")
          .replace("fullPrice", "Full Price")
          .replace("salePrice", "Sale Price"))}`});
  }
}

