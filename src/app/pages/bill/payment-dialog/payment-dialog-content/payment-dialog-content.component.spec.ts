import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentDialogContentComponent } from './payment-dialog-content.component';

describe('PaymentDialogContentComponent', () => {
  let component: PaymentDialogContentComponent;
  let fixture: ComponentFixture<PaymentDialogContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PaymentDialogContentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PaymentDialogContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
