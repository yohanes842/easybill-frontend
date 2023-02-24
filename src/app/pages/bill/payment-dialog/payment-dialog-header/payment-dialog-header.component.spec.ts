import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentDialogHeaderComponent } from './payment-dialog-header.component';

describe('PaymentDialogHeaderComponent', () => {
  let component: PaymentDialogHeaderComponent;
  let fixture: ComponentFixture<PaymentDialogHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PaymentDialogHeaderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PaymentDialogHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
