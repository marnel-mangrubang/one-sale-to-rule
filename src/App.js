import React, { Component } from "react";
import "./App.css";
import readXlsxFile from "read-excel-file";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { CopyToClipboard } from "react-copy-to-clipboard";
import {
  comparePrice,
  compareOriginCode,
  compareDestinationCode,
  mergeObjects,
  mergeClub49,
  groupMeByOrigin,
  getMyFirstTuesday,
  getMySecondTuesday,
} from "./Helper/Helper";
import { CSVLink } from "react-csv";
import {
  saleFareHeaders,
  saleDetailsHeaders,
  city_caps_conversion,
} from "./Helper/Constants.js";
import CreateXML from "./Helper/CreateXML";
import { formatDate } from "./Helper/Format";

class App extends Component {
  // handleInputChange = (event) =>{
  //   readXlsxFile(event.files[0]).then((rows) => {
  //     // `rows` is an array of rows
  //     // each row being an array of cells.
  //     console.log(rows);
  //   })
  // }

  constructor(props) {
    super(props);
    this.state = {
      hidden_sheet: 4,
      selectedOption: "Saver",
      club49_sheet: false,
      xmloutput: "",
      copied: false,
      all_my_fares: [],
      default_markets: [],
      combined_saver_and_main: [],
      exceptions: [
        {
          code_origin: "",
          code_destination: "",
          travel_valid: "",
          service_begins: null,
          service_ends: null,
          begins_string: "",
          ends_string: "",
        },
      ],
      pulled_exception_fares: [],
      firstinput: "Initial data...",
      advance_purchase: "",
      sale_start_date: null,
      sale_start_date_string: "",
      sale_end_date: null,
      sale_end_date_string: "",
      travel_start_alaska_to_from_hawaii: null,
      travel_start_alaska_to_from_hawaii_string: "",
      travel_start_hawaii: null,
      travel_start_hawaii_string: "",
      travel_start_mexico: null,
      travel_start_mexico_string: "",
      travel_start_costa_rica: null,
      travel_start_costa_rica_string: "",
      travel_start_florida: null,
      travel_start_florida_string: "",
      travel_start_others: null,
      travel_start_others_string: "",

      //Club 49 variables
      travel_from_to_us: null,
      travel_from_to_us_string: "",
      travel_from_within_alaska: null,
      travel_from_within_alaska_string: "",
      travel_by_to_us: null,
      travel_by_to_us_string: "",
      travel_by_within_alaska: null,
      travel_by_within_alaska_string: "",
      days_availability_to_us: "Sunday, Monday, and Tuesday",
      days_availability_within_alaska: "Monday through Thursday and Saturday",

      proposed_from_clu49: null,
      proposed_from_clu49_string: "",
      proposed_to_clu49: null,
      proposed_to_clu49_string: "",
      //Club 49 variables

      travel_end_alaska_to_from_hawaii: null,
      travel_end_alaska_to_from_hawaii_string: "",
      travel_end_hawaii: null,
      travel_end_hawaii_string: "",
      travel_end_mexico: null,
      travel_end_mexico_string: "",
      travel_end_costa_rica: null,
      travel_end_costa_rica_string: "",
      travel_end_florida: null,
      travel_end_florida_string: "",
      travel_end_others: null,
      travel_end_others_string: "",

      days_availability_hawaii: "Mondays through Thursdays",
      days_availability_mexico: "Sundays through Wednesdays",
      days_availability_costa_rica: "Sundays through Wednesdays",
      days_availability_to_florida: "Mondays, Tuesdays, and Wednesdays",
      days_availability_from_florida: "Tuesdays, Wednesdays, and Thursdays",
      days_availability_others: "Tuesdays, Wednesdays, and Saturdays",

      proposed_start_pae: null,
      proposed_start_pae_string: "",
      proposed_end_pae: null,
      proposed_end_pae_string: "",
      proposed_start_hawaii: null,
      proposed_start_hawaii_string: "",
      proposed_end_hawaii: null,
      proposed_end_hawaii_string: "",
      proposed_start_others: null,
      proposed_start_others_string: "",
      proposed_end_others: null,
      proposed_end_others_string: "",

      blackout_start_alaska_to_from_hawaii: null,
      blackout_start_alaska_to_from_hawaii_string: "",
      blackout_end_alaska_to_from_hawaii: null,
      blackout_end_alaska_to_from_hawaii_string: "",
      blackout_start_to_hawaii: null,
      blackout_start_to_hawaii_string: "",
      blackout_end_to_hawaii: null,
      blackout_end_to_hawaii_string: "",
      blackout_start_from_hawaii: null,
      blackout_start_from_hawaii_string: "",
      blackout_end_from_hawaii: null,
      blackout_end_from_hawaii_string: "",
      blackout_start_mexico: null,
      blackout_start_mexico_string: "",
      blackout_end_mexico: null,
      blackout_end_mexico_string: "",
      blackout_start_costa_rica: null,
      blackout_start_costa_rica_string: "",
      blackout_end_costa_rica: null,
      blackout_end_costa_rica_string: "",
      blackout_start_others: null,
      blackout_start_others_string: "",
      blackout_end_others: null,
      blackout_end_others_string: "",

      showdata: this.displayData,
      postVal: "",
      textareaedit: true,
      sale_type: "",
      sale_objective: "",
    };

    this.displayData = [];

    this.onFileChange = this.onFileChange.bind(this);
    // this.cleanFile = this.cleanFile.bind(this);

    this.saveDefaultMarkets = this.saveDefaultMarkets.bind(this);
    this.grabDefaultsFromSheet = this.grabDefaultsFromSheet.bind(this);

    this.updateFirstInput = this.updateFirstInput.bind(this);

    this.createSaleDetails = this.createSaleDetails.bind(this);

    this.saleStartDateHandler = this.saleStartDateHandler.bind(this);
    this.saleEndDateHandler = this.saleEndDateHandler.bind(this);
    this.advancePurchaseHandler = this.advancePurchaseHandler.bind(this);

    this.travelStartAlaskaToFromHawaiiDateHandler = this.travelStartAlaskaToFromHawaiiDateHandler.bind(
      this
    );
    this.travelStartHawaiiHandler = this.travelStartHawaiiHandler.bind(this);
    this.travelStartMexicoHandler = this.travelStartMexicoHandler.bind(this);
    this.travelStartCostaRicaHandler = this.travelStartCostaRicaHandler.bind(
      this
    );
    //this.travelStartFloridaHandler = this.travelStartFloridaHandler.bind(this);
    this.travelStartOthersHandler = this.travelStartOthersHandler.bind(this);

    this.travelEndAlaskaToFromHawaiiDateHandler = this.travelEndAlaskaToFromHawaiiDateHandler.bind(
      this
    );
    this.travelEndHawaiiHandler = this.travelEndHawaiiHandler.bind(this);
    this.travelEndMexicoHandler = this.travelEndMexicoHandler.bind(this);
    this.travelEndCostaRicaHandler = this.travelEndCostaRicaHandler.bind(this);
    //this.travelEndFloridaHandler = this.travelEndFloridaHandler.bind(this);
    this.travelEndOthersHandler = this.travelEndOthersHandler.bind(this);

    this.daysAvailabilityHawaiiHandler = this.daysAvailabilityHawaiiHandler.bind(
      this
    );
    this.daysAvailabilityMexicoHandler = this.daysAvailabilityMexicoHandler.bind(
      this
    );
    this.daysAvailabilityCostaRicaHandler = this.daysAvailabilityCostaRicaHandler.bind(
      this
    );
    this.daysAvailabilityToFloridaHandler = this.daysAvailabilityToFloridaHandler.bind(
      this
    );
    this.daysAvailabilityFromFloridaHandler = this.daysAvailabilityFromFloridaHandler.bind(
      this
    );
    this.daysAvailabilityOthersHandler = this.daysAvailabilityOthersHandler.bind(
      this
    );

    this.proposedStartDateHawaiiHandler = this.proposedStartDateHawaiiHandler.bind(
      this
    );
    this.proposedEndDateHawaiiHandler = this.proposedEndDateHawaiiHandler.bind(
      this
    );
    this.proposedStartDateOthersHandler = this.proposedStartDateOthersHandler.bind(
      this
    );
    this.proposedEndDateOthersHandler = this.proposedEndDateOthersHandler.bind(
      this
    );

    this.blackoutStartDateAlaskaToFromHawaiiHandler = this.blackoutStartDateAlaskaToFromHawaiiHandler.bind(
      this
    );
    this.blackoutEndDateAlaskaToFromHawaiiHandler = this.blackoutEndDateAlaskaToFromHawaiiHandler.bind(
      this
    );
    this.blackoutStartDateToHawaiiHandler = this.blackoutStartDateToHawaiiHandler.bind(
      this
    );
    this.blackoutEndDateToHawaiiHandler = this.blackoutEndDateToHawaiiHandler.bind(
      this
    );
    this.blackoutStartDateFromHawaiiHandler = this.blackoutStartDateFromHawaiiHandler.bind(
      this
    );
    this.blackoutEndDateFromHawaiiHandler = this.blackoutEndDateFromHawaiiHandler.bind(
      this
    );
    this.blackoutStartDateMexicoHandler = this.blackoutStartDateMexicoHandler.bind(
      this
    );
    this.blackoutEndDateMexicoHandler = this.blackoutEndDateMexicoHandler.bind(
      this
    );
    this.blackoutStartDateCostaRicaHandler = this.blackoutStartDateCostaRicaHandler.bind(
      this
    );
    this.blackoutEndDateCostaRicaHandler = this.blackoutEndDateCostaRicaHandler.bind(
      this
    );
    this.blackoutStartDateOthersHandler = this.blackoutStartDateOthersHandler.bind(
      this
    );
    this.blackoutEndDateOthersHandler = this.blackoutEndDateOthersHandler.bind(
      this
    );
  }

  componentDidMount() {
    // fetch('https://resource.alaskaair.net/-/media/files/deals/qa-files/qa-winter-sale')
    // .then(response => response.text())
    // .then((response) => {
    //     var xml = new XMLParser().parseFromString(response);    // Assume xmlText contains the example XML
    //     //console.log(xml);
    //     //console.log(xml.getElementsByTagName('TravelDates'));
    //     let deal_set_elem = xml.getElementsByTagName('DealSet');
    //     this.setState({
    //       xml_response: deal_set_elem
    //     });
    // }).catch((err) => {
    //     console.log('fetch', err)
    // })
  }

  updateFirstInput(e) {
    this.setState({ firstinput: e.target.value });
  }

  markAsDefault(def_market) {
    let array_all_combined_prices = [...this.state.combined_saver_and_main];

    this.state.combined_saver_and_main.some((item) => {
      if (def_market === item.name && item.default !== true) {
        // if(item.default === false){
        let index = array_all_combined_prices.indexOf(item);
        // console.log(index + " " + item.name);
        if (index !== -1) {
          item["default"] = true;
        }
        // }
      }
    });
  }

  saveDefaultMarkets(e) {
    let temp_val = e.target.value;
    temp_val = temp_val.split("\n");

    const new_defaults = temp_val.map((item) => {
      let split_market_and_price = item.replace(/\s/g, "");
      split_market_and_price = split_market_and_price.match(/.{1,6}/g);
      return {
        default_market: split_market_and_price[0],
        default_price: split_market_and_price[1],
      };
    });

    //Loop through default markets array and pass each code pair to markAsDefault function to make each default fare a default market
    new_defaults.map((myobj) => {
      this.markAsDefault(myobj["default_market"]);
    });

    this.setState({
      default_markets: new_defaults,
    });
  }

