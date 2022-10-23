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
        path: 'home',
        component: OrderListComponent,
      },
      {
        path: 'user',
        component: BillComponent,
      },
      {
        path: 'transaction-history',
        component: TransactionHistoryComponent,
      },
    ],
  },
  {
    path: 'add-orders',
    component: AddFormComponent,
    canActivate: [AuthGuard],
  },
  // { path: '**',    component: NotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
