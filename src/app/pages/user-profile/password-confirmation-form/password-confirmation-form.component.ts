import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/state/app.state';
import { setPasswordConfirmationDialogDisplay } from 'src/app/state/dialogDisplay/dialogDisplay.actions';

@Component({
  selector: 'password-confirmation-form',
  templateUrl: './password-confirmation-form.component.html',
  styleUrls: ['./password-confirmation-form.component.css'],
})
export class PasswordConfirmationFormComponent implements OnInit {
  @Input() errors: Map<string, string>;
  @Output() onSubmit = new EventEmitter<string>();

  password: string;

  constructor(private store: Store<Pick<AppState, 'currentSelected'>>) {}

  ngOnInit() {}

  submit() {
    if (this.password) {
      this.store.dispatch(
        setPasswordConfirmationDialogDisplay({ display: false })
      );
      this.onSubmit.emit(this.password);
    }
  }
}
