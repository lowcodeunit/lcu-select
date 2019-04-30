import { Component, OnInit } from '@angular/core';
import { FormGroup, AbstractControl, FormControl, Validators } from '@angular/forms';
import { distinctUntilChanged } from 'rxjs/operators';
import { Constants } from './constants/constants';
import { ConfigModel, EventModel, Constantss } from '@lowcodeunit/lcu-select-common';

@Component({
  selector: 'lcu-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  public title: string = 'lcu-select demo';

  /**
   * Setup config for selection component
   */
  public DemoConfig: ConfigModel;
  public JSONConfig: ConfigModel;
  public ConditionsConfig: ConfigModel;
  public Form: FormGroup;

  public ConditionsData: any;

  /**
   * Access ConditionVariableNames field
   */
  public get LCUSelect(): AbstractControl {
    return this.Form.get('lcuSelect');
  }

  public get LCUConditions(): AbstractControl {
    return this.Form.get('lcuConditions');
  }

  public get TestSelect(): AbstractControl {
    return this.Form.get('testSelect');
  }

  public ngOnInit(): void {

    this.Form = new FormGroup({
      lcuSelect: new FormControl('', { validators: Validators.required }),
      lcuConditions: new FormControl('', { validators: Validators.required }),
      testSelect: new FormControl('', { validators: Validators.required })
    });

    this.JSONConfig = Constants.JSON_CONFIG;
   // this.LCUSelect.setValue(this.JSONConfig.Source);

    this.ConditionsData = Constants.CONDITION_VARIABLES;

    Constants.FORECAST_MODEL_CONFIG.Source = this.ConditionsData;
    this.ConditionsConfig = Constants.FORECAST_MODEL_CONFIG;

    // this.LCUConditions.setValue(this.ConditionsData);
    // this.TestSelect.setValue(this.ConditionsData);

    const toSelect = this.ConditionsData.find((c: any) => c.Name.toUpperCase() === 'NAME 3');

     this.LCUConditions.setValue(toSelect);
    // this.TestSelect.setValue(toSelect);

    this.onChange();
  }

    protected onChange(): void {

      // use distinctUntilChange(), prevent multiple change events
      // this.LCUSelect.valueChanges
      // .pipe(distinctUntilChanged())
      // .subscribe(val => {
      //   console.log('onChange app', val);
      // });
    }

  /**
   *
   * @param evt boolen for when selection is open or closed
   */
  public SelectionOpened(evt: boolean): void {

    let message: string;

    if (evt) {
      message = 'Selection open';
    } else {
      message = 'Selection closed';
    }
    console.log(message);
  }

  /**
   * Listener for when the select all option is selected
   *
   * @param evt event model for selected item
   */
  public SelectAllSelected(): void {
    console.log('select all event');
  }

  /**
   * Listener for when a select option is selected
   *
   * @param evt event model for selected item
   */
  public OptionSelected(evt: Event): void {
   // console.log('option selected, app', evt);
  }

}
