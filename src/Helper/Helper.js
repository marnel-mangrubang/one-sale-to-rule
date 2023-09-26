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



export function returnMyCityName(code) {
    return {
        'ABQ': 'Albuquerque',
        'ACV': 'Eureka',
        'ADK': 'Adak Island',
        'ADQ': 'Kodiak',
        'AKN': 'King Salmon',
        'ALW': 'Walla Walla',
        'ANC': 'Anchorage',
        'ATL': 'Atlanta',
        'AUS': 'Austin',
        'BET': 'Bethel',
        'BIL': 'Billings',
        'BLI': 'Bellingham',
        'BNA': 'Nashville',
        'BOI': 'Boise',
        'BOS': 'Boston',
        'BRW': 'Barrow',
        'BUR': 'Burbank',
        'BWI': 'Baltimore',
        'BZN': 'Bozeman',
        'CDV': 'Cordova',
        'CHS': 'Charleston',
        'COS': 'Colorado Springs',
        'CUN': 'Cancun',
        'DCA': 'Washington - Reagan',
        'DEN': 'Denver',
        'DFW': 'Dallas',
        'DLG': 'Dillingham',
        'DTW': 'Detroit',
        'DUT': 'Dutch Harbor',
        'EAT': 'Wenatchee',
        'EUG': 'Eugene',
        'EWR': 'New York - Newark',
        'FAI': 'Fairbanks',
        'FAT': 'Fresno',
        'FCA': 'Kalispell',
        'FLG': 'Flagstaff',
        'FLL': 'Ft Lauderdale',
        'GDL': 'Guadalajara',
        'GEG': 'Spokane',
        'GTF': 'Great Falls',
        'GUC': 'Gunnison County / Crested Butte',
        'HDN': 'Steamboat Springs',
        'HLN': 'Helena',
        'HNL': 'Honolulu',
        'IAH': 'Houston',
        'IDA': 'Idaho Falls',
        'JFK': 'New York - JFK',
        'JNU': 'Juneau',
        'KOA': 'Kona',
        'KTN': 'Ketchikan',
        'LAP': 'La Paz',
        'LAS': 'Las Vegas',
        'LAX': 'Los Angeles',
        'LGB': 'Long Beach',
        'LIH': 'Kauai',
        'LIR': 'Liberia, Costa Rica',
        'LTO': 'Loreto',
        'MCI': 'Kansas City',
        'MCO': 'Orlando',
        'MEX': 'Mexico City',
        'MFR': 'Medford',
        'MIA': 'Miami',
        'MMH': 'Mammoth Lakes',
        'MRY': 'Monterey',
        'MSO': 'Missoula',
        'MSP': 'Minneapolis',
        'MSY': 'New Orleans',
        'MZT': 'Mazatlan',
        'OAK': 'Oakland',
        'OGG': 'Maui',
        'OKC': 'Oklahoma City',
        'OMA': 'Omaha',
        'OME': 'Nome',
        'ONT': 'Ontario',
        'ORD': 'Chicago',
        'OTZ': 'Kotzebue',
        'PDX': 'Portland',
        'PHL': 'Philadelphia',
        'PHX': 'Phoenix',
        'PRC': 'Prescott',
        'PSC': 'Pasco',
        'PSG': 'Petersburg',
        'PSP': 'Palm Springs',
        'PUW': 'Pullman',
        'PVR': 'Puerto Vallarta',
        'RDD': 'Redding',
        'RDM': 'Redmond',
        'RDU': 'Raleigh-Durham',
        'RNO': 'Reno',
        'SAN': 'San Diego',
        'SAT': 'San Antonio',
        'SBA': 'Santa Barbara',
        'SCC': 'Prudhoe Bay',
        'SEA': 'Seattle',
        'SFO': 'San Francisco',
        'SIT': 'Sitka',
        'SJC': 'San Jose',
        'SJD': 'Los Cabos',
        'SJO': 'San Jose, Costa Rica',
        'SLC': 'Salt Lake City',
        'SMF': 'Sacramento',
        'SNA': 'Orange County',
        'STL': 'St Louis',
        'STS': 'Santa Rosa',
        'SUN': 'Sun Valley',
        'TPA': 'Tampa',
        'TUS': 'Tucson',
        'WRG': 'Wrangell',
        'YAK': 'Yakutat',
        'YEG': 'Edmonton',
        'YKM': 'Yakima',
        'YLW': 'Kelowna',
        'YVR': 'Vancouver',
        'YYC': 'Calgary',
        'YYJ': 'Victoria',
        'ZIH': 'Ixtapa',
        'ZLO': 'Manzanillo',
        'MKE': 'Milwaukee',
        'HAV': 'Havana',
        'ICT': 'Wichita',
        'IND': 'Indianapolis',
        'SBP': 'San Luis Obispo',
        'DAL': 'Dallas - Love Field',
        'LGA': 'New York - LaGuardia',
        'IAD': 'Washington D.C. - Dulles',
        'PIT': 'Pittsburgh',
        'PAE': 'Everett / Paine Field',
        'ELP': 'El Paso',
        'CMH': 'Columbus',
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

    for (var item in arr) {
        var itemIndex = urls.indexOf(arr[item].name);
        if (itemIndex === -1) {
            urls.push(arr[item].name);
            var obj = {};
            obj.name = arr[item].name;
            obj.origin_code = arr[item].origin_code;
            obj.origin_city = arr[item].origin_city;
            obj.destination_code = arr[item].destination_code;
            obj.destination_city = arr[item].destination_city;
            obj.default = arr[item].default;
            obj.group = arr[item].group;

            obj.price_types = [];
            var variationData = {};
            variationData.id = arr[item].id;

            variationData.fare_type = arr[item].fare_type;
            variationData.price = arr[item].price;
            variationData.taxes = arr[item].taxes;


            obj.price_types.push(variationData);
            resultArray.push(obj);

        } else {
            variationData = {};
            variationData.id = arr[item].id;
            variationData.fare_type = arr[item].fare_type;
            variationData.price = arr[item].price;
            variationData.taxes = arr[item].taxes;
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
    if (day < 10) {
        day = '0' + day;
        return day;
    } else {
        return day;
    }
}

export function getMyMonth(date_passed) {
    var month = date_passed.getMonth() + 1;
    if (month < 10) {
        month = '0' + month;
        return month;
    } else {
        return month;
    }
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
    if (hour < 12) {
        return "AM";
    } else {
        return "PM";
    }
}


export function groupMeByOrigin(code) {
    let alaska_only_codes = ["ADK", "ANC", "BRW", "BET", "CDV", "DLG", "DUT", "FAI", "GST", "JNU", "KTN", "AKN", "ADQ", "OTZ", "OME", "PSG", "SCC", "SIT", "WRG", "YAK"];
    let hawaii_only_codes = ["OGG", "LIH", "KOA", "HNL"];
    let florida_only_codes = ["FLL", "MCO", "MIA", "TPA"];
    let mexico_only_codes = ["MEX", "CUN", "GDL", "LTO", "SJD", "ZLO", "MZT", "PVR", "ZIH"];
    let costa_rica_only_codes = ["LIR", "SJO", "HAV"];
    let pae_only_codes = ["PAE"];

    if (alaska_only_codes.indexOf(code) > -1) {
        return "ALASKA";
    } else if (hawaii_only_codes.indexOf(code) > -1) {
        return "HAWAII";
    } else if (florida_only_codes.indexOf(code) > -1) {
        return "FLORIDA";
    } else if (mexico_only_codes.indexOf(code) > -1) {
        return "MEXICO";
    } else if (costa_rica_only_codes.indexOf(code) > -1) {
        return "COSTA_RICA";
    } else if (pae_only_codes.indexOf(code) > -1) {
        return "PAE";
    } else {
        return "OTHER_MARKET";
    }
}


export function getMyFirstTuesday(date, dayOfWeek) {
    var resultDate = new Date(date.getTime());
    resultDate.setDate(date.getDate() + 7 + (7 + dayOfWeek - date.getDay()) % 7);
    return resultDate;
}

export function getMySecondTuesday(date, dayOfWeek) {
    var resultDate = new Date(date.getTime());
    resultDate.setDate(date.getDate() + 14 + (7 + dayOfWeek - date.getDay()) % 7);
    return resultDate;
}
