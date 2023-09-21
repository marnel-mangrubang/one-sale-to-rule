import { city_caps_conversion } from "./Constants";

export function camelCaseCity(cityname) {
  for (let i = 0; i < city_caps_conversion.length; i++) {
    let myitem = city_caps_conversion[i].AVFM_name;
    let mycityname = city_caps_conversion[i].City_Name;
    if (myitem === cityname) {
      return mycityname;
    }
  }
}