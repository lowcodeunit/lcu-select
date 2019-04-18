
import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ChangeDetectorRef, AfterViewInit, forwardRef } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl, ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { MatOption } from '@angular/material';

import { SelectSourceModel } from '../../models/select-source.model';
import { ConfigModel } from '../../models/config.model';
import { EventModel } from '../../models/event.model';

@Component({
  selector: 'lcu-select-component',
  templateUrl: './lcu-select.component.html',
  styleUrls: ['./lcu-select.component.scss'],
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
      useExisting: forwardRef(() => LcuSelectComponent),
      multi: true
    }]
})
export class LcuSelectComponent implements OnInit, AfterViewInit, ControlValueAccessor {

   /***************************** */
 // ** PROPERTIES */
 /***************************** */

   /**
   * Select component form group
   */
  public Form: FormGroup;

 /**
  * When everything is ready to use
  */
 protected isReady: boolean;

 /**
  * Set source for select all option
  */
 public SelectAllObj: SelectSourceModel = new SelectSourceModel('Select All', null);


  public _value: any;

  /** Getter for the value property */
  public get value(): any { return this._value; }
  /** Setter for the value property */
  public set value(val: any) {

    if (this._value !== val) {
      this._value = val;
      this.onChange(val);
      this.onTouched();
    }
  }

  /***************************** */
  // ** INPUTS */
 /***************************** */

  /**
   * Configuration object of property values
   */
  private _config: ConfigModel;

  @Input()
  set Config(val: ConfigModel) {
    if (!val) {
      return;
    }

    this._config = val;

    // when things are initialized
    if (this.isReady) {
      this.forceChangeDetection();
      this.componentInitialized();
    }
  }
  get Config(): ConfigModel {

    if (!this._config) {
      return;
    }
    return this._config;
  }

  @Input() Disable: boolean;


  /***************************** */
  // ** OUTPUTS */
  /***************************** */


  /**
   * Event fired when select is opened or closed, passing boolean value
   */
  @Output() SelectOpened: EventEmitter<boolean> = new EventEmitter<boolean>();

  /**
   * Event for when the select all option is selected
   */
  @Output() SelectAllSelected: EventEmitter<EventModel> = new EventEmitter<EventModel>();

  /**
   * Event for when a option is selected
   */
  @Output() SelectOptionSelected: EventEmitter<EventModel> = new EventEmitter<EventModel>();


  /***************************** */
 // ** VIEWCHILDREN */
 /***************************** */


 /**
  * Select all option
  */
 @ViewChild('SelectAllOptionControl') SelectAllOptionControl: MatOption;

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  /**
   * Access ConditionVariableNames field
   */
  public get SelectControl(): AbstractControl {
    return this.Form.get('selectFormControl');
  }


  constructor(private changeDetector: ChangeDetectorRef) { }

   /***************************** */
 // ** LIFECYCLE */
 /***************************** */

  public ngOnInit(): void {
    this.isReady = true;

    this.Form = new FormGroup({
      selectFormControl: new FormControl('', { validators: Validators.required })
    });

    this.forceChangeDetection();
    this.componentInitialized();
  }

  public ngAfterViewInit(): void {

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
  public SelectAllHandler(evt: Event, name: string): void {
   this.selectValues();

    const e: EventModel = new EventModel();
    e.Event = evt;
    e.Name = name;

   this.SelectAllSelected.emit(e);
  }

  /**
   * Handle when a selection is selected or unselected
   *
   * @param evt selection event
   *
   * @param name name of selection
   */
  public SelectOptionsHandler(evt: Event, name: string): void {
   this.toggleSelectAll();

   const e: EventModel = new EventModel();
    e.Event = evt;
    e.Name = name;

    this.SelectOptionSelected.emit(e);
  }

  /**
   * When everything is ready
   */
  protected componentInitialized(): void {
    this.initialSelectionOptions();
    this.selectValues();
  }

/**
 *
 * @param val configuration object or json
 */
  protected selectValues(): void {

    if (this.SelectAllOptionControl.selected) {
       // make a new copy of source array
       const arr: Array<SelectSourceModel> = [...this.Config.Source];

       // add select all option to the front of the variable names array
       arr.unshift(this.SelectAllObj);

       // update varNames value
        this.SelectControl.patchValue(arr);
     } else {
       this.SelectControl.patchValue([]);
     }
    }

    /**
    * Uncheck the select all option, if one or more selections are unchecked
    *
    * Check the select all option when all selections are checked
    */
    protected toggleSelectAll(): void {
      if (this.SelectAllOptionControl.selected) {
        this.SelectAllOptionControl.deselect();
      }

      if (this.SelectControl.value.length === this.Config.Source.length) {
        this.SelectAllOptionControl.select();
      }
    }

    /**
   * Setup initial selections
   */
  protected initialSelectionOptions(): void {

    // tslint:disable-next-line:max-line-length
    if (this.Config.MultiSelect.Enable && this.Config.MultiSelect.SelectAll && this.Config.MultiSelect.DefaultSelectAll) {
      this.SelectAllOptionControl.select();
    } else {
      this.SelectAllOptionControl.deselect();
    }
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


   /** Fired when any changes to the model are detected */
  public onChange: any = () => {

      // listen for changes
      this.SelectControl.valueChanges.subscribe(val => {

      });
    };

  /** Fired when the component is blurred. TODO: This currently doesn't work - need to figure out why and fix it */
  public onTouched: any = () => { };
  public writeValue(obj: any): void {
    this.value = obj;
    this.SelectControl.setValue(obj);
    }

  public registerOnChange(fn: any): void {
    this.onChange = fn;
    }

  public registerOnTouched(fn: any): void {
    this.onTouched = fn;
    }

  public setDisabledState?(isDisabled: boolean): void {
    this.Disable = isDisabled;
    this.Disable ? this.SelectControl.disable() : this.SelectControl.enable();
    }

}
