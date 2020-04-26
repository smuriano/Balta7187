import { DataService } from './services/data.service';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { ToastrModule } from 'ngx-toastr';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FramePageComponent } from './pages/master/frame-page/frame-page.component';
import { NavbarComponent } from './components/shared/navbar/navbar.component';
import { LoadingComponent } from './components/shared/loading/loading.component';
import { ProductCardComponent } from './components/store/product-card/product-card.component';
import { ProductsPageComponent } from './pages/store/products-page/products-page.component';
import { CartPageComponent } from './pages/store/cart-page/cart-page.component';
import { LoginPageComponent } from './pages/account/login-page/login-page.component';
import { MaskDirective } from './directives/mask.directive';
import { AuthService } from './services/auth.service';
import { PetsPageComponent } from './pages/account/pets-page/pets-page.component';
import { PetCardComponent } from './components/account/pet-card/pet-card.component';
import { ResetPasswordPageComponent } from './pages/account/reset-password-page/reset-password-page.component';
import { ProfilePageComponent } from './pages/account/profile-page/profile-page.component';
import { SignupPageComponent } from './pages/account/signup-page/signup-page.component';

@NgModule({
  declarations: [
    AppComponent,
    FramePageComponent,
    NavbarComponent,
    LoadingComponent,
    ProductCardComponent,
    ProductsPageComponent,
    CartPageComponent,
    LoginPageComponent,
    MaskDirective,
    PetsPageComponent,
    PetCardComponent,
    ResetPasswordPageComponent,
    ProfilePageComponent,
    SignupPageComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    AppRoutingModule
  ],
  providers: [DataService, AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
