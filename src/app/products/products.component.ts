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
  page: number = 1;
  count: number = 0;
  limit: number = 5;
  filterForm: any;
  constructor(
    private productService: ProductService,
    private categoryService: CategoryService,
    private modalService: NgbModal,
    private router: Router,
    private formBuilder:FormBuilder
  ) { }

  ngOnInit() {
   this.getCategories();
    this.getProducts(this.page, this.limit);
    this.createForm();
  
  }
  getCategories() {
    this.categoryService.getListCategories().subscribe(
      res => {
        if (res.status === 'success') {
          this.categories = res.data;
        }
      }
    )
  }
  createForm() {
      this.filterForm = this.formBuilder.group({
          id: [null],
          name: [null],
          category: [null],
      });
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
  getProducts(page: number, limit: number) {
    this.productService.getListProducts(page, limit)
      .subscribe((res) => {
        if (res.status === 'success') {
          this.products = res.data.data;
          this.count = res.data.total;
          console.log('Log products: ', this.products);
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
            this.getProducts(this.page, this.limit);
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
  handlePage(event: any) {
      this.page = event;
      this.getProducts(this.page, this.limit);
  }
  findProduct(){
      const {id, name, category} = this.filterForm.value;
      this.productService.findProduct(id, name, category, this.page, this.limit).subscribe(
        (res) => {
          if (res.status === 'success') {
              this.products = res.data.data;
           
            // this.router.navigate(['/product']);   
          }


        }
      )
  }
  
}