  grabDefaultsFromSheet(pair, price) {
    // let temp_pair = pair;
    // let temp_price = price;
    let new_defaults = [];
    let temp_obj = {
      default_market: pair,
      default_price: price,
    };

    //let new_defaults.push(temp_obj);

    //Loop through default markets array and pass each code pair to markAsDefault function to make each default fare a default market
    new_defaults.map((myobj) => {
      this.markAsDefault(myobj["default_market"]);
    });

    this.setState({
      default_markets: new_defaults,
    });
  }

  saleStartDateHandler(date) {
    let temp_string = formatDate(date, "-");

    this.setState({
      sale_start_date: date,
      sale_start_date_string: temp_string,
    });

    //console.log(verifyMyAirportCode("SJC"));

    //console.log("Sale Start Date: "+this.state.sale_start_date);
    // console.log("Sale Start Date String: "+this.state.sale_start_date_string);
  }

  saleEndDateHandler(date) {
    let temp_string = formatDate(date, "-");
    this.setState({
      sale_end_date: date,
      sale_end_date_string: temp_string,
    });
  }

  advancePurchaseHandler(e) {
    this.setState({
      advance_purchase: e.target.value,
    });
  }

  travelStartAlaskaToFromHawaiiDateHandler(date) {
    let temp_string = formatDate(date, "-");
    this.setState({
      travel_start_alaska_to_from_hawaii: date,
      travel_start_alaska_to_from_hawaii_string: temp_string,
    });
  }
  travelStartHawaiiHandler(date) {
    let temp_string = formatDate(date, "-");
    this.setState({
      travel_start_hawaii: date,
      travel_start_hawaii_string: temp_string,
    });
  }
  travelStartMexicoHandler(date) {
    let temp_string = formatDate(date, "-");
    this.setState({
      travel_start_mexico: date,
      travel_start_mexico_string: temp_string,
    });
  }
  travelStartCostaRicaHandler(date) {
    let temp_string = formatDate(date, "-");
    this.setState({
      travel_start_costa_rica: date,
      travel_start_costa_rica_string: temp_string,
    });
  }
  travelStartOthersHandler(date) {
    let temp_string = formatDate(date, "-");
    this.setState({
      travel_start_others: date,
      travel_start_others_string: temp_string,
      travel_start_florida: date,
      travel_start_florida_string: temp_string,
    });
  }

  travelEndAlaskaToFromHawaiiDateHandler(date) {
    let temp_string = formatDate(date, "-");
    this.setState({
      travel_end_alaska_to_from_hawaii: date,
      travel_end_alaska_to_from_hawaii_string: temp_string,
    });
  }
  travelEndHawaiiHandler(date) {
    let temp_string = formatDate(date, "-");
    this.setState({
      travel_end_hawaii: date,
      travel_end_hawaii_string: temp_string,
    });
  }
  travelEndMexicoHandler(date) {
    let temp_string = formatDate(date, "-");
    this.setState({
      travel_end_mexico: date,
      travel_end_mexico_string: temp_string,
    });
  }
  travelEndCostaRicaHandler(date) {
    let temp_string = formatDate(date, "-");
    this.setState({
      travel_end_costa_rica: date,
      travel_end_costa_rica_string: temp_string,
    });
  }
  travelEndOthersHandler(date) {
    let temp_string = formatDate(date, "-");
    this.setState({
      travel_end_others: date,
      travel_end_others_string: temp_string,
      travel_end_florida: date,
      travel_end_florida_string: temp_string,
    });
  }

  daysAvailabilityHawaiiHandler(e) {
    this.setState({
      days_availability_hawaii: e.target.value,
    });
  }
  daysAvailabilityMexicoHandler(e) {
    this.setState({
      days_availability_mexico: e.target.value,
    });
  }
  daysAvailabilityCostaRicaHandler(e) {
    this.setState({
      days_availability_costa_rica: e.target.value,
    });
  }
  daysAvailabilityToFloridaHandler(e) {
    this.setState({
      days_availability_to_florida: e.target.value,
    });
  }
  daysAvailabilityFromFloridaHandler(e) {
    this.setState({
      days_availability_from_florida: e.target.value,
    });
  }
  daysAvailabilityOthersHandler(e) {
    this.setState({
      days_availability_others: e.target.value,
    });
  }

  proposedStartDatePAEHandler(date) {
    let temp_string = formatDate(date, "-");
    this.setState({
      proposed_start_pae: date,
      proposed_start_pae_string: temp_string,
    });
  }
  proposedEndDatePAEHandler(date) {
    let temp_string = formatDate(date, "-");
    this.setState({
      proposed_end_pae: date,
      proposed_end_pae_string: temp_string,
    });
  }

  proposedStartDateHawaiiHandler(date) {
    let temp_string = formatDate(date, "-");
    this.setState({
      proposed_start_hawaii: date,
      proposed_start_hawaii_string: temp_string,
    });
  }
  proposedEndDateHawaiiHandler(date) {
    let temp_string = formatDate(date, "-");
    this.setState({
      proposed_end_hawaii: date,
      proposed_end_hawaii_string: temp_string,
    });
  }
  proposedStartDateOthersHandler(date) {
    let temp_string = formatDate(date, "-");
    this.setState({
      proposed_start_others: date,
      proposed_start_others_string: temp_string,
    });
  }
  proposedEndDateOthersHandler(date) {
    let temp_string = formatDate(date, "-");
    this.setState({
      proposed_end_others: date,
      proposed_end_others_string: temp_string,
    });
  }

  blackoutStartDateAlaskaToFromHawaiiHandler(date) {
    let temp_string = formatDate(date, "-");
    this.setState({
      blackout_start_alaska_to_from_hawaii: date,
      blackout_start_alaska_to_from_hawaii_string: temp_string,
    });
  }
  blackoutEndDateAlaskaToFromHawaiiHandler(date) {
    let temp_string = formatDate(date, "-");
    this.setState({
      blackout_end_alaska_to_from_hawaii: date,
      blackout_end_alaska_to_from_hawaii_string: temp_string,
    });
  }
  blackoutStartDateToHawaiiHandler(date) {
    let temp_string = formatDate(date, "-");
    this.setState({
      blackout_start_to_hawaii: date,
      blackout_start_to_hawaii_string: temp_string,
    });
  }
  blackoutEndDateToHawaiiHandler(date) {
    let temp_string = formatDate(date, "-");
    this.setState({
      blackout_end_to_hawaii: date,
      blackout_end_to_hawaii_string: temp_string,
    });
  }
  blackoutStartDateFromHawaiiHandler(date) {
    let temp_string = formatDate(date, "-");
    this.setState({
      blackout_start_from_hawaii: date,
      blackout_start_from_hawaii_string: temp_string,
    });
  }
  blackoutEndDateFromHawaiiHandler(date) {
    let temp_string = formatDate(date, "-");
    this.setState({
      blackout_end_from_hawaii: date,
      blackout_end_from_hawaii_string: temp_string,
    });
  }
  blackoutStartDateMexicoHandler(date) {
    let temp_string = formatDate(date, "-");
    this.setState({
      blackout_start_mexico: date,
      blackout_start_mexico_string: temp_string,
    });
  }
  blackoutEndDateMexicoHandler(date) {
    let temp_string = formatDate(date, "-");
    this.setState({
      blackout_end_mexico: date,
      blackout_end_mexico_string: temp_string,
    });
  }
  blackoutStartDateCostaRicaHandler(date) {
    let temp_string = formatDate(date, "-");
    this.setState({
      blackout_start_costa_rica: date,
      blackout_start_costa_rica_string: temp_string,
    });
  }
  blackoutEndDateCostaRicaHandler(date) {
    let temp_string = formatDate(date, "-");
    this.setState({
      blackout_end_costa_rica: date,
      blackout_end_costa_rica_string: temp_string,
    });
  }
  blackoutStartDateOthersHandler(date) {
    let temp_string = formatDate(date, "-");
    this.setState({
      blackout_start_others: date,
      blackout_start_others_string: temp_string,
    });
  }
  blackoutEndDateOthersHandler(date) {
    let temp_string = formatDate(date, "-");
    this.setState({
      blackout_end_others: date,
      blackout_end_others_string: temp_string,
    });
  }

  formatMyDateForCSV = formatDate;

  generateMySaleFaresCSV = (allfares) => {
    let sale_start = this.state.sale_start_date_string;
    sale_start = sale_start.replace(/-/g, "");

    this.setState({
      mycsvfilename: sale_start + "_Flash-Sale",
    });

    console.log(allfares);

    // allfares = allfares.splice(0, 5);
    // console.log("combined_array: "+JSON.stringify(allfares));
    allfares.map((item) => {
      //["SALE_ID", "SALE_DATE", "OD", "ORIG", "ORIG_NAME", "DEST", "DEST_NAME", "ADVERTISED_AMOUNT", "FIRST_CLASS_CODE", "FILED_FARE", "TAX", "REGION", "FARE_TYPE", "ROUND_TRIP"],
      let temp_array = [];
      temp_array.push(
        sale_start + "_" + item.name + "-" + item.fare_type,
        sale_start,
        item.name,
        item.origin_code,
        item.origin_city,
        item.destination_code,
        item.destination_city,
        item.price,
        item.fare_class_code,
        item.filed_fare,
        item.taxes,
        item.shortened_region,
        item.fare_type,
        item.round_trip
      );
      saleFareHeaders.push(temp_array);
    });

    console.log("CSV DATA: " + JSON.stringify(saleFareHeaders));
  };

  generateMySaleDetailsCSV = () => {
    let sale_start = this.state.sale_start_date_string;
    sale_start = sale_start.replace(/-/g, "");

    this.setState({
      mycsvsaledetailsfilename: sale_start + "_Sale-DETAILS",
    });

    // ["SALE_ID", "LAUNCH_DATE", "EMAIL_FREQUENCY", "EMAIL_SEGMENTS", "PERFORMANCE_MEDIA_INPUT", "USER_EXPERIENCE_PROBLEMS", "SALE_TYPE", "SALE_NAME", "OVERLAPPING_TICKETING", "TICKETING_START", "TICKETING_END", "TICKETING_DAYS", "TRAVEL_START", "TRAVEL_END", "TRAVEL_DAYS", "TRAVEL_VARIATIONS", "COSTA_RICA_TRAVEL_START", "COSTA_RICA_TRAVEL_END", "COSTA_RICA_TRAVEL_DAYS", "MEXICO_TRAVEL_START", "MEXICO_TRAVEL_END", "MEXICO_TRAVEL_DAYS","HAWAII_TRAVEL_START", "HAWAII_TRAVEL_END", "HAWAII_TRAVEL_DAYS", "BLACKOUT_DATES_FOR_CERTAIN_OD", "NUMBER_OF_OD", "SEASON_TARGET", "ADVANCE_PURCHASE", "SAVER_AVAILABLE", "COMBO_SALE", "LOWEST_PRICE_POINT_SEA", "LOWEST_PRICE_POINT_PDX", "LOWEST_PRICE_POINT_BAY", "LOWEST_PRICE_POINT_LA", "LOWEST_PRICE_POINT_ELSE" ],

    let temp_array = [];
    temp_array.push(
      sale_start,
      this.formatMyDateForCSV(this.state.sale_start_date),
      "",
      "",
      "",
      "",
      this.state.sale_type,
      this.state.sale_objective,
      "",
      this.formatMyDateForCSV(this.state.sale_start_date),
      this.formatMyDateForCSV(this.state.sale_end_date),
      "",
      this.formatMyDateForCSV(this.state.travel_start_others),
      this.formatMyDateForCSV(this.state.travel_end_others),
      "",
      "",
      this.formatMyDateForCSV(this.state.travel_start_costa_rica),
      this.formatMyDateForCSV(this.state.travel_end_costa_rica),
      "",
      this.formatMyDateForCSV(this.state.travel_start_mexico),
      this.formatMyDateForCSV(this.state.travel_end_mexico),
      "",
      this.formatMyDateForCSV(this.state.travel_start_alaska_to_from_hawaii),
      this.formatMyDateForCSV(this.state.travel_end_alaska_to_from_hawaii),
      "",
      this.formatMyDateForCSV(this.state.blackout_start_others) +
        " to " +
        this.formatMyDateForCSV(this.state.blackout_end_others),
      this.state.number_of_distinct_od,
      "",
      this.state.advance_purchase,
      "",
      "",
      this.state.lowest_price_sea,
      this.state.lowest_price_pdx,
      this.state.lowest_price_bay,
      this.state.lowest_price_la,
      this.state.lowest_price_no_pdc
    );

    saleDetailsHeaders.push(temp_array);

    console.log("CSV SALE DETAILS: " + JSON.stringify(saleDetailsHeaders));
  };

