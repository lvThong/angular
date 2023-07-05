import { Component, Input, Output } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { NotificationService } from '../services/notification.service';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-update-product-order',
  templateUrl: './update-product-order.component.html',
  styleUrls: ['./update-product-order.component.scss']
})
export class UpdateProductOrderComponent {
  @Input() listProduct: any;
  productForm: any;
  quantity: any;
  submitted: any;
  products: any;
  @Input() total: any;
  constructor(
    private formBuilder: FormBuilder,
    private notifi: NotificationService,
    private productService: ProductService
  ) {}
  ngOnInit() {
    this.createForm();
    this.getProducts();

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
    this.quantity = new FormControl(null);
  }
  addProduct(){
    let {productId} = this.productForm.value;

    let productUpdate = this.products.find( (item: any) =>  item.id == productId);
    console.log(this.listProduct);
    // console.log(productUpdate);
    // this.listProduct.push(productUpdate);
    // console.log(this.products);
  }
  getTotal(){

  }
}
