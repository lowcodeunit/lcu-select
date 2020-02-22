import { FormGroup, NG_VALUE_ACCESSOR, ControlValueAccessor, NgControl, FormBuilder } from '@angular/forms';
import { Component, OnInit, HostBinding, OnDestroy, forwardRef, ElementRef, Injector, DoCheck, Input } from '@angular/core';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { MatFormFieldControl } from '@angular/material/form-field';
import { Subject } from 'rxjs/internal/Subject';
import { FocusMonitor } from '@angular/cdk/a11y';

export class MyTel {
  constructor(public area: string) {}
}

@Component({
  selector: 'lcu-custom-mat-form-field',
  templateUrl: './custom-mat-form-field.component.html',
  styleUrls: ['./custom-mat-form-field.component.scss'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
   useExisting: forwardRef(() => CustomMatFormFieldComponent),
   multi: true
  },
    {
    provide: MatFormFieldControl,
    useExisting: CustomMatFormFieldComponent
  }],
  host: {
    '[id]': 'id',
    '[attr.aria-describedby]': 'describedBy'
 }
})

export class CustomMatFormFieldComponent implements MatFormFieldControl<MyTel>, ControlValueAccessor, OnInit, OnDestroy, DoCheck {

  public _disabled = false;

  public _placeholder: string;

  protected touched: boolean;

  static nextId = 0;
  parts: FormGroup;
  stateChanges = new Subject<void>();
  focused = false;
  ngControl = null;
  errorState = false;
  controlType = 'lcu-custom-mat-form-field';

 @HostBinding() id = `lcu-custom-mat-form-field-input-${CustomMatFormFieldComponent.nextId}`;

 @HostBinding('class.floating')
 get shouldLabelFloat() {
   return this.focused || !this.empty;
 }

 @HostBinding('attr.aria-describedby') describedBy = '';
 setDescribedByIds(ids: string[]) {
  this.describedBy = ids.join(' ');
}


 _value: any;

get value(): any {
   return this._value;
}
set value(value) {
   this._value = value;
   // this.editor.setContents(this._value);
   this.onChange(value);
   this.stateChanges.next();
}

@Input()
get placeholder() {
   return this._placeholder;
}
set placeholder(plh) {
   this._placeholder = plh;
   this.stateChanges.next();
}

@Input()
get required() {
   return this._required;
}
set required(req) {
   this._required = coerceBooleanProperty(req);
   this.stateChanges.next();
}
public _required = false;

@Input()
get disabled() {
   return this._disabled;
}
set disabled(dis) {
   this._disabled = coerceBooleanProperty(dis);
   this.stateChanges.next();
}

  constructor(public fb: FormBuilder, public elRef: ElementRef, public injector: Injector, public fm: FocusMonitor) {
    fm.monitor(elRef.nativeElement, true).subscribe(origin => {
      this.focused = !!origin;
      this.stateChanges.next();
    });
  }

  ngOnInit() {
    this.parts = this.fb.group({
      'test': ''
    })

    this.ngControl = this.injector.get(NgControl);

    if (this.ngControl != null) {
      this.ngControl.valueAccessor = this;
    }
  }

  ngOnDestroy() {
    this.stateChanges.complete();
    this.fm.stopMonitoring(this.elRef.nativeElement);
  }

  ngDoCheck(): void {
    if (this.ngControl) {
      this.errorState = this.ngControl.invalid && this.ngControl.touched;
      this.stateChanges.next();
    }
  }

  onContainerClick(event: MouseEvent) {
    // if ((event.target as Element).tagName.toLowerCase() !== 'div') {
    //    this.container.nativeElement.querySelector('div').focus();
    // }
 }

  get empty() {
    const n = this.parts.value;
    return !n.area;
 }

  onChange = (delta: any) => {};

  onTouched = () => {
     this.touched = true;
  }

  writeValue(delta: any): void {
     // this.editor.setContents(delta);
     this._value = delta;
  }

  registerOnChange(fn: (v: any) => void): void {
     this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

}
