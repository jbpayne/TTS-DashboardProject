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

  @Output() alert = new EventEmitter();

  categoryForm = this.fb.group({
    categoryName: ['', Validators.required]
  });


  constructor(private fb: FormBuilder, private api: ApiService, private refreshService: RefreshService) { }

  ngOnInit() {
  }


  onSubmit() {
    this.api.addCategory(this.categoryForm.value).subscribe((res: any) => {
      this.refreshService.refresh.emit();
      this.alert.emit({ type: `success`, message: `Category "${res.categoryName}" successfully added.` });
      $('.close').click();
    });

  }

}
