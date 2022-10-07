import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from 'src/app/app-routing.module';
import { AppComponent } from 'src/app/app.component';
import { QuickActionComponent } from 'src/app/components/quick-action/quick-action.component';
import { OrderListComponent } from 'src/app/components/order-list/order-list.component';
import { AddFormComponent } from 'src/app/components/add-form/add-form.component';
import { HeaderComponent } from 'src/app/components/header/header.component';
import { BillComponent } from 'src/app/components/bill/bill.component';
import { ContainerComponent } from 'src/app/components/container/container.component';
import { OrderDetailsComponent } from 'src/app/components/order-list/order-details/order-details.component';
import { AddSubFormComponent } from 'src/app/components/add-form/add-sub-form/add-sub-form.component';
import { LoginComponent } from 'src/app/components/login/login.component';

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
import { CalendarModule } from 'primeng/calendar';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { FieldsetModule } from 'primeng/fieldset';
import { AvatarModule } from 'primeng/avatar';
import { AvatarGroupModule } from 'primeng/avatargroup';
import { PasswordModule } from 'primeng/password';

import { UserService } from 'src/app/services/user/user.service';
import { OrderService } from 'src/app/services/order/order.service';
import { CommonService } from 'src/app/services/common/common.service';
import { MessageService } from 'primeng/api';
import { ConfirmationService } from 'primeng/api';
import { CustomMessageService } from 'src/app/services/message/custom-message.service';
import { DatePipe } from '@angular/common';
import { AuthApiInterceptor } from 'src/app/interceptor/auth-http.interceptor';
import { AuthService } from 'src/app/services/auth/auth.service';
import { PaymentDialogComponent } from 'src/app/components/bill/payment-dialog/payment-dialog.component';
import { AddUserFormComponent } from 'src/app/components/add-form/add-user-form/add-user-form.component';

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
    LoginComponent,
    PaymentDialogComponent,
    AddUserFormComponent,
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
