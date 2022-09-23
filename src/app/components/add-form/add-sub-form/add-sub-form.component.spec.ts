import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSubFormComponent } from './add-sub-form.component';

describe('AddSubFormComponent', () => {
  let component: AddSubFormComponent;
  let fixture: ComponentFixture<AddSubFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddSubFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddSubFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
