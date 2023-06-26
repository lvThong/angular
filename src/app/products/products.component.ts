import { Component, ViewChild } from '@angular/core';
import { ProductService } from '../services/product.service';
import { CategoryService } from '../services/category.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { EditProductComponent } from '../edit-product/edit-product.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent {
  @ViewChild(EditProductComponent) editProductComponent: any;
  products: any;
  categories: any;

  constructor(
    private productService: ProductService,
    private categoryService: CategoryService,
    private modalService: NgbModal,
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
      );
  }
  editProduct(product: any) {
    // this.editProductComponent.open(product);
    const modalRef = this.modalService.open(EditProductComponent, { size: 'lg', backdrop: "static" });
    modalRef.componentInstance.title = 'Edit Product';
    modalRef.componentInstance.item = product;
    modalRef.result.then((result) => {
      // this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      // this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  createProduct() {
    const modalRef = this.modalService.open(EditProductComponent, { size: 'lg', backdrop: "static" });
    modalRef.componentInstance.title = 'Add New Product';
    modalRef.result.then(
      result =>  {

      }, reason => {

      }
    )
  }
  
}
