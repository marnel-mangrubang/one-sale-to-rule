export function comparePrice(a, b) {
    const genreA = a.price;
    const genreB = b.price;

    let comparison = 0;
    if (genreA > genreB) {
        comparison = 1;
    } else if (genreA < genreB) {
        comparison = -1;
    }
    return comparison;
}

export function compareOriginCode(a, b) {
    const genreA = a.origin_code.toUpperCase();
    const genreB = b.origin_code.toUpperCase();

    let comparison = 0;
    if (genreA > genreB) {
        comparison = 1;
    } else if (genreA < genreB) {
        comparison = -1;
    }
    return comparison;
}

export function compareDestinationCode(a, b) {
    const genreA = a.destination_code.toUpperCase();
    const genreB = b.destination_code.toUpperCase();

    let comparison = 0;
    if (genreA > genreB) {
        comparison = 1;
    } else if (genreA < genreB) {
        comparison = -1;
    }
    return comparison;
}

export function verifyMyAirportCode(code) {
    return {
        "ABQ":"ABQ",
        "ACV":"ACV",
        "ADK":"ADK",
        "ADQ":"ADQ",
        "AKN":"AKN",
        "ALW":"ALW",
        "ANC":"ANC",
        "ATL":"ATL",
        "AUS":"AUS",
        "BET":"BET",
        "BIL":"BIL",
        "BLI":"BLI",
        "BNA":"BNA",
        "BOI":"BOI",
        "BOS":"BOS",
        "BRW":"BRW",
        "BUR":"BUR",
        "BWI":"BWI",
        "BZN":"BZN",
        "CDV":"CDV",
        "CHS":"CHS",
        "COS":"COS",
        "CUN":"CUN",
        "DAL":"DAL",
        "DCA":"DCA",
        "DEN":"DEN",
        "DFW":"DFW",
        "DLG":"DLG",
        "DTW":"DTW",
        "DUT":"DUT",
        "EAT":"EAT",
        "EUG":"EUG",
        "EWR":"EWR",
        "FAI":"FAI",
        "FAT":"FAT",
        "FCA":"FCA",
        "FLG":"FLG",
        "FLL":"FLL",
        "GDL":"GDL",
        "GEG":"GEG",
        "GST":"GST",
        "GTF":"GTF",
        "GUC":"GUC",
        "HAV":"HAV",
        "HDN":"HDN",
        "HLN":"HLN",
        "HNL":"HNL",
        "IAD":"IAD",
        "IAH":"IAH",
        "ICT":"ICT",
        "IDA":"IDA",
        "IND":"IND",
        "JFK":"JFK",
        "JNU":"JNU",
        "KOA":"KOA",
        "KTN":"KTN",
        "LAP":"LAP",
        "LAS":"LAS",
        "LAX":"LAX",
        "LGA":"LGA",
        "LGB":"LGB",
        "LIH":"LIH",
        "LIR":"LIR",
        "LTO":"LTO",
        "LWS":"LWS",
        "MCI":"MCI",
        "MCO":"MCO",
        "MEX":"MEX",
        "MFR":"MFR",
        "MIA":"MIA",
        "MKE":"MKE",
        "MMH":"MMH",
        "MRY":"MRY",
        "MSO":"MSO",
        "MSP":"MSP",
        "MSY":"MSY",
        "MZT":"MZT",
        "OAK":"OAK",
        "OGG":"OGG",
        "OKC":"OKC",
        "OMA":"OMA",
        "OME":"OME",
        "ONT":"ONT",
        "ORD":"ORD",
        "OTZ":"OTZ",
        "PAE":"PAE",
        "PDX":"PDX",
        "PHL":"PHL",
        "PHX":"PHX",
        "PIT":"PIT",
        "PRC":"PRC",
        "PSC":"PSC",
        "PSG":"PSG",
        "PSP":"PSP",
        "PUW":"PUW",
        "PVR":"PVR",
        "RDD":"RDD",
        "RDM":"RDM",
        "RDU":"RDU",
        "RNO":"RNO",
        "SAN":"SAN",
        "SAT":"SAT",
        "SBA":"SBA",
        "SBP":"SBP",
        "SCC":"SCC",
        "SEA":"SEA",
        "SFO":"SFO",
        "SIT":"SIT",
        "SJC":"SJC",
        "SJD":"SJD",
        "SJO":"SJO",
        "SLC":"SLC",
        "SMF":"SMF",
        "SNA":"SNA",
        "STL":"STL",
        "STS":"STS",
        "SUN":"SUN",
        "TPA":"TPA",
        "TUS":"TUS",
        "WRG":"WRG",
        "YAK":"YAK",
        "YEG":"YEG",
        "YKM":"YKM",
        "YLW":"YLW",
        "YVR":"YVR",
        "YYC":"YYC",
        "YYJ":"YYJ",
        "ZIH":"ZIH",
        "ZLO":"ZLO",
        }[code]
}


