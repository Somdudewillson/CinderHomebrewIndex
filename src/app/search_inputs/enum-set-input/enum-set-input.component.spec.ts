import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnumSetInputComponent } from './enum-set-input.component';

describe('EnumSetInputComponent', () => {
  let component: EnumSetInputComponent;
  let fixture: ComponentFixture<EnumSetInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EnumSetInputComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EnumSetInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
