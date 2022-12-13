import { Component, Input } from '@angular/core';
import { ItemRarity, ItemType } from 'src/app/models/HomebrewEnums';
import { formatEnumName, toTitleCase } from 'src/app/utils/HomebrewStringUtils';
import { HomebrewItemData } from '../../models/HomebrewData';

@Component({
  selector: 'item-listing-detail',
  templateUrl: './item-listing-detail.component.html',
  styleUrls: ['./item-listing-detail.component.css']
})
export class ItemListingDetailComponent {
  formatEnumName = formatEnumName
  ItemType = ItemType;
  ItemRarity = ItemRarity;

  @Input()
  listing!: HomebrewItemData;
}
