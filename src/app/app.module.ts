import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from 'src/app/app-routing.module';
import { AppComponent } from 'src/app/app.component';
import { AddFormComponent } from 'src/app/components/add-form/add-form.component';
import { AddSubFormComponent } from 'src/app/components/add-form/add-sub-form/add-sub-form.component';
import { BillComponent } from 'src/app/components/bill/bill.component';
import { ContainerComponent } from 'src/app/components/container/container.component';
import { HeaderComponent } from 'src/app/components/header/header.component';
import { LoginComponent } from 'src/app/components/login/login.component';
import { OrderDetailsComponent } from 'src/app/components/order-list/order-detail-dialog/order-detail-dialog.component';
import { OrderListComponent } from 'src/app/components/order-list/order-list.component';
import { QuickActionComponent } from 'src/app/components/quick-action/quick-action.component';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ButtonModule } from 'primeng/button';
import { RatingModule } from 'primeng/rating';
import { SpeedDialModule } from 'primeng/speeddial';
import { TableModule } from 'primeng/table';

import { AutoCompleteModule } from 'primeng/autocomplete';
import { AvatarModule } from 'primeng/avatar';
import { AvatarGroupModule } from 'primeng/avatargroup';
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
import { RadioButtonModule } from 'primeng/radiobutton';
import { RippleModule } from 'primeng/ripple';
import { TabMenuModule } from 'primeng/tabmenu';
import { ProgressBarModule } from 'primeng/progressbar';

import { DatePipe } from '@angular/common';
import { ConfirmationService, MessageService } from 'primeng/api';
import { PaymentDialogComponent } from 'src/app/components/bill/payment-dialog/payment-dialog.component';
import { SelectusersFormComponent } from 'src/app/components/select-users-form/select-users-form.component';
import { AuthApiInterceptor } from 'src/app/interceptor/auth-http.interceptor';
import { AuthService } from 'src/app/services/auth/auth.service';
import { CustomMessageService } from 'src/app/services/message/custom-message.service';
import { OrderService } from 'src/app/services/order/order.service';
import { UserService } from 'src/app/services/user/user.service';
import { BillContentComponent } from './components/bill/bill-content/bill-content.component';
import { BillHeaderComponent } from './components/bill/bill-header/bill-header.component';
import { RelatedOrderContentComponent } from './components/bill/related-orders-dialog/related-order-content/related-order-content.component';
import { RelatedOrdersDialogComponent } from './components/bill/related-orders-dialog/related-orders-dialog.component';
import { CopyButtonComponent } from './components/copy-button/copy-button.component';
import { JumpButtonComponent } from './components/jump-button/jump-button.component';
import { NotFoundPageComponent } from './components/not-found-page/not-found-page.component';
import { OrderListHeaderComponent } from './components/order-list/header/header.component';
import { OrderDetailSummaryContentComponent } from './components/order-list/order-detail-dialog/order-detail-summary-content/order-detail-summary-content.component';
import { RelevantOrderDetailContentComponent } from './components/order-list/order-detail-dialog/relevant-order-detail-content/relevant-order-detail-content.component';
import { YourRelevantOrderDetailContentComponent } from './components/order-list/order-detail-dialog/your-order-detail-content/your-order-detail-content.component';
import { OrderListContentComponent } from './components/order-list/order-list-content/order-list-content.component';
import { ParticipantListDialogComponent } from './components/select-users-form/participant-list-dialog/participant-list-dialog.component';
import { TransactionHistoryDetailComponent } from './components/transaction-history/transaction-history-detail/transaction-history-detail.component';
import { TransactionHistoryComponent } from './components/transaction-history/transaction-history.component';
import { TransactionRelatedOrderContentComponent } from './components/transaction-history/transaction-related-orders-dialog/transaction-related-order-content/transaction-related-order-content.component';
import { TransactionRelatedOrdersDialogComponent } from './components/transaction-history/transaction-related-orders-dialog/transaction-related-orders-dialog.component';
import { ChangeUsernameFormComponent } from './components/user-profile/change-username-form/change-username-form.component';
import { ChangePasswordFormComponent } from './components/user-profile/change-password-form/change-password-form.component';
import { EditAccountNumberFormComponent } from './components/user-profile/edit-account-number-form/edit-account-number-form.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { ErrorResponseInterceptor } from './interceptor/error-response.interceptor';
import { PendingOrderListComponent } from './components/pending-order-list/pending-order-list.component';
import { PendingOrderListContentComponent } from './components/pending-order-list/pending-order-list-content/pending-order-list-content.component';
import { LoadingComponent } from './components/loading/loading.component';
import { DialogComponent } from './components/common/dialog/dialog.component';

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
    SelectusersFormComponent,
    OrderListHeaderComponent,
    OrderListContentComponent,
    BillHeaderComponent,
    BillContentComponent,
    RelatedOrdersDialogComponent,
    RelatedOrderContentComponent,
    RelevantOrderDetailContentComponent,
    YourRelevantOrderDetailContentComponent,
    OrderDetailSummaryContentComponent,
    TransactionHistoryComponent,
    TransactionHistoryDetailComponent,
    NotFoundPageComponent,
    ParticipantListDialogComponent,
    JumpButtonComponent,
    TransactionRelatedOrdersDialogComponent,
    TransactionRelatedOrderContentComponent,
    UserProfileComponent,
    ChangeUsernameFormComponent,
    ChangePasswordFormComponent,
    EditAccountNumberFormComponent,
    CopyButtonComponent,
    PendingOrderListComponent,
    PendingOrderListContentComponent,
    LoadingComponent,
    DialogComponent,
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
