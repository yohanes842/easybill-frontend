import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParticipantListDialogComponent } from './participant-list-dialog.component';

describe('ParticipantListDialogComponent', () => {
  let component: ParticipantListDialogComponent;
  let fixture: ComponentFixture<ParticipantListDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ParticipantListDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ParticipantListDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
