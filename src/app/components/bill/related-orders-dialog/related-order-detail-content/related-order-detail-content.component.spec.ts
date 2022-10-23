import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RelatedOrderDetailContentComponent } from './related-order-detail-content.component';

describe('RelatedOrderDetailContentComponent', () => {
  let component: RelatedOrderDetailContentComponent;
  let fixture: ComponentFixture<RelatedOrderDetailContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RelatedOrderDetailContentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RelatedOrderDetailContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
