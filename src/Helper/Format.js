import moment from "moment";

export function formatDate(date, delim = "/") {
  let temp_date = moment(date).format(`MM${delim}DD${delim}YYYY`);
  return temp_date;
}