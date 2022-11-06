import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransactionRelatedOrderContentComponent } from './transaction-related-order-content.component';

describe('TransactionRelatedOrderContentComponent', () => {
  let component: TransactionRelatedOrderContentComponent;
  let fixture: ComponentFixture<TransactionRelatedOrderContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TransactionRelatedOrderContentComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TransactionRelatedOrderContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
