import { Component, Input } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CategoryService } from '../services/category.service';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ProductService } from '../services/product.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.scss']
})
export class EditProductComponent {
  errorMessage = '';
  categories: any;
  @Input() item: any; 
  @Input() title: any;
  // id: number = 0;
  submitted = false;

  editForm: any;


  closeResult: string = '';

  constructor(
    private categoryService: CategoryService,
    private modalService: NgbModal,
    private router: Router,
    private formBuilder: FormBuilder,
    public activeModal: NgbActiveModal,
    public productService: ProductService
  ) { }

  ngOnInit() {
    this.getListCategory();
    this.createForm();
  }

  getListCategory() {
    this.categoryService.getListCategories().subscribe(
      res => {
        if (res.status === 'success') {
          this.categories = res.data;
        } else {
          this.categories = {};
        }
      }
    ), () => {
      this.categories = {};
    };
  }

  createForm() {
    // this.editForm = new FormGroup({
    //   id: new FormControl(this.item ? this.item.id : null),
    //   name: new FormControl(this.item  ? this.item.name : null),
    //   category: new FormControl(this.item  ? this.item.category_id: null),
    //   price: new FormControl(this.item  ? this.item.price : null),
    //   description: new FormControl(this.item ? this.item.description: null),
    //   image: new FormControl(this.item  ? this.item.image: null),  
    // });
    this.editForm = this.formBuilder.group({
      id: [this.item ? this.item.id : null, Validators.required],
      name: [this.item  ? this.item.name : null, Validators.required, Validators],
      category: [this.item  ? this.item.category_id: null, Validators.required],
      price: [this.item  ? this.item.price : null, Validators.required],
      description: [this.item ? this.item.description: null, Validators.required],
      image: [this.item  ? this.item.image: null, Validators.required]
    })
  }

  get f() { return this.editForm.controls; }


  handleCancel() {
    this.submitted = false;
    this.activeModal.close('Close click');
  }
  updateProduct() {
    this.submitted = true;
      const {id, name, description, price, image, category} = this.editForm.value;
      if (this.editForm.invalid) {
        return ;
      }
      this.productService.updateProduct(id, name, category,image,description, price).subscribe(
        res => {
            if (res.status === 'success') {
              console.log('updated product ');
       
              this.activeModal.close(true);
              window.location.reload();
              // this.router.navigate(['/product']);
            }
        }
      )
  }
  createProduct() {
    this.submitted = true;
    const {name, description, price, image, category} = this.editForm.value;

    if (this.editForm.invalid) {
      return ;
    }
    this.productService.addNewProduct(name, category, image, description, price).subscribe(
      res => {
        if (res.status === 'success') {
          console.log('created product ');
   
          this.activeModal.close(true);
          window.location.reload();
    
        }
      }
    )
  }
}
