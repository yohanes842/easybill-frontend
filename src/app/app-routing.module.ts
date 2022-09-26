import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContainerComponent } from './components/container/container.component';
import { BillComponent } from './components/bill/bill.component';
import { OrderListComponent } from './components/order-list/order-list.component';
import { AddFormComponent } from './components/add-form/add-form.component';
import { AuthComponent } from './components/auth/auth.component';

const routes: Routes = [
  { path: 'login', component: AuthComponent },
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
        path: 'home/add',
        component: AddFormComponent,
      },
      {
        path: 'user',
        component: BillComponent,
      },
    ],
  },
  // { path: '**',    component: NotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
