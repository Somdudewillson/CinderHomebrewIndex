import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemListingDetailComponent } from './item-listing-detail.component';

describe('ItemListingDetailComponent', () => {
  let component: ItemListingDetailComponent;
  let fixture: ComponentFixture<ItemListingDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ItemListingDetailComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ItemListingDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
