import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { QuickActionComponent } from './components/quick-action/quick-action.component';
import { OrderListComponent } from './components/order-list/order-list.component';
import { HeaderComponent } from './components/header/header.component';
import { BillComponent } from './components/bill/bill.component';
import { ContainerComponent } from './components/container/container.component';
import { OrderDetailsComponent } from './components/order-list/order-details/order-details.component';
import { AddSubFormComponent } from './components/add-form/add-sub-form/add-sub-form.component';
import { AuthComponent } from './components/auth/auth.component';

import { SpeedDialModule } from 'primeng/speeddial';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { RatingModule } from 'primeng/rating';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { DataViewModule } from 'primeng/dataview';
import { PanelModule } from 'primeng/panel';
import { DropdownModule } from 'primeng/dropdown';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { RippleModule } from 'primeng/ripple';
import { InputNumberModule } from 'primeng/inputnumber';
import { AddFormComponent } from './components/add-form/add-form.component';
import { CalendarModule } from 'primeng/calendar';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { FieldsetModule } from 'primeng/fieldset';
import { AvatarModule } from 'primeng/avatar';
import { AvatarGroupModule } from 'primeng/avatargroup';
import { PasswordModule } from 'primeng/password';

import { UserService } from './services/user.service';
import { OrderService } from './services/order.service';
import { CommonService } from './services/common.service';
import { MessageService } from 'primeng/api';
import { ConfirmationService } from 'primeng/api';
import { CustomMessageService } from './services/custom-message.service';
import { DatePipe } from '@angular/common';
import { AuthApiInterceptor } from './services/auth-http.interceptor';
import { AuthService } from './services/auth.service';
import { PaymentDialogComponent } from './components/bill/payment-dialog/payment-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    QuickActionComponent,
    OrderListComponent,
    HeaderComponent,
    BillComponent,
    ContainerComponent,
    AddFormComponent,
    OrderDetailsComponent,
    AddSubFormComponent,
    AuthComponent,
    PaymentDialogComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    SpeedDialModule,
    TableModule,
    ButtonModule,
    RatingModule,
    DataViewModule,
    PanelModule,
    DropdownModule,
    DialogModule,
    InputTextModule,
    RippleModule,
    InputNumberModule,
    CalendarModule,
    AutoCompleteModule,
    MessageModule,
    MessagesModule,
    ConfirmDialogModule,
    FieldsetModule,
    AvatarModule,
    AvatarGroupModule,
    PasswordModule,
  ],
  providers: [
    UserService,
    OrderService,
    AuthService,
    CommonService,
    MessageService,
    DatePipe,
    CustomMessageService,
    ConfirmationService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthApiInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
