import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListProductCustomerComponent } from './list-product-customer.component';

describe('ListProductCustomerComponent', () => {
  let component: ListProductCustomerComponent;
  let fixture: ComponentFixture<ListProductCustomerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListProductCustomerComponent]
    });
    fixture = TestBed.createComponent(ListProductCustomerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
