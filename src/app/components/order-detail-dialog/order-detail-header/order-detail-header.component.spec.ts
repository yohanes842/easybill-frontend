import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderDetailHeaderComponent } from './order-detail-header.component';

describe('OrderDetailHeaderComponent', () => {
  let component: OrderDetailHeaderComponent;
  let fixture: ComponentFixture<OrderDetailHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrderDetailHeaderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrderDetailHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