  changeHiddenSheet = (e) => {
    this.setState({
      hidden_sheet: e.target.value,
    });
  };

  createMyXml(combined_array, exceptions_array, exception_test, club49deals) {
    CreateXML.call(this, combined_array, exceptions_array, exception_test, club49deals);
  }

  moveExceptionsOut() {
    let newPulledExceptionFares = this.state.pulled_exception_fares.slice();
    let array_all_combined_prices = [...this.state.combined_saver_and_main];
    let newAllMyFares = this.state.combined_saver_and_main.slice();
    let newAllMyExceptions = this.state.exceptions.slice();

    console.log(this.state.exceptions.length);

    if (this.state.exceptions.length <= 0) {
      this.createMyXml(this.state.combined_saver_and_main, null, false, false);
    } else {
      newAllMyFares.map((item1, index1) => {
        newAllMyExceptions.map((item2, index2) => {
          if (
            item1["origin_code"] === item2["code_origin"] &&
            item1["destination_code"] === item2["code_destination"]
          ) {
            let index = array_all_combined_prices.indexOf(item1);

            if (index !== -1) {
              //Removes this fare from all_my_fares
              array_all_combined_prices.splice(index, 1);

              newPulledExceptionFares.push({
                ...item1,
                days_available: item2["travel_valid"],
                service_begins: item2["service_begins"],
                service_ends: item2["service_ends"],
                service_start_string: item2["service_begins_string"],
                service_end_string: item2["service_end_string"],
              });

              this.setState(
                {
                  combined_saver_and_main: array_all_combined_prices,
                  pulled_exception_fares: newPulledExceptionFares,
                },
                () =>
                  this.createMyXml(
                    this.state.combined_saver_and_main,
                    this.state.pulled_exception_fares,
                    true
                  )
              );

              this.createMyXml(
                this.state.combined_saver_and_main,
                this.state.pulled_exception_fares,
                true,
                false
              );

              console.log("Fare Removed from Index: " + index1);
            }
          }
        });
      });
    }
  }

  verifyThatExceptionsIsNotEmpty() {
    let newAllMyExceptions = this.state.exceptions.slice();
    let array_all_exceptions = [...this.state.exceptions];

    //console.log(newAllMyExceptions[0]);

    newAllMyExceptions.map((theitem, myindex) => {
      if (theitem["code_origin"] === "") {
        //if (myindex !== -1) {
        array_all_exceptions.splice(myindex, 1);

        this.setState(
          {
            exceptions: array_all_exceptions,
          },
          () => this.moveExceptionsOut()
        );
        //}
      } else {
        this.moveExceptionsOut();
      }
    });
  }

  //FORM BUTTON CLICK HANDLER
  createSaleDetails(e) {
    e.preventDefault();

    if (this.state.club49_sheet === true) {
      this.createMyXml(this.state.combined_club_49, null, false, true);
    } else {
      this.verifyThatExceptionsIsNotEmpty();
    }
  }

  // myFunction(xml) {
  //   var xmlDoc = xml.responseXML;
  //   var root = xmlDoc.documentElement;
  //   var currNode = root.childNodes[1];
  //   var removedNode = currNode.removeChild(currNode.childNodes[1]);
  //   console.log(removedNode.nodeName);
  // }

  cleanFile = () => () => {
    let array = [...this.state.xml_response];
    let i = array.length;
    let newCleanArray = [];

    array.map((item, index) => {
      let deal_set_code = item.children[0].attributes["code"];
      let exp_date = item.attributes["to"];

      exp_date = new Date(exp_date);
      let right_now = new Date();

      if (exp_date > right_now) {
        // array.splice(index, 1);
        newCleanArray.push(item);
      } else {
        console.log(deal_set_code);
        console.log(exp_date);
      }
    });

    this.setState({
      clean: newCleanArray,
    });

    // let doc2 = builder.create('FlightDeals', { encoding: 'UTF-8'})
    //   .att('xmlns:ss', 'urn:schemas-microsoft-com:office:spreadsheet')

    // const clean_copy = this.state.clean.splice();
    // const updatedItems = clean_copy.map((item) => {
    //   doc2.ele(item)
    // });

    // //doc2.toString({pretty: true});

    // let element2 = doc2.toString({pretty: true});

    // this.setState({
    //   clean: element2
    // })

    //console.log(this.state);
  };

  camelCaseCity = (cityname) => {
    for (let i = 0; i < city_caps_conversion.length; i++) {
      let myitem = city_caps_conversion[i].AVFM_name;
      let mycityname = city_caps_conversion[i].City_Name;
      if (myitem === cityname) {
        return mycityname;
      }
    }
  };

