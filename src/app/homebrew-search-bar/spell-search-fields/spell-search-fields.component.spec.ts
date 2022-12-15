import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpellSearchFieldsComponent } from './spell-search-fields.component';

describe('SpellSearchFieldsComponent', () => {
  let component: SpellSearchFieldsComponent;
  let fixture: ComponentFixture<SpellSearchFieldsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SpellSearchFieldsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SpellSearchFieldsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
