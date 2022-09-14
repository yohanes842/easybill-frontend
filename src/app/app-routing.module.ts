import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContainerComponent } from './components/container/container.component';
import { BillComponent } from './components/bill/bill.component';
import { OrderListComponent } from './components/order-list/order-list.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: '',
    component: ContainerComponent,
    // canActivate: [AuthGuard],
    children: [
      {
        path: 'home',
        component: OrderListComponent,
      },
      {
        path: 'user',
        component: BillComponent,
      },
    ],
  },
  // { path: 'login', component: LoginComponent, canActivate: [LoginPageGuard] },
  // { path: '**',    component: NotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