  onFileChange(e, file) {
    file = file || e.target.files[0];

    let split_name = [];
    let myfilename = file.name;
    myfilename = myfilename.substring(0, myfilename.indexOf("."));
    if (myfilename.indexOf(" ") > -1) {
      split_name[0] = myfilename
        .substring(myfilename.indexOf(" "), myfilename.length)
        .trim();
      split_name[1] = myfilename.substring(0, myfilename.indexOf(" "));
    } else {
      split_name[0] = myfilename;
    }

    // console.log(split_name);
    this.setState({
      file_name: split_name[0],
    });

    //Sheet 1 Looper
    readXlsxFile(file, { sheet: 1 }).then((data) => {
      //Loops through every row in the sheet

      //CLUB 49 ONLY
      let index_of_travel_from_to_us = null;
      let index_of_travel_from_within_alaska = null;
      let index_of_travel_by_to_us = null;
      let index_of_travel_by_within_alaska = null;
      //CLUB 49 ONLY

      for (let index = 0; index < data.length; index++) {
        //console.log(data[index]);

        //CLUB 49 ONLY
        if (data[index][0] === "Travel From:") {
          index_of_travel_from_to_us = index + 1;
          index_of_travel_from_within_alaska = index + 1;

          this.setState({
            club49_sheet: true,
          });
        }

        if (data[index][0] === "Within Alaska") {
          this.setState({
            club49_sheet: true,
          });
        }

        if (
          this.state.club49_sheet === true &&
          data[index][0] === "Advance Purchase:"
        ) {
          index_of_travel_by_to_us = index - 2;
          index_of_travel_by_within_alaska = index - 1;
        }

        //CLUB 49 ONLY

        // SALE_TYPE (Col 7)
        if (data[index][0] === "OW SALE:" && data[index][1] !== null) {
          this.setState({
            sale_type: data[index][1],
          });
        } else {
          this.setState({
            sale_type: this.state.file_name,
          });
        }

        // SALE_OBJECTIVE (Col 8)
        if (data[index][0] === "Sale Objective:" && data[index][1] !== null) {
          this.setState({
            sale_objective: data[index][1],
          });
        } else {
          this.setState({
            sale_objective: this.state.file_name,
          });
        }

        //console.log(data[index]);
        //Get Sale Start Date from Sheet 1 and set state for sale_start_date variables
        if (data[index][0] === "Sale Start Date:" && data[index][1] !== null) {
          //console.log(data[index]);
          let temp_string = formatDate(data[index][1], "-");
          this.setState({
            sale_start_date: data[index][1],
            sale_start_date_string: temp_string,
          });
        }
        //Get Purchase By date from Sheet 1 and set state for sale_end_date variables
        if (data[index][0] === "Purchase By:" && data[index][1] !== null) {
          //console.log(data[index]);
          let temp_string = formatDate(data[index][1], "-");
          this.setState({
            sale_end_date: data[index][1],
            sale_end_date_string: temp_string,
          });
        }
        //Get Advance Purchase Days from Sheet 1 and set state for advance_purchase variable
        if (data[index][0] === "Advance Purchase:" && data[index][1] !== null) {
          //console.log(data[index]);
          this.setState({
            advance_purchase: data[index][1],
          });
        }
        //Get Travel Start Date from Sheet 1 and set state for all travel_start variables
        if (data[index][0] === "Travel Start:" && data[index][1] !== null) {
          //console.log(data[index]);
          let temp_string = formatDate(data[index][1], "-");
          this.setState({
            travel_start_alaska_to_from_hawaii: data[index][1],
            travel_start_alaska_to_from_hawaii_string: temp_string,
            travel_start_hawaii: data[index][1],
            travel_start_hawaii_string: temp_string,
            travel_start_mexico: data[index][1],
            travel_start_mexico_string: temp_string,
            travel_start_costa_rica: data[index][1],
            travel_start_costa_rica_string: temp_string,
            travel_start_florida: data[index][1],
            travel_start_florida_string: temp_string,
            travel_start_others: data[index][1],
            travel_start_others_string: temp_string,
          });
        }

        //Get Completed Travel By Date from Sheet 1 and set state for all travel_end variables
        if (
          data[index][0] === "Complete Travel By:" &&
          data[index][1] !== null
        ) {
          //console.log(data[index]);
          let temp_string = formatDate(data[index][1], "-");
          this.setState({
            travel_end_alaska_to_from_hawaii: data[index][1],
            travel_end_alaska_to_from_hawaii_string: temp_string,
            travel_end_hawaii: data[index][1],
            travel_end_hawaii_string: temp_string,
            travel_end_mexico: data[index][1],
            travel_end_mexico_string: temp_string,
            travel_end_costa_rica: data[index][1],
            travel_end_costa_rica_string: temp_string,
            travel_end_florida: data[index][1],
            travel_end_florida_string: temp_string,
            travel_end_others: data[index][1],
            travel_end_others_string: temp_string,
          });
        }

        //Get Proposed Calendar Dates - PAE
        if (
          data[index][0] === "Calendar Dates - PAE" &&
          data[index][1] !== null
        ) {
          let temp_string_start = formatDate(data[index - 1][1], "-");
          let temp_string_end = formatDate(data[index][1], "-");

          this.setState({
            proposed_start_pae: data[index - 1][1],
            proposed_start_pae_string: temp_string_start,
            proposed_end_pae: data[index][1],
            proposed_end_pae_string: temp_string_end,
          });
        }

        //Get Proposed Calendar Dates - HAWAII
        if (
          data[index][0] === "Calendar Dates - Hawaii" &&
          data[index][1] !== null
        ) {
          let temp_string_start = formatDate(data[index - 1][1], "-");
          let temp_string_end = formatDate(data[index][1], "-");

          this.setState({
            proposed_start_hawaii: data[index - 1][1],
            proposed_start_hawaii_string: temp_string_start,
            proposed_end_hawaii: data[index][1],
            proposed_end_hawaii_string: temp_string_end,
          });
        }

        //Get Proposed Calendar Dates - OTHERS
        if (
          data[index][0] === "Calendar Dates - All" &&
          data[index][1] !== null
        ) {
          let temp_string_start = formatDate(data[index - 1][1], "-");
          let temp_string_end = formatDate(data[index][1], "-");

          this.setState({
            proposed_start_others: data[index - 1][1],
            proposed_start_others_string: temp_string_start,
            proposed_end_others: data[index][1],
            proposed_end_others_string: temp_string_end,
          });
        }

        //Get BALCKOUTS
        if (data[index][0] === "Blackouts:" && data[index][1] !== null) {
          if (data[index][1].indexOf("to") > -1) {
            let temp_array = [];
            let temp_blackout = data[index][1];
            temp_array = temp_blackout.split(" to ");

            if (temp_array.length === 2) {
              let temp_blackout_start_date = new Date(temp_array[0]);
              let temp_blackout_start_date_string = formatDate(temp_blackout_start_date, "-");

              let temp_blackout_end_date = new Date(temp_array[1]);
              let temp_blackout_end_date_string = formatDate(temp_blackout_end_date, "-");

              this.setState({
                blackout_start_alaska_to_from_hawaii: temp_blackout_start_date,
                blackout_start_alaska_to_from_hawaii_string: temp_blackout_start_date_string,
                blackout_end_alaska_to_from_hawaii: temp_blackout_end_date,
                blackout_end_alaska_to_from_hawaii_string: temp_blackout_end_date_string,

                blackout_start_from_hawaii: temp_blackout_start_date,
                blackout_start_from_hawaii_string: temp_blackout_start_date_string,
                blackout_end_from_hawaii: temp_blackout_end_date,
                blackout_end_from_hawaii_string: temp_blackout_end_date_string,

                blackout_start_to_hawaii: temp_blackout_start_date,
                blackout_start_to_hawaii_string: temp_blackout_start_date_string,
                blackout_end_to_hawaii: temp_blackout_end_date,
                blackout_end_to_hawaii_string: temp_blackout_end_date_string,

                blackout_start_costa_rica: temp_blackout_start_date,
                blackout_start_costa_rica_string: temp_blackout_start_date_string,
                blackout_end_costa_rica: temp_blackout_end_date,
                blackout_end_costa_rica_string: temp_blackout_end_date_string,

                blackout_start_mexico: temp_blackout_start_date,
                blackout_start_mexico_string: temp_blackout_start_date_string,
                blackout_end_mexico: temp_blackout_end_date,
                blackout_end_mexico_string: temp_blackout_end_date_string,

                blackout_start_others: temp_blackout_start_date,
                blackout_start_others_string: temp_blackout_start_date_string,
                blackout_end_others: temp_blackout_end_date,
                blackout_end_others_string: temp_blackout_end_date_string,
              });
            }
          } else if (data[index][1].indexOf("-") > -1) {
            let temp_array = [];
            let temp_blackout = data[index][1];
            temp_array = temp_blackout.split("-");

            if (temp_array.length === 2) {
              let temp_blackout_start_date = new Date(temp_array[0]);
              let temp_blackout_start_date_string = formatDate(temp_blackout_start_date, "-");

              let temp_blackout_end_date = new Date(temp_array[1]);
              let temp_blackout_end_date_string = formatDate(temp_blackout_end_date, "-");

              this.setState({
                blackout_start_alaska_to_from_hawaii: temp_blackout_start_date,
                blackout_start_alaska_to_from_hawaii_string: temp_blackout_start_date_string,
                blackout_end_alaska_to_from_hawaii: temp_blackout_end_date,
                blackout_end_alaska_to_from_hawaii_string: temp_blackout_end_date_string,

                blackout_start_from_hawaii: temp_blackout_start_date,
                blackout_start_from_hawaii_string: temp_blackout_start_date_string,
                blackout_end_from_hawaii: temp_blackout_end_date,
                blackout_end_from_hawaii_string: temp_blackout_end_date_string,

                blackout_start_to_hawaii: temp_blackout_start_date,
                blackout_start_to_hawaii_string: temp_blackout_start_date_string,
                blackout_end_to_hawaii: temp_blackout_end_date,
                blackout_end_to_hawaii_string: temp_blackout_end_date_string,

                blackout_start_costa_rica: temp_blackout_start_date,
                blackout_start_costa_rica_string: temp_blackout_start_date_string,
                blackout_end_costa_rica: temp_blackout_end_date,
                blackout_end_costa_rica_string: temp_blackout_end_date_string,

                blackout_start_mexico: temp_blackout_start_date,
                blackout_start_mexico_string: temp_blackout_start_date_string,
                blackout_end_mexico: temp_blackout_end_date,
                blackout_end_mexico_string: temp_blackout_end_date_string,

                blackout_start_others: temp_blackout_start_date,
                blackout_start_others_string: temp_blackout_start_date_string,
                blackout_end_others: temp_blackout_end_date,
                blackout_end_others_string: temp_blackout_end_date_string,
              });
            } else {
              alert("NO MATCHING BLACKOUT DATES FOUND!");
            }
          } else {
            alert("MULTIPLE BLACKOUT DATES FOUND!");
          }
        }
      } //end of for loop

      //Get CLUB49 TO U.S Travel Dates
      if (index_of_travel_from_to_us > 1) {
        let temp_string = formatDate(data[index_of_travel_from_to_us][1], "-");
        this.setState({
          travel_from_to_us: data[index_of_travel_from_to_us][1],
          travel_from_to_us_string: temp_string,
        });
      }
      if (index_of_travel_by_to_us > 1) {
        if (data[index_of_travel_by_to_us][0] === "To U.S.") {
          let temp_string = formatDate(data[index_of_travel_by_to_us][1], "-");
          this.setState({
            travel_by_to_us: data[index_of_travel_by_to_us][1],
            travel_by_to_us_string: temp_string,
          });
        }
      }

      if (index_of_travel_from_within_alaska > 1) {
        let temp_string = formatDate(data[index_of_travel_from_within_alaska][1], "-");
        this.setState({
          travel_from_within_alaska:
            data[index_of_travel_from_within_alaska][1],
          travel_from_within_alaska_string: temp_string,
        });
      }
      if (index_of_travel_by_within_alaska > 1) {
        //if(data[index_of_travel_by_within_alaska][0] === "Within Alaska"){
        let temp_string = formatDate(data[index_of_travel_by_within_alaska][1], "-");
        this.setState({
          travel_by_within_alaska: data[index_of_travel_by_within_alaska][1],
          travel_by_within_alaska_string: temp_string,
        });
        //}
      }
      //Get CLUB49 WITHIN ALASKA Travel Dates

      // let newArray = this.state.all_my_fares.slice();
      // newArray.push({
      //   id: i,
      //   name: data[i][0],
      //   group: mygroup,
      //   default: false,
      //   origin_code:data[i][2],
      //   origin_city:this.camelCaseCity(data[i][3]),
      //   destination_code:data[i][4],
      //   destination_city:this.camelCaseCity(data[i][5]),
      //   price:data[i][6],
      //   fare_type:data[i][11],
      //   fare_class_code:data[i][7],
      //   filed_fare:data[i][8],
      //   taxes:data[i][9],
      //   shortened_region:data[i][10],
      //   round_trip:data[i][12],
      // });
      // this.setState({
      //   all_my_fares:newArray
      // });
    }); //end of readXlsxFile for Sheet 1

    let sheet_name = "";
    if (this.state.club49_sheet === true) {
      sheet_name = 21;
    } else if (this.state.club49_sheet === false) {
      sheet_name = this.state.hidden_sheet;
    } else {
      sheet_name = this.state.hidden_sheet;
    }

    //US Ad Fare Sheet Looper
    readXlsxFile(file, { sheet: sheet_name }).then((data) => {
      //Loops through every row in the sheet

      if (this.state.selectedOption === "Saver") {
        for (let i = 0; i < data.length; i++) {
          if (this.state.club49_sheet === true) {
          } else {
            //Get number of Distinct OD from the US Ad Fare Sheet TAB
            if (data[i].indexOf("Distinct ODs:") > -1) {
              this.setState({
                number_of_distinct_od:
                  data[i][data[i].indexOf("Distinct ODs:") + 1],
              });
              //console.log(this.state.number_of_distinct_od);
            }
          }

          // console.log("DATA[i][0] = ", data[i][0])

          if (typeof data[i][0] === "string" && data[i][0] !== null) {
            //Checks that the values in index 0 and 2 are airport codes for every row in the spreadsheet
            if (
              typeof data[i][2] == "string" &&
              data[i][2].length === 3 && data[i][4].length === 3
            ) {
              let my_fare_type = data[i][11];

              // console.log(data[i][2].length);

              let mygroup = "";
              if (
                (groupMeByOrigin(data[i][2]) === "ALASKA" &&
                  groupMeByOrigin(data[i][4]) === "HAWAII") ||
                (groupMeByOrigin(data[i][2]) === "HAWAII" &&
                  groupMeByOrigin(data[i][4]) === "ALASKA")
              ) {
                mygroup = "ALASKA_HAWAII";
              } else if (
                groupMeByOrigin(data[i][2]) === "ALASKA" &&
                groupMeByOrigin(data[i][4]) === "ALASKA"
              ) {
                //CLUB49 UPPER
                mygroup = "ALASKA_ALASKA";
              } else if (groupMeByOrigin(data[i][2]) === "ALASKA") {
                //CLUB49 LOWER
                mygroup = "FROM_ALASKA";
              } else if (groupMeByOrigin(data[i][4]) === "ALASKA") {
                mygroup = "TO_ALASKA";
              } else if (groupMeByOrigin(data[i][2]) === "HAWAII") {
                mygroup = "FROM_HAWAII";
              } else if (groupMeByOrigin(data[i][4]) === "HAWAII") {
                mygroup = "TO_HAWAII";
              } else if (
                groupMeByOrigin(data[i][2]) === "MEXICO" ||
                groupMeByOrigin(data[i][2]) === "COSTA_RICA"
              ) {
                mygroup = "";
                console.log(
                  "THERE SHOULD NOT BE FARES THAT ORIGINATE FROM MEXICO OR COSTA RICA!"
                );
              } else if (groupMeByOrigin(data[i][4]) === "MEXICO") {
                mygroup = "MEXICO";
              } else if (groupMeByOrigin(data[i][4]) === "COSTA_RICA") {
                mygroup = "COSTA_RICA";
              } else if (groupMeByOrigin(data[i][2]) === "FLORIDA") {
                mygroup = "FROM_FLORIDA";
              } else if (groupMeByOrigin(data[i][4]) === "FLORIDA") {
                mygroup = "TO_FLORIDA";
              } else if (
                groupMeByOrigin(data[i][2]) === "PAE" ||
                groupMeByOrigin(data[i][4]) === "PAE"
              ) {
                mygroup = "PAE";
              } else if (groupMeByOrigin(data[i][4]) === "OTHER_MARKET") {
                mygroup = "OTHER_MARKET";
              } else {
                mygroup = "";
                console.log(
                  "NO GROUP WAS FOUND FOR " + data[i][2] + data[i][4]
                );
              }

              //console.log(data[i]);
              let newArray = this.state.all_my_fares.slice();

              if (my_fare_type === "SAVER") {
                my_fare_type = "Saver";
              } else {
                my_fare_type = "Main";
              }

              newArray.push({
                id: i,
                name: data[i][0],
                group: mygroup,
                default: false,
                origin_code: data[i][2],
                origin_city: this.camelCaseCity(data[i][3]),
                destination_code: data[i][4],
                destination_city: this.camelCaseCity(data[i][5]),
                price: data[i][6],
                fare_type: my_fare_type,
                fare_class_code: data[i][7],
                filed_fare: data[i][8],
                taxes: data[i][9],
                shortened_region: data[i][10],
                round_trip: data[i][12],
              });
              this.setState({
                all_my_fares: newArray,
              });
            }
          }
        } //end of for loop
      } else {
        for (let i = 0; i < data.length; i++) {
          // console.log("INSIDE THE OTHER FORLOOP")

          if (typeof data[i][0] === "string" && data[i][0] !== null) {
            //Checks that the values in index 0 and 2 are airport codes for every row in the spreadsheet
            if (
              typeof data[i][2] == "string" &&
              data[i][2].length === 3 && data[i][4].length === 3
            ) {
              //console.log(data[i]);
              let mygroup = "";
              if (
                (groupMeByOrigin(data[i][2]) === "ALASKA" &&
                  groupMeByOrigin(data[i][4]) === "HAWAII") ||
                (groupMeByOrigin(data[i][2]) === "HAWAII" &&
                  groupMeByOrigin(data[i][4]) === "ALASKA")
              ) {
                mygroup = "ALASKA_HAWAII";
              } else if (
                groupMeByOrigin(data[i][2]) === "ALASKA" &&
                groupMeByOrigin(data[i][4]) === "ALASKA"
              ) {
                //CLUB49 UPPER
                mygroup = "ALASKA_ALASKA";
              } else if (groupMeByOrigin(data[i][2]) === "ALASKA") {
                //CLUB49 LOWER
                mygroup = "FROM_ALASKA";
              } else if (groupMeByOrigin(data[i][4]) === "ALASKA") {
                mygroup = "TO_ALASKA";
              } else if (groupMeByOrigin(data[i][2]) === "HAWAII") {
                mygroup = "FROM_HAWAII";
              } else if (groupMeByOrigin(data[i][4]) === "HAWAII") {
                mygroup = "TO_HAWAII";
              } else if (
                groupMeByOrigin(data[i][2]) === "MEXICO" ||
                groupMeByOrigin(data[i][2]) === "COSTA_RICA"
              ) {
                console.log(
                  "THERE SHOULD NOT BE FARES THAT ORIGINATE FROM MEXICO OR COSTA RICA!"
                );
              } else if (groupMeByOrigin(data[i][4]) === "MEXICO") {
                mygroup = "MEXICO";
              } else if (groupMeByOrigin(data[i][4]) === "COSTA_RICA") {
                mygroup = "COSTA_RICA";
              } else if (groupMeByOrigin(data[i][2]) === "FLORIDA") {
                mygroup = "FROM_FLORIDA";
              } else if (groupMeByOrigin(data[i][4]) === "FLORIDA") {
                mygroup = "TO_FLORIDA";
              } else if (
                groupMeByOrigin(data[i][2]) === "PAE" ||
                groupMeByOrigin(data[i][4]) === "PAE"
              ) {
                mygroup = "PAE";
              } else if (groupMeByOrigin(data[i][4]) === "OTHER_MARKET") {
                mygroup = "OTHER_MARKET";
              } else {
                console.log(
                  "NO GROUP WAS FOUND FOR " + data[i][2] + data[i][4]
                );
              }

              //console.log(data[i]);
              let newArray = this.state.all_my_fares.slice();
              // let my_fare_type = data[i][11];
              // if(my_fare_type === "SAVER"){
              //   my_fare_type = "Saver";
              // }else{
              //   my_fare_type = "Main";
              // }

              newArray.push({
                id: i,
                name: data[i][0],
                group: mygroup,
                default: false,
                origin_code: data[i][2],
                origin_city: this.camelCaseCity(data[i][3]),
                destination_code: data[i][4],
                destination_city: this.camelCaseCity(data[i][5]),
                price: data[i][6],
                fare_type: null,
                fare_class_code: null,
                taxes: data[i][8],
                shortened_region: null,
                round_trip: data[i][10],
              });
              this.setState({
                all_my_fares: newArray,
              });
            }
          }
        } //End of forloop for Award Sale
      }

      let temp_arr = this.state.all_my_fares.slice();
      temp_arr.sort(compareDestinationCode); //SORT by Destination Code first for alphabetical
      temp_arr.sort(compareOriginCode); //SORT by Origin Code second for alphabetical
      temp_arr.sort(comparePrice); //SORT by Price last for lowest to highest fares

      this.setState({
        all_my_fares: temp_arr,
      });

      let temp_combined = this.state.combined_saver_and_main.slice();
      let temp_combined_club49 = this.state.all_my_fares.slice();

      if (this.state.club49_sheet === true) {
        //Get the tuesday after the travel start date
        console.log(
          "CLUB 49 Calendar Dates : START :" +
            getMyFirstTuesday(this.state.travel_from_to_us, 2)
        );
        console.log(
          "CLUB 49 Calendar Dates : END :" +
            getMySecondTuesday(this.state.travel_from_to_us, 2)
        );


        let temp_string1 = formatDate(getMyFirstTuesday(this.state.travel_from_to_us, 2), "-");
        let temp_string2 = formatDate(getMyFirstTuesday(this.state.travel_from_to_us, 2), "-");

        this.setState({
          proposed_from_clu49: getMyFirstTuesday(
            this.state.travel_from_to_us,
            2
          ),
          proposed_to_clu49: getMySecondTuesday(
            this.state.travel_from_to_us,
            2
          ),
          proposed_from_clu49_string: temp_string1,
          proposed_to_clu49_string: temp_string2,
        });

        temp_combined_club49 = mergeClub49(this.state.all_my_fares);

        this.setState({
          combined_club_49: temp_combined_club49,
        });
      } else {
        temp_combined = mergeObjects(this.state.all_my_fares);

        this.setState({
          combined_saver_and_main: temp_combined,
        });
      }
    }); //end of readXlsxFile for US Ad Fare Sheet

    if (this.state.selectedOption === "Saver") {
      //Email Marketing Sheet Looper
      readXlsxFile(file, { sheet: 3 }).then((data) => {
        //Loops through every row in the sheet
        let lowest_sea = null;
        let lowest_pdx = null;
        let lowest_bay = null;
        let lowest_la = null;
        let lowest_no_pdc = null;

        for (let i = 0; i < data.length; i++) {
          //Get Lowest Price Points EMAIL MARKETING
          if (data[i].indexOf("From:") > -1) {
            // console.log(data[i][data[i].indexOf("From:")]);
            // console.log(i);
            lowest_sea = i + 1;
            lowest_pdx = i + 2;
            lowest_bay = i + 3;
            lowest_la = i + 4;
            lowest_no_pdc = i + 5;
            // this.setState({
            //   number_of_distinct_od: data[i][data[i].indexOf("Distinct ODs:")+1]
            // });
            //console.log(this.state.number_of_distinct_od);
          }

          if (i === lowest_sea) {
            // console.log(data[i][9] + "===="+ data[i][10]);
            this.setState({
              lowest_price_sea: data[i][9] + data[i][10],
            });
          }
          if (i === lowest_pdx) {
            // console.log(data[i][9] + "===="+ data[i][10]);
            this.setState({
              lowest_price_pdx: data[i][9] + data[i][10],
            });
          }
          if (i === lowest_bay) {
            // console.log(data[i][9] + "===="+ data[i][10]);
            this.setState({
              lowest_price_bay: data[i][9] + data[i][10],
            });
          }
          if (i === lowest_la) {
            // console.log(data[i][9] + "===="+ data[i][10]);
            this.setState({
              lowest_price_la: data[i][9] + data[i][10],
            });
          }
          if (i === lowest_no_pdc) {
            // console.log(data[i][9] + "===="+ data[i][10]);
            this.setState({
              lowest_price_no_pdc: data[i][9] + data[i][10],
            });
          }
        }
      }); //end of readXlsxFile for US Ad Fare Sheet
    } else {
      readXlsxFile(file, { sheet: 5 }).then((data) => {
        //Loops through every row in the sheet
        let lowest_sea = null;
        let lowest_pdx = null;
        let lowest_bay = null;
        let lowest_la = null;
        let lowest_no_pdc = null;

        for (let i = 0; i < data.length; i++) {
          //Get Lowest Price Points EMAIL MARKETING
          if (data[i].indexOf("From:") > -1) {
            // console.log(data[i][data[i].indexOf("From:")]);
            // console.log(i);
            lowest_sea = i + 1;
            lowest_pdx = i + 2;
            lowest_bay = i + 3;
            lowest_la = i + 4;
            lowest_no_pdc = i + 5;
            // this.setState({
            //   number_of_distinct_od: data[i][data[i].indexOf("Distinct ODs:")+1]
            // });
            //console.log(this.state.number_of_distinct_od);
          }

          if (i === lowest_sea) {
            // console.log(data[i][8] + "===="+ data[i][9]);
            this.setState({
              lowest_price_sea: data[i][8] + data[i][9],
            });
          }
          if (i === lowest_pdx) {
            // console.log(data[i][8] + "===="+ data[i][9]);
            this.setState({
              lowest_price_pdx: data[i][8] + data[i][9],
            });
          }
          if (i === lowest_bay) {
            // console.log(data[i][8] + "===="+ data[i][9]);
            this.setState({
              lowest_price_bay: data[i][8] + data[i][9],
            });
          }
          if (i === lowest_la) {
            // console.log(data[i][8] + "===="+ data[i][9]);
            this.setState({
              lowest_price_la: data[i][8] + data[i][9],
            });
          }
          if (i === lowest_no_pdc) {
            // console.log(data[i][8] + "===="+ data[i][9]);
            this.setState({
              lowest_price_no_pdc: data[i][8] + data[i][9],
            });
          }
        }
      }); //end of readXlsxFile for US Ad Fare Sheet / AWARD SALE TYPE
    }

    //Only read AS.com tab if its a saver spreadsheet
    if (this.state.selectedOption === "Saver") {
      let ascom_sheet = "";
      if (this.state.club49_sheet === true) {
        ascom_sheet = "AS.com";
      } else {
        ascom_sheet = "AS.com";
      }

      // //AS.com TAB Looper
      readXlsxFile(file, { sheet: ascom_sheet }).then((data) => {
        //Loops through every row in the sheet

        for (let i = 0; i < data.length; i++) {
          if (data[i][17] !== null && data[i][18] !== null) {
            if (
              typeof data[i][17] == "string" &&
              typeof data[i][18] == "number"
            ) {
              // console.log(data[i][17] + " : " + data[i][18]);

              this.markAsDefault(data[i][17]);
              // this.grabDefaultsFromSheet(data[i][17], data[i][18]);
              this.displayData.push(
                <div
                  className="display-data"
                  style={{ fontSize: 13, fontWeight: "bold" }}
                >
                  <div
                    className="cityPair"
                    style={{
                      textAlign: "left",
                      marginLeft: 80,
                      display: "inline",
                      color: "purple",
                    }}
                  >
                    {data[i][17]}
                  </div>
                  <div
                    className="cityPrice"
                    style={{
                      display: "inline",
                      color: "green",
                      marginLeft: 120,
                    }}
                  >
                    {data[i][18]}
                  </div>
                </div>
              );
              this.setState({
                showdata: this.displayData,
                postVal: "",
                textareaedit: false,
              });
            }
          }
        } //end of for loop
      }); //end of readXlsxFile for Sheet 4
    } else {
      readXlsxFile(file, { sheet: 3 }).then((data) => {
        //Loops through every row in the sheet

        for (let i = 0; i < data.length; i++) {
          if (data[i][16] !== null && data[i][17] !== null) {
            if (
              typeof data[i][16] == "string" &&
              typeof data[i][17] == "number"
            ) {
              // console.log(data[i][17] + " : " + data[i][18]);

              this.markAsDefault(data[i][16]);
              // this.grabDefaultsFromSheet(data[i][17], data[i][18]);
              this.displayData.push(
                <div
                  className="display-data"
                  style={{ fontSize: 13, fontWeight: "bold" }}
                >
                  <div
                    className="cityPair"
                    style={{
                      textAlign: "left",
                      marginLeft: 80,
                      display: "inline",
                      color: "purple",
                    }}
                  >
                    {data[i][16]}
                  </div>
                  <div
                    className="cityPrice"
                    style={{
                      display: "inline",
                      color: "green",
                      marginLeft: 120,
                    }}
                  >
                    {data[i][17]}
                  </div>
                </div>
              );
              this.setState({
                showdata: this.displayData,
                postVal: "",
                textareaedit: false,
              });
            }
          }
        } //end of for loop Award Sale DEFAULTS
      }); //end of readXlsxFile for Sheet 4
    }
  }

