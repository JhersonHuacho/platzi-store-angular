import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CategoryComponent } from './pages/category/category.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { MycartComponent } from './pages/mycart/mycart.component';
import { ProductDetailComponent } from './pages/product-detail/product-detail.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { RecoveryComponent } from './pages/recovery/recovery.component';
import { RegisterComponent } from './pages/register/register.component';
import { LayoutComponent } from './components/layout/layout.component';
import { ImgComponent } from './components/img/img.component';
import { FundamentosComponent } from './components/fundamentos/fundamentos.component';
import { ProductComponent } from './components/product/product.component';
import { ProductsComponent } from './components/products/products.component';
import { NavComponent } from './components/nav/nav.component';
import { ReversePipe } from './pipes/reverse.pipe';
import { TimeAgoPipe } from './pipes/time-ago.pipe';
import { HighlightDirective } from './directives/highlight.directive';

import { WebsiteRoutingModule } from './website-routing.module';
import { SwiperModule } from 'swiper/angular'
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    ImgComponent,
    FundamentosComponent,
    ProductComponent,
    ProductsComponent,
    NavComponent,
    ReversePipe,
    TimeAgoPipe,
    HighlightDirective,
    HomeComponent,
    CategoryComponent,
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
    SwiperModule,
    FormsModule
  ]
})
export class WebsiteModule { }
