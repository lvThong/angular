import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { ProductsComponent } from './products/products.component';
import { RegisterComponent } from './register/register.component';
import { EditProductComponent } from './edit-product/edit-product.component';
import { UserComponent } from './user/user.component';
import { OrderComponent } from './order/order.component';
import { UpdateOrderComponent } from './update-order/update-order.component';
import { CustomerComponent } from "./customer/customer.component";
import { NewOrderComponent } from "./new-order/new-order.component";
import { CategoryComponent } from './category/category.component';
import { AuthGuard } from './helpers/auth.guard';

const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'product',
    component: ProductsComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'test',
    component: EditProductComponent
  },
  {
    path: 'user',
    component: UserComponent,
    
  },
  {
    path: 'order',
    component: OrderComponent
  },
  {
    path: 'update-order',
    component: UpdateOrderComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'customer',
    component: CustomerComponent
  },
  {
    path: 'create-order',
    component: NewOrderComponent
  },
  {
    path: 'category',
    component: CategoryComponent,
    canActivate: [AuthGuard]
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
