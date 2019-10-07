import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { faWindowClose } from '@fortawesome/free-solid-svg-icons';
import { ApiService } from 'src/app/services/api.service';
import { RefreshService } from 'src/app/services/refresh.service';

@Component({
  selector: 'app-modal-form',
  templateUrl: './modal-form.component.html',
  styleUrls: ['./modal-form.component.css']
})
export class ModalFormComponent implements OnInit {
  faWindowClose = faWindowClose;

  categories: [];
  suppliers: [];

  @Output() alert = new EventEmitter();

  productForm = this.fb.group({
    productName: ['', Validators.required],
    fullPrice: ['', [Validators.min(0.01), Validators.max(99.99), Validators.required]],
    salePrice: ['', [Validators.min(0.01), Validators.max(99.99), Validators.required]],
    availability: [true],
    category: ['', Validators.required],
    supplier: ['', Validators.required]
  });


  constructor(private fb: FormBuilder, private api: ApiService, private refreshService: RefreshService) { }

  ngOnInit() {
    this.populateCategoriesArray();
    this.populateSuppliersArray();
  }

  populateCategoriesArray() {
    this.api.getCategories().subscribe(res => this.categories = res);
  }

  populateSuppliersArray() {
    this.api.getSuppliers().subscribe(res => this.suppliers = res);
  }

  onSubmit() {
    this.api.addProduct(this.productForm.value).subscribe((res: any) => {
      this.refreshService.refresh.emit();
      this.alert.emit({ type: `success`, message: `Product "${res.productName}" successfully added.` });
      $('.close').click();
    });

  }

}