  handleExceptionCodeChange = (idx) => (evt) => {
    let temp_code = evt.target.value;
    temp_code = temp_code.toUpperCase();
    if (temp_code.length === 6) {
      temp_code = temp_code.match(/.{1,3}/g);
    } else {
      temp_code = evt.target.value;
    }

    const newShareholders = this.state.exceptions.map((item, sidx) => {
      if (idx !== sidx) return item;
      return {
        ...item,
        code_origin: temp_code[0],
        code_destination: temp_code[1],
      };
    });
    this.setState({
      exceptions: newShareholders,
    });
  };

  handleExceptionTravelValid = (idx) => (evt) => {
    const newShareholders = this.state.exceptions.map((item, sidx) => {
      if (idx !== sidx) return item;
      return {
        ...item,
        travel_valid: evt.target.value,
      };
    });
    this.setState({
      exceptions: newShareholders,
    });
  };

  handleExceptionServiceBegins = (idx) => (date) => {
    let temp_string = formatDate(date, "-");
    const newShareholders = this.state.exceptions.map((item, sidx) => {
      if (idx !== sidx) return item;
      return {
        ...item,
        service_begins: date,
        begins_string: temp_string,
      };
    });

    this.setState({
      exceptions: newShareholders,
    });
  };
  handleExceptionServiceEnds = (idx) => (date) => {
    let temp_string = formatDate(date, "-");
    const newShareholders = this.state.exceptions.map((item, sidx) => {
      if (idx !== sidx) return item;
      return {
        ...item,
        service_ends: date,
        ends_string: temp_string,
      };
    });

    this.setState({
      exceptions: newShareholders,
    });
  };

