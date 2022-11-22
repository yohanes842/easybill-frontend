import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContainerComponent } from 'src/app/components/container/container.component';
import { BillComponent } from 'src/app/components/bill/bill.component';
import { OrderListComponent } from 'src/app/components/order-list/order-list.component';
import { AddFormComponent } from './components/add-form/add-form.component';
import { LoginComponent } from './components/login/login.component';
import { AuthGuard } from 'src/app/guards/auth/auth.guard';
import { LoginGuard } from 'src/app/guards/login/login.guard';
import { TransactionHistoryComponent } from './components/transaction-history/transaction-history.component';
import { Route } from './enums/Route';
import { NotFoundPageComponent } from './components/not-found-page/not-found-page.component';
import { SelectusersFormComponent } from './components/select-users-form/select-users-form.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { PendingOrderListComponent } from './components/pending-order-list/pending-order-list.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent, canActivate: [LoginGuard] },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: '',
    component: ContainerComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: Route.HOME_PATH.slice(1),
        component: OrderListComponent,
      },
      {
        path: Route.PENDING_ORDERS_PATH.slice(1),
        component: PendingOrderListComponent,
      },
      {
        path: Route.BILL_PATH.slice(1),
        component: BillComponent,
      },
      {
        path: Route.TRANSACTION_HISTORY_PATH.slice(1),
        component: TransactionHistoryComponent,
      },
    ],
  },
  {
    path: Route.ADD_ORDER_PATH.slice(1),
    component: AddFormComponent,
    canActivate: [AuthGuard],
  },
  {
    path: Route.ADD_ORDER_USER_PATH.slice(1),
    component: SelectusersFormComponent,
    canActivate: [AuthGuard],
  },
  {
    path: Route.PROFILE_PATH.slice(1),
    component: UserProfileComponent,
    canActivate: [AuthGuard],
  },
  {
    path: '**',
    component: NotFoundPageComponent,
  },

  // { path: '**',    component: NotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
