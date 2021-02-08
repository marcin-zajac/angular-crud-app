import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReadCampaignComponent } from './read-campaign.component';

describe('ReadCampaignComponent', () => {
  let component: ReadCampaignComponent;
  let fixture: ComponentFixture<ReadCampaignComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReadCampaignComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReadCampaignComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
