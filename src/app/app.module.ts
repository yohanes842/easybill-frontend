import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { QuickActionComponent } from './components/quick-action/quick-action.component';
import { OrderListComponent } from './components/order-list/order-list.component';

import { SpeedDialModule } from 'primeng/speeddial';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { RatingModule } from 'primeng/rating';
import { HttpClientModule } from '@angular/common/http';
import { HeaderComponent } from './components/header/header.component';
import { BillComponent } from './components/bill/bill.component';
import { ContainerComponent } from './components/container/container.component';

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

import { UserService } from './services/user.service';
import { DatePipe } from '@angular/common';
import { OrderService } from './services/order.service';
import { CommonService } from './services/common.service';
import { MessageService } from 'primeng/api';

@NgModule({
  declarations: [
    AppComponent,
    QuickActionComponent,
    OrderListComponent,
    HeaderComponent,
    BillComponent,
    ContainerComponent,
    AddFormComponent,
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
  ],
  providers: [
    UserService,
    OrderService,
    CommonService,
    MessageService,
    DatePipe,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
