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
import { InvoiceComponent } from './components/invoice/invoice.component';
import { ContainerComponent } from './components/container/container.component';
import { DataViewModule } from 'primeng/dataview';

@NgModule({
  declarations: [AppComponent, QuickActionComponent, OrderListComponent, HeaderComponent, InvoiceComponent, ContainerComponent],
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
    DataViewModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
