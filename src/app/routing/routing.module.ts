import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule, RouterLink } from '@angular/router';
import { HomeComponent } from '../components/home/home.component';
import { ReadProductComponent } from '../components/product/read-product/read-product.component';
import { ReadCampaignComponent } from '../components/campaign/read-campaign/read-campaign.component';
import { CreateProductComponent } from '../components/product/create-product/create-product.component';
import { UpdateProductComponent } from '../components/product/update-product/update-product.component';
import { CreateCampaignComponent } from '../components/campaign/create-campaign/create-campaign.component';
import { UpdateCampaignComponent } from '../components/campaign/update-campaign/update-campaign.component';


const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'products', component: ReadProductComponent },
  { path: 'products/create', component: CreateProductComponent },
  { path: 'products/edit/:id', component: UpdateProductComponent },
  { path: 'campaigns', component: ReadCampaignComponent },
  { path: 'campaigns/create/:productId', component: CreateCampaignComponent },
  { path: 'campaigns/edit/:id', component: UpdateCampaignComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' }
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)

  ],
  exports: [
    RouterModule
  ],
})
export class RoutingModule { }
