import { SelectSourceModel } from 'projects/common/src/lib/models/select-source.model';
import { ConfigModel } from 'projects/common/src/lcu.api';

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

public static readonly JSON_CONFIG: ConfigModel = {
    'MultiSelect': {
      'DefaultSelectAll': true,
      'Enable': true,
      'SelectAll': true
    },
    'DisplayProperty': 'Key',
    'Source':
      [
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
        {Key: 'Snow Depth', Value: 'snod'}]

  };

  public static apiKey: string = 'asdsfd';

  public static readonly FORECAST_MODEL_CONFIG = {
    'MultiSelect': {
      'DefaultSelectAll': false,
      'Enable': false,
      'SelectAll': false
    },
    'DisplayProperty': 'Name',
    'Source': []

  };

  public static readonly CONDITION_VARIABLES = [
    { Name: 'Name 1', URLPrefix: 'Prefix 1', FcstCfg: 'FcstCfg 1', Host: 'Host 1', VarNames: 'VarNames 1' },
    { Name: 'Name 2', URLPrefix: 'Prefix 2', FcstCfg: 'FcstCfg 2', Host: 'Host 2', VarNames: 'VarNames 2' },
    { Name: 'Name 3', URLPrefix: 'Prefix 3', FcstCfg: 'FcstCfg 3', Host: 'Host 3', VarNames: 'VarNames 3' },
    { Name: 'Name 4', URLPrefix: 'Prefix 4', FcstCfg: 'FcstCfg 4', Host: 'Host 4', VarNames: 'VarNames 4' },
  ];
}

