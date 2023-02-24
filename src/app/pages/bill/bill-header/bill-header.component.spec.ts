import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BillHeaderComponent } from './bill-header.component';

describe('BillHeaderComponent', () => {
  let component: BillHeaderComponent;
  let fixture: ComponentFixture<BillHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BillHeaderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BillHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
