import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PendingOrderListContentComponent } from './pending-order-list-content.component';

describe('PendingOrderListContentComponent', () => {
  let component: PendingOrderListContentComponent;
  let fixture: ComponentFixture<PendingOrderListContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PendingOrderListContentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PendingOrderListContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
