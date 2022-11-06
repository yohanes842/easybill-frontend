import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransactionRelatedOrdersDialogComponent } from './transaction-related-orders-dialog.component';

describe('TransactionRelatedOrdersDialogComponent', () => {
  let component: TransactionRelatedOrdersDialogComponent;
  let fixture: ComponentFixture<TransactionRelatedOrdersDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TransactionRelatedOrdersDialogComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TransactionRelatedOrdersDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
