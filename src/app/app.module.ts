import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';


import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RoutingModule } from './routing/routing.module';
import { HomeComponent } from './components/home/home.component';
import { LayoutComponent } from './components/layout/layout.component';
import { HeaderComponent } from './components/navigation/header/header.component';
import { MaterialModule } from './material/material.module';
import { SidenavListComponent } from './components/navigation/sidenav-list/sidenav-list.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { CreateProductComponent } from './components/product/create-product/create-product.component';
import { ReadProductComponent } from './components/product/read-product/read-product.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UpdateProductComponent } from './components/product/update-product/update-product.component';
import { ReadCampaignComponent } from './components/campaign/read-campaign/read-campaign.component';
import { CreateCampaignComponent } from './components/campaign/create-campaign/create-campaign.component';
import { UpdateCampaignComponent } from './components/campaign/update-campaign/update-campaign.component';









@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LayoutComponent,
    HeaderComponent,
    SidenavListComponent,
    CreateProductComponent,
    ReadProductComponent,
    UpdateProductComponent,
    ReadCampaignComponent,
    CreateCampaignComponent,
    UpdateCampaignComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RoutingModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MaterialModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
