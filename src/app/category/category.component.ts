import { Component } from '@angular/core';
import { CategoryService } from '../services/category.service';

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

  }
  editCategory(category: any) {

  }
  deleteCategory(id: any) {

  }
  handlePage(event: any) {
    this.page  = event;
    this.getCategories();
  }
}
