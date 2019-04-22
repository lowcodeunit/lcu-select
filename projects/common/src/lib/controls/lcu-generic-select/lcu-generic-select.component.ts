import { Component, OnInit, forwardRef, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { MatOption, MatSelect } from '@angular/material';

export interface Food {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'lcu-generic-select',
  templateUrl: './lcu-generic-select.component.html',
  styleUrls: ['./lcu-generic-select.component.scss'],
   /**
   * NG_VALUE_ACCESSOR for allowing the typeAhead to work with reactive forms
   * Other pieces to this:
   *  getter/setter for the value property
   *  public onTouched: any = () => { };
      public writeValue(obj: any): void { this.value = obj; }
      public registerOnChange(fn: any): void { this.onChange = fn; }
      public registerOnTouched(fn: any): void { this.onTouched = fn; }
      public setDisabledState?(isDisabled: boolean): void {  this.disabledTypeAhead = isDisabled; }
   */
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => LcuGenericSelectComponent),
    multi: true
  }]
})

export class LcuGenericSelectComponent implements OnInit, ControlValueAccessor {

  @ViewChild('Select') Select: MatSelect;
  @ViewChild('SelectOption') SelectOption: MatOption;

  public foods: Array<Food>;

  public readonlyToggle: boolean = false;

  /** Defines the value of the dropdown to be passed to the reactive form. */
  @Input('value') public _value: any;

  /** Event emitter for when a value is selected. Can be used to render something else in the UI. */
  @Output() public selectedEvent: EventEmitter<any> = new EventEmitter<any>();

  /** Fired when any changes to the model are detected */
  public onChange: any = () => { };

  /** Fired when the component is blurred. TODO: This currently doesn't work - need to figure out why and fix it */
  public onTouched: any = () => { };

  /** Getter for the value property */
  get value() {
    return this._value;
  }

  /** Setter for the value property */
  set value(val) {
    this._value = val;
    this.onChange(val);
    this.onTouched();
    if (val) { this.emitSelected(val); }
  }


  constructor() {
  }

  ngOnInit() {

    this.foods  = [
      {value: 'steak-0', viewValue: 'Steak'},
      {value: 'pizza-1', viewValue: 'Pizza'},
      {value: 'tacos-2', viewValue: 'Tacos'}
    ];
  }

  public OptionSelected(evt: Event): void {
    console.log(evt);
    const selected = this.Select.selected as MatOption;
    this.value = selected.value;
    this.onChange(this.value);
    this.selectedEvent.emit(this.value);
  }

  /**
   * Implementation of the writeValue function given through the ControlValueAccessor class.
   * Writes the dropdown value to the element.
   *
   * @param value The value to write.
   */
  writeValue(value: any): void {
    this.value = value;
  }

  /**
   * Implementation of the registerOnChange function given through the ControlValueAccessor class.
   * Registers the onChange callback to this.onChange().
   *
   * @param fn The callback function.
   */
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  /**
   * Implementation of the registerOnTouched function given through the ControlValueAccessor class.
   * Registers the onTouched callback to this.onTouched().
   *
   * @param fn The callback function.
   */
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  /**
   * Implementation of the setDisabledState function given through the ControlValueAccessor class.
   * Detects when the disabled attribute changes, and sets it accordingly.
   *
   * @param isDisabled The boolean value to set.
   */
  setDisabledState(isDisabled: boolean): void {
    this.readonlyToggle = isDisabled;
  }

  /**
   * If the value has changed, emit a event to communicate to the outside world.
   *
   * @param val The value to emit.
   */
  public emitSelected(val: any) {
    this.selectedEvent.emit(val);
  }
}
