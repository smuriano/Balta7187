import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FramePageComponent } from './pages/master/frame-page/frame-page.component';
import { AuthService } from './services/auth.service';
import { ProductsPageComponent } from './pages/store/products-page/products-page.component';
import { LoginPageComponent } from './pages/account/login-page/login-page.component';
import { CartPageComponent } from './pages/store/cart-page/cart-page.component';
import { PetsPageComponent } from './pages/account/pets-page/pets-page.component';

const routes: Routes = [
  {
    path: '',
    component: FramePageComponent,
    canActivate: [AuthService],
    children: [
      { path: '', component: ProductsPageComponent },
      { path: 'cart', component: CartPageComponent }
    ]
  }, {
    path: 'account',
    component: FramePageComponent,
    children: [
      // { path: '', component: ProfilePageComponent },
      { path: 'pets', component: PetsPageComponent }
    ]
  },
  { path: 'login', component: LoginPageComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
