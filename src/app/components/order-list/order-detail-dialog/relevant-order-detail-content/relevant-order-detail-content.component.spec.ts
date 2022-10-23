import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RelevantOrderDetailContentComponent } from './relevant-order-detail-content.component';

describe('RelevantOrderDetailContentComponent', () => {
  let component: RelevantOrderDetailContentComponent;
  let fixture: ComponentFixture<RelevantOrderDetailContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RelevantOrderDetailContentComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(RelevantOrderDetailContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
