import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemSearchFieldsComponent } from './item-search-fields.component';

describe('ItemSearchFieldsComponent', () => {
  let component: ItemSearchFieldsComponent;
  let fixture: ComponentFixture<ItemSearchFieldsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ItemSearchFieldsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ItemSearchFieldsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