  handleAddException = () => {
    this.setState({
      exceptions: this.state.exceptions.concat([
        {
          code_origin: "",
          code_destination: "",
          travel_valid: "",
          service_begins: null,
          service_ends: null,
          begins_string: "",
          ends_string: "",
        },
      ]),
    });
  };

  handleRemoveException = (idx) => () => {
    this.setState({
      exceptions: this.state.exceptions.filter((s, sidx) => idx !== sidx),
    });
  };

  resetOutputVariable = () => () => {
    // let newArray = this.state.xmloutput.slice();
    this.setState({
      xmloutput: "",
    });
  };

  travelFromToUSHandler = (date) => {
    let temp_string = formatDate(date, "-");

    this.setState({
      travel_from_to_us: date,
      travel_from_to_us_string: temp_string,
    });
  };
  travelByToUSHandler = (date) => {
    let temp_string = formatDate(date, "-");
    this.setState({
      travel_by_to_us: date,
      travel_by_to_us_string: temp_string,
    });
  };
  daysAvailabilityToUSHandler = (e) => {
    this.setState({
      days_availability_to_us: e.target.value,
    });
  };

  travelFromWithinAlaskaHandler = (date) => {
    let temp_string = formatDate(date, "-");

    this.setState({
      travel_from_within_alaska: date,
      travel_from_within_alaska_string: temp_string,
    });
  };
  travelByWithinAlaskaHandler = (date) => {
    let temp_string = formatDate(date, "-");
    this.setState({
      travel_by_within_alaska: date,
      travel_by_within_alaska_string: temp_string,
    });
  };
  daysAvailabilityWithinAlaskaHandler = (e) => {
    this.setState({
      days_availability_within_alaska: e.target.value,
    });
  };

