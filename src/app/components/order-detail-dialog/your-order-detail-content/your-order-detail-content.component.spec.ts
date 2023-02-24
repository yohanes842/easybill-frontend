import { ComponentFixture, TestBed } from '@angular/core/testing';

import { YourRelevantOrderDetailContentComponent } from './your-order-detail-content.component';

describe('YourRelevantOrderDetailContentComponent', () => {
  let component: YourRelevantOrderDetailContentComponent;
  let fixture: ComponentFixture<YourRelevantOrderDetailContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [YourRelevantOrderDetailContentComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(YourRelevantOrderDetailContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
