import { MultiSelectModel } from './multi-select.model';
import { SelectSourceModel } from './select-source.model';

export class ConfigModel {

  /**
   * Display property
   */
  public DisplayProperty: string;

  /**
   * Multi select options
   */
  public MultiSelect: MultiSelectModel;

  /**
   * Datasource for select
   */
  public Source: Array<SelectSourceModel>;

  /**
   * Constructor for select component
   */
   constructor () {

    // initialize a new multiselect object
    this.MultiSelect = new MultiSelectModel();
   }
}
