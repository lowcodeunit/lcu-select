import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ChangeDetectorRef, AfterViewInit, forwardRef } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl, ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

import { MatOption, MatSelect } from '@angular/material';

import { SelectSourceModel } from '../../models/select-source.model';
import { ConfigModel } from '../../models/config.model';
import { EventModel } from '../../models/event.model';

@Component({
  selector: 'lcu-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss'],
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
    useExisting: forwardRef(() => SelectComponent),
    multi: true
  }]
})

export class SelectComponent implements OnInit, ControlValueAccessor {

/***************************** */
// ** INPUTS */
/***************************** */
@Input()
set Config(val: ConfigModel) {
  if (!val) {
    return;
  }

  this._config = val;

  // when things are initialized
  if (this.isReady) {
    this.componentInitialized();
  }
}

get Config(): ConfigModel {

  if (!this._config) {
    return;
  }
  return this._config;
}

@Input() public Disabled: boolean;

/**
 * Placeholder text
 */
@Input() public Placeholder: string;

/**
 * Control value
 */
@Input('value') public _value: any;


/***************************** */
// ** OUTPUTS */
/***************************** */

/**
 * Event fired when select is opened or closed, passing boolean value
 */
@Output() public SelectOpened: EventEmitter<boolean> = new EventEmitter<boolean>();

/**
 * Event for when the select all option is selected
 */
@Output() public SelectAllSelected: EventEmitter<EventModel> = new EventEmitter<EventModel>();

/**
 * Event for when a option is selected
 */
@Output() public SelectOptionSelected: EventEmitter<EventModel> = new EventEmitter<EventModel>();

/**
 * Event for when something is selected
 */
@Output() public SelectedEvent: EventEmitter<Array<EventModel>> = new EventEmitter<Array<EventModel>>();

/***************************** */
// ** VIEWCHILDREN */
/***************************** */

/**
* Select all option
*/
@ViewChild('SelectAllOptionControl') SelectAllOptionControl: MatOption;

/**
* Mat-Select
*/
@ViewChild('SelectControl') SelectControl: MatSelect;


/***************************** */
// ** PROPERTIES */
/***************************** */

/**
 * Configuration object of property values
 */
protected _config: ConfigModel;

/**
* When everything is ready to use
*/
protected isReady: boolean;

/**
* Set source for select all option
*/
public SelectAllObj: SelectSourceModel = new SelectSourceModel('Select All', null);

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

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


constructor(private changeDetector: ChangeDetectorRef) { }

/***************************** */
// ** LIFECYCLE */
/***************************** */

public ngOnInit(): void {
  this.isReady = true;

 // this.componentInitialized();
}

/**
 * Handle when selection is opened or closed
 *
 * @param evt boolean, if open or closed
 */
public OpenedChangeHandler(evt: boolean): void {
  this.SelectOpened.emit(evt);
}

/**
 * Handle when the select all option is selected
 *
 * @param evt selection event
 *
 * @param name name of selection
 */
public SelectAllHandler(): void {
 this.selectValues();
}

/**
 * Handle when a selection is selected or unselected
 *
 * @param evt selection event
 *
 * @param name name of selection
 */
public SelectOptionsHandler(): void {
 this.toggleSelectAll();
 this.optionSelected();
}

 /**
 * Update value
 *
 * Remove select all option
 *
 * @param evt selection event
 */
protected optionSelected(evt?: Event): void {

  /**
   * Remove select all value
   */
  if (Array.isArray(this.SelectControl.value)) {
    this.value = this.SelectControl.value.filter((item: SelectSourceModel) => {
      return item.Key.toUpperCase() !== 'SELECT ALL';
    });
  } else {
    this.value = this.SelectControl.value;
  }

  this.onChange(this.value);
  this.SelectedEvent.emit(this.value);
}

  /**
  * Uncheck the select all option, if one or more selections are unchecked
  *
  * Check the select all option when all selections are checked
  */
  protected toggleSelectAll(): void {
    if (this.SelectAllOptionControl) {
      if (this.SelectAllOptionControl.selected) {
        this.SelectAllOptionControl.deselect();
      }
    }

   if (this.SelectControl.value.length === this.Config.Source.length) {
      this.SelectAllOptionControl.select();
    }
  }

 /**
 * When everything is ready
 */
protected componentInitialized(): void {
  this.forceChangeDetection();
  this.initialSelectionOptions();
  this.selectValues();
}

 /**
 * Setup initial select all
 */
protected initialSelectionOptions(): void {

  if (this.Config.MultiSelect.Enable && this.Config.MultiSelect.SelectAll && this.Config.MultiSelect.DefaultSelectAll) {
    this.SelectAllOptionControl.select();
  } else if (this.SelectAllOptionControl) {
    this.SelectAllOptionControl.deselect();
  }
 }

/**
*
* @param val configuration object or json
*/
protected selectValues(): void {

if (this.SelectAllOptionControl && this.SelectAllOptionControl.selected) {
   // make a new copy of source array
  const arr: Array<SelectSourceModel> = [...this.Config.Source];
   // add select all option to the front of the variable names array
   arr.unshift(this.SelectAllObj);

   // update varNames value
   this.SelectControl.value = arr;
 } else {
  this.SelectControl.value = [];
 }

 this.optionSelected();
}
 /**
  * Force change detection, using this to reset items under *ngIf
  */
 protected forceChangeDetection(): void {
  this.changeDetector.detectChanges();
 }

/***************************** */
// ** CHANGE EVENT - needed in order for this to work as a form control in reactive forms */
/***************************** */


/**
 * Implementation of the writeValue function given through the ControlValueAccessor class.
 *
 * Writes the dropdown value to the element.
 *
 * @param value The value to write.
 */
writeValue(value: any): void {
  this.value = value;

  // set config source value to value
  this.Config.Source = value;
  this.componentInitialized();
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
  this.Disabled = isDisabled;
}

/**
 * If the value has changed, emit a event to communicate to the outside world.
 *
 * @param val The value to emit.
 */
public emitSelected(val: Array<EventModel>) {
  this.SelectedEvent.emit(val);

  // prevent double emit
  this.SelectedEvent.complete();
}

}


