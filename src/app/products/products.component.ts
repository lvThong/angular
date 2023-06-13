import { Component } from '@angular/core';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent {

products = [
  {
    id : 1,
    name: 'abc',
    price: 2313,
    category: 'TV',
    description: 'qweqewq ewqewewq',
    status: 'active'
  },
  {
    id : 2,
    name: 'abc',
    price: 2313,
    category: 'TV',
    description: 'qweqewq ewqewewq',
    status: 'active'
  },
  {
    id : 3,
    name: 'abc',
    price: 2313,
    category: 'TV',
    description: 'qweqewq ewqewewq',
    status: 'active'
  },
];
}
