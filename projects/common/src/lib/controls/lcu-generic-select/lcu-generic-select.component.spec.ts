import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LcuGenericSelectComponent } from './lcu-generic-select.component';

describe('LcuGenericSelectComponent', () => {
  let component: LcuGenericSelectComponent;
  let fixture: ComponentFixture<LcuGenericSelectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LcuGenericSelectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LcuGenericSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
