import React, { Component } from 'react';
import './App.css';
import readXlsxFile from 'read-excel-file';
import builder from 'xmlbuilder';
import XMLWriter from 'xml-writer';
import ReactHtmlParser from 'react-html-parser';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment";
// import Exceptions from './Exceptions'
import { comparePrice, compareOriginCode, compareDestinationCode, returnMyCityName, verifyMyAirportCode } from './Helper/Helper';


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
      all_my_fares: [],
      exceptions: [{ code_origin: '', code_destination: '', travel_valid: '', service_begins: null, service_ends: null, begins_string:'', ends_string:'' }],
      pulled_exception_fares:[],
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
      days_availability_to_florida: 'Tuesdays, Wednesdays, and Thursdays',
      days_availability_from_florida: 'Mondays, Tuesdays, and Wednesdays',
      days_availability_others: 'Tuesdays, Wednesdays, and Saturdays',

      proposed_start_hawaii:null,
      proposed_start_hawaii_string: '',
      proposed_end_hawaii:null,
      proposed_end_hawaii_string: '',
      proposed_start_others:null,
      proposed_start_others_string: '',
      proposed_end_others:null,
      proposed_end_others_string: '',


      blackout_start_alaska_to_from_hawaii:null,
      blackout_start_alaska_to_from_hawaii_string: '',
      blackout_end_alaska_to_from_hawaii:null,
      blackout_end_alaska_to_from_hawaii_string: '',
      blackout_start_to_hawaii:null,
      blackout_start_to_hawaii_string: '',
      blackout_end_to_hawaii:null,
      blackout_end_to_hawaii_string: '',
      blackout_start_from_hawaii:null,
      blackout_start_from_hawaii_string: '',
      blackout_end_from_hawaii:null,
      blackout_end_from_hawaii_string: '',
      blackout_start_mexico:null,
      blackout_start_mexico_string: '',
      blackout_end_mexico:null,
      blackout_end_mexico_string: '',
      blackout_start_costa_rica:null,
      blackout_start_costa_rica_string: '',
      blackout_end_costa_rica:null,
      blackout_end_costa_rica_string: '',
      blackout_start_others:null,
      blackout_start_others_string: '',
      blackout_end_others:null,
      blackout_end_others_string: '',


    }
    
    this.onFileChange = this.onFileChange.bind(this);
    this.updateFirstInput = this.updateFirstInput.bind(this);

    this.createSaleDetails = this.createSaleDetails.bind(this);

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

  updateFirstInput(e) {
    this.setState({firstinput: e.target.value});
  }


  saleStartDateHandler(date) {
    let temp_string = moment(date).format('YYYY-MM-DD');

    this.setState({
      sale_start_date: date,
      sale_start_date_string: temp_string
    }, () => console.log(this.state));

    console.log(verifyMyAirportCode("SJC"));

    //console.log("Sale Start Date: "+this.state.sale_start_date);
    // console.log("Sale Start Date String: "+this.state.sale_start_date_string);
  }



  saleEndDateHandler(date) {
    let temp_string = moment(date).format('YYYY-MM-DD');
    this.setState({
      sale_end_date: date,
      sale_end_date_string: temp_string
    }, () => console.log(this.state));
  }


  advancePurchaseHandler(e) {
    this.setState({
      advance_purchase: e.target.value
    }, () => console.log(this.state));
  }


  travelStartAlaskaToFromHawaiiDateHandler(date) {
    let temp_string = moment(date).format('YYYY-MM-DD');
    this.setState({
      travel_start_alaska_to_from_hawaii: date,
      travel_start_alaska_to_from_hawaii_string: temp_string
    }, () => console.log(this.state));
  }
  travelStartHawaiiHandler(date) {
    let temp_string = moment(date).format('YYYY-MM-DD');
    this.setState({
      travel_start_hawaii: date,
      travel_start_hawaii_string: temp_string
    }, () => console.log(this.state));
  }
  travelStartMexicoHandler(date) {
    let temp_string = moment(date).format('YYYY-MM-DD');
    this.setState({
      travel_start_mexico: date,
      travel_start_mexico_string: temp_string
    }, () => console.log(this.state));
  }
  travelStartCostaRicaHandler(date) {
    let temp_string = moment(date).format('YYYY-MM-DD');
    this.setState({
      travel_start_costa_rica: date,
      travel_start_costa_rica_string: temp_string
    }, () => console.log(this.state));
  }
  // travelStartFloridaHandler(date) {
  //   this.setState({travel_start_florida: moment(date).format('YYYY-MM-DD')});
  //   console.log("Travel Start Date - Florida: "+moment(date).format('YYYY-MM-DD'));
  // }
  travelStartOthersHandler(date) {
    let temp_string = moment(date).format('YYYY-MM-DD');
    this.setState({
      travel_start_others: date,
      travel_start_others_string: temp_string,
      travel_start_florida: date,
      travel_start_florida_string: temp_string
    }, () => console.log(this.state));
  }




  travelEndAlaskaToFromHawaiiDateHandler(date) {
    let temp_string = moment(date).format('YYYY-MM-DD');
    this.setState({
      travel_end_alaska_to_from_hawaii: date,
      travel_end_alaska_to_from_hawaii_string: temp_string
    }, () => console.log(this.state));
  }
  travelEndHawaiiHandler(date) {
    let temp_string = moment(date).format('YYYY-MM-DD');
    this.setState({
      travel_end_hawaii: date,
      travel_end_hawaii_string: temp_string
    }, () => console.log(this.state));
  }
  travelEndMexicoHandler(date) {
    let temp_string = moment(date).format('YYYY-MM-DD');
    this.setState({
      travel_end_mexico: date,
      travel_end_mexico_string: temp_string
    }, () => console.log(this.state));
  }
  travelEndCostaRicaHandler(date) {
    let temp_string = moment(date).format('YYYY-MM-DD');
    this.setState({
      travel_end_costa_rica: date,
      travel_end_costa_rica_string: temp_string,
    }, () => console.log(this.state));
  }
  // travelEndFloridaHandler(date) {
  //   this.setState({travel_end_florida: moment(date).format('YYYY-MM-DD')});
  //   console.log("Completed Travel By - Florida: "+moment(date).format('YYYY-MM-DD'));
  // }
  travelEndOthersHandler(date) {
    let temp_string = moment(date).format('YYYY-MM-DD');
    this.setState({
      travel_end_others: date,
      travel_end_others_string: temp_string,
      travel_end_florida: date,
      travel_end_florida_string: temp_string
    }, () => console.log(this.state));
  }



  daysAvailabilityHawaiiHandler(e) {
    this.setState({
      days_availability_hawaii: e.target.value
    }, () => console.log(this.state));
  }
  daysAvailabilityMexicoHandler(e) {
    this.setState({
      days_availability_mexico: e.target.value
    }, () => console.log(this.state));
  }
  daysAvailabilityCostaRicaHandler(e) {
    this.setState({
      days_availability_costa_rica: e.target.value
    }, () => console.log(this.state));
  }
  daysAvailabilityToFloridaHandler(e) {
    this.setState({
      days_availability_to_florida: e.target.value
    }, () => console.log(this.state));
  }
  daysAvailabilityFromFloridaHandler(e) {
    this.setState({
      days_availability_from_florida: e.target.value
    }, () => console.log(this.state));
  }
  daysAvailabilityOthersHandler(e) {
    this.setState({
      days_availability_others: e.target.value
    }, () => console.log(this.state));
  }


  proposedStartDateHawaiiHandler(date) {
    let temp_string = moment(date).format('YYYY-MM-DD');
    this.setState({
      proposed_start_hawaii: date,
      proposed_start_hawaii_string: temp_string
    }, () => console.log(this.state));
  }
  proposedEndDateHawaiiHandler(date) {
    let temp_string = moment(date).format('YYYY-MM-DD');
    this.setState({
      proposed_end_hawaii: date,
      proposed_end_hawaii_string: temp_string
    }, () => console.log(this.state));
  }
  proposedStartDateOthersHandler(date) {
    let temp_string = moment(date).format('YYYY-MM-DD');
    this.setState({
      proposed_start_others: date,
      proposed_start_others_string: temp_string
    }, () => console.log(this.state));
  }
  proposedEndDateOthersHandler(date) {
    let temp_string = moment(date).format('YYYY-MM-DD');
    this.setState({
      proposed_end_others: date,
      proposed_end_others_string: temp_string
    }, () => console.log(this.state));
  }




  blackoutStartDateAlaskaToFromHawaiiHandler(date) {
    let temp_string = moment(date).format('YYYY-MM-DD');
    this.setState({
      blackout_start_alaska_to_from_hawaii: date,
      blackout_start_alaska_to_from_hawaii_string: temp_string
    }, () => console.log(this.state));
  }
  blackoutEndDateAlaskaToFromHawaiiHandler(date) {
    let temp_string = moment(date).format('YYYY-MM-DD');
    this.setState({
      blackout_end_alaska_to_from_hawaii: date,
      blackout_end_alaska_to_from_hawaii_string: temp_string
    }, () => console.log(this.state));
  }
  blackoutStartDateToHawaiiHandler(date) {
    let temp_string = moment(date).format('YYYY-MM-DD');
    this.setState({
      blackout_start_to_hawaii: date,
      blackout_start_to_hawaii_string: temp_string
    }, () => console.log(this.state));
  }
  blackoutEndDateToHawaiiHandler(date) {
    let temp_string = moment(date).format('YYYY-MM-DD');
    this.setState({
      blackout_end_to_hawaii: date,
      blackout_end_to_hawaii_string: temp_string
    }, () => console.log(this.state));
  }
  blackoutStartDateFromHawaiiHandler(date) {
    let temp_string = moment(date).format('YYYY-MM-DD');
    this.setState({
      blackout_start_from_hawaii: date,
      blackout_start_from_hawaii_string: temp_string
    }, () => console.log(this.state));
  }
  blackoutEndDateFromHawaiiHandler(date) {
    let temp_string = moment(date).format('YYYY-MM-DD');
    this.setState({
      blackout_end_from_hawaii: date,
      blackout_end_from_hawaii_string: temp_string
    }, () => console.log(this.state));
  }
  blackoutStartDateMexicoHandler(date) {
    let temp_string = moment(date).format('YYYY-MM-DD');
    this.setState({
      blackout_start_mexico: date,
      blackout_start_mexico_string: temp_string
    }, () => console.log(this.state));
  }
  blackoutEndDateMexicoHandler(date) {
    let temp_string = moment(date).format('YYYY-MM-DD');
    this.setState({
      blackout_end_mexico: date,
      blackout_end_mexico_string: temp_string
    }, () => console.log(this.state));
  }
  blackoutStartDateCostaRicaHandler(date) {
    let temp_string = moment(date).format('YYYY-MM-DD');
    this.setState({
      blackout_start_costa_rica: date,
      blackout_start_costa_rica_string: temp_string
    }, () => console.log(this.state));
  }
  blackoutEndDateCostaRicaHandler(date) {
    let temp_string = moment(date).format('YYYY-MM-DD');
    this.setState({
      blackout_end_costa_rica: date,
      blackout_end_costa_rica_string: temp_string
    }, () => console.log(this.state));
  }
  blackoutStartDateOthersHandler(date) {
    let temp_string = moment(date).format('YYYY-MM-DD');
    this.setState({
      blackout_start_others: date,
      blackout_start_others_string:temp_string
    }, () => console.log(this.state));
  }
  blackoutEndDateOthersHandler(date) {
    let temp_string = moment(date).format('YYYY-MM-DD');
    this.setState({
      blackout_end_others: date,
      blackout_end_others_string: temp_string
    }, () => console.log(this.state));
  }




  createMyXml(){
    //console.log(origincode,origincity,destinationcode,destinationcity,price,mydealtype);
    //var pulled_fares = this.state.pulled_exception_fares.slice();

    // var root = builder.create('FlightDeals', { encoding: 'UTF-8'})
    // .att('xmlns:ss', 'urn:schemas-microsoft-com:office:spreadsheet')
  //   .ele('DealSet', {'from':'2018-12-03T17:30:01', 'to':'2018-12-05T23:59:59'})
  //   .ele('DealInfo', {'code': '20181204_SALE-MCOSAN', 'dealType':'Saver', 'url':''})
  //     .ele('TravelDates', {'startdate':'2019-01-08T00:00:01', 'enddate':'2019-01-15T23:59:59'}).up()
  //     .ele('DealTitle').up()
  //     .ele('DealDescrip', '<![CDATA[Purchase by December 5, 2018.]]>').up()
  //     .ele('terms','<![CDATA[<strong>Fare Rules:</strong> Purchase by 11:59 pm (PT) on December 5, 2018, and at least 21 days prior to departure. Travel from Orlando(MCO) to San Diego(SAN) is valid Thursday through Monday from January 8, 2019 - March 6, 2019. Blackout dates are from February 14, 2019 to February 25, 2019. Bag fees<a href="#terms">may apply</a> for<a href="/content/travel-info/policies/baggage-checked">checked baggage</a>. See<a href="#terms">bottom of page</a> for full terms and conditions.]]>').up()
  // .up()
  // .ele('Fares')
  //   .ele('Row', {'fareType':'Saver'})
  //     .ele('Cell','<Data>MCO</Data>').up()
  //     .ele('Cell','<Data>Orlando</Data>').up()
  //     .ele('Cell','<Data>SAN</Data>').up()
  //     .ele('Cell','<Data>San Diego</Data>').up()
  //     .ele('Cell','<Data>129</Data>').up()

  // .end({ pretty: true});

  //console.log(root);
    //let xw = new XMLWriter;
    let xw = new XMLWriter();
    xw.startDocument();
    xw.startElement('root');
    xw.writeAttribute('foo', 'value');
    xw.text('Some content');
    xw.endDocument();
 
    console.log(xw.toString());

    // this.state.pulled_exception_fares.map((item) => {
    //   //console.log(item);
    //   root.ele('DealSet', {'from':'2018-12-03T17:30:01', 'to':'2018-12-05T23:59:59'})
    //   .ele('DealInfo', {'code': '20181204_SALE-MCOSAN', 'dealType':'Saver', 'url':''})
    //     .ele('TravelDates', {'startdate':'2019-01-08T00:00:01', 'enddate':'2019-01-15T23:59:59'}).up()
    //     .ele('DealTitle').up()
    //     .ele('DealDescrip', '<![CDATA[Purchase by December 5, 2018.]]>').up()
    //     .ele('terms','<![CDATA[<strong>Fare Rules:</strong> Purchase by 11:59 pm (PT) on December 5, 2018, and at least 21 days prior to departure. Travel from ('+item["origin_code"]+') to ('+item["destination_code"]+') is valid Thursday through Monday from January 8, 2019 - March 6, 2019. Blackout dates are from February 14, 2019 to February 25, 2019. Bag fees<a href="#terms">may apply</a> for<a href="/content/travel-info/policies/baggage-checked">checked baggage</a>. See<a href="#terms">bottom of page</a> for full terms and conditions.]]>').up()
    //   .up()
    //   .ele('Fares')
    //     .ele('Row', {'fareType':'Saver'})
    //     .ele('Cell','<Data>'+item["origin_code"]+'</Data>').up()
    //     .ele('Cell','<Data>'+returnMyCityName(item["origin_code"])+'</Data>').up()
    //     .ele('Cell','<Data>'+item["destination_code"]+'</Data>').up()
    //     .ele('Cell','<Data>'+returnMyCityName(item["destination_code"])+'</Data>').up()
    //     .ele('Cell','<Data>'+item["price"]+'</Data>').up()
    //     .ele('Cell','<Data>'+item["fare_type"]+'</Data>').up()
    //   .end({ pretty: true});
    // });

 

    // console.log(root);



    
    

  }


  

  //FORM BUTTON CLICK HANDLER
  createSaleDetails(e){
    e.preventDefault();
    var newAllMyExceptions = this.state.exceptions.slice(); 
    var newPulledExceptionFares = this.state.pulled_exception_fares.slice();
    //var array_pulledfares = [...this.state.pulled_exception_fares];

    var newAllMyFares = this.state.all_my_fares.slice();
    var array_allfares = [...this.state.all_my_fares];

    newAllMyFares.map((item1, index1) => {
      newAllMyExceptions.map((item2, index2) => {
        //console.log(item["origin_code"]);
        if(item1["origin_code"] === item2["code_origin"] && item1["destination_code"] === item2["code_destination"]){
          
          var index = array_allfares.indexOf(item1)
          if (index !== -1) {
            array_allfares.splice(index, 1);
            newPulledExceptionFares.push(item1);

            this.setState({
              all_my_fares: array_allfares,
              pulled_exception_fares: newPulledExceptionFares
            }, () => this.createMyXml());
            console.log("Fare Removed from Index: "+index1);
          }
        }
      });
    });

    //this.createMyXml();

    
  }

  // removeExceptionFromAllFares(){
  //   // this.setState({ 
  //   //   exceptions: this.state.exceptions.filter((s, sidx) => idx !== sidx) 
  //   // });
  //   var array = [...this.state.all_my_fares]; // make a separate copy of the array
  //   var index = array.indexOf(e.target.value)
  //   if (index !== -1) {
  //     array.splice(index, 1);
  //     this.setState({people: array});
  //   }
  // }


  onFileChange(e, file) {

    file = file || e.target.files[0];

    //Sheet 1 Looper
    readXlsxFile(file, { sheet: 'US Ad' }).then((data) => {
      //Loops through every row in the sheet
      for(var index = 1; index < data.length; index++){
        //console.log(data[index]);
        //Get Sale Start Date from Sheet 1 and set state for sale_start_date variables
        if(data[index][0] === 'Sale Start Date:' && data[index][1] !== null){
          //console.log(data[index]);
          let temp_string = moment(data[index][1]).format('YYYY-MM-DD');
          this.setState({
            sale_start_date: data[index][1],
            sale_start_date_string: temp_string
          });
        }
        //Get Purchase By date from Sheet 1 and set state for sale_end_date variables
        if(data[index][0] === 'Purchase By:' && data[index][1] !== null){
          //console.log(data[index]);
          let temp_string = moment(data[index][1]).format('YYYY-MM-DD');
          this.setState({
            sale_end_date: data[index][1],
            sale_end_date_string: temp_string
          });
        }
        //Get Advance Purchase Days from Sheet 1 and set state for advance_purchase variable
        if(data[index][0] === 'Advance Purchase:' && data[index][1] !== null){
          //console.log(data[index]);
          this.setState({
            advance_purchase: data[index][1]
          });
        }
        //Get Travel Start Date from Sheet 1 and set state for all travel_start variables
        if(data[index][0] === 'Travel Start:' && data[index][1] !== null){
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
        if(data[index][0] === 'Complete Travel By:' && data[index][1] !== null){
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

        
        
      }//end of for loop
    })//end of readXlsxFile for Sheet 1


    //Sheet 1 Looper
    readXlsxFile(file, { sheet: 'AS.com' }).then((data) => {
      //Loops through every row in the sheet
      for(var i = 0; i < data.length; i++){
    
        if (typeof data[i] != 'undefined' && data[i] != null) {
          //Checks that the values in index 0 and 2 are airport codes for every row in the spreadsheet
          if(typeof data[i][0] == 'string' && (data[i][0].length === 3 && data[i][2].length === 3)){
            //console.log(data[i]);
            var newArray = this.state.all_my_fares.slice(); 
            newArray.push({
              origin_code:data[i][0],
              origin_city:data[i][1],
              destination_code:data[i][2],
              destination_city:data[i][3],
              price:data[i][4],
              fare_type:data[i][5],
            });   
            this.setState({all_my_fares:newArray})

          } 
        }
      }//end of for loop

      var temp_arr = this.state.all_my_fares.slice();
      temp_arr.sort(compareDestinationCode); //SORT by Destination Code first for alphabetical
      temp_arr.sort(compareOriginCode); //SORT by Origin Code second for alphabetical
      temp_arr.sort(comparePrice); //SORT by Price last for lowest to highest fares

      this.setState({
        all_my_fares:temp_arr
      }, () => console.log(this.state));
    })//end of readXlsxFile for Sheet 4

  }

  handleExceptionCodeChange = (idx) => (evt) => {
    let temp_code = evt.target.value ;
    temp_code = temp_code.toUpperCase();
    if(temp_code.length === 6){
      temp_code = temp_code.match(/.{1,3}/g);
    }else{
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
    }, () => console.log(this.state));
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
    }, () => console.log(this.state));
  }

  handleExceptionServiceBegins = (idx) => (date) => {
    let temp_string = moment(date).format('YYYY-MM-DD');
    const newShareholders = this.state.exceptions.map((item, sidx) => {
      if (idx !== sidx) return item;
      return { 
        ...item, 
        service_begins: date,
        begins_string:temp_string,
      };
    });

    this.setState({ 
      exceptions: newShareholders
    }, () => console.log(this.state));
  }
  handleExceptionServiceEnds = (idx) => (date) => {
    let temp_string = moment(date).format('YYYY-MM-DD');
    const newShareholders = this.state.exceptions.map((item, sidx) => {
      if (idx !== sidx) return item;
      return { 
        ...item, 
        service_ends: date,
        ends_string:temp_string,
      };
    });

    this.setState({ 
      exceptions: newShareholders
    }, () => console.log(this.state));
  }




  handleAddException = () => {
    this.setState({ 
      exceptions: this.state.exceptions.concat([{ code_origin: '', code_destination: '', travel_valid: '', service_begins: null, service_ends: null, begins_string:'', ends_string:'' }]) 
    });
  }
  
  handleRemoveException = (idx) => () => {
    this.setState({ 
      exceptions: this.state.exceptions.filter((s, sidx) => idx !== sidx) 
    });
  }
  


  render() {

    return (
      <div className="App">
      <div className="">

        <div className="row col-md-12">
          {/* <input type = "text" value = {this.state.firstinput} onChange = {this.updateFirstInput} /> */}

          <form className="detailsForm"  onSubmit={this.createSaleDetails}>

            <div className="form-row sale-information">
                <div className="row col-md-12">
                    <div className="form-group col-md-6">
                      <h3 className="information-headline">Sale Information:</h3>
                    </div>
                    <div className="form-group col-md-6">
                      <input type="file" className="form-control" id="inputFile" onChange={this.onFileChange} />
                      {/* <div className="form-group-input">
                        <label className="label">
                          <i className="material-icons">attach_file</i>
                          <span className="title">Add File</span>
                          <input type="file" className="" id="inputFile" onChange={this.onFileChange}/>
                        </label>
                      </div> */}
                    </div>  


                </div>
                <div className="form-group col-md-3">
                    {/* This row is for Sale Start */}
                    <div className="row col-md-12">
                      <label htmlFor="saleStartDate"><strong>Sale Start</strong></label><br />
                      <DatePicker className="form-control" id="saleStartDate" selected={this.state.sale_start_date} onChange={this.saleStartDateHandler} />
                    </div>
                    {/* This row is for Sale End */}
                    <div className="row col-md-12">
                      <label htmlFor="saleEndDate"><strong>Purchase By</strong></label>
                      <DatePicker className="form-control" id="saleEndDate" selected={this.state.sale_end_date} onChange={this.saleEndDateHandler} />
                    </div>
                    {/* This row is for Advance Purchase */}
                    <div className="row col-md-12">
                      <label htmlFor="advancePurchase"><strong>Advance Purchase</strong></label>
                      <input type="text" className="form-control" id="advancePurchase" value = {this.state.advance_purchase} onChange = {this.advancePurchaseHandler} />
                    </div>

        
                    {/* This row is for Proposed Hawaii Dates */}
                    <div className="row col-md-12">
                      <div className="col-md-12 remove-padding">
                        <h6 className="proposed-headline"><strong>Proposed Dates:</strong> Hawaii</h6>
                      </div>
                      
                      <div className="col-md-5 remove-padding">
                      <DatePicker className="form-control" selected={this.state.proposed_start_hawaii} onChange={this.proposedStartDateHawaiiHandler} />
                      </div>

                      <div className="col-md-2 text-center">
                        <h6 className="">to</h6>
                      </div>

                      <div className="col-md-5 remove-padding">
                        <DatePicker className="form-control" selected={this.state.proposed_end_hawaii} onChange={this.proposedEndDateHawaiiHandler} />
                      </div>
                    </div>

                    {/* This row is for Proposed Others Dates */}
                    <div className="row col-md-12">
                      <div className="col-md-12 remove-padding">
                        <h6 className="proposed-headline"><strong>Proposed Dates:</strong> Others</h6>
                      </div>
                      
                      <div className="col-md-5 remove-padding">
                      <DatePicker className="form-control" selected={this.state.proposed_start_others} onChange={this.proposedStartDateOthersHandler} />
                      </div>

                      <div className="col-md-2 text-center">
                        <h6 className="">to</h6>
                      </div>

                      <div className="col-md-5 remove-padding">
                        <DatePicker className="form-control" selected={this.state.proposed_end_others} onChange={this.proposedEndDateOthersHandler} />
                      </div>
                    </div>
                </div>


                {/* TRAVEL START INPUTS */}
                <div className="form-group col-md-3">
                    {/* This row is for Travel Start: Alaska to/from Hawaii */}
                    <div className="row col-md-12">
                      <label htmlFor="travel_start_alaska_to_from_hawaii"><strong>Travel Start:</strong> Alaska to/from Hawaii</label><br />
                      <DatePicker className="form-control" id="travel_start_alaska_to_from_hawaii" selected={this.state.travel_start_alaska_to_from_hawaii} onChange={this.travelStartAlaskaToFromHawaiiDateHandler} />
                    </div>

                    {/* This row is for Travel Start: HAWAII */}
                    <div className="row col-md-12">
                      <label htmlFor="travel_start_hawaii"><strong>Travel Start:</strong> Hawaii</label><br />
                      <DatePicker className="form-control" id="travel_start_hawaii" selected={this.state.travel_start_hawaii} onChange={this.travelStartHawaiiHandler} />
                    </div>

                    {/* This row is for Travel Start: MEXICO */}
                    <div className="row col-md-12">
                    <label htmlFor="travel_start_mexico"><strong>Travel Start:</strong> Mexico</label><br />
                      <DatePicker className="form-control" id="travel_start_mexico" selected={this.state.travel_start_mexico} onChange={this.travelStartMexicoHandler} />
                    </div>

                    {/* This row is for Travel Start: COSTA RICA */}
                    <div className="row col-md-12">
                    <label htmlFor="travel_start_costa_rica"><strong>Travel Start:</strong> Costa Rica</label><br />
                      <DatePicker className="form-control" id="travel_start_costa_rica" selected={this.state.travel_start_costa_rica} onChange={this.travelStartCostaRicaHandler} />
                    </div>

                    {/* This row is for Travel Start: FLORIDA */}
                    <div className="row col-md-12">
                    <label htmlFor="travel_start_florida"><strong>Travel Start:</strong> Florida</label><br />
                      <DatePicker className="form-control" id="travel_start_florida" selected={this.state.travel_start_others} readOnly />
                    </div>

                    {/* This row is for Travel Start: ALL OTHER MARKET */}
                    <div className="row col-md-12">
                    <label htmlFor="travel_start_others"><strong>Travel Start:</strong> Other Markets</label><br />
                      <DatePicker className="form-control" id="travel_start_others" selected={this.state.travel_start_others} onChange={this.travelStartOthersHandler} />
                    </div>
                </div>



                {/* COMPLETED TRAVEL BY INPUTS */}
                <div className="form-group col-md-3">
                    {/* This row is for Complete Travel By: Alaska to/from Hawaii */}
                    <div className="row col-md-12">
                      <label htmlFor="travel_end_alaska_to_from_hawaii"><strong>Completed Travel By:</strong> Alaska to/from Hawaii</label><br />
                      <DatePicker className="form-control" id="travel_end_alaska_to_from_hawaii" selected={this.state.travel_end_alaska_to_from_hawaii} onChange={this.travelEndAlaskaToFromHawaiiDateHandler} />
                    </div>

                    {/* This row is for Complete Travel By: HAWAII */}
                    <div className="row col-md-12">
                      <label htmlFor="travel_end_hawaii"><strong>Completed Travel By:</strong> Hawaii</label><br />
                      <DatePicker className="form-control" id="travel_end_hawaii" selected={this.state.travel_end_hawaii} onChange={this.travelEndHawaiiHandler} />
                    </div>

                    {/* This row is for Complete Travel By: MEXICO */}
                    <div className="row col-md-12">
                    <label htmlFor="travel_end_mexico"><strong>Completed Travel By:</strong> Mexico</label><br />
                      <DatePicker className="form-control" id="travel_end_mexico" selected={this.state.travel_end_mexico} onChange={this.travelEndMexicoHandler} />
                    </div>

                    {/* This row is for Complete Travel By: COSTA RICA */}
                    <div className="row col-md-12">
                    <label htmlFor="travel_end_costa_rica"><strong>Completed Travel By:</strong> Costa Rica</label><br />
                      <DatePicker className="form-control" id="travel_end_costa_rica" selected={this.state.travel_end_costa_rica} onChange={this.travelEndCostaRicaHandler} />
                    </div>

                    {/* This row is for Complete Travel By: FLORIDA */}
                    <div className="row col-md-12">
                    <label htmlFor="travel_end_florida"><strong>Completed Travel By:</strong> Florida</label><br />
                      <DatePicker className="form-control" id="travel_end_florida" selected={this.state.travel_end_others} readOnly />
                    </div>

                    {/* This row is for Complete Travel By: ALL OTHER MARKET */}
                    <div className="row col-md-12">
                    <label htmlFor="travel_end_others"><strong>Completed Travel By:</strong> Other Markets</label><br />
                      <DatePicker className="form-control" id="travel_end_others" selected={this.state.travel_end_others} onChange={this.travelEndOthersHandler} />
                    </div>
                </div>
                


                {/* DAY/TIME AVAILABILITY INPUTS */}
                <div className="form-group col-md-3">
                    {/* This row is for Days Availability: Alaska to/from Hawaii */}
                    <div className="row col-md-12">
                      <label htmlFor="days_availability_alaska_to_from_hawaii"><strong>Days Availability:</strong> Alaska to/from Hawaii</label><br />
                      <input type="text" className="form-control" id="days_availability_alaska_to_from_hawaii" value = {this.state.days_availability_hawaii} readOnly />
                    </div>

                    {/* This row is for Days Availability: HAWAII */}
                    <div className="row col-md-12">
                      <label htmlFor="days_availability_hawaii"><strong>Days Availability:</strong> Hawaii</label><br />
                      <input type="text" className="form-control" id="days_availability_hawaii" value = {this.state.days_availability_hawaii} onChange={this.daysAvailabilityHawaiiHandler} />
                    </div>

                    {/* This row is for Days Availability: MEXICO */}
                    <div className="row col-md-12">
                      <label htmlFor="days_availability_mexico"><strong>Days Availability:</strong> Mexico</label><br />
                      <input type="text" className="form-control" id="days_availability_mexico" value = {this.state.days_availability_mexico} onChange={this.daysAvailabilityMexicoHandler} />
                    </div>

                    {/* This row is for Days Availability: COSTA RICA */}
                    <div className="row col-md-12">
                      <label htmlFor="days_availability_costa_rica"><strong>Days Availability:</strong> Costa Rica</label><br />
                      <input type="text" className="form-control" id="days_availability_costa_rica" value = {this.state.days_availability_costa_rica} onChange={this.daysAvailabilityCostaRicaHandler} />
                    </div>

                    {/* This row is for Days Availability: TO FLORIDA */}
                    <div className="row col-md-12">
                      <label htmlFor="days_availability_to_florida"><strong>Days Availability:</strong> To Florida</label><br />
                      <input type="text" className="form-control" id="days_availability_to_florida" value = {this.state.days_availability_to_florida} onChange={this.daysAvailabilityToFloridaHandler}/>
                    </div>

                    {/* This row is for Days Availability: FROM FLORIDA */}
                    <div className="row col-md-12">
                      <label htmlFor="days_availability_from_florida"><strong>Days Availability:</strong> From Florida</label><br />
                      <input type="text" className="form-control" id="days_availability_from_florida" value = {this.state.days_availability_from_florida} onChange={this.daysAvailabilityFromFloridaHandler} />
                    </div>

                    {/* This row is for Days Availability: ALL OTHER MARKET */}
                    <div className="row col-md-12">
                      <label htmlFor="days_availability_others"><strong>Days Availability:</strong> Other Markets</label><br />
                      <input type="text" className="form-control" id="days_availability_others" value = {this.state.days_availability_others} onChange={this.daysAvailabilityOthersHandler} />
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


              <div className="form-row sale-information">
                <div className="row col-md-12">
                  <div className="">
                      <h3 className="information-headline">Exceptions:</h3>
                  </div>
                  <div className="form-group col-md-2 add-btn">
                    <button type="button" className="btn btn-success add-exception" onClick={this.handleAddException}>
                          <i className="fa fa-plus"></i> Add Exception
                      </button>
                  </div>
                </div>


                {this.state.exceptions.map((item, idx) => (
                  <div key={idx} className="row col-md-12 individual-exception">
                    <div className="form-group col-md-2">
                      <label htmlFor={`code_input_box_${idx + 1}`}><strong>Code Pair:</strong></label>
                      <input type="text" className="form-control" id={`code_input_box_${idx + 1}`}  placeholder={`#${idx + 1}`} value={item.code} onChange={this.handleExceptionCodeChange(idx)} />
                    </div>
                    <div className="form-group col-md-5">
                      <label htmlFor={`travel_valid_input_box_${idx + 1}`}><strong>Travel Valid:</strong></label>
                      <input type="text" className="form-control" id={`travel_valid_input_box_${idx + 1}`} placeholder={`Travel valid on Saturdays only.`} value={item.travel_valid} onChange={this.handleExceptionTravelValid(idx)} />
                    </div>
                    <div className="form-group col-md-2">
                      <label htmlFor={`service_begins_datepicker_${idx + 1}`}><strong>Service Begins:</strong></label>
                      <DatePicker className="form-control" id={`service_begins_datepicker_${idx + 1}`} selected={item.service_begins} onChange={this.handleExceptionServiceBegins(idx)} />
                    </div>
                    <div className="form-group col-md-2">
                    <label htmlFor={`service_ends_datepicker_${idx + 1}`}><strong>Service Ends:</strong></label>
                      <DatePicker className="form-control" id={`service_ends_datepicker_${idx + 1}`} selected={item.service_ends} onChange={this.handleExceptionServiceEnds(idx)} />
                    </div>

                    {/* <button type="button" onClick={this.handleRemoveException(idx)} className="small">-</button> */}
                    <div className="form-group col-md-1">
                      <button type="button" className="btn btn-danger remove-exception"  onClick={this.handleRemoveException(idx)}>
                          <i className="fa fa-minus"></i>
                      </button>
                    </div>
                  </div>
                ))}
                <div className="row col-md-12">

                </div>
                {/* <div className="row col-md-12 individual-exception">

                </div> */}


          </div>





              <div className="form-group col-md-6">
                <label htmlFor="inputPassword4">First Input</label>
                <input type="text" className="form-control" id="inputAddress" value = {this.state.firstinput} onChange = {this.updateFirstInput} />
              </div>
            

            <div className="form-group">
              <div className="form-check">
                <input className="form-check-input" type="checkbox" id="gridCheck" />
                <label className="form-check-label" htmlFor="gridCheck">
                  Check me out
                </label>
              </div>
            </div>
            <button type="submit" className="btn btn-primary">Generate XML</button>

          </form>


        </div>

      </div>
      </div>
    );




  }

  
}

export default App;
