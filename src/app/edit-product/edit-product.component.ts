import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { CategoryService } from '../services/category.service';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ProductService } from '../services/product.service';
@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.scss']
})
export class EditProductComponent {
  errorMessage = '';
  categories: any;
  item = {
    id: "",
    name: "",
    category_name: "",
    price: "",
    description: "",
    image: ""
  };
  editForm: any;


  closeResult: string = '';

  constructor(
    private categoryService: CategoryService,
    private modalService: NgbModal,
    public activeModal: NgbActiveModal,
    public productService: ProductService
  ) { }

  ngOnInit() {
    // console.log(this.item)

    this.categoryService.getListCategories().subscribe(
      res => {
        if (res.status === 'success') {
          this.categories = res.data;
          console.log(this.categories);

        }


      }
    );

   
    this.editForm = new FormGroup({
      id: new FormControl(this.item.id),
      name: new FormControl(this.item.name),
      category: new FormControl(this.item.category_name),
      price: new FormControl(this.item.price),
      description: new FormControl(this.item.description),
      image: new FormControl(this.item.image),
    });
    console.log('item: ' + this.item);
  }



  updateProduct() {
    
      const {id, name, description, price, image, category} = this.editForm.value;
      this.productService.updateProduct(id, name, description, price, image, category).subscribe(
        res => {
            if (res.status === 'success') {
              console.log('updated product ');
            }
        }
      )
  }

}
