import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BillRelatedOrderContentComponent } from './bill-related-order-content.component';

describe('BillRelatedOrderContentComponent', () => {
  let component: BillRelatedOrderContentComponent;
  let fixture: ComponentFixture<BillRelatedOrderContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BillRelatedOrderContentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BillRelatedOrderContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