  render() {
    // console.log(this.state.selectedOption);

    return (
      <div className="App">
        <div className="">
          <div className="row col-md-12">
            {/* <input type = "text" value = {this.state.firstinput} onChange = {this.updateFirstInput} /> */}

            {/* <CSVDownload data={csvData} filename={"my-file.csv"} target="_blank" /> */}

            <form className="detailsForm" onSubmit={this.createSaleDetails}>
              <div className="form-row sale-information">
                <div className="row col-md-12">
                  <div className="form-group col-md-2">
                    <h3 className="information-headline">Sale Information:</h3>
                  </div>
                  <div className="form-group col-md-2">
                    {
                      /* <a href="TEMPLATE.xlsx" download className="btn btn-success download-template">
                          <i className="fa fa-download"></i> Download Template
                      </a> */
                      // https://alaskaair.sharepoint.com/sites/PublishedPricing/Shared%20Documents/Forms/AllItems.aspx?id=%2Fsites%2FPublishedPricing%2FShared%20Documents%2FSales%2FDetail%20and%20Fare%20Dumps
                    }
                    <a
                      href="https://alaskaair.sharepoint.com/sites/PublishedPricing/Shared%20Documents/Forms/AllItems.aspx?id=%2Fsites%2FPublishedPricing%2FShared%20Documents%2FSales%2FDetail%20and%20Fare%20Dumps"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="sharepoint-link"
                    >
                      <i className="fa fa-upload"></i> DROP CSV FILES HERE
                    </a>
                  </div>
                  <div className="form-group col-md-2">
                    <a
                      href="https://alaskaair.sharepoint.com/sites/TeamEP/Shared%20Documents/Forms/AllItems.aspx?cid=91ab9bff-77b0-4540-88d4-c8aacfe4cb04&RootFolder=%2Fsites%2FTeamEP%2FShared%20Documents%2F3-Campaigns%2FFare%20Sales%2FWeeklyFlightDeals&FolderCTID=0x012000B3CE6DC9828D0441B10382FB20A01BBC"
                      rel="noopener noreferrer"
                      target="_blank"
                      className="sharepoint-link"
                    >
                      <i className="fa fa-folder"></i> Sharepoint
                    </a>
                  </div>

                  <div className="form-group col-md-1">
                    <label className="radio-inline">
                      <input
                        type="radio"
                        name="sale_type"
                        defaultChecked
                        value="Saver"
                        onChange={() =>
                          this.setState({ selectedOption: "Saver" })
                        }
                      />{" "}
                      Saver
                    </label>
                  </div>
                  <div className="form-group col-md-1">
                    <label className="radio-inline">
                      <input
                        type="radio"
                        name="sale_type"
                        value="Mileage"
                        onChange={() =>
                          this.setState({ selectedOption: "Mileage" })
                        }
                      />
                      Awards Sale
                    </label>
                  </div>
                  <div className="form-group col-md-3">
                    <input
                      type="file"
                      className="form-control"
                      id="inputFile"
                      onChange={this.onFileChange}
                    />
                    {/* <div className="form-group-input">
                        <label className="label">
                          <i className="material-icons">attach_file</i>
                          <span className="title">Add File</span>
                          <input type="file" className="" id="inputFile" onChange={this.onFileChange}/>
                        </label>
                      </div> */}
                  </div>
                  <div className="form-group col-md-1">
                    <input
                      type="text"
                      className="form-control"
                      id="sheet_number"
                      onChange={this.changeHiddenSheet}
                      placeholder=""
                      value={this.state.hidden_sheet}
                      style={{ marginTop: 10 }}
                    />
                  </div>
                </div>
                <div className="form-group col-md-3">
                  {/* This row is for Sale Start */}
                  <div className="row col-md-12">
                    <label htmlFor="saleStartDate">
                      <strong>Sale Start</strong>
                    </label>
                    <br />
                    <DatePicker
                      className="form-control"
                      id="saleStartDate"
                      selected={this.state.sale_start_date}
                      onChange={this.saleStartDateHandler}
                    />
                  </div>
                  {/* This row is for Sale End */}
                  <div className="row col-md-12">
                    <label htmlFor="saleEndDate">
                      <strong>Purchase By</strong>
                    </label>
                    <DatePicker
                      className="form-control"
                      id="saleEndDate"
                      selected={this.state.sale_end_date}
                      onChange={this.saleEndDateHandler}
                    />
                  </div>
                  {/* This row is for Advance Purchase */}
                  <div className="row col-md-12">
                    <label htmlFor="advancePurchase">
                      <strong>Advance Purchase</strong>
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="advancePurchase"
                      value={this.state.advance_purchase}
                      onChange={this.advancePurchaseHandler}
                    />
                  </div>

                  <div className="row col-md-12">
                    <div className="form-group text-area-div">
                      <label htmlFor="default_markets">
                        <strong>Default Markets:</strong>
                      </label>

                      {this.state.textareaedit === true ? (
                        <textarea
                          className="form-control rounded-0"
                          id="default_markets"
                          rows="6"
                          onChange={this.saveDefaultMarkets}
                        ></textarea>
                      ) : (
                        <div
                          id="display-data-Container"
                          style={{ height: 165 }}
                        >
                          {this.displayData}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* This row is for Proposed PAE Dates */}
                  <div className="row col-md-12">
                    <div className="col-md-12 remove-padding">
                      <h6 className="proposed-headline">
                        <strong>Proposed Dates:</strong> PAE
                      </h6>
                    </div>
                    <div className="col-md-5 remove-padding">
                      <DatePicker
                        className="form-control"
                        selected={this.state.proposed_start_pae}
                        onChange={this.proposedStartDatePAEHandler}
                      />
                    </div>

                    <div className="col-md-2 text-center">
                      <h6 className="">to</h6>
                    </div>

                    <div className="col-md-5 remove-padding">
                      <DatePicker
                        className="form-control"
                        selected={this.state.proposed_end_pae}
                        onChange={this.proposedEndDatePAEHandler}
                      />
                    </div>
                  </div>
                </div>

                {/* TRAVEL START INPUTS */}
                <div className="form-group col-md-3">
                  {/* This row is for Travel Start: Alaska to/from Hawaii */}
                  <div className="row col-md-12">
                    <label htmlFor="travel_start_alaska_to_from_hawaii">
                      <strong>Travel Start:</strong> Alaska to/from Hawaii
                    </label>
                    <br />
                    <DatePicker
                      className="form-control"
                      id="travel_start_alaska_to_from_hawaii"
                      selected={this.state.travel_start_alaska_to_from_hawaii}
                      onChange={this.travelStartAlaskaToFromHawaiiDateHandler}
                    />
                  </div>

                  {/* This row is for Travel Start: HAWAII */}
                  <div className="row col-md-12">
                    <label htmlFor="travel_start_hawaii">
                      <strong>Travel Start:</strong> Hawaii
                    </label>
                    <br />
                    <DatePicker
                      className="form-control"
                      id="travel_start_hawaii"
                      selected={this.state.travel_start_hawaii}
                      onChange={this.travelStartHawaiiHandler}
                    />
                  </div>

                  {/* This row is for Travel Start: MEXICO */}
                  <div className="row col-md-12">
                    <label htmlFor="travel_start_mexico">
                      <strong>Travel Start:</strong> Mexico
                    </label>
                    <br />
                    <DatePicker
                      className="form-control"
                      id="travel_start_mexico"
                      selected={this.state.travel_start_mexico}
                      onChange={this.travelStartMexicoHandler}
                    />
                  </div>

                  {/* This row is for Travel Start: COSTA RICA */}
                  <div className="row col-md-12">
                    <label htmlFor="travel_start_costa_rica">
                      <strong>Travel Start:</strong> Costa Rica
                    </label>
                    <br />
                    <DatePicker
                      className="form-control"
                      id="travel_start_costa_rica"
                      selected={this.state.travel_start_costa_rica}
                      onChange={this.travelStartCostaRicaHandler}
                    />
                  </div>

                  {/* This row is for Travel Start: FLORIDA */}
                  <div className="row col-md-12">
                    <label htmlFor="travel_start_florida">
                      <strong>Travel Start:</strong> Florida
                    </label>
                    <br />
                    <DatePicker
                      className="form-control"
                      id="travel_start_florida"
                      selected={this.state.travel_start_others}
                      readOnly
                    />
                  </div>

                  {/* This row is for Travel Start: ALL OTHER MARKET */}
                  <div className="row col-md-12">
                    <label htmlFor="travel_start_others">
                      <strong>Travel Start:</strong> Other Markets
                    </label>
                    <br />
                    <DatePicker
                      className="form-control"
                      id="travel_start_others"
                      selected={this.state.travel_start_others}
                      onChange={this.travelStartOthersHandler}
                    />
                  </div>

                  {/* This row is for Proposed Hawaii Dates */}
                  <div className="row col-md-12">
                    <div className="col-md-12 remove-padding">
                      <h6 className="proposed-headline">
                        <strong>Proposed Dates:</strong> Hawaii
                      </h6>
                    </div>
                    <div className="col-md-5 remove-padding">
                      <DatePicker
                        className="form-control"
                        selected={this.state.proposed_start_hawaii}
                        onChange={this.proposedStartDateHawaiiHandler}
                      />
                    </div>

                    <div className="col-md-2 text-center">
                      <h6 className="">to</h6>
                    </div>

                    <div className="col-md-5 remove-padding">
                      <DatePicker
                        className="form-control"
                        selected={this.state.proposed_end_hawaii}
                        onChange={this.proposedEndDateHawaiiHandler}
                      />
                    </div>
                  </div>
                </div>

                {/* COMPLETED TRAVEL BY INPUTS */}
                <div className="form-group col-md-3">
                  {/* This row is for Complete Travel By: Alaska to/from Hawaii */}
                  <div className="row col-md-12">
                    <label htmlFor="travel_end_alaska_to_from_hawaii">
                      <strong>Completed Travel By:</strong> Alaska to/from
                      Hawaii
                    </label>
                    <br />
                    <DatePicker
                      className="form-control"
                      id="travel_end_alaska_to_from_hawaii"
                      selected={this.state.travel_end_alaska_to_from_hawaii}
                      onChange={this.travelEndAlaskaToFromHawaiiDateHandler}
                    />
                  </div>

                  {/* This row is for Complete Travel By: HAWAII */}
                  <div className="row col-md-12">
                    <label htmlFor="travel_end_hawaii">
                      <strong>Completed Travel By:</strong> Hawaii
                    </label>
                    <br />
                    <DatePicker
                      className="form-control"
                      id="travel_end_hawaii"
                      selected={this.state.travel_end_hawaii}
                      onChange={this.travelEndHawaiiHandler}
                    />
                  </div>

                  {/* This row is for Complete Travel By: MEXICO */}
                  <div className="row col-md-12">
                    <label htmlFor="travel_end_mexico">
                      <strong>Completed Travel By:</strong> Mexico
                    </label>
                    <br />
                    <DatePicker
                      className="form-control"
                      id="travel_end_mexico"
                      selected={this.state.travel_end_mexico}
                      onChange={this.travelEndMexicoHandler}
                    />
                  </div>

                  {/* This row is for Complete Travel By: COSTA RICA */}
                  <div className="row col-md-12">
                    <label htmlFor="travel_end_costa_rica">
                      <strong>Completed Travel By:</strong> Costa Rica
                    </label>
                    <br />
                    <DatePicker
                      className="form-control"
                      id="travel_end_costa_rica"
                      selected={this.state.travel_end_costa_rica}
                      onChange={this.travelEndCostaRicaHandler}
                    />
                  </div>

                  {/* This row is for Complete Travel By: FLORIDA */}
                  <div className="row col-md-12">
                    <label htmlFor="travel_end_florida">
                      <strong>Completed Travel By:</strong> Florida
                    </label>
                    <br />
                    <DatePicker
                      className="form-control"
                      id="travel_end_florida"
                      selected={this.state.travel_end_others}
                      readOnly
                    />
                  </div>

                  {/* This row is for Complete Travel By: ALL OTHER MARKET */}
                  <div className="row col-md-12">
                    <label htmlFor="travel_end_others">
                      <strong>Completed Travel By:</strong> Other Markets
                    </label>
                    <br />
                    <DatePicker
                      className="form-control"
                      id="travel_end_others"
                      selected={this.state.travel_end_others}
                      onChange={this.travelEndOthersHandler}
                    />
                  </div>

                  {/* This row is for Proposed Others Dates */}
                  <div className="row col-md-12">
                    <div className="col-md-12 remove-padding">
                      <h6 className="proposed-headline">
                        <strong>Proposed Dates:</strong> Others
                      </h6>
                    </div>

                    <div className="col-md-5 remove-padding">
                      <DatePicker
                        className="form-control"
                        selected={this.state.proposed_start_others}
                        onChange={this.proposedStartDateOthersHandler}
                      />
                    </div>

                    <div className="col-md-2 text-center">
                      <h6 className="">to</h6>
                    </div>

                    <div className="col-md-5 remove-padding">
                      <DatePicker
                        className="form-control"
                        selected={this.state.proposed_end_others}
                        onChange={this.proposedEndDateOthersHandler}
                      />
                    </div>
                  </div>
                </div>

                {/* DAY/TIME AVAILABILITY INPUTS */}
                <div className="form-group col-md-3">
                  {/* This row is for Days Availability: Alaska to/from Hawaii */}
                  <div className="row col-md-12">
                    <label htmlFor="days_availability_alaska_to_from_hawaii">
                      <strong>Days Availability:</strong> Alaska to/from Hawaii
                    </label>
                    <br />
                    <input
                      type="text"
                      className="form-control"
                      id="days_availability_alaska_to_from_hawaii"
                      value={this.state.days_availability_hawaii}
                      readOnly
                    />
                  </div>

                  {/* This row is for Days Availability: HAWAII */}
                  <div className="row col-md-12">
                    <label htmlFor="days_availability_hawaii">
                      <strong>Days Availability:</strong> Hawaii
                    </label>
                    <br />
                    <input
                      type="text"
                      className="form-control"
                      id="days_availability_hawaii"
                      value={this.state.days_availability_hawaii}
                      onChange={this.daysAvailabilityHawaiiHandler}
                    />
                  </div>

                  {/* This row is for Days Availability: MEXICO */}
                  <div className="row col-md-12">
                    <label htmlFor="days_availability_mexico">
                      <strong>Days Availability:</strong> Mexico
                    </label>
                    <br />
                    <input
                      type="text"
                      className="form-control"
                      id="days_availability_mexico"
                      value={this.state.days_availability_mexico}
                      onChange={this.daysAvailabilityMexicoHandler}
                    />
                  </div>

                  {/* This row is for Days Availability: COSTA RICA */}
                  <div className="row col-md-12">
                    <label htmlFor="days_availability_costa_rica">
                      <strong>Days Availability:</strong> Costa Rica
                    </label>
                    <br />
                    <input
                      type="text"
                      className="form-control"
                      id="days_availability_costa_rica"
                      value={this.state.days_availability_costa_rica}
                      onChange={this.daysAvailabilityCostaRicaHandler}
                    />
                  </div>

                  {/* This row is for Days Availability: TO FLORIDA */}
                  <div className="row col-md-12">
                    <label htmlFor="days_availability_to_florida">
                      <strong>Days Availability:</strong> To Florida
                    </label>
                    <br />
                    <input
                      type="text"
                      className="form-control"
                      id="days_availability_to_florida"
                      value={this.state.days_availability_to_florida}
                      onChange={this.daysAvailabilityToFloridaHandler}
                    />
                  </div>

                  {/* This row is for Days Availability: FROM FLORIDA */}
                  <div className="row col-md-12">
                    <label htmlFor="days_availability_from_florida">
                      <strong>Days Availability:</strong> From Florida
                    </label>
                    <br />
                    <input
                      type="text"
                      className="form-control"
                      id="days_availability_from_florida"
                      value={this.state.days_availability_from_florida}
                      onChange={this.daysAvailabilityFromFloridaHandler}
                    />
                  </div>

                  {/* This row is for Days Availability: ALL OTHER MARKET */}
                  <div className="row col-md-12">
                    <label htmlFor="days_availability_others">
                      <strong>Days Availability:</strong> Other Markets
                    </label>
                    <br />
                    <input
                      type="text"
                      className="form-control"
                      id="days_availability_others"
                      value={this.state.days_availability_others}
                      onChange={this.daysAvailabilityOthersHandler}
                    />
                  </div>
                </div>
                {/* End of 1st Form ROW */}
              </div>

              {/* CLUB 49 Information ROW */}
              <div className="form-row club49-information">
                <div className="row col-md-12">
                  <h3 className="information-headline">Club 49:</h3>
                </div>
                <div className="form-group col-md-3">
                  <div className="row col-md-12 individual-club49">
                    <div className="col-md-12 remove-padding">
                      <h6 className="club49-headline black-color">
                        <strong>Travel From:</strong> To U.S.
                      </h6>
                    </div>
                    <div className="col-md-12 remove-padding">
                      <DatePicker
                        className="form-control"
                        selected={this.state.travel_from_to_us}
                        onChange={this.travelFromToUSHandler}
                      />
                    </div>
                  </div>
                </div>

                <div className="form-group col-md-3">
                  <div className="row col-md-12 individual-club49">
                    <div className="col-md-12 remove-padding">
                      <h6 className="club49-headline black-color">
                        <strong>Travel By:</strong> To U.S.
                      </h6>
                    </div>
                    <div className="col-md-12 remove-padding">
                      <DatePicker
                        className="form-control"
                        selected={this.state.travel_by_to_us}
                        onChange={this.travelByToUSHandler}
                      />
                    </div>
                  </div>
                </div>

                <div className="form-group col-md-6">
                  <div className="row col-md-12 individual-club49">
                    <div className="col-md-12 remove-padding">
                      <h6 className="club49-headline black-color">
                        <strong>Days Availability:</strong> To U.S.
                      </h6>
                    </div>
                    <div className="col-md-12 remove-padding">
                      <input
                        type="text"
                        className="form-control"
                        id="days_availability_to_us"
                        value={this.state.days_availability_to_us}
                        onChange={this.daysAvailabilityToUSHandler}
                      />
                    </div>
                  </div>
                </div>

                <div className="form-group col-md-3">
                  <div className="row col-md-12 individual-club49">
                    <div className="col-md-12 remove-padding">
                      <h6 className="club49-headline black-color">
                        <strong>Travel From:</strong> Within Alaska
                      </h6>
                    </div>
                    <div className="col-md-12 remove-padding">
                      <DatePicker
                        className="form-control"
                        selected={this.state.travel_from_within_alaska}
                        onChange={this.travelFromWithinAlaskaHandler}
                      />
                    </div>
                  </div>
                </div>

                <div className="form-group col-md-3">
                  <div className="row col-md-12 individual-club49">
                    <div className="col-md-12 remove-padding">
                      <h6 className="club49-headline black-color">
                        <strong>Travel By:</strong> Within Alaska
                      </h6>
                    </div>
                    <div className="col-md-12 remove-padding">
                      <DatePicker
                        className="form-control"
                        selected={this.state.travel_by_within_alaska}
                        onChange={this.travelByWithinAlaskaHandler}
                      />
                    </div>
                  </div>
                </div>

                <div className="form-group col-md-6">
                  <div className="row col-md-12 individual-club49">
                    <div className="col-md-12 remove-padding">
                      <h6 className="club49-headline black-color">
                        <strong>Days Availability:</strong> Within Alaska
                      </h6>
                    </div>
                    <div className="col-md-12 remove-padding">
                      <input
                        type="text"
                        className="form-control"
                        id="days_availability_within_alaska"
                        value={this.state.days_availability_within_alaska}
                        onChange={this.daysAvailabilityWithinAlaskaHandler}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Blackout Information ROW */}
              <div className="form-row blackout-information">
                <div className="row col-md-12">
                  <h3 className="information-headline">Blackouts:</h3>
                </div>
                <div className="form-group col-md-4">
                  <div className="row col-md-12 individual-blackout">
                    <div className="col-md-12 remove-padding">
                      <h6 className="blackout-headline black-color">
                        <strong>Blackout Dates:</strong> Alaska to/from Hawaii
                      </h6>
                    </div>
                    <div className="col-md-5 remove-padding">
                      <DatePicker
                        className="form-control"
                        selected={
                          this.state.blackout_start_alaska_to_from_hawaii
                        }
                        onChange={
                          this.blackoutStartDateAlaskaToFromHawaiiHandler
                        }
                      />
                    </div>
                    <div className="col-md-2 text-center">
                      <h6 className="black-color">to</h6>
                    </div>
                    <div className="col-md-5 remove-padding">
                      <DatePicker
                        className="form-control"
                        selected={this.state.blackout_end_alaska_to_from_hawaii}
                        onChange={this.blackoutEndDateAlaskaToFromHawaiiHandler}
                      />
                    </div>
                  </div>
                </div>

                <div className="form-group col-md-4">
                  <div className="row col-md-12 individual-blackout">
                    <div className="col-md-12 remove-padding">
                      <h6 className="blackout-headline black-color">
                        <strong>Blackout Dates:</strong> To Hawaii
                      </h6>
                    </div>
                    <div className="col-md-5 remove-padding">
                      <DatePicker
                        className="form-control"
                        selected={this.state.blackout_start_to_hawaii}
                        onChange={this.blackoutStartDateToHawaiiHandler}
                      />
                    </div>
                    <div className="col-md-2 text-center">
                      <h6 className="black-color">to</h6>
                    </div>
                    <div className="col-md-5 remove-padding">
                      <DatePicker
                        className="form-control"
                        selected={this.state.blackout_end_to_hawaii}
                        onChange={this.blackoutEndDateToHawaiiHandler}
                      />
                    </div>
                  </div>
                </div>

                <div className="form-group col-md-4">
                  <div className="row col-md-12 individual-blackout">
                    <div className="col-md-12 remove-padding">
                      <h6 className="blackout-headline black-color">
                        <strong>Blackout Dates:</strong> From Hawaii
                      </h6>
                    </div>
                    <div className="col-md-5 remove-padding">
                      <DatePicker
                        className="form-control"
                        selected={this.state.blackout_start_from_hawaii}
                        onChange={this.blackoutStartDateFromHawaiiHandler}
                      />
                    </div>
                    <div className="col-md-2 text-center">
                      <h6 className="black-color">to</h6>
                    </div>
                    <div className="col-md-5 remove-padding">
                      <DatePicker
                        className="form-control"
                        selected={this.state.blackout_end_from_hawaii}
                        onChange={this.blackoutEndDateFromHawaiiHandler}
                      />
                    </div>
                  </div>
                </div>

                <div className="form-group col-md-4">
                  <div className="row col-md-12 individual-blackout">
                    <div className="col-md-12 remove-padding">
                      <h6 className="blackout-headline black-color">
                        <strong>Blackout Dates:</strong> Mexico
                      </h6>
                    </div>
                    <div className="col-md-5 remove-padding">
                      <DatePicker
                        className="form-control"
                        selected={this.state.blackout_start_mexico}
                        onChange={this.blackoutStartDateMexicoHandler}
                      />
                    </div>
                    <div className="col-md-2 text-center">
                      <h6 className="black-color">to</h6>
                    </div>
                    <div className="col-md-5 remove-padding">
                      <DatePicker
                        className="form-control"
                        selected={this.state.blackout_end_mexico}
                        onChange={this.blackoutEndDateMexicoHandler}
                      />
                    </div>
                  </div>
                </div>
                <div className="form-group col-md-4">
                  <div className="row col-md-12 individual-blackout">
                    <div className="col-md-12 remove-padding">
                      <h6 className="blackout-headline black-color">
                        <strong>Blackout Dates:</strong> Costa Rica
                      </h6>
                    </div>
                    <div className="col-md-5 remove-padding">
                      <DatePicker
                        className="form-control"
                        selected={this.state.blackout_start_costa_rica}
                        onChange={this.blackoutStartDateCostaRicaHandler}
                      />
                    </div>
                    <div className="col-md-2 text-center">
                      <h6 className="black-color">to</h6>
                    </div>
                    <div className="col-md-5 remove-padding">
                      <DatePicker
                        className="form-control"
                        selected={this.state.blackout_end_costa_rica}
                        onChange={this.blackoutEndDateCostaRicaHandler}
                      />
                    </div>
                  </div>
                </div>
                <div className="form-group col-md-4">
                  <div className="row col-md-12 individual-blackout">
                    <div className="col-md-12 remove-padding">
                      <h6 className="blackout-headline black-color">
                        <strong>Blackout Dates:</strong> Other Markets
                      </h6>
                    </div>
                    <div className="col-md-5 remove-padding">
                      <DatePicker
                        className="form-control"
                        selected={this.state.blackout_start_others}
                        onChange={this.blackoutStartDateOthersHandler}
                      />
                    </div>
                    <div className="col-md-2 text-center">
                      <h6 className="black-color">to</h6>
                    </div>
                    <div className="col-md-5 remove-padding">
                      <DatePicker
                        className="form-control"
                        selected={this.state.blackout_end_others}
                        onChange={this.blackoutEndDateOthersHandler}
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="form-row sale-information">
                <div className="row col-md-12">
                  <div className="">
                    <h3 className="information-headline">Exceptions:</h3>
                  </div>
                  <div className="form-group col-md-2 add-btn">
                    <button
                      type="button"
                      className="btn btn-success add-exception"
                      onClick={this.handleAddException}
                    >
                      <i className="fa fa-plus"></i> Add Exception
                    </button>
                  </div>
                </div>

                {this.state.exceptions.map((item, idx) => (
                  <div key={idx} className="row col-md-12 individual-exception">
                    <div className="form-group col-md-2">
                      <label htmlFor={`code_input_box_${idx + 1}`}>
                        <strong>Code Pair:</strong>
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id={`code_input_box_${idx + 1}`}
                        placeholder={`#${idx + 1}`}
                        value={item.code}
                        onChange={this.handleExceptionCodeChange(idx)}
                      />
                    </div>
                    <div className="form-group col-md-5">
                      <label htmlFor={`travel_valid_input_box_${idx + 1}`}>
                        <strong>Travel Valid:</strong>
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id={`travel_valid_input_box_${idx + 1}`}
                        placeholder={`Saturdays only`}
                        value={item.travel_valid}
                        onChange={this.handleExceptionTravelValid(idx)}
                      />
                    </div>
                    <div className="form-group col-md-2">
                      <label htmlFor={`service_begins_datepicker_${idx + 1}`}>
                        <strong>Service Begins:</strong>
                      </label>
                      <DatePicker
                        className="form-control"
                        id={`service_begins_datepicker_${idx + 1}`}
                        selected={item.service_begins}
                        onChange={this.handleExceptionServiceBegins(idx)}
                      />
                    </div>
                    <div className="form-group col-md-2">
                      <label htmlFor={`service_ends_datepicker_${idx + 1}`}>
                        <strong>Service Ends:</strong>
                      </label>
                      <DatePicker
                        className="form-control"
                        id={`service_ends_datepicker_${idx + 1}`}
                        selected={item.service_ends}
                        onChange={this.handleExceptionServiceEnds(idx)}
                      />
                    </div>

                    {/* <button type="button" onClick={this.handleRemoveException(idx)} className="small">-</button> */}
                    <div className="form-group col-md-1">
                      <button
                        type="button"
                        className="btn btn-danger remove-exception"
                        onClick={this.handleRemoveException(idx)}
                      >
                        <i className="fa fa-minus"></i>
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="form-row sale-information">
                {/* <div className="row col-md-12">
                  <div className="form-group col-md-6">
                    <label htmlFor="inputPassword4">First Input</label>
                    <input type="text" className="form-control" id="inputAddress" value = {this.state.firstinput} onChange = {this.updateFirstInput} />
                  </div>
                  <div className="form-group col-md-6">
                    <div className="form-check">
                      <input className="form-check-input" type="checkbox" id="gridCheck" />
                      <label className="form-check-label" htmlFor="gridCheck">Check me out</label>
                    </div>
                  </div>
                </div> */}
                <div className="row col-md-12">
                  <div className="form-group col-md-9">
                    <button
                      style={{ marginTop: "15px" }}
                      type="submit"
                      className="form-control btn btn-primary"
                      id="generate-xml"
                    >
                      Generate XML
                    </button>
                  </div>

                  <div className="form-group col-md-3">
                    <CSVLink
                      data={saleDetailsHeaders}
                      filename={this.state.mycsvsaledetailsfilename + ".csv"}
                      className="btn btn-warning csv-sale-details"
                      target="_blank"
                    >
                      <i className="fa fa-download"></i> CSV Sale Details
                    </CSVLink>

                    <CSVLink
                      data={saleFareHeaders}
                      filename={this.state.mycsvfilename + ".csv"}
                      className="btn btn-warning csv-sale-fares"
                      target="_blank"
                    >
                      <i className="fa fa-download"></i> CSV Fares
                    </CSVLink>
                  </div>
                </div>
              </div>
            </form>

            {/* XML OUTPUT LAYER */}
            <div className="form-row output-information">
              <div className="row col-md-12">
                <div className="col-lg-10 col-md-8 col-sm-6">
                  <h3 className="">Output:</h3>
                </div>
                <div className="form-group col-lg-1 col-md-2 col-sm-3">
                  <CopyToClipboard
                    text={this.state.xmloutput}
                    onCopy={() => this.setState({ copied: true })}
                  >
                    <button
                      type="submit"
                      className="btn btn-success copy-to-clipboard"
                    >
                      {" "}
                      <i className="fa fa-copy"></i> Clipboard
                    </button>
                  </CopyToClipboard>
                </div>
                <div className="form-group col-lg-1 col-md-2 col-sm-3">
                  <button
                    type="submit"
                    className="btn btn-warning copy-to-clipboard"
                    onClick={this.resetOutputVariable()}
                  >
                    {" "}
                    <i className="fa fa-times"></i> Clear
                  </button>
                </div>
              </div>
              <div className="row col-md-12">
                <div className="form-group col-md-12">
                  <pre id="pre-xml-output">{this.state.xmloutput}</pre>
                </div>
              </div>
            </div>

            {/* CLEAN MY XML ROW */}
            {/* <div className="form-row club49-information">
                  <div className="row col-md-12">
                      <h3 className="information-headline">Clean My XML:</h3>
                  </div>


                  <div className="form-group col-md-12">
                      <div className="row col-md-12 individual-club49">
                          <div className="col-md-12">
                          <button type="submit" className="btn btn-success clean-xml" onClick={this.cleanFile()}> <i className="fa fa-brush"></i> Clean XML</button>
                          </div>

                          <div className="row col-md-12">
                          <div className="form-group col-md-12">

                              <pre id="pre-xml-clean">
                                    {JSON.toString(this.state.clean)}
                              </pre>
                          </div>
                        </div>
                      </div>

                  </div>



              </div> */}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
