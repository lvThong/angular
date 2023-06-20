import { Component } from '@angular/core';
import { ProductService } from '../services/product.service';
@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent {

  constructor(private productService: ProductService) {}
   
  ngOnInit() { this.getProducts(); }

  getProducts() {
   let listProducts = this.productService.getListProducts();
   console.log(listProducts);
  }
}
