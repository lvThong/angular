import { Component } from '@angular/core';
import { CategoryService } from '../services/category.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PopupCategoryComponent } from '../popup-category/popup-category.component';
import { NotificationService } from '../services/notification.service';
@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent {
  limit: any = 5;
  page: any = 1;
  count: any = 0;
  categories: any;

  constructor(
     private categoryService: CategoryService,
     private modalService: NgbModal,
     private notifi: NotificationService
  ){}
  ngOnInit() {
    this.getCategories();
  }
  getCategories() {
    let params = {page: this.page, limit: this.limit};
    this.categoryService.getListCategories(params).subscribe(
      res => {
        if(res.status === 'success') {
          this.categories = res.data.data;
          this.count = res.data.total;
        }
      }
    )
  }
  createCategory(){
    const modalRef = this.modalService.open(PopupCategoryComponent, { size: 'lg', backdrop: "static" });
    modalRef.componentInstance.title = 'Add New Category';
    modalRef.result.then(
      result => {

      }, reason => {

      }
    )
  }
  editCategory(category: any) {
    const modalRef = this.modalService.open(PopupCategoryComponent, {size: 'lg', backdrop: 'static'});
    modalRef.componentInstance.title = 'Edit Category';
    modalRef.componentInstance.item = category;
    modalRef.result.then(
      result => {

      }, reason => {

      }
    )
  }
  deleteCategory(id: any) { 
    console.log(id);
    this.categoryService.deleteCategory(id).subscribe(
      res => {
        if (res.status === 'success') {
          this.getCategories();
          this.notifi.showSuccess('success', 'delete category');
          
        }
      }
    )
  }
  handlePage(event: any) {
    this.page  = event;
    this.getCategories();
  }
}
