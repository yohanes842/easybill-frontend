import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditAccountNumberDialogComponent } from './edit-account-number-dialog.component';

describe('EditAccountNumberDialogComponent', () => {
  let component: EditAccountNumberDialogComponent;
  let fixture: ComponentFixture<EditAccountNumberDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditAccountNumberDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditAccountNumberDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
