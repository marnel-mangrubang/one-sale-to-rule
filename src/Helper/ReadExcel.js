import React from "react";
import readXlsxFile from "read-excel-file";
import {
  comparePrice,
  compareOriginCode,
  compareDestinationCode,
  mergeObjects,
  mergeClub49,
  groupMeByOrigin,
  getMyFirstTuesday,
  getMySecondTuesday,
} from "./Helper";
import { formatDate } from "./Format";

export default function ReadExcel(file) {
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