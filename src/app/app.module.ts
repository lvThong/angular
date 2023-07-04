import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { ProductsComponent } from './products/products.component';
import { LoginComponent } from './login/login.component';
import { HeaderComponent } from './layout/header.component';
import { FooterComponent } from './layout/footer.component';
import { FormComponent } from './form/form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { authInterceptorProviders } from './helpers/auth.interceptor';
import { RegisterComponent } from './register/register.component';
import { ShowAuthedDirective } from './show-authed.directive';
import { EditProductComponent } from './edit-product/edit-product.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SpinnerComponent } from './spinner/spinner.component';
import { loadingInterceptorProviders } from './helpers/loading.interceptor';
import { NgxPaginationModule } from 'ngx-pagination';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UserComponent } from './user/user.component';
import { PopupComponent } from './popup/popup.component';
import { OrderComponent } from './order/order.component';
import { OrderDetailComponent } from './order-detail/order-detail.component';
import { UpdateOrderComponent } from './update-order/update-order.component';
import { NewOrderComponent } from './new-order/new-order.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ProductsComponent,
    LoginComponent,
    HeaderComponent,
    FooterComponent,
    FormComponent,
    EditProductComponent,
    RegisterComponent, 
    ShowAuthedDirective, 
    EditProductComponent, 
    SpinnerComponent, UserComponent, PopupComponent, OrderComponent, OrderDetailComponent, UpdateOrderComponent, NewOrderComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    NgbModule,
    NgxPaginationModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot()
  ],
  providers: [
    authInterceptorProviders,
    loadingInterceptorProviders,
    // {provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptor, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
