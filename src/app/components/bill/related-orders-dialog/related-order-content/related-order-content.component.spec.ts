import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RelatedOrderContentComponent } from './related-order-content.component';

describe('RelatedOrderContentComponent', () => {
  let component: RelatedOrderContentComponent;
  let fixture: ComponentFixture<RelatedOrderContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RelatedOrderContentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RelatedOrderContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
