import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentAccountCardComponent } from './payment-account-card.component';

describe('PaymentAccountCardComponent', () => {
  let component: PaymentAccountCardComponent;
  let fixture: ComponentFixture<PaymentAccountCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PaymentAccountCardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PaymentAccountCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
