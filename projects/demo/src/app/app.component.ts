import { SelectSourceModel } from '../../../common/src/lib/models/select-source.model';
import { ConfigModel } from '../../../common/src/lib/models/config.model';
import { Component, OnInit } from '@angular/core';
import { Constants } from './constants/constants';
import { EventModel } from '@lowcodeunit/lcu-select-common';
import { FormGroup, AbstractControl, FormControl, Validators } from '@angular/forms';
import { distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'lcu-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'lcu-select demo';


  /**
   * Setup config for selection component
   */
  public DemoConfig: ConfigModel;
  public Form: FormGroup;

/**
   * Access ConditionVariableNames field
   */
  public get LCUSelect(): AbstractControl {
    return this.Form.get('lcuSelect');
  }

  public ngOnInit(): void {

    this.Form = new FormGroup({
      lcuSelect: new FormControl('', { validators: Validators.required })
    });

    this.DemoConfig = new ConfigModel();
    this.DemoConfig.MultiSelect.Enable = true;
    this.DemoConfig.MultiSelect.SelectAll = true;
    this.DemoConfig.MultiSelect.DefaultSelectAll = true;

    this.DemoConfig.Source = Constants.SELECT_VALS;

    this.onChange();
  }

    protected onChange(): void {

      // use distinctUntilChange(), so we don't get multiple change events
      this.LCUSelect.valueChanges
      .pipe(distinctUntilChanged())
      .subscribe(val => {
        console.log('onChange app', val);
      });
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
  public SelectAllSelected(evt: EventModel): void {
    console.log('select all event', evt);
  }

  /**
   * Listener for when a select option is selected
   *
   * @param evt event model for selected item
   */
  public SelectOptionSelected(evt: EventModel): void {
    console.log('option selected', evt);
  }

  public Search(): void {

  }

  public ClearForm(): void {

  }

  public EnableForm(): void {
    this.Form.enable();
  }

  public DisableForm(): void {
    this.Form.disable();
  }

}
