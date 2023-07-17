import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from "@angular/forms";
import { CategoryService } from "../services/category.service";
import { ProductService } from "../services/product.service";
import { NotificationService } from "../services/notification.service";
import { OutletContext } from '@angular/router';

@Component({
  selector: 'app-list-product-customer',
  templateUrl: './list-product-customer.component.html',
  styleUrls: ['./list-product-customer.component.scss']
})
export class ListProductCustomerComponent {
  listProductForm: any;
  categories: any;
  products: any;
  quantity: any;
  productId: any;
  categoryId: any;
  constructor(
    private formBuilder: FormBuilder,
    private categoryService: CategoryService,
    private productService: ProductService,
    private notifi: NotificationService
  ) {
  }

  ngOnInit() {
    this.getCategories();
    this.createForm();
    // this.addProduct([{quantity: 1, price: 1231}])
  }

  getCategories() {
    let params = {};
    this.categoryService.getListCategories(params).subscribe(
      (res) => {
        if (res.status === 'success') {
          this.categories = res.data.data;
        }
      }
    )
  }

  getListProductByCategory(e: any, i: number) {
    let categoryId = e.target.value
    this.productService.getListProductByCategory(categoryId).subscribe(
      res => {
        if (res.status === 'success') {
          let products = res.data.data;
          <FormArray>this.listProductForm.get('listProduct').controls[i].get('listProduct').setValue(products);
        }
      }
    )
  }

  get listProduct() {
    return this.listProductForm.get('listProduct') as FormArray;
  }

  createForm() {
    this.listProductForm = this.formBuilder.group({
      listProduct: this.formBuilder.array([]),
    });
  }

  // get listProduct() {
  //   return this.listProductForm.get('listProduct') as FormArray;
  // }
  addProductForm() {
    let temp: FormGroup = this.formBuilder.group({
      categoryId: null,
      productId: null,
      quantity: 1,
      listProduct: [],
      price: null
    });
    <FormArray>this.listProductForm.get('listProduct').push(temp);
    // console.log(this.listProductForm.controls['listProduct']);
  }

  addProduct(product: any) {
    let temp: FormGroup = this.formBuilder.group(product)
    this.listProductForm.get('listProduct').push(temp);
  }

  decrease(i: any) {
    this.listProductForm.get('listProduct').controls[i].patchValue({
      quantity: this.listProductForm.get('listProduct').controls[i].value.quantity > 0 ? this.listProductForm.get('listProduct').controls[i].value.quantity - 1 : 0
    })

  }

  increase(i: any) {
    this.listProductForm.get('listProduct').controls[i].patchValue({
      quantity: this.listProductForm.get('listProduct').controls[i].value.quantity + 1
    })

  }

  updatePrice(event: any, i: any) {
    let productId = event.target.value;
    let price = this.listProductForm.get('listProduct').controls[i].value.listProduct.find(
      (item: any) => item.id == productId
    ).price;
    this.listProductForm.get('listProduct').controls[i].patchValue({
      price: price
    });


  }
  getPrice(i: any) {
    return this.listProductForm.get('listProduct').controls[i].value.price;
  }

  removeProduct(i: any) {
    this.listProductForm.get('listProduct').removeAt(i);
  }

  getData() {
    let products = this.listProductForm.get('listProduct').value;
    let result: any = [];

    products.forEach(({ productId, quantity }: any) => {
      const product = {
        product_id: productId,
        quantity: quantity
      }

      result = [...result, product];
    });
    return result;
  }
}
