import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductModel } from '../../product/product-model';
import { ProductService } from '../../product/product.service';
import { CampaignModel } from '../campaign-model';
import { CampaignService } from '../campaign.service'


@Component({
  selector: 'app-read-campaign',
  templateUrl: './read-campaign.component.html',
  styleUrls: ['./read-campaign.component.scss']
})
export class ReadCampaignComponent implements OnInit {

  panelOpenState = false

  campaigns: CampaignModel[] = []
  products: ProductModel[] = []

  constructor(
    private campaignService: CampaignService,
    private productService: ProductService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.read()
    this.readProducts()


  }

  read(): void {
    this.campaignService.read()
      .subscribe(campaigns => {
        this.campaigns = campaigns;
      })
  }

  readProducts(): void {
    this.productService.read()
      .subscribe(products => {
        this.products = products;

      });
  }
  getProductsName(productsFromHtml: ProductModel[], id: any): string {
    const product: any = productsFromHtml.find(prod => prod._id === id)
    if (product) {
      return product.name
    }
    return ""
  }


  delete(event: any, campaign: CampaignModel): void {
    event.stopPropagation()
    this.campaignService.delete(campaign).subscribe(() => {
      this.ngOnInit()
    });
    this.campaignService.showMessage('Campaign deleted');
  }

  clickEditHandler(event: any, campaignId: any): void {
    event?.stopPropagation()
    this.router.navigate([`/campaigns/edit/${campaignId}`])
  }


}
