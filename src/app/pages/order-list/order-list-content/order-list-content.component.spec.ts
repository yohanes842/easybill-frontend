import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderListContentComponent } from './order-list-content.component';

describe('OrderListContentComponent', () => {
  let component: OrderListContentComponent;
  let fixture: ComponentFixture<OrderListContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrderListContentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrderListContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
