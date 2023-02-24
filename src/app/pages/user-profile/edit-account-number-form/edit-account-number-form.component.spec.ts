import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditAccountNumberFormComponent } from './edit-account-number-form.component';

describe('EditAccountNumberDialogComponent', () => {
  let component: EditAccountNumberFormComponent;
  let fixture: ComponentFixture<EditAccountNumberFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditAccountNumberFormComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(EditAccountNumberFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
