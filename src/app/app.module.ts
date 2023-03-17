import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from 'src/app/app-routing.module';
import { AppComponent } from 'src/app/app.component';
import { ContainerComponent } from 'src/app/components/container/container.component';
import { CopyButtonComponent } from 'src/app/components/copy-button/copy-button.component';
import { DialogComponent } from 'src/app/components/dialog/dialog.component';
import { HeaderComponent } from 'src/app/components/header/header.component';
import { JumpButtonComponent } from 'src/app/components/jump-button/jump-button.component';
import { LoadingComponent } from 'src/app/components/loading/loading.component';
import { OrderDetailHeaderComponent } from 'src/app/components/order-detail-dialog/order-detail-header/order-detail-header.component';
import { OrderDetailSummaryContentComponent } from 'src/app/components/order-detail-dialog/order-detail-summary-content/order-detail-summary-content.component';
import { RelevantOrderDetailContentComponent } from 'src/app/components/order-detail-dialog/relevant-order-detail-content/relevant-order-detail-content.component';
import { YourRelevantOrderDetailContentComponent } from 'src/app/components/order-detail-dialog/your-order-detail-content/your-order-detail-content.component';
import { QuickActionComponent } from 'src/app/components/quick-action/quick-action.component';
import { AddFormComponent } from 'src/app/pages/add-form/add-form.component';
import { AddSubFormComponent } from 'src/app/pages/add-form/add-sub-form/add-sub-form.component';
import { BillContentComponent } from 'src/app/pages/bill/bill-content/bill-content.component';
import { BillDetailsDialogComponent } from 'src/app/pages/bill/bill-details-dialog/bill-details-dialog.component';
import { BillRelatedOrderContentComponent } from 'src/app/pages/bill/bill-details-dialog/bill-related-order-content/bill-related-order-content.component';
import { BillHeaderComponent } from 'src/app/pages/bill/bill-header/bill-header.component';
import { BillComponent } from 'src/app/pages/bill/bill.component';
import { PaymentDialogContentComponent } from 'src/app/pages/bill/payment-dialog/payment-dialog-content/payment-dialog-content.component';
import { PaymentDialogHeaderComponent } from 'src/app/pages/bill/payment-dialog/payment-dialog-header/payment-dialog-header.component';
import { LoginComponent } from 'src/app/pages/login/login.component';
import { NotFoundPageComponent } from 'src/app/pages/not-found-page/not-found-page.component';
import { OrderListHeaderComponent } from 'src/app/pages/order-list/header/order-list-header.component';
import { OrderListContentComponent } from 'src/app/pages/order-list/order-list-content/order-list-content.component';
import { OrderListComponent } from 'src/app/pages/order-list/order-list.component';
import { PendingOrderListContentComponent } from 'src/app/pages/pending-order-list/pending-order-list-content/pending-order-list-content.component';
import { PendingOrderListComponent } from 'src/app/pages/pending-order-list/pending-order-list.component';
import { ParticipantListDialogComponent } from 'src/app/pages/select-users-form/participant-list-dialog/participant-list-dialog.component';
import { SelectusersFormComponent } from 'src/app/pages/select-users-form/select-users-form.component';
import { TransactionRelatedOrderContentComponent } from 'src/app/pages/transaction-history/transaction-details-dialog/transaction-related-order-content/transaction-related-order-content.component';
import { TransactionHistoryDetailComponent } from 'src/app/pages/transaction-history/transaction-history-detail/transaction-history-detail.component';
import { TransactionHistoryComponent } from 'src/app/pages/transaction-history/transaction-history.component';
import { ChangeAccountNumberFormComponent } from 'src/app/pages/user-profile/change-account-number-form/change-account-number-form.component';
import { ChangePasswordFormComponent } from 'src/app/pages/user-profile/change-password-form/change-password-form.component';
import { ChangeUsernameFormComponent } from 'src/app/pages/user-profile/change-username-form/change-username-form.component';
import { UserProfileComponent } from 'src/app/pages/user-profile/user-profile.component';

import { AutoCompleteModule } from 'primeng/autocomplete';
import { AvatarModule } from 'primeng/avatar';
import { AvatarGroupModule } from 'primeng/avatargroup';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { CheckboxModule } from 'primeng/checkbox';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DataViewModule } from 'primeng/dataview';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { FieldsetModule } from 'primeng/fieldset';
import { InputMaskModule } from 'primeng/inputmask';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { MessageModule } from 'primeng/message';
import { MessagesModule } from 'primeng/messages';
import { PanelModule } from 'primeng/panel';
import { PasswordModule } from 'primeng/password';
import { ProgressBarModule } from 'primeng/progressbar';
import { RadioButtonModule } from 'primeng/radiobutton';
import { RatingModule } from 'primeng/rating';
import { RippleModule } from 'primeng/ripple';
import { SpeedDialModule } from 'primeng/speeddial';
import { TableModule } from 'primeng/table';
import { TabMenuModule } from 'primeng/tabmenu';

import { DatePipe } from '@angular/common';
import { AuthApiInterceptor } from 'src/app/interceptor/auth-http.interceptor';
import { ErrorResponseInterceptor } from 'src/app/interceptor/error-response.interceptor';

import { StoreModule } from '@ngrx/store';
import { ConfirmationService, MessageService } from 'primeng/api';
import { AuthService } from 'src/app/services/auth/auth.service';
import { CustomMessageService } from 'src/app/services/message/custom-message.service';
import { OrderService } from 'src/app/services/order/order.service';
import { UserService } from 'src/app/services/user/user.service';
import { TransactionDetailsDialogComponent } from './pages/transaction-history/transaction-details-dialog/transaction-details-dialog.component';

import { appReducer } from './state/app.state';

@NgModule({
  declarations: [
    AppComponent,
    QuickActionComponent,
    OrderListComponent,
    HeaderComponent,
    BillComponent,
    ContainerComponent,
    AddFormComponent,
    AddSubFormComponent,
    LoginComponent,
    SelectusersFormComponent,
    OrderListHeaderComponent,
    OrderListContentComponent,
    BillHeaderComponent,
    BillContentComponent,
    RelevantOrderDetailContentComponent,
    YourRelevantOrderDetailContentComponent,
    OrderDetailSummaryContentComponent,
    TransactionHistoryComponent,
    TransactionHistoryDetailComponent,
    NotFoundPageComponent,
    ParticipantListDialogComponent,
    JumpButtonComponent,
    TransactionRelatedOrderContentComponent,
    UserProfileComponent,
    ChangeUsernameFormComponent,
    ChangePasswordFormComponent,
    ChangeAccountNumberFormComponent,
    CopyButtonComponent,
    PendingOrderListComponent,
    PendingOrderListContentComponent,
    LoadingComponent,
    DialogComponent,
    OrderDetailHeaderComponent,
    PaymentDialogHeaderComponent,
    PaymentDialogContentComponent,
    BillDetailsDialogComponent,
    BillRelatedOrderContentComponent,
    TransactionDetailsDialogComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
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
    TabMenuModule,
    InputMaskModule,
    CheckboxModule,
    RadioButtonModule,
    ProgressBarModule,
    StoreModule.forRoot(appReducer),
  ],
  providers: [
    UserService,
    OrderService,
    AuthService,
    MessageService,
    DatePipe,
    CustomMessageService,
    ConfirmationService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthApiInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorResponseInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
