import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomMatFormFieldComponent } from './custom-mat-form-field.component';

describe('CustomMatFormFieldComponent', () => {
  let component: CustomMatFormFieldComponent;
  let fixture: ComponentFixture<CustomMatFormFieldComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomMatFormFieldComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomMatFormFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
