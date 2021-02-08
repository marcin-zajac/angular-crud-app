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
  selector: 'app-update-campaign',
  templateUrl: './update-campaign.component.html',
  styleUrls: ['./update-campaign.component.scss']
})
export class UpdateCampaignComponent implements OnInit {



  visible = true;
  selectable = true;
  removable = true;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  keywordCtrl = new FormControl();
  filteredKeywords: Observable<string[]>;
  keywords: string[] = ['super product!'];
  allFruits: string[] = ['Apple', 'Lemon', 'Lime', 'Orange', 'Strawberry'];

  campaignId: any = this.route.snapshot.paramMap.get('id')
  

  campaign: CampaignModel = {
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
    const campaign_id = this.route.snapshot.paramMap.get('id');
    const id: string = campaign_id ? campaign_id.toString() : ""
    this.campaignService.readById(id)
      .subscribe(campaign => this.campaign = campaign);
  }

  updateCampaign(): void {

    this.campaignService.update(this.campaign)
      .subscribe(() => {
        this.campaignService.showMessage('Campaign updated');
        this.router.navigate(['/campaigns']);
      });
  }







  cancel(): void {
    this.router.navigate(['/campaigns']);
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
