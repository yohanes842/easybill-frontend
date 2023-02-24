import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeUsernameFormComponent } from './change-username-form.component';

describe('ChangeUsernameDialogComponent', () => {
  let component: ChangeUsernameFormComponent;
  let fixture: ComponentFixture<ChangeUsernameFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ChangeUsernameFormComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ChangeUsernameFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
