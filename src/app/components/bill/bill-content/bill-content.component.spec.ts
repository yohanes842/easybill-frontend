import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BillContentComponent } from './bill-content.component';

describe('BillContentComponent', () => {
  let component: BillContentComponent;
  let fixture: ComponentFixture<BillContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BillContentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BillContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
