import { Component, ViewChild } from '@angular/core';
import {
  ItemRarity,
  ItemType,
} from 'src/app/models/HomebrewEnums';
import {
  HomebrewItemSearchData,
  HomebrewSearchData,
} from 'src/app/models/HomebrewSearchData';
import { IHomebrewSearchExpander } from 'src/app/models/IHomebrewSearchExpander';
import { EnhancedBooleanInputComponent } from 'src/app/search_inputs/enhanced-boolean-input/enhanced-boolean-input.component';
import { EnumInputComponent } from 'src/app/search_inputs/enum-input/enum-input.component';

@Component({
  selector: 'item-search-fields',
  templateUrl: './item-search-fields.component.html',
  styleUrls: ['./item-search-fields.component.css'],
})
export class ItemSearchFieldsComponent
  implements IHomebrewSearchExpander<HomebrewItemSearchData>
{
  ItemType = ItemType;
  ItemRarity = ItemRarity;

  @ViewChild('itemType')
  itemTypeField!: EnumInputComponent<ItemType>;
  @ViewChild('rarity')
  rarityField!: EnumInputComponent<ItemRarity>;
  @ViewChild('requiresAttunement')
  requiresAttunementField!: EnhancedBooleanInputComponent;
  @ViewChild('hasCharges')
  hasChargesField!: EnhancedBooleanInputComponent;

  extendSearchData(baseData: HomebrewSearchData): HomebrewItemSearchData {
    let result = new HomebrewItemSearchData();
    HomebrewSearchData.copyHomebrewSearchData(baseData, result);

    result.itemType = this.itemTypeField.getValue();
    result.rarity = this.rarityField.getValue();
    result.requiresAttunement = this.requiresAttunementField.getValue();
    result.hasCharges = this.hasChargesField.getValue();

    return result;
  }
}
