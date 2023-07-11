import { Component } from '@angular/core';
import {FormArray, FormBuilder, FormGroup} from "@angular/forms";
import {CategoryService} from "../services/category.service";
import {ProductService} from "../services/product.service";
import {NotificationService} from "../services/notification.service";

@Component({
  selector: 'app-list-product-customer',
  templateUrl: './list-product-customer.component.html',
  styleUrls: ['./list-product-customer.component.scss']
})
export class ListProductCustomerComponent {
  listProductForm: any;
  categories: any;
  products: any;
  listProduct: any;
  quantity: any;
  productId: any;
  categoryId: any;
  constructor(
    private formBuilder: FormBuilder,
    private categoryService: CategoryService,
    private productService: ProductService,
    private  notifi: NotificationService
  ){}
  ngOnInit() {
    this.getCategories();
    this.createForm();
    this.addProduct([{quantity: 1, price: 1231}])
  }
  getCategories() {
    this.categoryService.getListCategories().subscribe(
      (res)  => {
        if (res.status === 'success' ) {
          this.categories = res.data;
        }
      }
    )
  }
  getListProductByCategory() {
    this.productService.getListProductByCategory(this.categoryId).subscribe(
      res => {
        if (res.status === 'success') {
        }
      }
    )
  }
  createForm() {
    this.listProductForm = this.formBuilder.group({
      listProduct: this.formBuilder.array([]),
    });
  }
  addProduct(product: any) {
    let temp: FormGroup = this.formBuilder.group(product)
    this.listProductForm.get('listProduct').push(temp);
  }
  decrease(i: any) {

  }
  increase(i: any)  {

  }
  getPrice(product: any, quantity: any) {

  }
  removeProduct(i: any) {

  }
}
