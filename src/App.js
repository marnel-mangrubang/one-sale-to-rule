import React, { Component } from 'react';
import './App.css';
import readXlsxFile from 'read-excel-file';
import builder from 'xmlbuilder';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment";
import { CopyToClipboard } from 'react-copy-to-clipboard';
import {
  comparePrice,
  compareOriginCode,
  compareDestinationCode,
  returnMyCityName,
  mergeObjects,
  makeDateMonthInEnglish,
  getMyDay,
  getMyMonth,
  getMyYear,
  getMyHour,
  getMyMinute,
  getMyTimeOfDay,
  groupMeByOrigin,
  getMyFirstTuesday,
  getMySecondTuesday
} from './Helper/Helper';


const city_caps_conversion = [
  {
    AVFM_name: "ALBUQUERQUE",
    Airport_Code: "ABQ",
    City_Name: "Albuquerque"
  },
  {
    AVFM_name: "ARCATA / EUREKA",
    Airport_Code: "ACV",
    City_Name: "Eureka"
  },
  {
    AVFM_name: "ADAK ISLAND",
    Airport_Code: "ADK",
    City_Name: "Adak Island"
  },
  {
    AVFM_name: "KODIAK",
    Airport_Code: "ADQ",
    City_Name: "Kodiak"
  },
  {
    AVFM_name: "KING SALMON",
    Airport_Code: "AKN",
    City_Name: "King Salmon"
  },
  {
    AVFM_name: "WALLA WALLA",
    Airport_Code: "ALW",
    City_Name: "Walla Walla"
  },
  {
    AVFM_name: "ANCHORAGE",
    Airport_Code: "ANC",
    City_Name: "Anchorage"
  },
  {
    AVFM_name: "ATLANTA",
    Airport_Code: "ATL",
    City_Name: "Atlanta"
  },
  {
    AVFM_name: "AUSTIN",
    Airport_Code: "AUS",
    City_Name: "Austin"
  },
  {
    AVFM_name: "BETHEL",
    Airport_Code: "BET",
    City_Name: "Bethel"
  },
  {
    AVFM_name: "BILLINGS",
    Airport_Code: "BIL",
    City_Name: "Billings"
  },
  {
    AVFM_name: "BELLINGHAM",
    Airport_Code: "BLI",
    City_Name: "Bellingham"
  },
  {
    AVFM_name: "NASHVILLE",
    Airport_Code: "BNA",
    City_Name: "Nashville"
  },
  {
    AVFM_name: "BOISE",
    Airport_Code: "BOI",
    City_Name: "Boise"
  },
  {
    AVFM_name: "BOSTON",
    Airport_Code: "BOS",
    City_Name: "Boston"
  },
  {
    AVFM_name: "BARROW",
    Airport_Code: "BRW",
    City_Name: "Barrow"
  },
  {
    AVFM_name: "BURBANK",
    Airport_Code: "BUR",
    City_Name: "Burbank"
  },
  {
    AVFM_name: "BALTIMORE / WASHINGTON",
    Airport_Code: "BWI",
    City_Name: "Baltimore"
  },
  {
    AVFM_name: "BOZEMAN",
    Airport_Code: "BZN",
    City_Name: "Bozeman"
  },
  {
    AVFM_name: "CORDOVA",
    Airport_Code: "CDV",
    City_Name: "Cordova"
  },
  {
    AVFM_name: "CHARLESTON",
    Airport_Code: "CHS",
    City_Name: "Charleston"
  },
  {
    AVFM_name: "COLUMBUS",
    Airport_Code: "CMH",
    City_Name: "Columbus"
  },
  {
    AVFM_name: "COLORADO SPRINGS",
    Airport_Code: "COS",
    City_Name: "Colorado Springs"
  },
  {
    AVFM_name: "CANCUN",
    Airport_Code: "CUN",
    City_Name: "Cancun"
  },
  {
    AVFM_name: "DALLAS / LOVE FIELD",
    Airport_Code: "DAL",
    City_Name: "Dallas - Love Field"
  },
  {
    AVFM_name: "WASHINGTON, D.C. / REAGAN",
    Airport_Code: "DCA",
    City_Name: "Washington - Reagan"
  },
  {
    AVFM_name: "DENVER",
    Airport_Code: "DEN",
    City_Name: "Denver"
  },
  {
    AVFM_name: "DALLAS / FT. WORTH",
    Airport_Code: "DFW",
    City_Name: "Dallas"
  },
  {
    AVFM_name: "DILLINGHAM",
    Airport_Code: "DLG",
    City_Name: "Dillingham"
  },
  {
    AVFM_name: "DETROIT",
    Airport_Code: "DTW",
    City_Name: "Detroit"
  },
  {
    AVFM_name: "DUTCH HARBOR",
    Airport_Code: "DUT",
    City_Name: "Dutch Harbor"
  },
  {
    AVFM_name: "WENATCHEE",
    Airport_Code: "EAT",
    City_Name: "Wenatchee"
  },
  {
    AVFM_name: "EL PASO",
    Airport_Code: "ELP",
    City_Name: "El Paso"
  },
  {
    AVFM_name: "EUGENE",
    Airport_Code: "EUG",
    City_Name: "Eugene"
  },
  {
    AVFM_name: "NEWARK / NEW YORK",
    Airport_Code: "EWR",
    City_Name: "New York - Newark"
  },
  {
    AVFM_name: "FAIRBANKS",
    Airport_Code: "FAI",
    City_Name: "Fairbanks"
  },
  {
    AVFM_name: "FRESNO / YOSEMITE",
    Airport_Code: "FAT",
    City_Name: "Fresno"
  },
  {
    AVFM_name: "KALISPELL / GLACIER PARK",
    Airport_Code: "FCA",
    City_Name: "Kalispell"
  },
  {
    AVFM_name: "FLAGSTAFF / SEDONA",
    Airport_Code: "FLG",
    City_Name: "Flagstaff"
  },
  {
    AVFM_name: "FORT LAUDERDALE",
    Airport_Code: "FLL",
    City_Name: "Ft Lauderdale"
  },
  {
    AVFM_name: "GUADALAJARA",
    Airport_Code: "GDL",
    City_Name: "Guadalajara"
  },
  {
    AVFM_name: "SPOKANE",
    Airport_Code: "GEG",
    City_Name: "Spokane"
  },
  {
    AVFM_name: "GUSTAVUS",
    Airport_Code: "GST",
    City_Name: "Gustavus"
  },
  {
    AVFM_name: "GREAT FALLS",
    Airport_Code: "GTF",
    City_Name: "Great Falls"
  },
  {
    AVFM_name: "GUNNISON / CRESTED BUTTE",
    Airport_Code: "GUC",
    City_Name: "Gunnison County / Crested Butte"
  },
  {
    AVFM_name: "HAVANA",
    Airport_Code: "HAV",
    City_Name: "Havana"
  },
  {
    AVFM_name: "HAYDEN / STEAMBOAT SPRINGS",
    Airport_Code: "HDN",
    City_Name: "Steamboat Springs"
  },
  {
    AVFM_name: "HELENA",
    Airport_Code: "HLN",
    City_Name: "Helena"
  },
  {
    AVFM_name: "HONOLULU",
    Airport_Code: "HNL",
    City_Name: "Honolulu"
  },
  {
    AVFM_name: "WASHINGTON, D.C. / DULLES",
    Airport_Code: "IAD",
    City_Name: "Washington D.C. - Dulles"
  },
  {
    AVFM_name: "HOUSTON",
    Airport_Code: "IAH",
    City_Name: "Houston"
  },
  {
    AVFM_name: "WICHITA",
    Airport_Code: "ICT",
    City_Name: "Wichita"
  },
  {
    AVFM_name: "IDAHO FALLS",
    Airport_Code: "IDA",
    City_Name: "Idaho Falls"
  },
  {
    AVFM_name: "INDIANAPOLIS",
    Airport_Code: "IND",
    City_Name: "Indianapolis"
  },
  {
    AVFM_name: "NEW YORK",
    Airport_Code: "JFK",
    City_Name: "New York - JFK"
  },
  {
    AVFM_name: "JUNEAU",
    Airport_Code: "JNU",
    City_Name: "Juneau"
  },
  {
    AVFM_name: "KONA",
    Airport_Code: "KOA",
    City_Name: "Kona"
  },
  {
    AVFM_name: "KETCHIKAN",
    Airport_Code: "KTN",
    City_Name: "Ketchikan"
  },
  {
    AVFM_name: "LA PAZ",
    Airport_Code: "LAP",
    City_Name: "La Paz"
  },
  {
    AVFM_name: "LAS VEGAS",
    Airport_Code: "LAS",
    City_Name: "Las Vegas"
  },
  {
    AVFM_name: "LOS ANGELES",
    Airport_Code: "LAX",
    City_Name: "Los Angeles"
  },
  {
    AVFM_name: "NEW YORK / LAGUARDIA",
    Airport_Code: "LGA",
    City_Name: "New York - LaGuardia"
  },
  {
    AVFM_name: "LONG BEACH",
    Airport_Code: "LGB",
    City_Name: "Long Beach"
  },
  {
    AVFM_name: "KAUAI ISLAND",
    Airport_Code: "LIH",
    City_Name: "Kauai"
  },
  {
    AVFM_name: "LIBERIA",
    Airport_Code: "LIR",
    City_Name: "Liberia, Costa Rica"
  },
  {
    AVFM_name: "LORETO",
    Airport_Code: "LTO",
    City_Name: "Loreto"
  },
  {
    AVFM_name: "LEWISTON",
    Airport_Code: "LWS",
    City_Name: "Lewiston"
  },
  {
    AVFM_name: "KANSAS CITY",
    Airport_Code: "MCI",
    City_Name: "Kansas City"
  },
  {
    AVFM_name: "ORLANDO",
    Airport_Code: "MCO",
    City_Name: "Orlando"
  },
  {
    AVFM_name: "MEXICO CITY",
    Airport_Code: "MEX",
    City_Name: "Mexico City"
  },
  {
    AVFM_name: "MEDFORD",
    Airport_Code: "MFR",
    City_Name: "Medford"
  },
  {
    AVFM_name: "MIAMI",
    Airport_Code: "MIA",
    City_Name: "Miami"
  },
  {
    AVFM_name: "MILWAUKEE",
    Airport_Code: "MKE",
    City_Name: "Milwaukee"
  },
  {
    AVFM_name: "MAMMOTH / YOSEMITE",
    Airport_Code: "MMH",
    City_Name: "Mammoth Lakes"
  },
  {
    AVFM_name: "MONTEREY / CARMEL",
    Airport_Code: "MRY",
    City_Name: "Monterey"
  },
  {
    AVFM_name: "MISSOULA",
    Airport_Code: "MSO",
    City_Name: "Missoula"
  },
  {
    AVFM_name: "MINNEAPOLIS / ST. PAUL",
    Airport_Code: "MSP",
    City_Name: "Minneapolis"
  },
  {
    AVFM_name: "NEW ORLEANS",
    Airport_Code: "MSY",
    City_Name: "New Orleans"
  },
  {
    AVFM_name: "MAZATLAN",
    Airport_Code: "MZT",
    City_Name: "Mazatlan"
  },
  {
    AVFM_name: "OAKLAND",
    Airport_Code: "OAK",
    City_Name: "Oakland"
  },
  {
    AVFM_name: "KAHULUI",
    Airport_Code: "OGG",
    City_Name: "Maui"
  },
  {
    AVFM_name: "OKLAHOMA CITY",
    Airport_Code: "OKC",
    City_Name: "Oklahoma City"
  },
  {
    AVFM_name: "OMAHA",
    Airport_Code: "OMA",
    City_Name: "Omaha"
  },
  {
    AVFM_name: "NOME",
    Airport_Code: "OME",
    City_Name: "Nome"
  },
  {
    AVFM_name: "ONTARIO",
    Airport_Code: "ONT",
    City_Name: "Ontario"
  },
  {
    AVFM_name: "CHICAGO",
    Airport_Code: "ORD",
    City_Name: "Chicago"
  },
  {
    AVFM_name: "KOTZEBUE",
    Airport_Code: "OTZ",
    City_Name: "Kotzebue"
  },
  {
    AVFM_name: "EVERETT / PAINE FIELD",
    Airport_Code: "PAE",
    City_Name: "Everett / Paine Field"
  },
  {
    AVFM_name: "PORTLAND",
    Airport_Code: "PDX",
    City_Name: "Portland"
  },
  {
    AVFM_name: "PHILADELPHIA",
    Airport_Code: "PHL",
    City_Name: "Philadelphia"
  },
  {
    AVFM_name: "PHOENIX",
    Airport_Code: "PHX",
    City_Name: "Phoenix"
  },
  {
    AVFM_name: "PITTSBURGH",
    Airport_Code: "PIT",
    City_Name: "Pittsburgh"
  },
  {
    AVFM_name: "PRESCOTT / VERDE VALLEY",
    Airport_Code: "PRC",
    City_Name: "Prescott"
  },
  {
    AVFM_name: "PASCO",
    Airport_Code: "PSC",
    City_Name: "Pasco"
  },
  {
    AVFM_name: "PETERSBURG",
    Airport_Code: "PSG",
    City_Name: "Petersburg"
  },
  {
    AVFM_name: "PALM SPRINGS",
    Airport_Code: "PSP",
    City_Name: "Palm Springs"
  },
  {
    AVFM_name: "PULLMAN / MOSCOW",
    Airport_Code: "PUW",
    City_Name: "Pullman"
  },
  {
    AVFM_name: "PUERTO VALLARTA",
    Airport_Code: "PVR",
    City_Name: "Puerto Vallarta"
  },
  {
    AVFM_name: "REDDING",
    Airport_Code: "RDD",
    City_Name: "Redding"
  },
  {
    AVFM_name: "REDMOND / BEND",
    Airport_Code: "RDM",
    City_Name: "Redmond"
  },
  {
    AVFM_name: "RALEIGH-DURHAM",
    Airport_Code: "RDU",
    City_Name: "Raleigh-Durham"
  },
  {
    AVFM_name: "RENO / TAHOE",
    Airport_Code: "RNO",
    City_Name: "Reno"
  },
  {
    AVFM_name: "SAN DIEGO",
    Airport_Code: "SAN",
    City_Name: "San Diego"
  },
  {
    AVFM_name: "SAN ANTONIO",
    Airport_Code: "SAT",
    City_Name: "San Antonio"
  },
  {
    AVFM_name: "SANTA BARBARA",
    Airport_Code: "SBA",
    City_Name: "Santa Barbara"
  },
  {
    AVFM_name: "SAN LUIS OBISPO",
    Airport_Code: "SBP",
    City_Name: "San Luis Obispo"
  },
  {
    AVFM_name: "PRUDHOE BAY",
    Airport_Code: "SCC",
    City_Name: "Prudhoe Bay"
  },
  {
    AVFM_name: "SEATTLE",
    Airport_Code: "SEA",
    City_Name: "Seattle"
  },
  {
    AVFM_name: "SAN FRANCISCO",
    Airport_Code: "SFO",
    City_Name: "San Francisco"
  },
  {
    AVFM_name: "SITKA",
    Airport_Code: "SIT",
    City_Name: "Sitka"
  },
  {
    AVFM_name: "SAN JOSE",
    Airport_Code: "SJC",
    City_Name: "San Jose"
  },
  {
    AVFM_name: "SAN JOSE CABO",
    Airport_Code: "SJD",
    City_Name: "Los Cabos"
  },
  {
    AVFM_name: "SAN JOSE COSTA RICA",
    Airport_Code: "SJO",
    City_Name: "San Jose, Costa Rica"
  },
  {
    AVFM_name: "SALT LAKE CITY",
    Airport_Code: "SLC",
    City_Name: "Salt Lake City"
  },
  {
    AVFM_name: "SACRAMENTO",
    Airport_Code: "SMF",
    City_Name: "Sacramento"
  },
  {
    AVFM_name: "ORANGE COUNTY / JOHN WAYNE",
    Airport_Code: "SNA",
    City_Name: "Orange County"
  },
  {
    AVFM_name: "ST LOUIS",
    Airport_Code: "STL",
    City_Name: "St Louis"
  },
  {
    AVFM_name: "SANTA ROSA / SONOMA CO",
    Airport_Code: "STS",
    City_Name: "Santa Rosa"
  },
  {
    AVFM_name: "SUN VALLEY",
    Airport_Code: "SUN",
    City_Name: "Sun Valley"
  },
  {
    AVFM_name: "TAMPA",
    Airport_Code: "TPA",
    City_Name: "Tampa"
  },
  {
    AVFM_name: "TUCSON",
    Airport_Code: "TUS",
    City_Name: "Tucson"
  },
  {
    AVFM_name: "WRANGELL",
    Airport_Code: "WRG",
    City_Name: "Wrangell"
  },
  {
    AVFM_name: "YAKUTAT",
    Airport_Code: "YAK",
    City_Name: "Yakutat"
  },
  {
    AVFM_name: "EDMONTON",
    Airport_Code: "YEG",
    City_Name: "Edmonton"
  },
  {
    AVFM_name: "YAKIMA",
    Airport_Code: "YKM",
    City_Name: "Yakima"
  },
  {
    AVFM_name: "KELOWNA",
    Airport_Code: "YLW",
    City_Name: "Kelowna"
  },
  {
    AVFM_name: "VANCOUVER",
    Airport_Code: "YVR",
    City_Name: "Vancouver"
  },
  {
    AVFM_name: "CALGARY",
    Airport_Code: "YYC",
    City_Name: "Calgary"
  },
  {
    AVFM_name: "VICTORIA",
    Airport_Code: "YYJ",
    City_Name: "Victoria"
  },
  {
    AVFM_name: "IXTAPA/ZIHUATANEJO",
    Airport_Code: "ZIH",
    City_Name: "Ixtapa"
  },
  {
    AVFM_name: "MANZANILLO",
    Airport_Code: "ZLO",
    City_Name: "Manzanillo"
  }
];



