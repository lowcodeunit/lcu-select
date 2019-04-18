import { SelectSourceModel } from 'projects/common/src/lib/models/select-source.model';

// @dynamic
/**
 * @dynamic
 */

export class Constants {

public static readonly SELECT_VALS: Array<SelectSourceModel> = [
  {Key: 'Temperature', Value: 't'},
  {Key: 'Surface Temp', Value: 'sfc_t'},
  {Key: 'Precipitation', Value: 'prate'},
  {Key: 'Precipitation Type', Value: 'ptype'},
  {Key: 'Wind Speed', Value: 'wspd'},
  {Key: 'Wind Gust', Value: 'gust'},
  {Key: 'Wind Direction', Value: 'wdir'},
  {Key: 'Cloud Cover', Value: 'cloudcover'},
  {Key: 'Radiation', Value: 'rad'},
  {Key: 'Visibility', Value: 'vis'},
  {Key: 'Elevation', Value: 'hgt'},
  {Key: 'Snow Depth', Value: 'snod'}];
}
