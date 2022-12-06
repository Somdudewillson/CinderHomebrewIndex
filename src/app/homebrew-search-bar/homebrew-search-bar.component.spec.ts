import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomebrewSearchBarComponent } from './homebrew-search-bar.component';

describe('HomebrewSearchBarComponent', () => {
  let component: HomebrewSearchBarComponent;
  let fixture: ComponentFixture<HomebrewSearchBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomebrewSearchBarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomebrewSearchBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