export function returnMyCityName(code) {
    return {
        'ABQ' : 'Albuquerque',
        'ACV' : 'Eureka',
        'ADK' : 'Adak Island',
        'ADQ' : 'Kodiak',
        'AKN' : 'King Salmon',
        'ALW' : 'Walla Walla',
        'ANC' : 'Anchorage',
        'ATL' : 'Atlanta',
        'AUS' : 'Austin',
        'BET' : 'Bethel',
        'BIL' : 'Billings',
        'BLI' : 'Bellingham',
        'BNA' : 'Nashville',
        'BOI' : 'Boise',
        'BOS' : 'Boston',
        'BRW' : 'Barrow',
        'BUR' : 'Burbank',
        'BWI' : 'Baltimore',
        'BZN' : 'Bozeman',
        'CDV' : 'Cordova',
        'CHS' : 'Charleston',
        'COS' : 'Colorado Springs',
        'CUN' : 'Cancun',
        'DCA' : 'Washington - Reagan',
        'DEN' : 'Denver',
        'DFW' : 'Dallas',
        'DLG' : 'Dillingham',
        'DTW' : 'Detroit',
        'DUT' : 'Dutch Harbor',
        'EAT' : 'Wenatchee',
        'EUG' : 'Eugene',
        'EWR' : 'New York - Newark',
        'FAI' : 'Fairbanks',
        'FAT' : 'Fresno',
        'FCA' : 'Kalispell',
        'FLG' : 'Flagstaff',
        'FLL' : 'Ft Lauderdale',
        'GDL' : 'Guadalajara',
        'GEG' : 'Spokane',
        'GTF' : 'Great Falls',
        'GUC' : 'Gunnison County / Crested Butte',
        'HDN' : 'Steamboat Springs',
        'HLN' : 'Helena',
        'HNL' : 'Honolulu',
        'IAH' : 'Houston',
        'IDA' : 'Idaho Falls',
        'JFK' : 'New York - JFK',
        'JNU' : 'Juneau',
        'KOA' : 'Kona',
        'KTN' : 'Ketchikan',
        'LAP' : 'La Paz',
        'LAS' : 'Las Vegas',
        'LAX' : 'Los Angeles',
        'LGB' : 'Long Beach',
        'LIH' : 'Kauai',
        'LIR' : 'Liberia, Costa Rica',
        'LTO' : 'Loreto',
        'MCI' : 'Kansas City',
        'MCO' : 'Orlando',
        'MEX' : 'Mexico City',
        'MFR' : 'Medford',
        'MIA' : 'Miami',
        'MMH' : 'Mammoth Lakes',
        'MRY' : 'Monterey',
        'MSO' : 'Missoula',
        'MSP' : 'Minneapolis',
        'MSY' : 'New Orleans',
        'MZT' : 'Mazatlan',
        'OAK' : 'Oakland',
        'OGG' : 'Maui',
        'OKC' : 'Oklahoma City',
        'OMA' : 'Omaha',
        'OME' : 'Nome',
        'ONT' : 'Ontario',
        'ORD' : 'Chicago',
        'OTZ' : 'Kotzebue',
        'PDX' : 'Portland',
        'PHL' : 'Philadelphia',
        'PHX' : 'Phoenix',
        'PRC' : 'Prescott',
        'PSC' : 'Pasco',
        'PSG' : 'Petersburg',
        'PSP' : 'Palm Springs',
        'PUW' : 'Pullman',
        'PVR' : 'Puerto Vallarta',
        'RDD' : 'Redding',
        'RDM' : 'Redmond',
        'RDU' : 'Raleigh-Durham',
        'RNO' : 'Reno',
        'SAN' : 'San Diego',
        'SAT' : 'San Antonio',
        'SBA' : 'Santa Barbara',
        'SCC' : 'Prudhoe Bay',
        'SEA' : 'Seattle',
        'SFO' : 'San Francisco',
        'SIT' : 'Sitka',
        'SJC' : 'San Jose',
        'SJD' : 'Los Cabos',
        'SJO' : 'San Jose, Costa Rica',
        'SLC' : 'Salt Lake City',
        'SMF' : 'Sacramento',
        'SNA' : 'Orange County',
        'STL' : 'St Louis',
        'STS' : 'Santa Rosa',
        'SUN' : 'Sun Valley',
        'TPA' : 'Tampa',
        'TUS' : 'Tucson',
        'WRG' : 'Wrangell',
        'YAK' : 'Yakutat',
        'YEG' : 'Edmonton',
        'YKM' : 'Yakima',
        'YLW' : 'Kelowna',
        'YVR' : 'Vancouver',
        'YYC' : 'Calgary',
        'YYJ' : 'Victoria',
        'ZIH' : 'Ixtapa',
        'ZLO' : 'Manzanillo',
        'MKE' : 'Milwaukee',
        'HAV' : 'Havana',
        'ICT' : 'Wichita',
        'IND' : 'Indianapolis',
        'SBP' : 'San Luis Obispo',
        'DAL' : 'Dallas - Love Field',
        'LGA' : 'New York - LaGuardia',
        'IAD' : 'Washington D.C. - Dulles',
        'PIT' : 'Pittsburgh',
        'PAE' : 'Everett - Paine Field'
    }[code]
}


