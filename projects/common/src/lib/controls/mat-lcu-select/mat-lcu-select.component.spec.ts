import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MatLcuSelectComponent } from './mat-lcu-select.component';

describe('MatLcuSelectComponent', () => {
  let component: MatLcuSelectComponent;
  let fixture: ComponentFixture<MatLcuSelectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MatLcuSelectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MatLcuSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
