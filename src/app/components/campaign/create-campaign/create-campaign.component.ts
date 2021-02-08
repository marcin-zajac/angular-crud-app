import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { CampaignModel } from '../campaign-model';
import { CampaignService } from '../campaign.service';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatAutocompleteSelectedEvent, MatAutocomplete } from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';



@Component({
  selector: 'app-create-campaign',
  templateUrl: './create-campaign.component.html',
  styleUrls: ['./create-campaign.component.scss']
})
export class CreateCampaignComponent implements OnInit {


  visible = true;
  selectable = true;
  removable = true;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  keywordCtrl = new FormControl();
  filteredKeywords: Observable<string[]>;
  keywords: string[] = ['super product!'];
  allFruits: string[] = ['Apple', 'Lemon', 'Lime', 'Orange', 'Strawberry'];

  productId: any = this.route.snapshot.paramMap.get('productId')
  campaign: CampaignModel = {
    productId: this.productId,
    name: "",
    keywords: this.keywords,
    status: false,
    bidAmount: 0,
    campaignFund: 0,
    town: 'string',
    radius: 0
  }



  towns: any[] = [
    {value: 'New York City', viewValue: 'New York City'},
    {value: 'Houston', viewValue: 'Houston'},
    {value: 'Philadelphia', viewValue: 'Philadelphia'},
    {value: 'Phoenix', viewValue: 'Phoenix'},
    {value: 'San Antonio', viewValue: 'San Antonio'},
    {value: 'San Diego', viewValue: 'San Diego'},
    {value: 'Chicago', viewValue: 'Chicago'},
  ];

  @ViewChild('fruitInput')
  fruitInput!: ElementRef<HTMLInputElement>;
  @ViewChild('auto') matAutocomplete!: MatAutocomplete;

  constructor(
    private campaignService: CampaignService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.filteredKeywords = this.keywordCtrl.valueChanges.pipe(
      startWith(null),
      map((fruit: string | null) => fruit ? this._filter(fruit) : this.allFruits.slice()));
  }

  ngOnInit(): void {
  }


  createCampaign(): void {

    this.campaignService.create(this.campaign)
      .subscribe(() => {
        this.campaignService.showMessage('New camapign created');
        this.router.navigate(['/campaigns']);
      });
  }


  cancel(): void {
    this.router.navigate(['/products']);
  }

  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    // Add our fruit
    if ((value || '').trim()) {
      this.keywords.push(value.trim());
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }

    this.keywordCtrl.setValue(null);
  }

  remove(fruit: string): void {
    const index = this.keywords.indexOf(fruit);

    if (index >= 0) {
      this.keywords.splice(index, 1);
    }
  }

  setCampaignStatus(value: boolean): void {
    this.campaign.status = value
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.keywords.push(event.option.viewValue);
    this.fruitInput.nativeElement.value = '';
    this.keywordCtrl.setValue(null);
  }
  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.allFruits.filter(fruit => fruit.toLowerCase().indexOf(filterValue) === 0);
  }






}