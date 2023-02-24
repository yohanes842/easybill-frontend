import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectusersFormComponent } from './select-users-form.component';

describe('SelectusersFormComponent', () => {
  let component: SelectusersFormComponent;
  let fixture: ComponentFixture<SelectusersFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SelectusersFormComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SelectusersFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
