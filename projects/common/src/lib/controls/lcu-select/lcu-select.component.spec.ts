import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LcuSelectComponent } from './lcu-select.component';

describe('LcuSelectComponent', () => {
  let component: LcuSelectComponent;
  let fixture: ComponentFixture<LcuSelectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LcuSelectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LcuSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
