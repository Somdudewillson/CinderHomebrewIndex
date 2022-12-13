import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnhancedBooleanInputComponent } from './enhanced-boolean-input.component';

describe('EnhancedBooleanInputComponent', () => {
  let component: EnhancedBooleanInputComponent;
  let fixture: ComponentFixture<EnhancedBooleanInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EnhancedBooleanInputComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EnhancedBooleanInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
