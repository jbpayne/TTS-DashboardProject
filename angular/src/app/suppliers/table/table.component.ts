import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { faEdit, faTrashAlt, faSort, faWindowClose, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { ApiService } from 'src/app/services/api.service';
import { FormBuilder, Validators } from '@angular/forms';
import { Supplier } from 'src/models/supplier';
import { RefreshService } from 'src/app/services/refresh.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {

  suppliers: [];

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

  supplierForm = this.fb.group({
    supplierName: ['', Validators.required]
  });

  constructor(private api: ApiService, private fb: FormBuilder, private refreshService: RefreshService) {
    refreshService.refresh.subscribe(res => {
      this.populateSuppliersArray();
      this.showSortOrder();
    });
  }

  ngOnInit() {
    this.page = 0;
    this.size = 3;
    this.sort = ['supplierId,asc'];
    this.message = 'Sort order: <strong>1.</strong> ID, ascending';

    this.populateSuppliersArray();
    this.showSortOrder();
  }

  private setCollectionSize() {
    this.api.getSuppliersCollectionSize().subscribe(res => this.collectionSize = res);
  }

  populateSuppliersArray() {
    this.setCollectionSize();
    $("#checkbox").prop("checked", false);
    this.api.getSuppliersWithParams(this.size, this.page, this.sort).subscribe(res => {
      return this.suppliers = res.map(this.createSupplier());
    });
  }

  private createSupplier(): any {
    return supplier => new Supplier(supplier.supplierId, supplier.supplierName);
  }

  updateSupplierForm(supplier: any) {
    const updateForm = {
      supplierName: supplier.supplierName
    };
    this.supplierForm.patchValue(updateForm);
  }

  onSubmit(id: number) {
    this.api.updateSupplier(id, this.supplierForm.value).subscribe(res => {
      this.alert.emit({type: 'success', message: `Supplier "${this.supplierForm.value.supplierName}" successfully updated.`});
      this.populateSuppliersArray();
      return res;
    });
    $('.close').click();
  }

  deleteSupplier(id: number, index: number) {
    this.api.deleteSupplier(id).subscribe(() => {
      this.alert.emit({type: 'success', message: `Supplier ID#${id} successfully removed.`});
      this.populateSuppliersArray();
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
    this.populateSuppliersArray();
    this.showSortOrder();
  }

  showSortOrder() {
    this.alert.emit({type: "info", message:
      `Sort order:${this.sort.map((field, index) =>
        ' <strong>' + (index + 1) + '.</strong> '
        + field.replace("asc", " ascending")
          .replace("desc", " descending")
          .replace("supplierId", "ID")
          .replace("supplierName", "Supplier Name"))}`});
  }
}

