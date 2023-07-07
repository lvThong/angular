import {Component, Input, Output} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {NotificationService} from '../services/notification.service';
import {ProductService} from '../services/product.service';

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
    if(value){
      this.setValueForm();
    }

  }

  productForm: FormGroup = new FormGroup({});
  listInforProduct: FormGroup = new FormGroup({});
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
  ) {
  }

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

  get listProducts(): FormArray {
    return <FormArray>this.listProductForm.get('listProducts');
  }

  addProduct() {
    let {productId} = this.productForm.value;
    let productUpdate = this.products.find((item: any) => item.id == productId);
    productUpdate['quantity'] = 1;
    let temp: FormGroup = this.formBuilder.group(productUpdate);
    this.listProductForm.get('listProducts').push(temp);
  }

  getTotal() {
    let list = this.listProductForm.get('listProducts').value;
    let sum: number = 0;
    list.map((item: any) => {
      sum += item.price * item.quantity;
    });
    this.total = sum;

  }

  getData(data: any, key: string) {
    return data.value[key];
  }

  getData2(data: any) {
    return data;
  }

  increase(i: any) {
    this.listProductForm.get('listProducts').controls[i].patchValue({
      quantity: this.listProductForm.get('listProducts').controls[i].value.quantity + 1
    });
  }

  decrease(i: any) {
    this.listProductForm.get('listProducts').controls[i].patchValue({
      quantity: this.listProductForm.get('listProducts').controls[i].value.quantity > 0 ? this.listProductForm.get('listProducts').controls[i].value.quantity - 1 : 0
    });
  }
  removeProduct(i: any) {
    this.listProductForm.get('listProducts').removeAt(i);
  }
}
