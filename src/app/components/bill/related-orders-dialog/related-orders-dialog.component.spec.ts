import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RelatedOrdersDialogComponent } from './related-orders-dialog.component';

describe('RelatedOrdersDialogComponent', () => {
  let component: RelatedOrdersDialogComponent;
  let fixture: ComponentFixture<RelatedOrdersDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RelatedOrdersDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RelatedOrdersDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