class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      hidden_sheet: 4,
      finalOutput: '',
      copied: false,
      all_my_fares: [],
      default_markets: [],
      combined_saver_and_main: [],
      exceptions: [{ code_origin: '', code_destination: '', travel_valid: '', service_begins: null, service_ends: null, begins_string: '', ends_string: '' }],
      pulled_exception_fares: [],
      firstinput: 'Initial data...',
      advance_purchase: '',
      sale_start_date: null,
      sale_start_date_string: '',
      sale_end_date: null,
      sale_end_date_string: '',
      travel_start_alaska_to_from_hawaii: null,
      travel_start_alaska_to_from_hawaii_string: '',
      travel_start_hawaii: null,
      travel_start_hawaii_string: '',
      travel_start_mexico: null,
      travel_start_mexico_string: '',
      travel_start_costa_rica: null,
      travel_start_costa_rica_string: '',
      travel_start_florida: null,
      travel_start_florida_string: '',
      travel_start_others: null,
      travel_start_others_string: '',

      //Club 49 variables
      travel_from_to_us: null,
      travel_from_to_us_string: '',
      travel_from_within_alaska: null,
      travel_from_within_alaska_string: '',
      travel_by_to_us: null,
      travel_by_to_us_string: '',
      travel_by_within_alaska: null,
      travel_by_within_alaska_string: '',
      days_availability_to_us: 'Sunday, Monday, and Tuesday',
      days_availability_within_alaska: 'Monday through Thursday and Saturday',

      proposed_from_clu49: null,
      proposed_from_clu49_string: '',
      proposed_to_clu49: null,
      proposed_to_clu49_string: '',
      //Club 49 variables


      travel_end_alaska_to_from_hawaii: null,
      travel_end_alaska_to_from_hawaii_string: '',
      travel_end_hawaii: null,
      travel_end_hawaii_string: '',
      travel_end_mexico: null,
      travel_end_mexico_string: '',
      travel_end_costa_rica: null,
      travel_end_costa_rica_string: '',
      travel_end_florida: null,
      travel_end_florida_string: '',
      travel_end_others: null,
      travel_end_others_string: '',



      days_availability_hawaii: 'Mondays through Thursdays',
      days_availability_mexico: 'Sundays through Wednesdays',
      days_availability_costa_rica: 'Sundays through Wednesdays',
      days_availability_to_florida: 'Mondays, Tuesdays, and Wednesdays',
      days_availability_from_florida: 'Tuesdays, Wednesdays, and Thursdays',
      days_availability_others: 'Tuesdays, Wednesdays, and Saturdays',


      proposed_start_pae: null,
      proposed_start_pae_string: '',
      proposed_end_pae: null,
      proposed_end_pae_string: '',
      proposed_start_hawaii: null,
      proposed_start_hawaii_string: '',
      proposed_end_hawaii: null,
      proposed_end_hawaii_string: '',
      proposed_start_others: null,
      proposed_start_others_string: '',
      proposed_end_others: null,
      proposed_end_others_string: '',


      blackout_start_alaska_to_from_hawaii: null,
      blackout_start_alaska_to_from_hawaii_string: '',
      blackout_end_alaska_to_from_hawaii: null,
      blackout_end_alaska_to_from_hawaii_string: '',
      blackout_start_to_hawaii: null,
      blackout_start_to_hawaii_string: '',
      blackout_end_to_hawaii: null,
      blackout_end_to_hawaii_string: '',
      blackout_start_from_hawaii: null,
      blackout_start_from_hawaii_string: '',
      blackout_end_from_hawaii: null,
      blackout_end_from_hawaii_string: '',
      blackout_start_mexico: null,
      blackout_start_mexico_string: '',
      blackout_end_mexico: null,
      blackout_end_mexico_string: '',
      blackout_start_costa_rica: null,
      blackout_start_costa_rica_string: '',
      blackout_end_costa_rica: null,
      blackout_end_costa_rica_string: '',
      blackout_start_others: null,
      blackout_start_others_string: '',
      blackout_end_others: null,
      blackout_end_others_string: '',

      showdata: this.displayData,
      postVal: "",
      textareaedit: true,
      sale_type: '',
      sale_objective: '',
      jsonOutput: [],
      isDisabled: true
    }

    this.displayData = [];

    this.onFileChange = this.onFileChange.bind(this);
    // this.cleanFile = this.cleanFile.bind(this);

    this.saveDefaultMarkets = this.saveDefaultMarkets.bind(this);
    this.grabDefaultsFromSheet = this.grabDefaultsFromSheet.bind(this);

    this.updateFirstInput = this.updateFirstInput.bind(this);

    // this.createSaleDetails = this.createSaleDetails.bind(this);

    this.createMyXmlHandler = this.createMyXmlHandler.bind(this);
    this.createMyJSONHandler = this.createMyJSONHandler.bind(this);

    this.saleStartDateHandler = this.saleStartDateHandler.bind(this);
    this.saleEndDateHandler = this.saleEndDateHandler.bind(this);
    this.advancePurchaseHandler = this.advancePurchaseHandler.bind(this);


    this.travelStartAlaskaToFromHawaiiDateHandler = this.travelStartAlaskaToFromHawaiiDateHandler.bind(this);
    this.travelStartHawaiiHandler = this.travelStartHawaiiHandler.bind(this);
    this.travelStartMexicoHandler = this.travelStartMexicoHandler.bind(this);
    this.travelStartCostaRicaHandler = this.travelStartCostaRicaHandler.bind(this);
    //this.travelStartFloridaHandler = this.travelStartFloridaHandler.bind(this);
    this.travelStartOthersHandler = this.travelStartOthersHandler.bind(this);


    this.travelEndAlaskaToFromHawaiiDateHandler = this.travelEndAlaskaToFromHawaiiDateHandler.bind(this);
    this.travelEndHawaiiHandler = this.travelEndHawaiiHandler.bind(this);
    this.travelEndMexicoHandler = this.travelEndMexicoHandler.bind(this);
    this.travelEndCostaRicaHandler = this.travelEndCostaRicaHandler.bind(this);
    //this.travelEndFloridaHandler = this.travelEndFloridaHandler.bind(this);
    this.travelEndOthersHandler = this.travelEndOthersHandler.bind(this);


    this.daysAvailabilityHawaiiHandler = this.daysAvailabilityHawaiiHandler.bind(this);
    this.daysAvailabilityMexicoHandler = this.daysAvailabilityMexicoHandler.bind(this);
    this.daysAvailabilityCostaRicaHandler = this.daysAvailabilityCostaRicaHandler.bind(this);
    this.daysAvailabilityToFloridaHandler = this.daysAvailabilityToFloridaHandler.bind(this);
    this.daysAvailabilityFromFloridaHandler = this.daysAvailabilityFromFloridaHandler.bind(this);
    this.daysAvailabilityOthersHandler = this.daysAvailabilityOthersHandler.bind(this);


    this.proposedStartDateHawaiiHandler = this.proposedStartDateHawaiiHandler.bind(this);
    this.proposedEndDateHawaiiHandler = this.proposedEndDateHawaiiHandler.bind(this);
    this.proposedStartDateOthersHandler = this.proposedStartDateOthersHandler.bind(this);
    this.proposedEndDateOthersHandler = this.proposedEndDateOthersHandler.bind(this);


    this.blackoutStartDateAlaskaToFromHawaiiHandler = this.blackoutStartDateAlaskaToFromHawaiiHandler.bind(this);
    this.blackoutEndDateAlaskaToFromHawaiiHandler = this.blackoutEndDateAlaskaToFromHawaiiHandler.bind(this);
    this.blackoutStartDateToHawaiiHandler = this.blackoutStartDateToHawaiiHandler.bind(this);
    this.blackoutEndDateToHawaiiHandler = this.blackoutEndDateToHawaiiHandler.bind(this);
    this.blackoutStartDateFromHawaiiHandler = this.blackoutStartDateFromHawaiiHandler.bind(this);
    this.blackoutEndDateFromHawaiiHandler = this.blackoutEndDateFromHawaiiHandler.bind(this);
    this.blackoutStartDateMexicoHandler = this.blackoutStartDateMexicoHandler.bind(this);
    this.blackoutEndDateMexicoHandler = this.blackoutEndDateMexicoHandler.bind(this);
    this.blackoutStartDateCostaRicaHandler = this.blackoutStartDateCostaRicaHandler.bind(this);
    this.blackoutEndDateCostaRicaHandler = this.blackoutEndDateCostaRicaHandler.bind(this);
    this.blackoutStartDateOthersHandler = this.blackoutStartDateOthersHandler.bind(this);
    this.blackoutEndDateOthersHandler = this.blackoutEndDateOthersHandler.bind(this);


  }

  componentDidMount() {

  }


  updateFirstInput(e) {
    this.setState({ firstinput: e.target.value });
  }


  markAsDefault(def_market) {

    let array_all_combined_prices = [...this.state.combined_saver_and_main];

    this.state.combined_saver_and_main.some((item) => {
      if (def_market === item.name && item.default !== true) {
        let index = array_all_combined_prices.indexOf(item);
        if (index !== -1) {
          item['default'] = true;
        }
      }
    });

  }


  saveDefaultMarkets(e) {

    let temp_val = e.target.value;
    temp_val = temp_val.split('\n');

    const new_defaults = temp_val.map((item) => {

      let split_market_and_price = item.replace(/\s/g, '');
      split_market_and_price = split_market_and_price.match(/.{1,6}/g);
      return {
        default_market: split_market_and_price[0],
        default_price: split_market_and_price[1]
      };

    });

    //Loop through default markets array and pass each code pair to markAsDefault function to make each default fare a default market
    new_defaults.map((myobj) => {
      this.markAsDefault(myobj['default_market']);
    });

    this.setState({
      default_markets: new_defaults
    });
  }


  grabDefaultsFromSheet(pair, price) {
    let new_defaults = [];
    let temp_obj = {
      default_market: pair,
      default_price: price
    }

    //let new_defaults.push(temp_obj);


    //Loop through default markets array and pass each code pair to markAsDefault function to make each default fare a default market
    new_defaults.map((myobj) => {
      this.markAsDefault(myobj['default_market']);
    });

    this.setState({
      default_markets: new_defaults
    });

  }


  saleStartDateHandler(date) {
    let temp_string = moment(date).format('YYYY-MM-DD');

    this.setState({
      sale_start_date: date,
      sale_start_date_string: temp_string
    });
  }

  saleEndDateHandler(date) {
    let temp_string = moment(date).format('YYYY-MM-DD');
    this.setState({
      sale_end_date: date,
      sale_end_date_string: temp_string
    });
  }

  advancePurchaseHandler(e) {
    this.setState({
      advance_purchase: e.target.value
    });
  }

  travelStartAlaskaToFromHawaiiDateHandler(date) {
    let temp_string = moment(date).format('YYYY-MM-DD');
    this.setState({
      travel_start_alaska_to_from_hawaii: date,
      travel_start_alaska_to_from_hawaii_string: temp_string
    });
  }

  travelStartHawaiiHandler(date) {
    let temp_string = moment(date).format('YYYY-MM-DD');
    this.setState({
      travel_start_hawaii: date,
      travel_start_hawaii_string: temp_string
    });
  }

  travelStartMexicoHandler(date) {
    let temp_string = moment(date).format('YYYY-MM-DD');
    this.setState({
      travel_start_mexico: date,
      travel_start_mexico_string: temp_string
    });
  }

  travelStartCostaRicaHandler(date) {
    let temp_string = moment(date).format('YYYY-MM-DD');
    this.setState({
      travel_start_costa_rica: date,
      travel_start_costa_rica_string: temp_string
    });
  }

  travelStartOthersHandler(date) {
    let temp_string = moment(date).format('YYYY-MM-DD');
    this.setState({
      travel_start_others: date,
      travel_start_others_string: temp_string,
      travel_start_florida: date,
      travel_start_florida_string: temp_string
    });
  }


  travelEndAlaskaToFromHawaiiDateHandler(date) {
    let temp_string = moment(date).format('YYYY-MM-DD');
    this.setState({
      travel_end_alaska_to_from_hawaii: date,
      travel_end_alaska_to_from_hawaii_string: temp_string
    });
  }

  travelEndHawaiiHandler(date) {
    let temp_string = moment(date).format('YYYY-MM-DD');
    this.setState({
      travel_end_hawaii: date,
      travel_end_hawaii_string: temp_string
    });
  }

  travelEndMexicoHandler(date) {
    let temp_string = moment(date).format('YYYY-MM-DD');
    this.setState({
      travel_end_mexico: date,
      travel_end_mexico_string: temp_string
    });
  }

  travelEndCostaRicaHandler(date) {
    let temp_string = moment(date).format('YYYY-MM-DD');
    this.setState({
      travel_end_costa_rica: date,
      travel_end_costa_rica_string: temp_string,
    });
  }

  travelEndOthersHandler(date) {
    let temp_string = moment(date).format('YYYY-MM-DD');
    this.setState({
      travel_end_others: date,
      travel_end_others_string: temp_string,
      travel_end_florida: date,
      travel_end_florida_string: temp_string
    });
  }

  daysAvailabilityHawaiiHandler(e) {
    this.setState({
      days_availability_hawaii: e.target.value
    });
  }

  daysAvailabilityMexicoHandler(e) {
    this.setState({
      days_availability_mexico: e.target.value
    });
  }

  daysAvailabilityCostaRicaHandler(e) {
    this.setState({
      days_availability_costa_rica: e.target.value
    });
  }

  daysAvailabilityToFloridaHandler(e) {
    this.setState({
      days_availability_to_florida: e.target.value
    });
  }

  daysAvailabilityFromFloridaHandler(e) {
    this.setState({
      days_availability_from_florida: e.target.value
    });
  }

  daysAvailabilityOthersHandler(e) {
    this.setState({
      days_availability_others: e.target.value
    });
  }

  proposedStartDatePAEHandler(date) {
    let temp_string = moment(date).format('YYYY-MM-DD');
    this.setState({
      proposed_start_pae: date,
      proposed_start_pae_string: temp_string
    });
  }

  proposedEndDatePAEHandler(date) {
    let temp_string = moment(date).format('YYYY-MM-DD');
    this.setState({
      proposed_end_pae: date,
      proposed_end_pae_string: temp_string
    });
  }

  proposedStartDateHawaiiHandler(date) {
    let temp_string = moment(date).format('YYYY-MM-DD');
    this.setState({
      proposed_start_hawaii: date,
      proposed_start_hawaii_string: temp_string
    });
  }

  proposedEndDateHawaiiHandler(date) {
    let temp_string = moment(date).format('YYYY-MM-DD');
    this.setState({
      proposed_end_hawaii: date,
      proposed_end_hawaii_string: temp_string
    });
  }

  proposedStartDateOthersHandler(date) {
    let temp_string = moment(date).format('YYYY-MM-DD');
    this.setState({
      proposed_start_others: date,
      proposed_start_others_string: temp_string
    });
  }

  proposedEndDateOthersHandler(date) {
    let temp_string = moment(date).format('YYYY-MM-DD');
    this.setState({
      proposed_end_others: date,
      proposed_end_others_string: temp_string
    });
  }

  blackoutStartDateAlaskaToFromHawaiiHandler(date) {
    let temp_string = moment(date).format('YYYY-MM-DD');
    this.setState({
      blackout_start_alaska_to_from_hawaii: date,
      blackout_start_alaska_to_from_hawaii_string: temp_string
    });
  }

  blackoutEndDateAlaskaToFromHawaiiHandler(date) {
    let temp_string = moment(date).format('YYYY-MM-DD');
    this.setState({
      blackout_end_alaska_to_from_hawaii: date,
      blackout_end_alaska_to_from_hawaii_string: temp_string
    });
  }

  blackoutStartDateToHawaiiHandler(date) {
    let temp_string = moment(date).format('YYYY-MM-DD');
    this.setState({
      blackout_start_to_hawaii: date,
      blackout_start_to_hawaii_string: temp_string
    });
  }

  blackoutEndDateToHawaiiHandler(date) {
    let temp_string = moment(date).format('YYYY-MM-DD');
    this.setState({
      blackout_end_to_hawaii: date,
      blackout_end_to_hawaii_string: temp_string
    });
  }

  blackoutStartDateFromHawaiiHandler(date) {
    let temp_string = moment(date).format('YYYY-MM-DD');
    this.setState({
      blackout_start_from_hawaii: date,
      blackout_start_from_hawaii_string: temp_string
    });
  }

  blackoutEndDateFromHawaiiHandler(date) {
    let temp_string = moment(date).format('YYYY-MM-DD');
    this.setState({
      blackout_end_from_hawaii: date,
      blackout_end_from_hawaii_string: temp_string
    });
  }

  blackoutStartDateMexicoHandler(date) {
    let temp_string = moment(date).format('YYYY-MM-DD');
    this.setState({
      blackout_start_mexico: date,
      blackout_start_mexico_string: temp_string
    });
  }

  blackoutEndDateMexicoHandler(date) {
    let temp_string = moment(date).format('YYYY-MM-DD');
    this.setState({
      blackout_end_mexico: date,
      blackout_end_mexico_string: temp_string
    });
  }

  blackoutStartDateCostaRicaHandler(date) {
    let temp_string = moment(date).format('YYYY-MM-DD');
    this.setState({
      blackout_start_costa_rica: date,
      blackout_start_costa_rica_string: temp_string
    });
  }

  blackoutEndDateCostaRicaHandler(date) {
    let temp_string = moment(date).format('YYYY-MM-DD');
    this.setState({
      blackout_end_costa_rica: date,
      blackout_end_costa_rica_string: temp_string
    });
  }

  blackoutStartDateOthersHandler(date) {
    let temp_string = moment(date).format('YYYY-MM-DD');
    this.setState({
      blackout_start_others: date,
      blackout_start_others_string: temp_string
    });
  }

  blackoutEndDateOthersHandler(date) {
    let temp_string = moment(date).format('YYYY-MM-DD');
    this.setState({
      blackout_end_others: date,
      blackout_end_others_string: temp_string
    });
  }

  formatMyDateForCSV = (date) => {
    let temp_date = moment(date).format('MM/DD/YYYY');
    return temp_date;
  }


  changeHiddenSheet = (e) => {
    this.setState({
      hidden_sheet: e.target.value
    })
  }


  // Create XML Output
  createMyXml(combined_array) {
    console.log('State inside of createMyXML:', this.state);

    let doc = builder.create('FlightDeals', { encoding: 'UTF-8' })
      .att('xmlns:ss', 'urn:schemas-microsoft-com:office:spreadsheet')

    doc.com(getMyMonth(this.state.sale_start_date) + '/' + getMyDay(this.state.sale_start_date) + ' SALE - Updated at ' + getMyMonth(new Date()) + '/' + getMyDay(new Date()) + '/' + getMyYear(new Date()) + ' ' + getMyHour(new Date()) + ':' + getMyMinute(new Date()) + ' ' + getMyTimeOfDay(new Date()) + ' by PRODUCER_NAME');


    combined_array.map((item) => {
      let start_date = '';
      let end_date = '';
      let travel_start = null;
      let travel_end = null;
      let days_availability = '';
      let black_out_date_sentence = '';

      if (item["group"] === "ALASKA_HAWAII") {
        start_date = this.state.proposed_start_hawaii_string;
        end_date = this.state.proposed_end_hawaii_string;
        travel_start = this.state.travel_start_alaska_to_from_hawaii;
        travel_end = this.state.travel_end_alaska_to_from_hawaii;
        days_availability = this.state.days_availability_hawaii;
        // Pulling BLACKOUT DATES and FORMING the sentence
        if (this.state.blackout_start_alaska_to_from_hawaii !== null && this.state.blackout_end_alaska_to_from_hawaii !== null) {
          black_out_date_sentence = 'Blackout dates are from ' + makeDateMonthInEnglish(this.state.blackout_start_alaska_to_from_hawaii) + ' ' + getMyDay(this.state.blackout_start_alaska_to_from_hawaii) + ', ' + getMyYear(this.state.blackout_start_alaska_to_from_hawaii) + ' to ' + makeDateMonthInEnglish(this.state.blackout_end_alaska_to_from_hawaii) + ' ' + getMyDay(this.state.blackout_end_alaska_to_from_hawaii) + ', ' + getMyYear(this.state.blackout_end_alaska_to_from_hawaii) + '. '
        }
      } else if (item["group"] === "ALASKA_ALASKA") {
        start_date = this.state.proposed_start_others_string;
        end_date = this.state.proposed_end_others_string;
        travel_start = this.state.travel_start_others;
        travel_end = this.state.travel_end_others;
        days_availability = this.state.days_availability_others;
        // Pulling BLACKOUT DATES and FORMING the sentence
        if (this.state.blackout_start_others !== null && this.state.blackout_start_others !== null) {
          black_out_date_sentence = 'Blackout dates are from ' + makeDateMonthInEnglish(this.state.blackout_start_others) + ' ' + getMyDay(this.state.blackout_start_others) + ', ' + getMyYear(this.state.blackout_start_others) + ' to ' + makeDateMonthInEnglish(this.state.blackout_end_others) + ' ' + getMyDay(this.state.blackout_end_others) + ', ' + getMyYear(this.state.blackout_end_others) + '. '
        }
      } else if (item["group"] === "FROM_ALASKA") {
        start_date = this.state.proposed_start_others_string;
        end_date = this.state.proposed_end_others_string;
        travel_start = this.state.travel_start_others;
        travel_end = this.state.travel_end_others;
        days_availability = this.state.days_availability_others;
        // Pulling BLACKOUT DATES and FORMING the sentence
        if (this.state.blackout_start_others !== null && this.state.blackout_start_others !== null) {
          black_out_date_sentence = 'Blackout dates are from ' + makeDateMonthInEnglish(this.state.blackout_start_others) + ' ' + getMyDay(this.state.blackout_start_others) + ', ' + getMyYear(this.state.blackout_start_others) + ' to ' + makeDateMonthInEnglish(this.state.blackout_end_others) + ' ' + getMyDay(this.state.blackout_end_others) + ', ' + getMyYear(this.state.blackout_end_others) + '. '
        }
      } else if (item["group"] === "TO_ALASKA") {
        start_date = this.state.proposed_start_others_string;
        end_date = this.state.proposed_end_others_string;
        travel_start = this.state.travel_start_others;
        travel_end = this.state.travel_end_others;
        days_availability = this.state.days_availability_others;
        // Pulling BLACKOUT DATES and FORMING the sentence
        if (this.state.blackout_start_others !== null && this.state.blackout_start_others !== null) {
          black_out_date_sentence = 'Blackout dates are from ' + makeDateMonthInEnglish(this.state.blackout_start_others) + ' ' + getMyDay(this.state.blackout_start_others) + ', ' + getMyYear(this.state.blackout_start_others) + ' to ' + makeDateMonthInEnglish(this.state.blackout_end_others) + ' ' + getMyDay(this.state.blackout_end_others) + ', ' + getMyYear(this.state.blackout_end_others) + '. '
        }
      } else if (item["group"] === "TO_HAWAII" || item["group"] === "FROM_HAWAII") {
        start_date = this.state.proposed_start_hawaii_string;
        end_date = this.state.proposed_end_hawaii_string;
        travel_start = this.state.travel_start_hawaii;
        travel_end = this.state.travel_end_hawaii;
        days_availability = this.state.days_availability_hawaii;
        // Pulling BLACKOUT DATES and FORMING the sentence
        if (this.state.blackout_start_from_hawaii !== null && this.state.blackout_end_from_hawaii !== null && item["group"] === "FROM_HAWAII") {
          black_out_date_sentence = 'Blackout dates are from ' + makeDateMonthInEnglish(this.state.blackout_start_from_hawaii) + ' ' + getMyDay(this.state.blackout_start_from_hawaii) + ', ' + getMyYear(this.state.blackout_start_from_hawaii) + ' to ' + makeDateMonthInEnglish(this.state.blackout_end_from_hawaii) + ' ' + getMyDay(this.state.blackout_end_from_hawaii) + ', ' + getMyYear(this.state.blackout_end_from_hawaii) + '. '
        }
        if (this.state.blackout_start_to_hawaii !== null && this.state.blackout_start_to_hawaii !== null && item["group"] === "TO_HAWAII") {
          black_out_date_sentence = 'Blackout dates are from ' + makeDateMonthInEnglish(this.state.blackout_start_to_hawaii) + ' ' + getMyDay(this.state.blackout_start_to_hawaii) + ', ' + getMyYear(this.state.blackout_start_to_hawaii) + ' to ' + makeDateMonthInEnglish(this.state.blackout_end_to_hawaii) + ' ' + getMyDay(this.state.blackout_end_to_hawaii) + ', ' + getMyYear(this.state.blackout_end_to_hawaii) + '. '
        }
      } else if (item["group"] === "TO_FLORIDA") {
        start_date = this.state.proposed_start_others_string;
        end_date = this.state.proposed_end_others_string;
        travel_start = this.state.travel_start_florida;
        travel_end = this.state.travel_end_florida;
        days_availability = this.state.days_availability_to_florida;
        // Pulling BLACKOUT DATES and FORMING the sentence
        if (this.state.blackout_start_others !== null && this.state.blackout_start_others !== null) {
          black_out_date_sentence = 'Blackout dates are from ' + makeDateMonthInEnglish(this.state.blackout_start_others) + ' ' + getMyDay(this.state.blackout_start_others) + ', ' + getMyYear(this.state.blackout_start_others) + ' to ' + makeDateMonthInEnglish(this.state.blackout_end_others) + ' ' + getMyDay(this.state.blackout_end_others) + ', ' + getMyYear(this.state.blackout_end_others) + '. '
        }
      } else if (item["group"] === "FROM_FLORIDA") {
        start_date = this.state.proposed_start_others_string;
        end_date = this.state.proposed_end_others_string;
        travel_start = this.state.travel_start_florida;
        travel_end = this.state.travel_end_florida;
        days_availability = this.state.days_availability_from_florida;
        // Pulling BLACKOUT DATES and FORMING the sentence
        if (this.state.blackout_start_others !== null && this.state.blackout_start_others !== null) {
          black_out_date_sentence = 'Blackout dates are from ' + makeDateMonthInEnglish(this.state.blackout_start_others) + ' ' + getMyDay(this.state.blackout_start_others) + ', ' + getMyYear(this.state.blackout_start_others) + ' to ' + makeDateMonthInEnglish(this.state.blackout_end_others) + ' ' + getMyDay(this.state.blackout_end_others) + ', ' + getMyYear(this.state.blackout_end_others) + '. '
        }
      } else if (item["group"] === "MEXICO") {
        start_date = this.state.proposed_start_others_string;
        end_date = this.state.proposed_end_others_string;
        travel_start = this.state.travel_start_mexico;
        travel_end = this.state.travel_end_mexico;
        days_availability = this.state.days_availability_mexico;
        // Pulling BLACKOUT DATES and FORMING the sentence
        if (this.state.blackout_start_mexico !== null && this.state.blackout_start_mexico !== null) {
          black_out_date_sentence = 'Blackout dates are from ' + makeDateMonthInEnglish(this.state.blackout_start_mexico) + ' ' + getMyDay(this.state.blackout_start_mexico) + ', ' + getMyYear(this.state.blackout_start_mexico) + ' to ' + makeDateMonthInEnglish(this.state.blackout_end_mexico) + ' ' + getMyDay(this.state.blackout_end_mexico) + ', ' + getMyYear(this.state.blackout_end_mexico) + '. '
        }
      } else if (item["group"] === "COSTA_RICA") {
        start_date = this.state.proposed_start_others_string;
        end_date = this.state.proposed_end_others_string;
        travel_start = this.state.travel_start_costa_rica;
        travel_end = this.state.travel_end_costa_rica;
        days_availability = this.state.days_availability_costa_rica;
        // Pulling BLACKOUT DATES and FORMING the sentence
        if (this.state.blackout_start_costa_rica !== null && this.state.blackout_start_costa_rica !== null) {
          black_out_date_sentence = 'Blackout dates are from ' + makeDateMonthInEnglish(this.state.blackout_start_costa_rica) + ' ' + getMyDay(this.state.blackout_start_costa_rica) + ', ' + getMyYear(this.state.blackout_start_costa_rica) + ' to ' + makeDateMonthInEnglish(this.state.blackout_end_costa_rica) + ' ' + getMyDay(this.state.blackout_end_costa_rica) + ', ' + getMyYear(this.state.blackout_end_costa_rica) + '. '
        }
      } else if (item["group"] === "PAE") {
        start_date = this.state.proposed_start_pae_string;
        end_date = this.state.proposed_end_pae_string;
        travel_start = this.state.travel_start_others;
        travel_end = this.state.travel_end_others;
        days_availability = this.state.days_availability_others;
        // Pulling BLACKOUT DATES and FORMING the sentence
        if (this.state.blackout_start_others !== null && this.state.blackout_start_others !== null) {
          black_out_date_sentence = 'Blackout dates are from ' + makeDateMonthInEnglish(this.state.blackout_start_others) + ' ' + getMyDay(this.state.blackout_start_others) + ', ' + getMyYear(this.state.blackout_start_others) + ' to ' + makeDateMonthInEnglish(this.state.blackout_end_others) + ' ' + getMyDay(this.state.blackout_end_others) + ', ' + getMyYear(this.state.blackout_end_others) + '. '
        }
      } else if (item["group"] === "OTHER_MARKET") {
        start_date = this.state.proposed_start_others_string;
        end_date = this.state.proposed_end_others_string;
        travel_start = this.state.travel_start_others;
        travel_end = this.state.travel_end_others;
        days_availability = this.state.days_availability_others;
        // Pulling BLACKOUT DATES and FORMING the sentence
        if (this.state.blackout_start_others !== null && this.state.blackout_start_others !== null) {
          black_out_date_sentence = 'Blackout dates are from ' + makeDateMonthInEnglish(this.state.blackout_start_others) + ' ' + getMyDay(this.state.blackout_start_others) + ', ' + getMyYear(this.state.blackout_start_others) + ' to ' + makeDateMonthInEnglish(this.state.blackout_end_others) + ' ' + getMyDay(this.state.blackout_end_others) + ', ' + getMyYear(this.state.blackout_end_others) + '. '
        }
      } else {
      }


      let service_begin_sentence = '';
      let service_ends_sentence = '';

      let d_type = 'Saver';

      doc.com(getMyMonth(this.state.sale_start_date) + '/' + getMyDay(this.state.sale_start_date) + ' ' + item["name"]);
      let deal_set = doc.ele('DealSet', { 'from': this.state.sale_start_date_string + 'T00:00:01', 'to': this.state.sale_end_date_string + 'T23:59:59' })
        .ele('DealInfo', { 'code': getMyYear(this.state.sale_start_date) + '' + getMyMonth(this.state.sale_start_date) + '' + getMyDay(this.state.sale_start_date) + '_SALE-' + item["name"], 'dealType': d_type, 'url': '' })
        .ele('TravelDates', { 'startdate': start_date + 'T00:00:01', 'enddate': end_date + 'T23:59:59' }).up()
        .ele('DealTitle').up()
        .ele('DealDescrip', '<![CDATA[Purchase by ' + makeDateMonthInEnglish(this.state.sale_end_date) + ' ' + getMyDay(this.state.sale_end_date) + ', ' + getMyYear(this.state.sale_end_date) + '.]]>').up()
        .ele('terms', '<![CDATA[<strong>Fare Rules:</strong> Purchase by 11:59 pm (PT) on ' + makeDateMonthInEnglish(this.state.sale_end_date) + ' ' + getMyDay(this.state.sale_end_date) + ', ' + getMyYear(this.state.sale_end_date) + ', and at least ' + this.state.advance_purchase + ' prior to departure. Travel from ' + item["origin_city"] + ' (' + item["origin_code"] + ') to ' + item["destination_city"] + ' (' + item["destination_code"] + ') is valid ' + days_availability + ' from ' + makeDateMonthInEnglish(travel_start) + ' ' + getMyDay(travel_start) + ', ' + getMyYear(travel_start) + ' - ' + makeDateMonthInEnglish(travel_end) + ' ' + getMyDay(travel_end) + ', ' + getMyYear(travel_end) + '. ' + service_begin_sentence + '' + service_ends_sentence + '' + black_out_date_sentence + 'Bag fees <a href="#terms">may apply</a> for <a href="/content/travel-info/baggage/checked-bags">checked baggage</a>. See <a href="#terms">bottom of page</a> for full terms and conditions.]]>').up()
        .up()
      let fares_layer = deal_set.ele('Fares');

      item["price_types"].map((item2) => {
        if (item["default"] === true) {
          if (item2['fare_type'] === "Saver") {
            fares_layer.ele('Row', { 'fareType': item2['fare_type'], 'showAsDefault': 'true' })
              .ele('Cell', '<Data>' + item["origin_code"] + '</Data>').up()
              .ele('Cell', '<Data>' + returnMyCityName(item["origin_code"]) + '</Data>').up()
              .ele('Cell', '<Data>' + item["destination_code"] + '</Data>').up()
              .ele('Cell', '<Data>' + returnMyCityName(item["destination_code"]) + '</Data>').up()
              .ele('Cell', '<Data>' + item2["price"] + '</Data>').up()
          } else if (item2['fare_type'] === "Main") {
            fares_layer.ele('Row', { 'fareType': item2['fare_type'], 'showAsDefault': 'true' })
              .ele('Cell', '<Data>' + item["origin_code"] + '</Data>').up()
              .ele('Cell', '<Data>' + returnMyCityName(item["origin_code"]) + '</Data>').up()
              .ele('Cell', '<Data>' + item["destination_code"] + '</Data>').up()
              .ele('Cell', '<Data>' + returnMyCityName(item["destination_code"]) + '</Data>').up()
              .ele('Cell', '<Data>' + item2["price"] + '</Data>').up()
          } else {
            fares_layer.ele('Row', { 'fareType': item2['fare_type'], 'showAsDefault': 'true' })
              .ele('Cell', '<Data>' + item["origin_code"] + '</Data>').up()
              .ele('Cell', '<Data>' + returnMyCityName(item["origin_code"]) + '</Data>').up()
              .ele('Cell', '<Data>' + item["destination_code"] + '</Data>').up()
              .ele('Cell', '<Data>' + returnMyCityName(item["destination_code"]) + '</Data>').up()
              .ele('Cell', '<Data>' + item2["price"] + '</Data>').up()
              .ele('Cell', '<Data>' + item2["taxes"] + '</Data>').up()
          }
        } else {
          if (item2['fare_type'] === "Saver") {
            fares_layer.ele('Row', { 'fareType': item2['fare_type'] })
              .ele('Cell', '<Data>' + item["origin_code"] + '</Data>').up()
              .ele('Cell', '<Data>' + returnMyCityName(item["origin_code"]) + '</Data>').up()
              .ele('Cell', '<Data>' + item["destination_code"] + '</Data>').up()
              .ele('Cell', '<Data>' + returnMyCityName(item["destination_code"]) + '</Data>').up()
              .ele('Cell', '<Data>' + item2["price"] + '</Data>').up()
          } else if (item2['fare_type'] === "Main") {
            fares_layer.ele('Row', { 'fareType': item2['fare_type'] })
              .ele('Cell', '<Data>' + item["origin_code"] + '</Data>').up()
              .ele('Cell', '<Data>' + returnMyCityName(item["origin_code"]) + '</Data>').up()
              .ele('Cell', '<Data>' + item["destination_code"] + '</Data>').up()
              .ele('Cell', '<Data>' + returnMyCityName(item["destination_code"]) + '</Data>').up()
              .ele('Cell', '<Data>' + item2["price"] + '</Data>').up()
          } else {
            fares_layer.ele('Row', { 'fareType': item2['fare_type'] })
              .ele('Cell', '<Data>' + item["origin_code"] + '</Data>').up()
              .ele('Cell', '<Data>' + returnMyCityName(item["origin_code"]) + '</Data>').up()
              .ele('Cell', '<Data>' + item["destination_code"] + '</Data>').up()
              .ele('Cell', '<Data>' + returnMyCityName(item["destination_code"]) + '</Data>').up()
              .ele('Cell', '<Data>' + item2["price"] + '</Data>').up()
              .ele('Cell', '<Data>' + item2["taxes"] + '</Data>').up()
          }
        }
      });



      // .ele('Cell', '<Data>' + item2["taxes"] + '</Data>').up()
    });


    let element = doc.toString({ pretty: true });
    element = element.replace(/&lt;/g, '<');
    element = element.replace(/&gt;/g, '>');

    this.setState({
      finalOutput: element
    });

  }//End of `createMyXml`


  // Create JSON Output
  createMyJSON(combined_array) {
    console.log('State inside of createMyJSON:', this.state);

    // let dealsetComment = getMyMonth(this.state.sale_start_date) + '/' + getMyDay(this.state.sale_start_date) + ' SALE - Updated at ' + getMyMonth(new Date()) + '/' + getMyDay(new Date()) + '/' + getMyYear(new Date()) + ' ' + getMyHour(new Date()) + ':' + getMyMinute(new Date()) + ' ' + getMyTimeOfDay(new Date()) + ' by PRODUCER_NAME';

    let outputArray = [];

    combined_array.map((item) => {

      let dealSetObject = {};

      let start_date = '';
      let end_date = '';
      let travel_start = null;
      let travel_end = null;
      let days_availability = '';
      let black_out_date_sentence = '';

      if (item["group"] === "ALASKA_HAWAII") {
        start_date = this.state.proposed_start_hawaii_string;
        end_date = this.state.proposed_end_hawaii_string;
        travel_start = this.state.travel_start_alaska_to_from_hawaii;
        travel_end = this.state.travel_end_alaska_to_from_hawaii;
        days_availability = this.state.days_availability_hawaii;
        // Pulling BLACKOUT DATES and FORMING the sentence
        if (this.state.blackout_start_alaska_to_from_hawaii !== null && this.state.blackout_end_alaska_to_from_hawaii !== null) {
          black_out_date_sentence = 'Blackout dates are from ' + makeDateMonthInEnglish(this.state.blackout_start_alaska_to_from_hawaii) + ' ' + getMyDay(this.state.blackout_start_alaska_to_from_hawaii) + ', ' + getMyYear(this.state.blackout_start_alaska_to_from_hawaii) + ' to ' + makeDateMonthInEnglish(this.state.blackout_end_alaska_to_from_hawaii) + ' ' + getMyDay(this.state.blackout_end_alaska_to_from_hawaii) + ', ' + getMyYear(this.state.blackout_end_alaska_to_from_hawaii) + '. '
        }
      } else if (item["group"] === "ALASKA_ALASKA") {
        start_date = this.state.proposed_start_others_string;
        end_date = this.state.proposed_end_others_string;
        travel_start = this.state.travel_start_others;
        travel_end = this.state.travel_end_others;
        days_availability = this.state.days_availability_others;
        // Pulling BLACKOUT DATES and FORMING the sentence
        if (this.state.blackout_start_others !== null && this.state.blackout_start_others !== null) {
          black_out_date_sentence = 'Blackout dates are from ' + makeDateMonthInEnglish(this.state.blackout_start_others) + ' ' + getMyDay(this.state.blackout_start_others) + ', ' + getMyYear(this.state.blackout_start_others) + ' to ' + makeDateMonthInEnglish(this.state.blackout_end_others) + ' ' + getMyDay(this.state.blackout_end_others) + ', ' + getMyYear(this.state.blackout_end_others) + '. '
        }
      } else if (item["group"] === "FROM_ALASKA") {
        start_date = this.state.proposed_start_others_string;
        end_date = this.state.proposed_end_others_string;
        travel_start = this.state.travel_start_others;
        travel_end = this.state.travel_end_others;
        days_availability = this.state.days_availability_others;
        // Pulling BLACKOUT DATES and FORMING the sentence
        if (this.state.blackout_start_others !== null && this.state.blackout_start_others !== null) {
          black_out_date_sentence = 'Blackout dates are from ' + makeDateMonthInEnglish(this.state.blackout_start_others) + ' ' + getMyDay(this.state.blackout_start_others) + ', ' + getMyYear(this.state.blackout_start_others) + ' to ' + makeDateMonthInEnglish(this.state.blackout_end_others) + ' ' + getMyDay(this.state.blackout_end_others) + ', ' + getMyYear(this.state.blackout_end_others) + '. '
        }
      } else if (item["group"] === "TO_ALASKA") {
        start_date = this.state.proposed_start_others_string;
        end_date = this.state.proposed_end_others_string;
        travel_start = this.state.travel_start_others;
        travel_end = this.state.travel_end_others;
        days_availability = this.state.days_availability_others;
        // Pulling BLACKOUT DATES and FORMING the sentence
        if (this.state.blackout_start_others !== null && this.state.blackout_start_others !== null) {
          black_out_date_sentence = 'Blackout dates are from ' + makeDateMonthInEnglish(this.state.blackout_start_others) + ' ' + getMyDay(this.state.blackout_start_others) + ', ' + getMyYear(this.state.blackout_start_others) + ' to ' + makeDateMonthInEnglish(this.state.blackout_end_others) + ' ' + getMyDay(this.state.blackout_end_others) + ', ' + getMyYear(this.state.blackout_end_others) + '. '
        }
      } else if (item["group"] === "TO_HAWAII" || item["group"] === "FROM_HAWAII") {
        start_date = this.state.proposed_start_hawaii_string;
        end_date = this.state.proposed_end_hawaii_string;
        travel_start = this.state.travel_start_hawaii;
        travel_end = this.state.travel_end_hawaii;
        days_availability = this.state.days_availability_hawaii;
        // Pulling BLACKOUT DATES and FORMING the sentence
        if (this.state.blackout_start_from_hawaii !== null && this.state.blackout_end_from_hawaii !== null && item["group"] === "FROM_HAWAII") {
          black_out_date_sentence = 'Blackout dates are from ' + makeDateMonthInEnglish(this.state.blackout_start_from_hawaii) + ' ' + getMyDay(this.state.blackout_start_from_hawaii) + ', ' + getMyYear(this.state.blackout_start_from_hawaii) + ' to ' + makeDateMonthInEnglish(this.state.blackout_end_from_hawaii) + ' ' + getMyDay(this.state.blackout_end_from_hawaii) + ', ' + getMyYear(this.state.blackout_end_from_hawaii) + '. '
        }
        if (this.state.blackout_start_to_hawaii !== null && this.state.blackout_start_to_hawaii !== null && item["group"] === "TO_HAWAII") {
          black_out_date_sentence = 'Blackout dates are from ' + makeDateMonthInEnglish(this.state.blackout_start_to_hawaii) + ' ' + getMyDay(this.state.blackout_start_to_hawaii) + ', ' + getMyYear(this.state.blackout_start_to_hawaii) + ' to ' + makeDateMonthInEnglish(this.state.blackout_end_to_hawaii) + ' ' + getMyDay(this.state.blackout_end_to_hawaii) + ', ' + getMyYear(this.state.blackout_end_to_hawaii) + '. '
        }
      } else if (item["group"] === "TO_FLORIDA") {
        start_date = this.state.proposed_start_others_string;
        end_date = this.state.proposed_end_others_string;
        travel_start = this.state.travel_start_florida;
        travel_end = this.state.travel_end_florida;
        days_availability = this.state.days_availability_to_florida;
        // Pulling BLACKOUT DATES and FORMING the sentence
        if (this.state.blackout_start_others !== null && this.state.blackout_start_others !== null) {
          black_out_date_sentence = 'Blackout dates are from ' + makeDateMonthInEnglish(this.state.blackout_start_others) + ' ' + getMyDay(this.state.blackout_start_others) + ', ' + getMyYear(this.state.blackout_start_others) + ' to ' + makeDateMonthInEnglish(this.state.blackout_end_others) + ' ' + getMyDay(this.state.blackout_end_others) + ', ' + getMyYear(this.state.blackout_end_others) + '. '
        }
      } else if (item["group"] === "FROM_FLORIDA") {
        start_date = this.state.proposed_start_others_string;
        end_date = this.state.proposed_end_others_string;
        travel_start = this.state.travel_start_florida;
        travel_end = this.state.travel_end_florida;
        days_availability = this.state.days_availability_from_florida;
        // Pulling BLACKOUT DATES and FORMING the sentence
        if (this.state.blackout_start_others !== null && this.state.blackout_start_others !== null) {
          black_out_date_sentence = 'Blackout dates are from ' + makeDateMonthInEnglish(this.state.blackout_start_others) + ' ' + getMyDay(this.state.blackout_start_others) + ', ' + getMyYear(this.state.blackout_start_others) + ' to ' + makeDateMonthInEnglish(this.state.blackout_end_others) + ' ' + getMyDay(this.state.blackout_end_others) + ', ' + getMyYear(this.state.blackout_end_others) + '. '
        }
      } else if (item["group"] === "MEXICO") {
        start_date = this.state.proposed_start_others_string;
        end_date = this.state.proposed_end_others_string;
        travel_start = this.state.travel_start_mexico;
        travel_end = this.state.travel_end_mexico;
        days_availability = this.state.days_availability_mexico;
        // Pulling BLACKOUT DATES and FORMING the sentence
        if (this.state.blackout_start_mexico !== null && this.state.blackout_start_mexico !== null) {
          black_out_date_sentence = 'Blackout dates are from ' + makeDateMonthInEnglish(this.state.blackout_start_mexico) + ' ' + getMyDay(this.state.blackout_start_mexico) + ', ' + getMyYear(this.state.blackout_start_mexico) + ' to ' + makeDateMonthInEnglish(this.state.blackout_end_mexico) + ' ' + getMyDay(this.state.blackout_end_mexico) + ', ' + getMyYear(this.state.blackout_end_mexico) + '. '
        }
      } else if (item["group"] === "COSTA_RICA") {
        start_date = this.state.proposed_start_others_string;
        end_date = this.state.proposed_end_others_string;
        travel_start = this.state.travel_start_costa_rica;
        travel_end = this.state.travel_end_costa_rica;
        days_availability = this.state.days_availability_costa_rica;
        // Pulling BLACKOUT DATES and FORMING the sentence
        if (this.state.blackout_start_costa_rica !== null && this.state.blackout_start_costa_rica !== null) {
          black_out_date_sentence = 'Blackout dates are from ' + makeDateMonthInEnglish(this.state.blackout_start_costa_rica) + ' ' + getMyDay(this.state.blackout_start_costa_rica) + ', ' + getMyYear(this.state.blackout_start_costa_rica) + ' to ' + makeDateMonthInEnglish(this.state.blackout_end_costa_rica) + ' ' + getMyDay(this.state.blackout_end_costa_rica) + ', ' + getMyYear(this.state.blackout_end_costa_rica) + '. '
        }
      } else if (item["group"] === "PAE") {
        start_date = this.state.proposed_start_pae_string;
        end_date = this.state.proposed_end_pae_string;
        travel_start = this.state.travel_start_others;
        travel_end = this.state.travel_end_others;
        days_availability = this.state.days_availability_others;
        // Pulling BLACKOUT DATES and FORMING the sentence
        if (this.state.blackout_start_others !== null && this.state.blackout_start_others !== null) {
          black_out_date_sentence = 'Blackout dates are from ' + makeDateMonthInEnglish(this.state.blackout_start_others) + ' ' + getMyDay(this.state.blackout_start_others) + ', ' + getMyYear(this.state.blackout_start_others) + ' to ' + makeDateMonthInEnglish(this.state.blackout_end_others) + ' ' + getMyDay(this.state.blackout_end_others) + ', ' + getMyYear(this.state.blackout_end_others) + '. '
        }
      } else if (item["group"] === "OTHER_MARKET") {
        start_date = this.state.proposed_start_others_string;
        end_date = this.state.proposed_end_others_string;
        travel_start = this.state.travel_start_others;
        travel_end = this.state.travel_end_others;
        days_availability = this.state.days_availability_others;
        // Pulling BLACKOUT DATES and FORMING the sentence
        if (this.state.blackout_start_others !== null && this.state.blackout_start_others !== null) {
          black_out_date_sentence = 'Blackout dates are from ' + makeDateMonthInEnglish(this.state.blackout_start_others) + ' ' + getMyDay(this.state.blackout_start_others) + ', ' + getMyYear(this.state.blackout_start_others) + ' to ' + makeDateMonthInEnglish(this.state.blackout_end_others) + ' ' + getMyDay(this.state.blackout_end_others) + ', ' + getMyYear(this.state.blackout_end_others) + '. '
        }
      } else {
      }


      let service_begin_sentence = '';
      let service_ends_sentence = '';

      // let d_type = 'Saver';
      // let saleNameComment = getMyMonth(this.state.sale_start_date) + '/' + getMyDay(this.state.sale_start_date) + ' ' + item["name"];

      let fareRulesValue = 'Fare Rules:</strong> Purchase by 11:59 pm (PT) on ' + makeDateMonthInEnglish(this.state.sale_end_date) + ' ' + getMyDay(this.state.sale_end_date) + ', ' + getMyYear(this.state.sale_end_date) + ', and at least ' + this.state.advance_purchase + ' prior to departure. Travel from ' + item["origin_city"] + ' (' + item["origin_code"] + ') to ' + item["destination_city"] + ' (' + item["destination_code"] + ') is valid ' + days_availability + ' from ' + makeDateMonthInEnglish(travel_start) + ' ' + getMyDay(travel_start) + ', ' + getMyYear(travel_start) + ' - ' + makeDateMonthInEnglish(travel_end) + ' ' + getMyDay(travel_end) + ', ' + getMyYear(travel_end) + '. ' + service_begin_sentence + '' + service_ends_sentence + '' + black_out_date_sentence + 'Bag fees <a href="#terms">may apply</a> for <a href="/content/travel-info/baggage/checked-bags">checked baggage</a>. See <a href="#terms">bottom of page</a> for full terms and conditions.';
      let dealCodeValue = getMyYear(this.state.sale_start_date) + '' + getMyMonth(this.state.sale_start_date) + '' + getMyDay(this.state.sale_start_date) + '_SALE-' + item["name"];

      let startDateValue = start_date;
      let endDateValue = end_date;
      let purchaseByValue = 'Purchase by ' + makeDateMonthInEnglish(this.state.sale_end_date) + ' ' + getMyDay(this.state.sale_end_date) + ', ' + getMyYear(this.state.sale_end_date) + '.'

      let saverPrice = item["price_types"].find((priceTypeObj) => priceTypeObj.fare_type === 'Saver');
      let saverRevenueValue = saverPrice.price;

      let mainPrice = item["price_types"].find((priceTypeObj) => priceTypeObj.fare_type === 'Main');
      let mainRevenueValue = mainPrice.price;

      let milesPrice = item["price_types"].find((priceTypeObj) => priceTypeObj.fare_type === 'Miles');
      let milesValue = milesPrice.price;
      let feeValue = milesPrice.taxes;

      let activateValue = this.state.sale_start_date;
      let deactivateValue = this.state.sale_end_date;

      //Create DealSet Object
      dealSetObject.dealCode = dealCodeValue;
      dealSetObject.showAsDefault = false;
      dealSetObject.origin = item['origin_city'];
      dealSetObject.originShort = item['origin_code'];
      dealSetObject.destination = item['destination_city'];
      dealSetObject.destinationShort = item['destination_code'];
      dealSetObject.purchaseBy = purchaseByValue;
      dealSetObject.fareRules = fareRulesValue;
      dealSetObject.saverRevenue = saverRevenueValue;
      dealSetObject.mainRevenue = mainRevenueValue;
      dealSetObject.miles = milesValue;
      dealSetObject.fee = feeValue;
      dealSetObject.activate = activateValue;
      dealSetObject.deactivate = deactivateValue;
      dealSetObject.travelStart = startDateValue;
      dealSetObject.travelEnd = endDateValue;

      //Push DealSet Object to final output Array
      outputArray.push(dealSetObject);
    });


    outputArray = JSON.stringify(outputArray)
    console.log('outputArray: ', outputArray);
    this.setState({
      finalOutput: outputArray
    });

  }//End of `createMyJSON`




  //FORM BUTTON CLICK HANDLER
  // createSaleDetails(e) {
  //   e.preventDefault();

  //   this.createMyJSON(this.state.combined_saver_and_main);
  //   // this.verifyThatExceptionsIsNotEmpty();

  // }


  createMyJSONHandler = () => {
    this.createMyJSON(this.state.combined_saver_and_main);
  }


  createMyXmlHandler = () => {
    this.createMyXml(this.state.combined_saver_and_main);
  }



  // myFunction(xml) {
  //   var xmlDoc = xml.responseXML;
  //   var root = xmlDoc.documentElement;
  //   var currNode = root.childNodes[1];
  //   var removedNode = currNode.removeChild(currNode.childNodes[1]);
  //   console.log(removedNode.nodeName);
  // }


  // cleanFile = () => () => {


  //   let array = [...this.state.xml_response];
  //   let i = array.length;
  //   let newCleanArray = [];

  //   array.map((item, index) => {

  //     let deal_set_code = item.children[0].attributes["code"];
  //     let exp_date = item.attributes["to"];

  //     exp_date = new Date(exp_date);
  //     let right_now = new Date();

  //       if(exp_date > right_now){
  //        // array.splice(index, 1);
  //         newCleanArray.push(item);
  //       }else{
  //         console.log(deal_set_code);
  //         console.log(exp_date);
  //       }
  //   });

  //   this.setState({
  //     clean: newCleanArray
  //   });


  // }



  camelCaseCity = (cityname) => {
    for (let i = 0; i < city_caps_conversion.length; i++) {
      let myitem = city_caps_conversion[i].AVFM_name;
      let mycityname = city_caps_conversion[i].City_Name;
      if (myitem === cityname) {
        return mycityname;
      }
    }
  }


  splitAwardFromFee = (awardString) => {
    const splitAward = awardString.split('+');
    let awardOnly = splitAward[0].trim();
    let awardToInt = parseInt(awardOnly);
    console.log('LEXI: ', awardToInt);
    return awardToInt;
  }




  onFileChange(e, file) {

    file = file || e.target.files[0];

    let split_name = [];
    let myfilename = file.name;
    myfilename = myfilename.substring(0, myfilename.indexOf("."));
    if (myfilename.indexOf(" ") > -1) {
      split_name[0] = myfilename.substring(myfilename.indexOf(" "), myfilename.length).trim();
      split_name[1] = myfilename.substring(0, myfilename.indexOf(" "));

    } else {
      split_name[0] = myfilename;
    }

    // console.log(split_name);
    this.setState({
      file_name: split_name[0],
      isDisabled: false
    });



    //Sheet 1 Looper
    readXlsxFile(file, { sheet: 1 }).then((data) => {
      //Loops through every row in the sheet


      for (let index = 0; index < data.length; index++) {

        // SALE_TYPE (Col 7)
        if (data[index][0] === 'OW SALE:' && data[index][1] !== null) {
          this.setState({
            sale_type: data[index][1]
          });
        } else {
          this.setState({
            sale_type: this.state.file_name
          });
        }


        // SALE_OBJECTIVE (Col 8)
        if (data[index][0] === 'Sale Objective:' && data[index][1] !== null) {
          this.setState({
            sale_objective: data[index][1]
          });
        } else {
          this.setState({
            sale_objective: this.state.file_name
          });
        }


        //console.log(data[index]);
        //Get Sale Start Date from Sheet 1 and set state for sale_start_date variables
        if (data[index][0] === 'Sale Start Date:' && data[index][1] !== null) {
          //console.log(data[index]);
          let temp_string = moment(data[index][1]).format('YYYY-MM-DD');
          this.setState({
            sale_start_date: data[index][1],
            sale_start_date_string: temp_string
          });
        }
        //Get Purchase By date from Sheet 1 and set state for sale_end_date variables
        if (data[index][0] === 'Purchase By:' && data[index][1] !== null) {
          //console.log(data[index]);
          let temp_string = moment(data[index][1]).format('YYYY-MM-DD');
          this.setState({
            sale_end_date: data[index][1],
            sale_end_date_string: temp_string
          });
        }
        //Get Advance Purchase Days from Sheet 1 and set state for advance_purchase variable
        if (data[index][0] === 'Advance Purchase:' && data[index][1] !== null) {
          //console.log(data[index]);
          this.setState({
            advance_purchase: data[index][1]
          });
        }
        //Get Travel Start Date from Sheet 1 and set state for all travel_start variables
        if (data[index][0] === 'Travel Start:' && data[index][1] !== null) {
          //console.log(data[index]);
          let temp_string = moment(data[index][1]).format('YYYY-MM-DD');
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
            travel_start_others_string: temp_string
          });
        }

        //Get Completed Travel By Date from Sheet 1 and set state for all travel_end variables
        if (data[index][0] === 'Complete Travel By:' && data[index][1] !== null) {
          //console.log(data[index]);
          let temp_string = moment(data[index][1]).format('YYYY-MM-DD');
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
            travel_end_others_string: temp_string
          });
        }



        //Get Proposed Calendar Dates - PAE
        if (data[index][0] === 'Calendar Dates - PAE' && data[index][1] !== null) {
          let temp_string_start = moment(data[index - 1][1]).format('YYYY-MM-DD');
          let temp_string_end = moment(data[index][1]).format('YYYY-MM-DD');

          this.setState({
            proposed_start_pae: data[index - 1][1],
            proposed_start_pae_string: temp_string_start,
            proposed_end_pae: data[index][1],
            proposed_end_pae_string: temp_string_end
          });
        }


        //Get Proposed Calendar Dates - HAWAII
        if (data[index][0] === 'Calendar Dates - Hawaii' && data[index][1] !== null) {
          let temp_string_start = moment(data[index - 1][1]).format('YYYY-MM-DD');
          let temp_string_end = moment(data[index][1]).format('YYYY-MM-DD');

          this.setState({
            proposed_start_hawaii: data[index - 1][1],
            proposed_start_hawaii_string: temp_string_start,
            proposed_end_hawaii: data[index][1],
            proposed_end_hawaii_string: temp_string_end
          });
        }


        //Get Proposed Calendar Dates - OTHERS
        if (data[index][0] === 'Calendar Dates - All' && data[index][1] !== null) {
          let temp_string_start = moment(data[index - 1][1]).format('YYYY-MM-DD');
          let temp_string_end = moment(data[index][1]).format('YYYY-MM-DD');

          this.setState({
            proposed_start_others: data[index - 1][1],
            proposed_start_others_string: temp_string_start,
            proposed_end_others: data[index][1],
            proposed_end_others_string: temp_string_end
          });
        }






        //Get BALCKOUTS
        if (data[index][0] === 'Blackouts:' && data[index][1] !== null) {

          if (data[index][1].indexOf('to') > -1) {

            let temp_array = [];
            let temp_blackout = data[index][1];
            temp_array = temp_blackout.split(" to ");

            if (temp_array.length === 2) {
              let temp_blackout_start_date = new Date(temp_array[0]);
              let temp_blackout_start_date_string = moment(temp_blackout_start_date).format('YYYY-MM-DD');

              let temp_blackout_end_date = new Date(temp_array[1]);
              let temp_blackout_end_date_string = moment(temp_blackout_end_date).format('YYYY-MM-DD');

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
          } else if (data[index][1].indexOf('-') > -1) {

            let temp_array = [];
            let temp_blackout = data[index][1];
            temp_array = temp_blackout.split("-");

            if (temp_array.length === 2) {
              let temp_blackout_start_date = new Date(temp_array[0]);
              let temp_blackout_start_date_string = moment(temp_blackout_start_date).format('YYYY-MM-DD');

              let temp_blackout_end_date = new Date(temp_array[1]);
              let temp_blackout_end_date_string = moment(temp_blackout_end_date).format('YYYY-MM-DD');

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


      }//end of for loop


    })//end of readXlsxFile for Sheet 1


    let sheet_name = this.state.hidden_sheet;

    //US Ad Fare Sheet Looper
    readXlsxFile(file, { sheet: sheet_name }).then((data) => {
      //Loops through every row in the sheet

      for (let i = 0; i < data.length; i++) {

        //Get number of Distinct OD from the US Ad Fare Sheet TAB
        if (data[i].indexOf("Distinct ODs:") > -1) {
          this.setState({
            number_of_distinct_od: data[i][data[i].indexOf("Distinct ODs:") + 1]
          });
        }


        if (typeof data[i][0] === 'string' && data[i][0] !== null) {

          //Checks that the values in index 0 and 2 are airport codes for every row in the spreadsheet
          if (typeof data[i][2] == 'string' && (data[i][2].length === 3 && data[i][4].length === 3)) {

            let my_fare_type = data[i][11];

            let mygroup = "";

            if (groupMeByOrigin(data[i][2]) === "HAWAII") {
              mygroup = "FROM_HAWAII";
            } else if (groupMeByOrigin(data[i][4]) === "HAWAII") {
              mygroup = "TO_HAWAII";
            } else if (groupMeByOrigin(data[i][2]) === "MEXICO" || groupMeByOrigin(data[i][2]) === "COSTA_RICA") {
              mygroup = "";
              console.log("THERE SHOULD NOT BE FARES THAT ORIGINATE FROM MEXICO OR COSTA RICA!");
            } else if (groupMeByOrigin(data[i][4]) === "MEXICO") {
              mygroup = "MEXICO";
            } else if (groupMeByOrigin(data[i][4]) === "COSTA_RICA") {
              mygroup = "COSTA_RICA";
            } else if (groupMeByOrigin(data[i][2]) === "FLORIDA") {
              mygroup = "FROM_FLORIDA";
            } else if (groupMeByOrigin(data[i][4]) === "FLORIDA") {
              mygroup = "TO_FLORIDA";
            } else if (groupMeByOrigin(data[i][2]) === "PAE" || groupMeByOrigin(data[i][4]) === "PAE") {
              mygroup = "PAE";
            } else if (groupMeByOrigin(data[i][4]) === "OTHER_MARKET") {
              mygroup = "OTHER_MARKET";
            } else {
              mygroup = "";
              console.log("NO GROUP WAS FOUND FOR " + data[i][2] + data[i][4]);
            }

            let newArray = this.state.all_my_fares.slice();


            if (my_fare_type === "SAVER") {
              my_fare_type = "Saver";
            } else if (my_fare_type === "MAIN") {
              my_fare_type = "Main";
            } else {
              my_fare_type = "Miles";
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
              price: typeof data[i][6] == 'string' ? this.splitAwardFromFee(data[i][6]) : data[i][6],
              fare_type: my_fare_type,
              fare_class_code: data[i][7],
              filed_fare: data[i][8],
              taxes: data[i][9],
              shortened_region: data[i][10],
              round_trip: data[i][12],
            });
            this.setState({
              all_my_fares: newArray
            });

          }

        }
      }//end of for loop


      let temp_arr = this.state.all_my_fares.slice();
      temp_arr.sort(compareDestinationCode); //SORT by Destination Code first for alphabetical
      temp_arr.sort(compareOriginCode); //SORT by Origin Code second for alphabetical
      temp_arr.sort(comparePrice); //SORT by Price last for lowest to highest fares

      this.setState({
        all_my_fares: temp_arr
      });


      let temp_combined = this.state.combined_saver_and_main.slice();

      temp_combined = mergeObjects(this.state.all_my_fares);

      this.setState({
        combined_saver_and_main: temp_combined
      });


    })//end of readXlsxFile for US Ad Fare Sheet


  }


  handleExceptionCodeChange = (idx) => (evt) => {
    let temp_code = evt.target.value;
    temp_code = temp_code.toUpperCase();
    if (temp_code.length === 6) {
      temp_code = temp_code.match(/.{1,3}/g);
    } else {
      temp_code = evt.target.value
    }

    const newShareholders = this.state.exceptions.map((item, sidx) => {
      if (idx !== sidx) return item;
      return {
        ...item,
        code_origin: temp_code[0],
        code_destination: temp_code[1]
      };
    });
    this.setState({
      exceptions: newShareholders
    });
  }


  handleExceptionTravelValid = (idx) => (evt) => {
    const newShareholders = this.state.exceptions.map((item, sidx) => {
      if (idx !== sidx) return item;
      return {
        ...item,
        travel_valid: evt.target.value
      };
    });
    this.setState({
      exceptions: newShareholders
    });
  }


  handleExceptionServiceBegins = (idx) => (date) => {
    let temp_string = moment(date).format('YYYY-MM-DD');
    const newShareholders = this.state.exceptions.map((item, sidx) => {
      if (idx !== sidx) return item;
      return {
        ...item,
        service_begins: date,
        begins_string: temp_string,
      };
    });

    this.setState({
      exceptions: newShareholders
    });
  }


  handleExceptionServiceEnds = (idx) => (date) => {
    let temp_string = moment(date).format('YYYY-MM-DD');
    const newShareholders = this.state.exceptions.map((item, sidx) => {
      if (idx !== sidx) return item;
      return {
        ...item,
        service_ends: date,
        ends_string: temp_string,
      };
    });

    this.setState({
      exceptions: newShareholders
    });
  }


  handleAddException = () => {
    this.setState({
      exceptions: this.state.exceptions.concat([{ code_origin: '', code_destination: '', travel_valid: '', service_begins: null, service_ends: null, begins_string: '', ends_string: '' }])
    });
  }


  handleRemoveException = (idx) => () => {
    this.setState({
      exceptions: this.state.exceptions.filter((s, sidx) => idx !== sidx)
    });
  }


  resetOutputVariable = () => () => {

    // let newArray = this.state.finalOutput.slice();
    this.setState({
      finalOutput: ''
    });

  }


  travelFromToUSHandler = (date) => {
    let temp_string = moment(date).format('YYYY-MM-DD');

    this.setState({
      travel_from_to_us: date,
      travel_from_to_us_string: temp_string
    });
  }


  travelByToUSHandler = (date) => {
    let temp_string = moment(date).format('YYYY-MM-DD');
    this.setState({
      travel_by_to_us: date,
      travel_by_to_us_string: temp_string
    });
  }


  daysAvailabilityToUSHandler = (e) => {
    this.setState({
      days_availability_to_us: e.target.value
    });
  }


  travelFromWithinAlaskaHandler = (date) => {
    let temp_string = moment(date).format('YYYY-MM-DD');

    this.setState({
      travel_from_within_alaska: date,
      travel_from_within_alaska_string: temp_string
    });
  }



  travelByWithinAlaskaHandler = (date) => {
    let temp_string = moment(date).format('YYYY-MM-DD');
    this.setState({
      travel_by_within_alaska: date,
      travel_by_within_alaska_string: temp_string
    });
  }


  daysAvailabilityWithinAlaskaHandler = (e) => {
    this.setState({
      days_availability_within_alaska: e.target.value
    });
  }


  render() {


    return (
      <div className="App">
        <div className="">

          <div className="row col-md-12">


            <div className="form-row sale-information">


              <div className="file_select_grid">
                <div className="file_select_title">
                  <h3 className="information-headline">Sale Information v3:</h3>
                </div>
                <div className="file_select_input">
                  <input type="file" className="form-control" id="inputFile" onChange={this.onFileChange} />
                </div>
                <div className="sheet_number_input">
                  <input type="text" className="form-control" id="sheet_number" onChange={this.changeHiddenSheet} placeholder="" value={this.state.hidden_sheet} style={{ marginTop: 10 }} />
                </div>
              </div>





              <div className="date_inputs_grid">
                {/* This row is for Sale Start */}
                <div className="sale_start">
                  <label htmlFor="saleStartDate"><strong>Sale Start</strong></label><br />
                  <DatePicker className="form-control" id="saleStartDate" selected={this.state.sale_start_date} onChange={this.saleStartDateHandler} />
                </div>
                {/* This row is for Sale End */}
                <div className="purchase_by">
                  <label htmlFor="saleEndDate"><strong>Purchase By</strong></label>
                  <DatePicker className="form-control" id="saleEndDate" selected={this.state.sale_end_date} onChange={this.saleEndDateHandler} />
                </div>
                {/* This row is for Advance Purchase */}
                <div className="advance_purchase">
                  <label htmlFor="advancePurchase"><strong>Advance Purchase</strong></label>
                  <input type="text" className="form-control" id="advancePurchase" value={this.state.advance_purchase} onChange={this.advancePurchaseHandler} />
                </div>

                {/* DEFAULT MARKETS */}
                <div className="default_markets">
                  <label htmlFor="default_markets"><strong>Default Markets:</strong></label>
                  {this.state.textareaedit === true ? (
                    <textarea className="form-control rounded-0" id="default_markets" rows="14" onChange={this.saveDefaultMarkets} ></textarea>
                  ) : (
                    <div id="display-data-Container" style={{ height: '100%' }}>{this.displayData}</div>
                  )}
                </div>


                {/* This row is for Travel Start: Alaska to/from Hawaii */}
                <div className="travel_start_alaska_to_from_hawaii">
                  <label htmlFor="travel_start_alaska_to_from_hawaii"><strong>Travel Start:</strong> Alaska to/from Hawaii</label><br />
                  <DatePicker className="form-control" id="travel_start_alaska_to_from_hawaii" selected={this.state.travel_start_alaska_to_from_hawaii} onChange={this.travelStartAlaskaToFromHawaiiDateHandler} />
                </div>
                {/* This row is for Complete Travel By: Alaska to/from Hawaii */}
                <div className="travel_end_alaska_to_from_hawaii">
                  <label htmlFor="travel_end_alaska_to_from_hawaii"><strong>Completed Travel By:</strong> Alaska to/from Hawaii</label><br />
                  <DatePicker className="form-control" id="travel_end_alaska_to_from_hawaii" selected={this.state.travel_end_alaska_to_from_hawaii} onChange={this.travelEndAlaskaToFromHawaiiDateHandler} />
                </div>
                {/* This row is for Days Availability: Alaska to/from Hawaii */}
                <div className="days_availability_alaska_to_from_hawaii">
                  <label htmlFor="days_availability_alaska_to_from_hawaii"><strong>Days Availability:</strong> Alaska to/from Hawaii</label><br />
                  <input type="text" className="form-control" id="days_availability_alaska_to_from_hawaii" value={this.state.days_availability_hawaii} readOnly />
                </div>



                {/* This row is for Travel Start: HAWAII */}
                <div className="travel_start_hawaii">
                  <label htmlFor="travel_start_hawaii"><strong>Travel Start:</strong> Hawaii</label><br />
                  <DatePicker className="form-control" id="travel_start_hawaii" selected={this.state.travel_start_hawaii} onChange={this.travelStartHawaiiHandler} />
                </div>
                {/* This row is for Complete Travel By: HAWAII */}
                <div className="travel_end_hawaii">
                  <label htmlFor="travel_end_hawaii"><strong>Completed Travel By:</strong> Hawaii</label><br />
                  <DatePicker className="form-control" id="travel_end_hawaii" selected={this.state.travel_end_hawaii} onChange={this.travelEndHawaiiHandler} />
                </div>
                {/* This row is for Days Availability: HAWAII */}
                <div className="days_availability_hawaii">
                  <label htmlFor="days_availability_hawaii"><strong>Days Availability:</strong> Hawaii</label><br />
                  <input type="text" className="form-control" id="days_availability_hawaii" value={this.state.days_availability_hawaii} onChange={this.daysAvailabilityHawaiiHandler} />
                </div>




                {/* This row is for Travel Start: MEXICO */}
                <div className="travel_start_mexico">
                  <label htmlFor="travel_start_mexico"><strong>Travel Start:</strong> Mexico</label><br />
                  <DatePicker className="form-control" id="travel_start_mexico" selected={this.state.travel_start_mexico} onChange={this.travelStartMexicoHandler} />
                </div>
                {/* This row is for Complete Travel By: MEXICO */}
                <div className="travel_end_mexico">
                  <label htmlFor="travel_end_mexico"><strong>Completed Travel By:</strong> Mexico</label><br />
                  <DatePicker className="form-control" id="travel_end_mexico" selected={this.state.travel_end_mexico} onChange={this.travelEndMexicoHandler} />
                </div>
                {/* This row is for Days Availability: MEXICO */}
                <div className="days_availability_mexico">
                  <label htmlFor="days_availability_mexico"><strong>Days Availability:</strong> Mexico</label><br />
                  <input type="text" className="form-control" id="days_availability_mexico" value={this.state.days_availability_mexico} onChange={this.daysAvailabilityMexicoHandler} />
                </div>




                {/* This row is for Travel Start: COSTA RICA */}
                <div className="travel_start_costa_rica">
                  <label htmlFor="travel_start_costa_rica"><strong>Travel Start:</strong> Costa Rica</label><br />
                  <DatePicker className="form-control" id="travel_start_costa_rica" selected={this.state.travel_start_costa_rica} onChange={this.travelStartCostaRicaHandler} />
                </div>
                {/* This row is for Complete Travel By: COSTA RICA */}
                <div className="travel_end_costa_rica">
                  <label htmlFor="travel_end_costa_rica"><strong>Completed Travel By:</strong> Costa Rica</label><br />
                  <DatePicker className="form-control" id="travel_end_costa_rica" selected={this.state.travel_end_costa_rica} onChange={this.travelEndCostaRicaHandler} />
                </div>
                {/* This row is for Days Availability: COSTA RICA */}
                <div className="days_availability_costa_rica">
                  <label htmlFor="days_availability_costa_rica"><strong>Days Availability:</strong> Costa Rica</label><br />
                  <input type="text" className="form-control" id="days_availability_costa_rica" value={this.state.days_availability_costa_rica} onChange={this.daysAvailabilityCostaRicaHandler} />
                </div>




                {/* This row is for Travel Start: FLORIDA */}
                <div className="travel_start_florida">
                  <label htmlFor="travel_start_florida"><strong>Travel Start:</strong> Florida</label><br />
                  <DatePicker className="form-control" id="travel_start_florida" selected={this.state.travel_start_others} readOnly />
                </div>
                {/* This row is for Complete Travel By: FLORIDA */}
                <div className="travel_end_florida">
                  <label htmlFor="travel_end_florida"><strong>Completed Travel By:</strong> Florida</label><br />
                  <DatePicker className="form-control" id="travel_end_florida" selected={this.state.travel_end_others} readOnly />
                </div>
                {/* This row is for Days Availability: TO FLORIDA */}
                <div className="days_availability_to_florida">
                  <label htmlFor="days_availability_to_florida"><strong>Days Availability:</strong> To Florida</label><br />
                  <input type="text" className="form-control" id="days_availability_to_florida" value={this.state.days_availability_to_florida} onChange={this.daysAvailabilityToFloridaHandler} />
                </div>
                {/* This row is for Days Availability: FROM FLORIDA */}
                <div className="days_availability_from_florida">
                  <label htmlFor="days_availability_from_florida"><strong>Days Availability:</strong> From Florida</label><br />
                  <input type="text" className="form-control" id="days_availability_from_florida" value={this.state.days_availability_from_florida} onChange={this.daysAvailabilityFromFloridaHandler} />
                </div>




                {/* This row is for Travel Start: ALL OTHER MARKET */}
                <div className="travel_start_others">
                  <label htmlFor="travel_start_others"><strong>Travel Start:</strong> Other Markets</label><br />
                  <DatePicker className="form-control" id="travel_start_others" selected={this.state.travel_start_others} onChange={this.travelStartOthersHandler} />
                </div>
                {/* This row is for Complete Travel By: ALL OTHER MARKET */}
                <div className="travel_end_others">
                  <label htmlFor="travel_end_others"><strong>Completed Travel By:</strong> Other Markets</label><br />
                  <DatePicker className="form-control" id="travel_end_others" selected={this.state.travel_end_others} onChange={this.travelEndOthersHandler} />
                </div>
                {/* This row is for Days Availability: ALL OTHER MARKET */}
                <div className="days_availability_others">
                  <label htmlFor="days_availability_others"><strong>Days Availability:</strong> Other Markets</label><br />
                  <input type="text" className="form-control" id="days_availability_others" value={this.state.days_availability_others} onChange={this.daysAvailabilityOthersHandler} />
                </div>

              </div>


              {/* This row is for Proposed PAE Dates */}
              <div className="proposed_dates_pae">
                <div className="proposed_dates_pae_start">
                  <label htmlFor=""><strong>Proposed Start Date:</strong> PAE</label><br />
                  <DatePicker className="form-control" selected={this.state.proposed_start_pae} onChange={this.proposedStartDatePAEHandler} />
                </div>
                <div className="proposed_dates_pae_end">
                  <label htmlFor=""><strong>Proposed End Date:</strong> PAE</label><br />
                  <DatePicker className="form-control" selected={this.state.proposed_end_pae} onChange={this.proposedEndDatePAEHandler} />
                </div>
              </div>

              {/* This row is for Proposed Hawaii Dates */}
              <div className="proposed_dates_hawaii">
                <div className="proposed_dates_hawaii_start">
                  <label htmlFor=""><strong>Proposed Start Date:</strong> HAWAII</label><br />
                  <DatePicker className="form-control" selected={this.state.proposed_start_hawaii} onChange={this.proposedStartDateHawaiiHandler} />
                </div>
                <div className="proposed_dates_hawaii_end">
                  <label htmlFor=""><strong>Proposed End Date:</strong> HAWAII</label><br />
                  <DatePicker className="form-control" selected={this.state.proposed_end_hawaii} onChange={this.proposedEndDateHawaiiHandler} />
                </div>
              </div>



              {/* This row is for Proposed Others Dates */}
              <div className="proposed_dates_others">
                <div className="proposed_dates_others_start">
                  <label htmlFor=""><strong>Proposed Start Date:</strong> OTHERS</label><br />
                  <DatePicker className="form-control" selected={this.state.proposed_start_others} onChange={this.proposedStartDateOthersHandler} />
                </div>
                <div className="proposed_dates_others_end">
                  <label htmlFor=""><strong>Proposed End Date:</strong> OTHERS</label><br />
                  <DatePicker className="form-control" selected={this.state.proposed_end_others} onChange={this.proposedEndDateOthersHandler} />
                </div>
              </div>





              {/* End of 1st Form ROW */}
            </div>




            {/* Blackout Information ROW */}
            <div className="form-row blackout-information">
              <div className="row col-md-12">
                <h3 className="information-headline">Blackouts:</h3>
              </div>
              <div className="form-group col-md-4">
                <div className="row col-md-12 individual-blackout">
                  <div className="col-md-12 remove-padding">
                    <h6 className="blackout-headline black-color"><strong>Blackout Dates:</strong> Alaska to/from Hawaii</h6>
                  </div>
                  <div className="col-md-5 remove-padding">
                    <DatePicker className="form-control" selected={this.state.blackout_start_alaska_to_from_hawaii} onChange={this.blackoutStartDateAlaskaToFromHawaiiHandler} />
                  </div>
                  <div className="col-md-2 text-center">
                    <h6 className="black-color">to</h6>
                  </div>
                  <div className="col-md-5 remove-padding">
                    <DatePicker className="form-control" selected={this.state.blackout_end_alaska_to_from_hawaii} onChange={this.blackoutEndDateAlaskaToFromHawaiiHandler} />
                  </div>
                </div>
              </div>

              <div className="form-group col-md-4">
                <div className="row col-md-12 individual-blackout">
                  <div className="col-md-12 remove-padding">
                    <h6 className="blackout-headline black-color"><strong>Blackout Dates:</strong> To Hawaii</h6>
                  </div>
                  <div className="col-md-5 remove-padding">
                    <DatePicker className="form-control" selected={this.state.blackout_start_to_hawaii} onChange={this.blackoutStartDateToHawaiiHandler} />
                  </div>
                  <div className="col-md-2 text-center">
                    <h6 className="black-color">to</h6>
                  </div>
                  <div className="col-md-5 remove-padding">
                    <DatePicker className="form-control" selected={this.state.blackout_end_to_hawaii} onChange={this.blackoutEndDateToHawaiiHandler} />
                  </div>
                </div>
              </div>

              <div className="form-group col-md-4">
                <div className="row col-md-12 individual-blackout">
                  <div className="col-md-12 remove-padding">
                    <h6 className="blackout-headline black-color"><strong>Blackout Dates:</strong> From Hawaii</h6>
                  </div>
                  <div className="col-md-5 remove-padding">
                    <DatePicker className="form-control" selected={this.state.blackout_start_from_hawaii} onChange={this.blackoutStartDateFromHawaiiHandler} />
                  </div>
                  <div className="col-md-2 text-center">
                    <h6 className="black-color">to</h6>
                  </div>
                  <div className="col-md-5 remove-padding">
                    <DatePicker className="form-control" selected={this.state.blackout_end_from_hawaii} onChange={this.blackoutEndDateFromHawaiiHandler} />
                  </div>
                </div>
              </div>

              <div className="form-group col-md-4">
                <div className="row col-md-12 individual-blackout">
                  <div className="col-md-12 remove-padding">
                    <h6 className="blackout-headline black-color"><strong>Blackout Dates:</strong> Mexico</h6>
                  </div>
                  <div className="col-md-5 remove-padding">
                    <DatePicker className="form-control" selected={this.state.blackout_start_mexico} onChange={this.blackoutStartDateMexicoHandler} />
                  </div>
                  <div className="col-md-2 text-center">
                    <h6 className="black-color">to</h6>
                  </div>
                  <div className="col-md-5 remove-padding">
                    <DatePicker className="form-control" selected={this.state.blackout_end_mexico} onChange={this.blackoutEndDateMexicoHandler} />
                  </div>
                </div>
              </div>
              <div className="form-group col-md-4">
                <div className="row col-md-12 individual-blackout">
                  <div className="col-md-12 remove-padding">
                    <h6 className="blackout-headline black-color"><strong>Blackout Dates:</strong> Costa Rica</h6>
                  </div>
                  <div className="col-md-5 remove-padding">
                    <DatePicker className="form-control" selected={this.state.blackout_start_costa_rica} onChange={this.blackoutStartDateCostaRicaHandler} />
                  </div>
                  <div className="col-md-2 text-center">
                    <h6 className="black-color">to</h6>
                  </div>
                  <div className="col-md-5 remove-padding">
                    <DatePicker className="form-control" selected={this.state.blackout_end_costa_rica} onChange={this.blackoutEndDateCostaRicaHandler} />
                  </div>
                </div>
              </div>
              <div className="form-group col-md-4">
                <div className="row col-md-12 individual-blackout">
                  <div className="col-md-12 remove-padding">
                    <h6 className="blackout-headline black-color"><strong>Blackout Dates:</strong> Other Markets</h6>
                  </div>
                  <div className="col-md-5 remove-padding">
                    <DatePicker className="form-control" selected={this.state.blackout_start_others} onChange={this.blackoutStartDateOthersHandler} />
                  </div>
                  <div className="col-md-2 text-center">
                    <h6 className="black-color">to</h6>
                  </div>
                  <div className="col-md-5 remove-padding">
                    <DatePicker className="form-control" selected={this.state.blackout_end_others} onChange={this.blackoutEndDateOthersHandler} />
                  </div>
                </div>
              </div>

            </div>


            {/* GENERATE BUTTONS */}
            <div className="sale_information">
              <div className="generateXml">
                {
                  this.state.isDisabled ? (
                    <button type="submit" disabled className="generate_xml disabled" onClick={this.createMyXmlHandler}>Generate <span>XML</span></button>
                  ) : (
                    <button type="submit" className="generate_xml enabled" onClick={this.createMyXmlHandler}>Generate <span>XML</span></button>
                  )
                }

              </div>
              <div className="generateJson">
                {
                  this.state.isDisabled ? (
                    <button type="submit" disabled className="generate_json disabled" onClick={this.createMyJSONHandler}>Generate <span>JSON</span></button>
                  ) : (
                    <button type="submit" className="generate_json enabled" onClick={this.createMyJSONHandler}>Generate <span>JSON</span></button>
                  )
                }

              </div>
            </div>



            {/* XML OUTPUT LAYER */}
            <div className="form-row output-information">
              <div className="row col-md-12">
                <div className="col-lg-10 col-md-8 col-sm-6">
                  <h3 className="information-headline">Output:</h3>
                </div>
                <div className="form-group col-lg-1 col-md-2 col-sm-3">
                  <CopyToClipboard text={this.state.finalOutput}
                    onCopy={() => this.setState({ copied: true })}>
                    <button type="submit" className="btn btn-success copy-to-clipboard"> <i className="fa fa-copy"></i> Clipboard</button>
                  </CopyToClipboard>
                </div>
                <div className="form-group col-lg-1 col-md-2 col-sm-3">
                  <button type="submit" className="btn btn-warning copy-to-clipboard" onClick={this.resetOutputVariable()}> <i className="fa fa-times"></i> Clear</button>
                </div>

              </div>
              <div className="row col-md-12">
                <div className="form-group col-md-12">

                  {/* <pre id="pre-xml-output">
                    {this.state.finalOutput}
                  </pre> */}

                  <pre id="pre-xml-output">{this.state.finalOutput}</pre>
                </div>
              </div>
            </div>


          </div>

        </div>
      </div>
    );

  }


}

export default App;