// origin_code:data[i][0],
// origin_city:data[i][1],
// destination_code:data[i][2],
// destination_city:data[i][3],
// price:data[i][4],
// fare_type:data[i][5],

export function mergeObjects(arr) {
  var resultArray = [];
  var urls = [];

  for(var item in arr){
    var itemIndex = urls.indexOf(arr[item].name);
    if(itemIndex == -1){
      urls.push(arr[item].name);
      var obj = {};
      obj.name = arr[item].name;
      obj.origin_code = arr[item].origin_code;
      obj.origin_city = arr[item].origin_city;
      obj.destination_code = arr[item].destination_code;
      obj.destination_city = arr[item].destination_city;
      obj.default = arr[item].default;

      obj.price_types = [];
      var variationData = {};
      variationData.id = arr[item].id;
      if(arr[item].fare_type !== undefined){
        variationData.fare_type = arr[item].fare_type;
      }
      if(arr[item].price !== undefined){
        variationData.price = arr[item].price;
      }

     
      obj.price_types.push(variationData);
      resultArray.push(obj);

    }else{
      var variationData = {};
      variationData.id = arr[item].id;
      if(arr[item].fare_type !== undefined){
        variationData.fare_type = arr[item].fare_type;
      }
      if(arr[item].price !== undefined){
        variationData.price = arr[item].price;
      }
      resultArray[itemIndex].price_types.push(variationData)
    }
    
  }
  return resultArray;
}


export function makeDateMonthInEnglish(date_passed) {
    var monthNames = [
        "January", "February", "March",
        "April", "May", "June", "July",
        "August", "September", "October",
        "November", "December"
    ];

    var monthIndex = date_passed.getMonth();

    return monthNames[monthIndex];
}



export function getMyDay(date_passed) {
    var day = date_passed.getDate();
    return day;
}

export function getMyMonth(date_passed) {
    var month = date_passed.getMonth() + 1;
    return month;
}

export function getMyYear(date_passed) {
    var year = date_passed.getFullYear();
    return year;
}


export function getMyHour(date_passed) {
    var hour = date_passed.getHours();
    return hour;
}


export function getMyMinute(date_passed) {
    var minute = date_passed.getMinutes();
    return minute;
}

export function getMyTimeOfDay(date_passed) {
    var hour = date_passed.getHours();
    if (hour < 12){
        return "AM";
    }else{
        return "PM";
    } 
}

  