import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContainerComponent } from 'src/app/components/container/container.component';
import { BillComponent } from 'src/app/pages/bill/bill.component';
import { OrderListComponent } from 'src/app/pages/order-list/order-list.component';
import { AddFormComponent } from './pages/add-form/add-form.component';
import { LoginComponent } from './pages/login/login.component';
import { AuthGuard } from 'src/app/guards/auth/auth.guard';
import { LoginGuard } from 'src/app/guards/login/login.guard';
import { TransactionHistoryComponent } from './pages/transaction-history/transaction-history.component';
import { Route } from './enums/Route';
import { NotFoundPageComponent } from './pages/not-found-page/not-found-page.component';
import { SelectusersFormComponent } from './pages/select-users-form/select-users-form.component';
import { UserProfileComponent } from './pages/user-profile/user-profile.component';
import { PendingOrderListComponent } from './pages/pending-order-list/pending-order-list.component';

const routes: Routes = [
  {
    path: Route.LOGIN_PATH.slice(1),
    component: LoginComponent,
    canActivate: [LoginGuard],
  },
  {
    path: Route.PROFILE_PATH.slice(1),
    component: UserProfileComponent,
    canActivate: [AuthGuard],
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
    path: '',
    redirectTo: Route.HOME_PATH.slice(1),
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
