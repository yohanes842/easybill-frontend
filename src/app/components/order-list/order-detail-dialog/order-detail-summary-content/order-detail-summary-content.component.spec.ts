import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderDetailSummaryContentComponent } from './order-detail-summary-content.component';

describe('OrderDetailSummaryContentComponent', () => {
  let component: OrderDetailSummaryContentComponent;
  let fixture: ComponentFixture<OrderDetailSummaryContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrderDetailSummaryContentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrderDetailSummaryContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
