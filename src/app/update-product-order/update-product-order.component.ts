import { Component, Input, Output } from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup} from '@angular/forms';
import { NotificationService } from '../services/notification.service';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-update-product-order',
  templateUrl: './update-product-order.component.html',
  styleUrls: ['./update-product-order.component.scss']
})
export class UpdateProductOrderComponent {
   listProductValue: any = {};
  @Input()
  get listProduct() {
    return this.listProductValue;
  }
  set listProduct(value: any) {
    this.listProductValue = value;
    this.setValueForm();
  }

  productForm: FormGroup = new FormGroup({});

  listProductForm: any;
  quantity: any;
  submitted: any;
  // listProducts: any;
  products: any;
  @Input() total: any;
  constructor(
    private formBuilder: FormBuilder,
    private notifi: NotificationService,
    private productService: ProductService
  ) {}
  ngOnInit() {
    this.getProducts();
    this.createForm();

  }
  getProducts() {
    this.productService.getAllProducts().subscribe(
      res => {
        if (res.status === 'success') {
          this.products = res.data.data;
        }
      }
    )
  }

  createForm() {
    this.productForm = this.formBuilder.group({
      productId: null
    });
    this.listProductForm = this.formBuilder.group({
      listProducts: this.formBuilder.array([])
    });
  }

  setValueForm() {
    this.listProduct.forEach((item: any) => {
      let listProductForm: FormGroup = this.formBuilder.group(item);
      this.listProductForm.get('listProducts').push(listProductForm);
    });
  }
  get listProducts() : FormArray {
    return <FormArray>this.listProductForm.get('listProducts');
  }
  addProduct(){
    // let {productId} = this.productForm.value;
    //
    // let productUpdate = this.products.find( (item: any) =>  item.id == productId);
    // // console.log(this.listProduct);
    // // console.log(productUpdate);
    // this.listProduct.push(productUpdate);
    // console.log(this.products);
    console.log(this.listProducts.controls)
  }
  getTotal(){
  }

  getData(data: any, key: string) {
    return data.value[key];
  }

  getData2(data: any) {
    return data;
  }
  testData(data: any) {
    return data;
  }
}
