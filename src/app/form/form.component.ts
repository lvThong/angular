import { Component } from '@angular/core';
import { ProductService } from '../services/product.service';
import { FormBuilder, FormGroup} from '@angular/forms';
import { CommonService } from '../services/common.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent {

  formEdit: any;
  products: any;
  constructor(
    private productService: ProductService,
    private fb: FormBuilder, 
    private commonService: CommonService
    ) {}
   
  ngOnInit() {
    this.formEdit = this.fb.group(
      {
          name: '',
          price: '',
          description: '',
          image: '',
      }
    ); 
    this.getProducts(); 
  }

  getProducts() {
  //  let listProducts = this.productService.getListProducts();
  //  this.products = listProducts;
    this.formEdit.patchValue({name: 'abc', price: 'cba'});
  }

  testNow() {
    this.commonService.productInfo = {
      name: "Long",
      age: 18
    }

    console.log(this.commonService.productInfo);
  }
}
