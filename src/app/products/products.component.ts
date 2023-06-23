import { Component } from '@angular/core';
import { ProductService } from '../services/product.service';
import { CategoryService } from '../services/category.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent {

  products: any;
  categories: any;

  constructor(
    private productService: ProductService, 
    private categoryService: CategoryService, 
    private router: Router,
    ) { }

  ngOnInit() {
    // this.getCategories();
    this.getProducts();
  }
  // getCategories() {
  //   this.categoryService.getListCategories().subscribe(
  //     res => {
  //       console.log(res.data);
  //       if (res.status === 'success') {
  //         this.categories = res.data;
  //       }
  //     }
  //   );

  // }
  getProducts() {
    this.productService.getListProducts()
      .subscribe((res) => {
        console.log(res);
        if (res.status === 'success') {
          this.products = res.data;
        } else {
          
        }
      
      });

    //  let listProducts = this.productService.getListProducts();
    //  console.log(listProducts);
  }
  updateProduct() {

  }
  deleteProduct(id: number) {
      this.productService.deleteProduct(id)
      .subscribe(
        res => {
          if (res.status === 'success') {
            this.getProducts();
            console.log('delete success');
            // this.router.navigate(['/product']);   
          }
          
          
        }
      )
  }
}
