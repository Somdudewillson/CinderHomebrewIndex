import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomebrewSearchResultsComponent } from './homebrew-search-results.component';

describe('HomebrewSearchResultsComponent', () => {
  let component: HomebrewSearchResultsComponent;
  let fixture: ComponentFixture<HomebrewSearchResultsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomebrewSearchResultsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomebrewSearchResultsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
