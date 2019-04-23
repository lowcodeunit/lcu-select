export class SelectSourceModel {

  public Key: string;
  public Value: string;

  /**
   * Constructor for selection source model
   *
   * @param Key display value for select item
   *
   * @param Value data value of select item
   */

  constructor(key: string, value: string) {
    this.Key = key;
    this.Value = value;
  }
}
