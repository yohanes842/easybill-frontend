import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeAccountNumberFormComponent } from './change-account-number-form.component';

describe('ChangeAccountNumberDialogComponent', () => {
  let component: ChangeAccountNumberFormComponent;
  let fixture: ComponentFixture<ChangeAccountNumberFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ChangeAccountNumberFormComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ChangeAccountNumberFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
