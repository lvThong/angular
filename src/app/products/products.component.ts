import { Component, ViewChild } from '@angular/core';
import { ProductService } from '../services/product.service';
import { CategoryService } from '../services/category.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { EditProductComponent } from '../edit-product/edit-product.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NotificationService } from '../services/notification.service';
import { ModalDeleteComponent } from '../modal-delete/modal-delete.component';
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
    private formBuilder: FormBuilder,
    private notification: NotificationService,
  ) { }

  ngOnInit() {
    this.getCategories();
    this.createForm();
    this.getProducts();


  }
  getCategories() {
    let params = {};
    this.categoryService.getListCategories(params).subscribe(
      res => {
        if (res.status === 'success') {
          this.categories = res.data.data;
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
  getProducts() {
    const { id, name, category } = this.filterForm.value;
    this.productService.findProduct(id, name, category, this.page, this.limit)
      .subscribe((res) => {
        if (res.status === 'success') {
          this.products = res.data.data;
          this.count = res.data.total;
        }

      });

    //  let listProducts = this.productService.getListProducts();
    //  console.log(listProducts);
  }
  deleteProduct(id: number) {
    const modalRef = this.modalService.open(ModalDeleteComponent, { size: 'sm', backdrop: 'static' });
    modalRef.componentInstance.title = 'Delete this product';
    modalRef.result.then(
      result => {
        this.productService.deleteProduct(id)
          .subscribe(
            res => {
              if (res.status === 'success') {
                this.getProducts();
                // alert('delete success');
                this.notification.showSuccess('Sucess', 'Product');
                // this.router.navigate(['/product']); 

              } else {
                this.notification.showError('Failure', 'No delete product');
              }


            }
          );
      },
      reason => {

      }
    )
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
      result => {

      }, reason => {

      }
    )
  }
  handlePage(event: any) {
    this.page = event;
    this.getProducts();
  }
  findProduct() {
    this.getProducts();
  //   const { id, name, category } = this.filterForm.value;
  //   this.productService.findProduct(id, name, category, this.page, this.limit).subscribe(
  //     (res) => {
  //       if (res.status === 'success') {
  //         this.products = res.data.data;
  //         this.count = res.data.total;
  //         // this.router.navigate(['/product']);   
  //       }


  //     }
  //   )
  }

}
