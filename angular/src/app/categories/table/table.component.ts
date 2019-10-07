import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { faEdit, faTrashAlt, faSort, faWindowClose, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { ApiService } from 'src/app/services/api.service';
import { FormBuilder, Validators } from '@angular/forms';
import { Category } from 'src/models/category';
import { RefreshService } from 'src/app/services/refresh.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {

  categories: [];

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

  categoryForm = this.fb.group({
    categoryName: ['', Validators.required]
  });

  constructor(private api: ApiService, private fb: FormBuilder, private refreshService: RefreshService) {
    refreshService.refresh.subscribe(res => {
      this.populateCategoriesArray();
      this.showSortOrder();
    });
  }

  ngOnInit() {
    this.page = 0;
    this.size = 3;
    this.sort = ['categoryId,asc'];
    this.message = 'Sort order: <strong>1.</strong> ID, ascending';

    this.populateCategoriesArray();
    this.showSortOrder();
  }

  private setCollectionSize() {
    this.api.getCategoriesCollectionSize().subscribe(res => this.collectionSize = res);
  }

  populateCategoriesArray() {
    this.setCollectionSize();
    $("#checkbox").prop("checked", false);
    this.api.getCategoriesWithParams(this.size, this.page, this.sort).subscribe(res => {
      return this.categories = res.map(this.createCategory());
    });
  }

  private createCategory(): any {
    return category => new Category(category.categoryId, category.categoryName);
  }

  updateCategoryForm(category: any) {
    const updateForm = {
      categoryName: category.categoryName
    };
    this.categoryForm.patchValue(updateForm);
  }

  onSubmit(id: number) {
    this.api.updateCategory(id, this.categoryForm.value).subscribe(res => {
      this.alert.emit({type: 'success', message: `Category "${this.categoryForm.value.categoryName}" successfully updated.`});
      this.populateCategoriesArray();
      return res;
    });
    $('.close').click();
  }

  deleteCategory(id: number, index: number) {
    this.api.deleteCategory(id).subscribe(() => {
      this.alert.emit({type: 'success', message: `Category ID#${id} successfully removed.`});
      this.populateCategoriesArray();
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
    this.populateCategoriesArray();
    this.showSortOrder();
  }

  showSortOrder() {
    this.alert.emit({type: "info", message:
      `Sort order:${this.sort.map((field, index) =>
        ' <strong>' + (index + 1) + '.</strong> '
        + field.replace("asc", " ascending")
          .replace("desc", " descending")
          .replace("categoryId", "ID")
          .replace("categoryName", "Category Name"))}`});
  }
}

