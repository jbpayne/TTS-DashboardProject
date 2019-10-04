import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { faWindowClose } from '@fortawesome/free-solid-svg-icons';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-modal-form',
  templateUrl: './modal-form.component.html',
  styleUrls: ['./modal-form.component.css']
})
export class ModalFormComponent implements OnInit {
  faWindowClose = faWindowClose;

  categories;
  suppliers;


  productForm = this.fb.group({
    productName: ['', Validators.required],
    fullPrice: ['', [Validators.min(0.01), Validators.max(99.99), Validators.required]],
    salePrice: ['', [Validators.min(0.01), Validators.max(99.99), Validators.required]],
    availability: [true],
    category: ['', Validators.required],
    supplier: ['', Validators.required]
  });

  
  constructor(private fb: FormBuilder, private api: ApiService) { }

  ngOnInit() {
    this.populateCategoriesArray();
    this.populateSuppliersArray();
  }

  onSubmit() {
    this.api.addProduct(this.productForm.value).subscribe(res => console.log(res));
    document.getElementsByClassName("alert-info")[0].classList.add('d-none');
    document.getElementsByClassName("alert-success")[0].classList.remove('d-none');
    document.getElementsByClassName("alert-success")[0].innerHTML = `Product "${this.productForm.value.productName}" successfully added.`
    $('.close').click(); 
  }

  populateCategoriesArray() {
    this.api.getCategories().subscribe(res => this.categories = res);
  }

  populateSuppliersArray() {
    this.api.getSuppliers().subscribe(res => this.suppliers = res);
  }

}
