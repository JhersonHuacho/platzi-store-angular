import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuicklinkModule } from 'ngx-quicklink';

import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { MycartComponent } from './pages/mycart/mycart.component';
import { ProductDetailComponent } from './pages/product-detail/product-detail.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { RecoveryComponent } from './pages/recovery/recovery.component';
import { RegisterComponent } from './pages/register/register.component';
import { LayoutComponent } from './components/layout/layout.component';

import { FundamentosComponent } from './components/fundamentos/fundamentos.component';
import { NavComponent } from './components/nav/nav.component';
import { SwiperModule } from 'swiper/angular'
import { WebsiteRoutingModule } from './website-routing.module';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    FundamentosComponent,
    NavComponent,
    HomeComponent,
    ProductDetailComponent,
    ProfileComponent,
    MycartComponent,
    RecoveryComponent,
    RegisterComponent,
    LayoutComponent,
    LoginComponent,
    FundamentosComponent
  ],
  imports: [
    CommonModule,
    WebsiteRoutingModule,
    FormsModule,
    SwiperModule,
    SharedModule,
    QuicklinkModule
  ]
})
export class WebsiteModule { }
