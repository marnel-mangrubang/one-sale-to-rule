import builder from "xmlbuilder";
import {
  returnMyCityName,
  makeDateMonthInEnglish,
  getMyDay,
  getMyMonth,
  getMyYear,
  getMyHour,
  getMyMinute,
  getMyTimeOfDay,
} from "./Helper";

export default function CreateXML(
  combined_array,
  exceptions_array,
  exception_test,
  club49deals
) {
  //Create CSV File from Data
  this.generateMySaleFaresCSV(this.state.all_my_fares);
  this.generateMySaleDetailsCSV();
  //Create CSV File from Data
  console.log(this.state);

  //CLUB 49 DEALS
  if (exception_test === false && club49deals === true) {
    let what_combined_fares_to_make_xml_for = combined_array;

    let array_counter_upper = 0;
    let array_counter_lower = 0;

    what_combined_fares_to_make_xml_for.map((myitem) => {
      if (myitem["group"] === "ALASKA_ALASKA") {
        myitem["upper_lower"].map((myitem2) => {
          array_counter_upper++;
        });
      } else {
        myitem["upper_lower"].map((myitem2) => {
          array_counter_lower++;
        });
      }
    });

    //console.log("Length of CLUB49: "+array_counter);

    let doc = builder
      .create("FlightDeals", { encoding: "UTF-8" })
      .att("xmlns:ss", "urn:schemas-microsoft-com:office:spreadsheet");
    doc.com(
      getMyMonth(this.state.sale_start_date) +
        "/" +
        getMyDay(this.state.sale_start_date) +
        " CLUB 49 - Updated at " +
        getMyMonth(new Date()) +
        "/" +
        getMyDay(new Date()) +
        "/" +
        getMyYear(new Date()) +
        " " +
        getMyHour(new Date()) +
        ":" +
        getMyMinute(new Date()) +
        " " +
        getMyTimeOfDay(new Date()) +
        " by PRODUCER_NAME"
    );

    what_combined_fares_to_make_xml_for.map((item) => {
      let start_date = "";
      let end_date = "";
      let travel_start = null;
      let travel_end = null;
      let days_availability = "";

      if (item["group"] === "ALASKA_ALASKA") {
        start_date = this.state.proposed_from_clu49_string;
        end_date = this.state.proposed_to_clu49_string;
        travel_start = this.state.travel_from_within_alaska;
        travel_end = this.state.travel_by_within_alaska;
        days_availability = this.state.days_availability_within_alaska;

        doc.com(
          getMyMonth(this.state.sale_start_date) +
            "/" +
            getMyDay(this.state.sale_start_date) +
            " CLUB 49 -  UPPER: " +
            array_counter_upper +
            " Fares"
        );
        let deal_set = doc
          .ele("DealSet", {
            from: this.state.sale_start_date_string + "T00:00:01",
            to: this.state.sale_end_date_string + "T23:59:59",
          })
          .ele("DealInfo", {
            code: "CLUB_49_SALE",
            dealType: "Saver",
            url: "",
          })
          .ele("TravelDates", {
            startdate: start_date + "T00:00:01",
            enddate: end_date + "T23:59:59",
          })
          .up()
          .ele("DealTitle")
          .up()
          .ele(
            "DealDescrip",
            "<![CDATA[Purchase by " +
              makeDateMonthInEnglish(this.state.sale_end_date) +
              " " +
              getMyDay(this.state.sale_end_date) +
              ", " +
              getMyYear(this.state.sale_end_date) +
              ".]]>"
          )
          .up()
          .ele(
            "terms",
            "<![CDATA[<strong>Fare Rules:</strong> Purchase by 11:59 pm (PT) on " +
              makeDateMonthInEnglish(this.state.sale_end_date) +
              " " +
              getMyDay(this.state.sale_end_date) +
              ", " +
              getMyYear(this.state.sale_end_date) +
              ", and at least " +
              this.state.advance_purchase +
              " prior to departure. Travel within Alaska is valid " +
              days_availability +
              " from " +
              makeDateMonthInEnglish(travel_start) +
              " " +
              getMyDay(travel_start) +
              ", " +
              getMyYear(travel_start) +
              " - " +
              makeDateMonthInEnglish(travel_end) +
              " " +
              getMyDay(travel_end) +
              ", " +
              getMyYear(travel_end) +
              '. Bag fees <a href="#terms">may apply</a> for <a href="/content/travel-info/baggage/checked-bags">checked baggage</a>. See <a href="#terms">bottom of page</a> for full terms and conditions.]]>'
          )
          .up()
          .up();
        let fares_layer = deal_set.ele("Fares");
        item["upper_lower"].map((item2) => {
          fares_layer
            .ele("Row", { fareType: "Main" })
            .ele("Cell", "<Data>" + item2["origin_code"] + "</Data>")
            .up()
            .ele(
              "Cell",
              "<Data>" + returnMyCityName(item2["origin_code"]) + "</Data>"
            )
            .up()
            .ele("Cell", "<Data>" + item2["destination_code"] + "</Data>")
            .up()
            .ele(
              "Cell",
              "<Data>" + returnMyCityName(item2["destination_code"]) + "</Data>"
            )
            .up()
            .ele("Cell", "<Data>" + item2["price"] + "</Data>")
            .up();
        });
      } else if (item["group"] === "FROM_ALASKA") {
        start_date = this.state.proposed_from_clu49_string;
        end_date = this.state.proposed_to_clu49_string;
        travel_start = this.state.travel_from_to_us;
        travel_end = this.state.travel_by_to_us;
        days_availability = this.state.days_availability_to_us;

        doc.com(
          getMyMonth(this.state.sale_start_date) +
            "/" +
            getMyDay(this.state.sale_start_date) +
            " CLUB 49 -  LOWER: " +
            array_counter_lower +
            " Fares"
        );
        let deal_set = doc
          .ele("DealSet", {
            from: this.state.sale_start_date_string + "T00:00:01",
            to: this.state.sale_end_date_string + "T23:59:59",
          })
          .ele("DealInfo", {
            code: "CLUB_49_SALE",
            dealType: "Saver",
            url: "",
          })
          .ele("TravelDates", {
            startdate: start_date + "T00:00:01",
            enddate: end_date + "T23:59:59",
          })
          .up()
          .ele("DealTitle")
          .up()
          .ele(
            "DealDescrip",
            "<![CDATA[Purchase by " +
              makeDateMonthInEnglish(this.state.sale_end_date) +
              " " +
              getMyDay(this.state.sale_end_date) +
              ", " +
              getMyYear(this.state.sale_end_date) +
              ".]]>"
          )
          .up()
          .ele(
            "terms",
            "<![CDATA[<strong>Fare Rules:</strong> Purchase by 11:59 pm (PT) on " +
              makeDateMonthInEnglish(this.state.sale_end_date) +
              " " +
              getMyDay(this.state.sale_end_date) +
              ", " +
              getMyYear(this.state.sale_end_date) +
              ", and at least " +
              this.state.advance_purchase +
              " prior to departure. Travel to the US is valid " +
              days_availability +
              " from " +
              makeDateMonthInEnglish(travel_start) +
              " " +
              getMyDay(travel_start) +
              ", " +
              getMyYear(travel_start) +
              " - " +
              makeDateMonthInEnglish(travel_end) +
              " " +
              getMyDay(travel_end) +
              ", " +
              getMyYear(travel_end) +
              '. Bag fees <a href="#terms">may apply</a> for <a href="/content/travel-info/baggage/checked-bags">checked baggage</a>. See <a href="#terms">bottom of page</a> for full terms and conditions.]]>'
          )
          .up()
          .up();
        let fares_layer = deal_set.ele("Fares");
        item["upper_lower"].map((item2) => {
          fares_layer
            .ele("Row", { fareType: "Main" })
            .ele("Cell", "<Data>" + item2["origin_code"] + "</Data>")
            .up()
            .ele(
              "Cell",
              "<Data>" + returnMyCityName(item2["origin_code"]) + "</Data>"
            )
            .up()
            .ele("Cell", "<Data>" + item2["destination_code"] + "</Data>")
            .up()
            .ele(
              "Cell",
              "<Data>" + returnMyCityName(item2["destination_code"]) + "</Data>"
            )
            .up()
            .ele("Cell", "<Data>" + item2["price"] + "</Data>")
            .up();
        });
      } else if (item["group"] === "ALASKA_HAWAII") {
        start_date = this.state.proposed_from_clu49_string;
        end_date = this.state.proposed_to_clu49_string;
        travel_start = this.state.travel_from_to_us;
        travel_end = this.state.travel_by_to_us;
        days_availability = this.state.days_availability_hawaii;

        doc.com(
          getMyMonth(this.state.sale_start_date) +
            "/" +
            getMyDay(this.state.sale_start_date) +
            " CLUB 49 -  LOWER: " +
            array_counter_lower +
            " Fares"
        );
        let deal_set = doc
          .ele("DealSet", {
            from: this.state.sale_start_date_string + "T00:00:01",
            to: this.state.sale_end_date_string + "T23:59:59",
          })
          .ele("DealInfo", {
            code: "CLUB_49_SALE",
            dealType: "Saver",
            url: "",
          })
          .ele("TravelDates", {
            startdate: start_date + "T00:00:01",
            enddate: end_date + "T23:59:59",
          })
          .up()
          .ele("DealTitle")
          .up()
          .ele(
            "DealDescrip",
            "<![CDATA[Purchase by " +
              makeDateMonthInEnglish(this.state.sale_end_date) +
              " " +
              getMyDay(this.state.sale_end_date) +
              ", " +
              getMyYear(this.state.sale_end_date) +
              ".]]>"
          )
          .up()
          .ele(
            "terms",
            "<![CDATA[<strong>Fare Rules:</strong> Purchase by 11:59 pm (PT) on " +
              makeDateMonthInEnglish(this.state.sale_end_date) +
              " " +
              getMyDay(this.state.sale_end_date) +
              ", " +
              getMyYear(this.state.sale_end_date) +
              ", and at least " +
              this.state.advance_purchase +
              " prior to departure. Travel to Hawaii is valid " +
              days_availability +
              " from " +
              makeDateMonthInEnglish(travel_start) +
              " " +
              getMyDay(travel_start) +
              ", " +
              getMyYear(travel_start) +
              " - " +
              makeDateMonthInEnglish(travel_end) +
              " " +
              getMyDay(travel_end) +
              ", " +
              getMyYear(travel_end) +
              '. Bag fees <a href="#terms">may apply</a> for <a href="/content/travel-info/baggage/checked-bags">checked baggage</a>. See <a href="#terms">bottom of page</a> for full terms and conditions.]]>'
          )
          .up()
          .up();
        let fares_layer = deal_set.ele("Fares");
        item["upper_lower"].map((item2) => {
          fares_layer
            .ele("Row", { fareType: "Main" })
            .ele("Cell", "<Data>" + item2["origin_code"] + "</Data>")
            .up()
            .ele(
              "Cell",
              "<Data>" + returnMyCityName(item2["origin_code"]) + "</Data>"
            )
            .up()
            .ele("Cell", "<Data>" + item2["destination_code"] + "</Data>")
            .up()
            .ele(
              "Cell",
              "<Data>" + returnMyCityName(item2["destination_code"]) + "</Data>"
            )
            .up()
            .ele("Cell", "<Data>" + item2["price"] + "</Data>")
            .up();
        });
      } else {
      }
    });

    let element = doc.toString({ pretty: true });
    element = element.replace(/&lt;/g, "<");
    element = element.replace(/&gt;/g, ">");

    this.setState({
      xmloutput: element,
    });

    //NORMAL FLIGHT DEALS WITH SAVER SAVER FARES
  } else if (exception_test === false && club49deals === false) {
    let what_combined_fares_to_make_xml_for = combined_array;
    let what_exception_fares_to_make_xml_for = exceptions_array;

    let doc = builder
      .create("FlightDeals", { encoding: "UTF-8" })
      .att("xmlns:ss", "urn:schemas-microsoft-com:office:spreadsheet");

    if (this.state.selectedOption === "Mileage") {
      doc.com(
        getMyMonth(this.state.sale_start_date) +
          "/" +
          getMyDay(this.state.sale_start_date) +
          " AWARD SALE - Updated at " +
          getMyMonth(new Date()) +
          "/" +
          getMyDay(new Date()) +
          "/" +
          getMyYear(new Date()) +
          " " +
          getMyHour(new Date()) +
          ":" +
          getMyMinute(new Date()) +
          " " +
          getMyTimeOfDay(new Date()) +
          " by PRODUCER_NAME"
      );
    } else {
      doc.com(
        getMyMonth(this.state.sale_start_date) +
          "/" +
          getMyDay(this.state.sale_start_date) +
          " SALE - Updated at " +
          getMyMonth(new Date()) +
          "/" +
          getMyDay(new Date()) +
          "/" +
          getMyYear(new Date()) +
          " " +
          getMyHour(new Date()) +
          ":" +
          getMyMinute(new Date()) +
          " " +
          getMyTimeOfDay(new Date()) +
          " by PRODUCER_NAME"
      );
    }

    what_combined_fares_to_make_xml_for.map((item) => {
      let start_date = "";
      let end_date = "";
      let travel_start = null;
      let travel_end = null;
      let days_availability = "";
      let black_out_date_sentence = "";

      if (item["group"] === "ALASKA_HAWAII") {
        start_date = this.state.proposed_start_hawaii_string;
        end_date = this.state.proposed_end_hawaii_string;
        travel_start = this.state.travel_start_alaska_to_from_hawaii;
        travel_end = this.state.travel_end_alaska_to_from_hawaii;
        days_availability = this.state.days_availability_hawaii;
        // Pulling BLACKOUT DATES and FORMING the sentence
        if (
          this.state.blackout_start_alaska_to_from_hawaii !== null &&
          this.state.blackout_end_alaska_to_from_hawaii !== null
        ) {
          black_out_date_sentence =
            "Blackout dates are from " +
            makeDateMonthInEnglish(
              this.state.blackout_start_alaska_to_from_hawaii
            ) +
            " " +
            getMyDay(this.state.blackout_start_alaska_to_from_hawaii) +
            ", " +
            getMyYear(this.state.blackout_start_alaska_to_from_hawaii) +
            " to " +
            makeDateMonthInEnglish(
              this.state.blackout_end_alaska_to_from_hawaii
            ) +
            " " +
            getMyDay(this.state.blackout_end_alaska_to_from_hawaii) +
            ", " +
            getMyYear(this.state.blackout_end_alaska_to_from_hawaii) +
            ". ";
        }
      } else if (item["group"] === "ALASKA_ALASKA") {
        start_date = this.state.proposed_start_others_string;
        end_date = this.state.proposed_end_others_string;
        travel_start = this.state.travel_start_others;
        travel_end = this.state.travel_end_others;
        days_availability = this.state.days_availability_others;
        // Pulling BLACKOUT DATES and FORMING the sentence
        if (
          this.state.blackout_start_others !== null &&
          this.state.blackout_start_others !== null
        ) {
          black_out_date_sentence =
            "Blackout dates are from " +
            makeDateMonthInEnglish(this.state.blackout_start_others) +
            " " +
            getMyDay(this.state.blackout_start_others) +
            ", " +
            getMyYear(this.state.blackout_start_others) +
            " to " +
            makeDateMonthInEnglish(this.state.blackout_end_others) +
            " " +
            getMyDay(this.state.blackout_end_others) +
            ", " +
            getMyYear(this.state.blackout_end_others) +
            ". ";
        }
      } else if (item["group"] === "FROM_ALASKA") {
        start_date = this.state.proposed_start_others_string;
        end_date = this.state.proposed_end_others_string;
        travel_start = this.state.travel_start_others;
        travel_end = this.state.travel_end_others;
        days_availability = this.state.days_availability_others;
        // Pulling BLACKOUT DATES and FORMING the sentence
        if (
          this.state.blackout_start_others !== null &&
          this.state.blackout_start_others !== null
        ) {
          black_out_date_sentence =
            "Blackout dates are from " +
            makeDateMonthInEnglish(this.state.blackout_start_others) +
            " " +
            getMyDay(this.state.blackout_start_others) +
            ", " +
            getMyYear(this.state.blackout_start_others) +
            " to " +
            makeDateMonthInEnglish(this.state.blackout_end_others) +
            " " +
            getMyDay(this.state.blackout_end_others) +
            ", " +
            getMyYear(this.state.blackout_end_others) +
            ". ";
        }
      } else if (item["group"] === "TO_ALASKA") {
        start_date = this.state.proposed_start_others_string;
        end_date = this.state.proposed_end_others_string;
        travel_start = this.state.travel_start_others;
        travel_end = this.state.travel_end_others;
        days_availability = this.state.days_availability_others;
        // Pulling BLACKOUT DATES and FORMING the sentence
        if (
          this.state.blackout_start_others !== null &&
          this.state.blackout_start_others !== null
        ) {
          black_out_date_sentence =
            "Blackout dates are from " +
            makeDateMonthInEnglish(this.state.blackout_start_others) +
            " " +
            getMyDay(this.state.blackout_start_others) +
            ", " +
            getMyYear(this.state.blackout_start_others) +
            " to " +
            makeDateMonthInEnglish(this.state.blackout_end_others) +
            " " +
            getMyDay(this.state.blackout_end_others) +
            ", " +
            getMyYear(this.state.blackout_end_others) +
            ". ";
        }
      } else if (
        item["group"] === "TO_HAWAII" ||
        item["group"] === "FROM_HAWAII"
      ) {
        start_date = this.state.proposed_start_hawaii_string;
        end_date = this.state.proposed_end_hawaii_string;
        travel_start = this.state.travel_start_hawaii;
        travel_end = this.state.travel_end_hawaii;
        days_availability = this.state.days_availability_hawaii;
        // Pulling BLACKOUT DATES and FORMING the sentence
        if (
          this.state.blackout_start_from_hawaii !== null &&
          this.state.blackout_end_from_hawaii !== null &&
          item["group"] === "FROM_HAWAII"
        ) {
          black_out_date_sentence =
            "Blackout dates are from " +
            makeDateMonthInEnglish(this.state.blackout_start_from_hawaii) +
            " " +
            getMyDay(this.state.blackout_start_from_hawaii) +
            ", " +
            getMyYear(this.state.blackout_start_from_hawaii) +
            " to " +
            makeDateMonthInEnglish(this.state.blackout_end_from_hawaii) +
            " " +
            getMyDay(this.state.blackout_end_from_hawaii) +
            ", " +
            getMyYear(this.state.blackout_end_from_hawaii) +
            ". ";
        }
        if (
          this.state.blackout_start_to_hawaii !== null &&
          this.state.blackout_start_to_hawaii !== null &&
          item["group"] === "TO_HAWAII"
        ) {
          black_out_date_sentence =
            "Blackout dates are from " +
            makeDateMonthInEnglish(this.state.blackout_start_to_hawaii) +
            " " +
            getMyDay(this.state.blackout_start_to_hawaii) +
            ", " +
            getMyYear(this.state.blackout_start_to_hawaii) +
            " to " +
            makeDateMonthInEnglish(this.state.blackout_end_to_hawaii) +
            " " +
            getMyDay(this.state.blackout_end_to_hawaii) +
            ", " +
            getMyYear(this.state.blackout_end_to_hawaii) +
            ". ";
        }
      } else if (item["group"] === "TO_FLORIDA") {
        start_date = this.state.proposed_start_others_string;
        end_date = this.state.proposed_end_others_string;
        travel_start = this.state.travel_start_florida;
        travel_end = this.state.travel_end_florida;
        days_availability = this.state.days_availability_to_florida;
        // Pulling BLACKOUT DATES and FORMING the sentence
        if (
          this.state.blackout_start_others !== null &&
          this.state.blackout_start_others !== null
        ) {
          black_out_date_sentence =
            "Blackout dates are from " +
            makeDateMonthInEnglish(this.state.blackout_start_others) +
            " " +
            getMyDay(this.state.blackout_start_others) +
            ", " +
            getMyYear(this.state.blackout_start_others) +
            " to " +
            makeDateMonthInEnglish(this.state.blackout_end_others) +
            " " +
            getMyDay(this.state.blackout_end_others) +
            ", " +
            getMyYear(this.state.blackout_end_others) +
            ". ";
        }
      } else if (item["group"] === "FROM_FLORIDA") {
        start_date = this.state.proposed_start_others_string;
        end_date = this.state.proposed_end_others_string;
        travel_start = this.state.travel_start_florida;
        travel_end = this.state.travel_end_florida;
        days_availability = this.state.days_availability_from_florida;
        // Pulling BLACKOUT DATES and FORMING the sentence
        if (
          this.state.blackout_start_others !== null &&
          this.state.blackout_start_others !== null
        ) {
          black_out_date_sentence =
            "Blackout dates are from " +
            makeDateMonthInEnglish(this.state.blackout_start_others) +
            " " +
            getMyDay(this.state.blackout_start_others) +
            ", " +
            getMyYear(this.state.blackout_start_others) +
            " to " +
            makeDateMonthInEnglish(this.state.blackout_end_others) +
            " " +
            getMyDay(this.state.blackout_end_others) +
            ", " +
            getMyYear(this.state.blackout_end_others) +
            ". ";
        }
      } else if (item["group"] === "MEXICO") {
        start_date = this.state.proposed_start_others_string;
        end_date = this.state.proposed_end_others_string;
        travel_start = this.state.travel_start_mexico;
        travel_end = this.state.travel_end_mexico;
        days_availability = this.state.days_availability_mexico;
        // Pulling BLACKOUT DATES and FORMING the sentence
        if (
          this.state.blackout_start_mexico !== null &&
          this.state.blackout_start_mexico !== null
        ) {
          black_out_date_sentence =
            "Blackout dates are from " +
            makeDateMonthInEnglish(this.state.blackout_start_mexico) +
            " " +
            getMyDay(this.state.blackout_start_mexico) +
            ", " +
            getMyYear(this.state.blackout_start_mexico) +
            " to " +
            makeDateMonthInEnglish(this.state.blackout_end_mexico) +
            " " +
            getMyDay(this.state.blackout_end_mexico) +
            ", " +
            getMyYear(this.state.blackout_end_mexico) +
            ". ";
        }
      } else if (item["group"] === "COSTA_RICA") {
        start_date = this.state.proposed_start_others_string;
        end_date = this.state.proposed_end_others_string;
        travel_start = this.state.travel_start_costa_rica;
        travel_end = this.state.travel_end_costa_rica;
        days_availability = this.state.days_availability_costa_rica;
        // Pulling BLACKOUT DATES and FORMING the sentence
        if (
          this.state.blackout_start_costa_rica !== null &&
          this.state.blackout_start_costa_rica !== null
        ) {
          black_out_date_sentence =
            "Blackout dates are from " +
            makeDateMonthInEnglish(this.state.blackout_start_costa_rica) +
            " " +
            getMyDay(this.state.blackout_start_costa_rica) +
            ", " +
            getMyYear(this.state.blackout_start_costa_rica) +
            " to " +
            makeDateMonthInEnglish(this.state.blackout_end_costa_rica) +
            " " +
            getMyDay(this.state.blackout_end_costa_rica) +
            ", " +
            getMyYear(this.state.blackout_end_costa_rica) +
            ". ";
        }
      } else if (item["group"] === "PAE") {
        start_date = this.state.proposed_start_pae_string;
        end_date = this.state.proposed_end_pae_string;
        travel_start = this.state.travel_start_others;
        travel_end = this.state.travel_end_others;
        days_availability = this.state.days_availability_others;
        // Pulling BLACKOUT DATES and FORMING the sentence
        if (
          this.state.blackout_start_others !== null &&
          this.state.blackout_start_others !== null
        ) {
          black_out_date_sentence =
            "Blackout dates are from " +
            makeDateMonthInEnglish(this.state.blackout_start_others) +
            " " +
            getMyDay(this.state.blackout_start_others) +
            ", " +
            getMyYear(this.state.blackout_start_others) +
            " to " +
            makeDateMonthInEnglish(this.state.blackout_end_others) +
            " " +
            getMyDay(this.state.blackout_end_others) +
            ", " +
            getMyYear(this.state.blackout_end_others) +
            ". ";
        }
      } else if (item["group"] === "OTHER_MARKET") {
        start_date = this.state.proposed_start_others_string;
        end_date = this.state.proposed_end_others_string;
        travel_start = this.state.travel_start_others;
        travel_end = this.state.travel_end_others;
        days_availability = this.state.days_availability_others;
        // Pulling BLACKOUT DATES and FORMING the sentence
        if (
          this.state.blackout_start_others !== null &&
          this.state.blackout_start_others !== null
        ) {
          black_out_date_sentence =
            "Blackout dates are from " +
            makeDateMonthInEnglish(this.state.blackout_start_others) +
            " " +
            getMyDay(this.state.blackout_start_others) +
            ", " +
            getMyYear(this.state.blackout_start_others) +
            " to " +
            makeDateMonthInEnglish(this.state.blackout_end_others) +
            " " +
            getMyDay(this.state.blackout_end_others) +
            ", " +
            getMyYear(this.state.blackout_end_others) +
            ". ";
        }
      } else {
      }

      let service_begin_sentence = "";
      let service_ends_sentence = "";
      let d_type = "";
      let f_type = "";

      if (this.state.selectedOption === "Mileage") {
        d_type = "MileagePlan";
        f_type = "Miles";
      } else {
        d_type = "Saver";
      }

      //console.log(item);
      doc.com(
        getMyMonth(this.state.sale_start_date) +
          "/" +
          getMyDay(this.state.sale_start_date) +
          " " +
          item["name"]
      );
      let deal_set = doc
        .ele("DealSet", {
          from: this.state.sale_start_date_string + "T00:00:01",
          to: this.state.sale_end_date_string + "T23:59:59",
        })
        .ele("DealInfo", {
          code:
            getMyYear(this.state.sale_start_date) +
            "" +
            getMyMonth(this.state.sale_start_date) +
            "" +
            getMyDay(this.state.sale_start_date) +
            "_SALE-" +
            item["name"],
          dealType: d_type,
          url: "",
        })
        .ele("TravelDates", {
          startdate: start_date + "T00:00:01",
          enddate: end_date + "T23:59:59",
        })
        .up()
        .ele("DealTitle")
        .up()
        .ele(
          "DealDescrip",
          "<![CDATA[Purchase by " +
            makeDateMonthInEnglish(this.state.sale_end_date) +
            " " +
            getMyDay(this.state.sale_end_date) +
            ", " +
            getMyYear(this.state.sale_end_date) +
            ".]]>"
        )
        .up()
        .ele(
          "terms",
          "<![CDATA[<strong>Fare Rules:</strong> Purchase by 11:59 pm (PT) on " +
            makeDateMonthInEnglish(this.state.sale_end_date) +
            " " +
            getMyDay(this.state.sale_end_date) +
            ", " +
            getMyYear(this.state.sale_end_date) +
            ", and at least " +
            this.state.advance_purchase +
            " prior to departure. Travel from " +
            item["origin_city"] +
            " (" +
            item["origin_code"] +
            ") to " +
            item["destination_city"] +
            " (" +
            item["destination_code"] +
            ") is valid " +
            days_availability +
            " from " +
            makeDateMonthInEnglish(travel_start) +
            " " +
            getMyDay(travel_start) +
            ", " +
            getMyYear(travel_start) +
            " - " +
            makeDateMonthInEnglish(travel_end) +
            " " +
            getMyDay(travel_end) +
            ", " +
            getMyYear(travel_end) +
            ". " +
            service_begin_sentence +
            "" +
            service_ends_sentence +
            "" +
            black_out_date_sentence +
            'Bag fees <a href="#terms">may apply</a> for <a href="/content/travel-info/baggage/checked-bags">checked baggage</a>. See <a href="#terms">bottom of page</a> for full terms and conditions.]]>'
        )
        .up()
        .up();
      let fares_layer = deal_set.ele("Fares");

      if (f_type === "Miles") {
        item["price_types"].map((item2) => {
          if (item["default"] === true) {
            fares_layer
              .ele("Row", { fareType: f_type, showAsDefault: "true" })
              .ele("Cell", "<Data>" + item["origin_code"] + "</Data>")
              .up()
              .ele(
                "Cell",
                "<Data>" + returnMyCityName(item["origin_code"]) + "</Data>"
              )
              .up()
              .ele("Cell", "<Data>" + item["destination_code"] + "</Data>")
              .up()
              .ele(
                "Cell",
                "<Data>" +
                  returnMyCityName(item["destination_code"]) +
                  "</Data>"
              )
              .up()
              .ele("Cell", "<Data>" + item2["price"] + "</Data>")
              .up()
              .ele("Cell", "<Data>" + item2["taxes"] + "</Data>")
              .up();
          } else {
            fares_layer
              .ele("Row", { fareType: f_type })
              .ele("Cell", "<Data>" + item["origin_code"] + "</Data>")
              .up()
              .ele(
                "Cell",
                "<Data>" + returnMyCityName(item["origin_code"]) + "</Data>"
              )
              .up()
              .ele("Cell", "<Data>" + item["destination_code"] + "</Data>")
              .up()
              .ele(
                "Cell",
                "<Data>" +
                  returnMyCityName(item["destination_code"]) +
                  "</Data>"
              )
              .up()
              .ele("Cell", "<Data>" + item2["price"] + "</Data>")
              .up()
              .ele("Cell", "<Data>" + item2["taxes"] + "</Data>")
              .up();
          }
        });
      } else {
        item["price_types"].map((item2) => {
          if (item["default"] === true && item2["fare_type"] === "Saver") {
            fares_layer
              .ele("Row", {
                fareType: item2["fare_type"],
                showAsDefault: "true",
              })
              .ele("Cell", "<Data>" + item["origin_code"] + "</Data>")
              .up()
              .ele(
                "Cell",
                "<Data>" + returnMyCityName(item["origin_code"]) + "</Data>"
              )
              .up()
              .ele("Cell", "<Data>" + item["destination_code"] + "</Data>")
              .up()
              .ele(
                "Cell",
                "<Data>" +
                  returnMyCityName(item["destination_code"]) +
                  "</Data>"
              )
              .up()
              .ele("Cell", "<Data>" + item2["price"] + "</Data>")
              .up();
          } else {
            fares_layer
              .ele("Row", { fareType: item2["fare_type"] })
              .ele("Cell", "<Data>" + item["origin_code"] + "</Data>")
              .up()
              .ele(
                "Cell",
                "<Data>" + returnMyCityName(item["origin_code"]) + "</Data>"
              )
              .up()
              .ele("Cell", "<Data>" + item["destination_code"] + "</Data>")
              .up()
              .ele(
                "Cell",
                "<Data>" +
                  returnMyCityName(item["destination_code"]) +
                  "</Data>"
              )
              .up()
              .ele("Cell", "<Data>" + item2["price"] + "</Data>")
              .up();
          }
        });
      }
    });

    let element = doc.toString({ pretty: true });
    element = element.replace(/&lt;/g, "<");
    element = element.replace(/&gt;/g, ">");

    this.setState({
      xmloutput: element,
    });
  } else {
    let what_combined_fares_to_make_xml_for = combined_array;
    let what_exception_fares_to_make_xml_for = exceptions_array;

    let doc = builder
      .create("FlightDeals", { encoding: "UTF-8" })
      .att("xmlns:ss", "urn:schemas-microsoft-com:office:spreadsheet");
    if (this.state.selectedOption === "Mileage") {
      doc.com(
        getMyMonth(this.state.sale_start_date) +
          "/" +
          getMyDay(this.state.sale_start_date) +
          " AWARD SALE - Updated at " +
          getMyMonth(new Date()) +
          "/" +
          getMyDay(new Date()) +
          "/" +
          getMyYear(new Date()) +
          " " +
          getMyHour(new Date()) +
          ":" +
          getMyMinute(new Date()) +
          " " +
          getMyTimeOfDay(new Date()) +
          " by PRODUCER_NAME"
      );
    } else {
      doc.com(
        getMyMonth(this.state.sale_start_date) +
          "/" +
          getMyDay(this.state.sale_start_date) +
          " SALE - Updated at " +
          getMyMonth(new Date()) +
          "/" +
          getMyDay(new Date()) +
          "/" +
          getMyYear(new Date()) +
          " " +
          getMyHour(new Date()) +
          ":" +
          getMyMinute(new Date()) +
          " " +
          getMyTimeOfDay(new Date()) +
          " by PRODUCER_NAME"
      );
    }

    what_combined_fares_to_make_xml_for.map((item) => {
      let start_date = "";
      let end_date = "";
      let travel_start = null;
      let travel_end = null;
      let days_availability = "";
      let black_out_date_sentence = "";

      if (item["group"] === "ALASKA_HAWAII") {
        start_date = this.state.proposed_start_hawaii_string;
        end_date = this.state.proposed_end_hawaii_string;
        travel_start = this.state.travel_start_alaska_to_from_hawaii;
        travel_end = this.state.travel_end_alaska_to_from_hawaii;
        days_availability = this.state.days_availability_hawaii;
        // Pulling BLACKOUT DATES and FORMING the sentence
        if (
          this.state.blackout_start_alaska_to_from_hawaii !== null &&
          this.state.blackout_end_alaska_to_from_hawaii !== null
        ) {
          black_out_date_sentence =
            "Blackout dates are from " +
            makeDateMonthInEnglish(
              this.state.blackout_start_alaska_to_from_hawaii
            ) +
            " " +
            getMyDay(this.state.blackout_start_alaska_to_from_hawaii) +
            ", " +
            getMyYear(this.state.blackout_start_alaska_to_from_hawaii) +
            " to " +
            makeDateMonthInEnglish(
              this.state.blackout_end_alaska_to_from_hawaii
            ) +
            " " +
            getMyDay(this.state.blackout_end_alaska_to_from_hawaii) +
            ", " +
            getMyYear(this.state.blackout_end_alaska_to_from_hawaii) +
            ". ";
        }
      } else if (item["group"] === "ALASKA_ALASKA") {
        start_date = this.state.proposed_start_others_string;
        end_date = this.state.proposed_end_others_string;
        travel_start = this.state.travel_start_others;
        travel_end = this.state.travel_end_others;
        days_availability = this.state.days_availability_others;
        // Pulling BLACKOUT DATES and FORMING the sentence
        if (
          this.state.blackout_start_others !== null &&
          this.state.blackout_start_others !== null
        ) {
          black_out_date_sentence =
            "Blackout dates are from " +
            makeDateMonthInEnglish(this.state.blackout_start_others) +
            " " +
            getMyDay(this.state.blackout_start_others) +
            ", " +
            getMyYear(this.state.blackout_start_others) +
            " to " +
            makeDateMonthInEnglish(this.state.blackout_end_others) +
            " " +
            getMyDay(this.state.blackout_end_others) +
            ", " +
            getMyYear(this.state.blackout_end_others) +
            ". ";
        }
      } else if (item["group"] === "FROM_ALASKA") {
        start_date = this.state.proposed_start_others_string;
        end_date = this.state.proposed_end_others_string;
        travel_start = this.state.travel_start_others;
        travel_end = this.state.travel_end_others;
        days_availability = this.state.days_availability_others;
        // Pulling BLACKOUT DATES and FORMING the sentence
        if (
          this.state.blackout_start_others !== null &&
          this.state.blackout_start_others !== null
        ) {
          black_out_date_sentence =
            "Blackout dates are from " +
            makeDateMonthInEnglish(this.state.blackout_start_others) +
            " " +
            getMyDay(this.state.blackout_start_others) +
            ", " +
            getMyYear(this.state.blackout_start_others) +
            " to " +
            makeDateMonthInEnglish(this.state.blackout_end_others) +
            " " +
            getMyDay(this.state.blackout_end_others) +
            ", " +
            getMyYear(this.state.blackout_end_others) +
            ". ";
        }
      } else if (item["group"] === "TO_ALASKA") {
        start_date = this.state.proposed_start_others_string;
        end_date = this.state.proposed_end_others_string;
        travel_start = this.state.travel_start_others;
        travel_end = this.state.travel_end_others;
        days_availability = this.state.days_availability_others;
        // Pulling BLACKOUT DATES and FORMING the sentence
        if (
          this.state.blackout_start_others !== null &&
          this.state.blackout_start_others !== null
        ) {
          black_out_date_sentence =
            "Blackout dates are from " +
            makeDateMonthInEnglish(this.state.blackout_start_others) +
            " " +
            getMyDay(this.state.blackout_start_others) +
            ", " +
            getMyYear(this.state.blackout_start_others) +
            " to " +
            makeDateMonthInEnglish(this.state.blackout_end_others) +
            " " +
            getMyDay(this.state.blackout_end_others) +
            ", " +
            getMyYear(this.state.blackout_end_others) +
            ". ";
        }
      } else if (
        item["group"] === "TO_HAWAII" ||
        item["group"] === "FROM_HAWAII"
      ) {
        start_date = this.state.proposed_start_hawaii_string;
        end_date = this.state.proposed_end_hawaii_string;
        travel_start = this.state.travel_start_hawaii;
        travel_end = this.state.travel_end_hawaii;
        days_availability = this.state.days_availability_hawaii;
        // Pulling BLACKOUT DATES and FORMING the sentence
        if (
          this.state.blackout_start_from_hawaii !== null &&
          this.state.blackout_end_from_hawaii !== null &&
          item["group"] === "FROM_HAWAII"
        ) {
          black_out_date_sentence =
            "Blackout dates are from " +
            makeDateMonthInEnglish(this.state.blackout_start_from_hawaii) +
            " " +
            getMyDay(this.state.blackout_start_from_hawaii) +
            ", " +
            getMyYear(this.state.blackout_start_from_hawaii) +
            " to " +
            makeDateMonthInEnglish(this.state.blackout_end_from_hawaii) +
            " " +
            getMyDay(this.state.blackout_end_from_hawaii) +
            ", " +
            getMyYear(this.state.blackout_end_from_hawaii) +
            ". ";
        }
        if (
          this.state.blackout_start_to_hawaii !== null &&
          this.state.blackout_start_to_hawaii !== null &&
          item["group"] === "TO_HAWAII"
        ) {
          black_out_date_sentence =
            "Blackout dates are from " +
            makeDateMonthInEnglish(this.state.blackout_start_to_hawaii) +
            " " +
            getMyDay(this.state.blackout_start_to_hawaii) +
            ", " +
            getMyYear(this.state.blackout_start_to_hawaii) +
            " to " +
            makeDateMonthInEnglish(this.state.blackout_end_to_hawaii) +
            " " +
            getMyDay(this.state.blackout_end_to_hawaii) +
            ", " +
            getMyYear(this.state.blackout_end_to_hawaii) +
            ". ";
        }
      } else if (item["group"] === "TO_FLORIDA") {
        start_date = this.state.proposed_start_others_string;
        end_date = this.state.proposed_end_others_string;
        travel_start = this.state.travel_start_florida;
        travel_end = this.state.travel_end_florida;
        days_availability = this.state.days_availability_to_florida;
        // Pulling BLACKOUT DATES and FORMING the sentence
        if (
          this.state.blackout_start_others !== null &&
          this.state.blackout_start_others !== null
        ) {
          black_out_date_sentence =
            "Blackout dates are from " +
            makeDateMonthInEnglish(this.state.blackout_start_others) +
            " " +
            getMyDay(this.state.blackout_start_others) +
            ", " +
            getMyYear(this.state.blackout_start_others) +
            " to " +
            makeDateMonthInEnglish(this.state.blackout_end_others) +
            " " +
            getMyDay(this.state.blackout_end_others) +
            ", " +
            getMyYear(this.state.blackout_end_others) +
            ". ";
        }
      } else if (item["group"] === "FROM_FLORIDA") {
        start_date = this.state.proposed_start_others_string;
        end_date = this.state.proposed_end_others_string;
        travel_start = this.state.travel_start_florida;
        travel_end = this.state.travel_end_florida;
        days_availability = this.state.days_availability_from_florida;
        // Pulling BLACKOUT DATES and FORMING the sentence
        if (
          this.state.blackout_start_others !== null &&
          this.state.blackout_start_others !== null
        ) {
          black_out_date_sentence =
            "Blackout dates are from " +
            makeDateMonthInEnglish(this.state.blackout_start_others) +
            " " +
            getMyDay(this.state.blackout_start_others) +
            ", " +
            getMyYear(this.state.blackout_start_others) +
            " to " +
            makeDateMonthInEnglish(this.state.blackout_end_others) +
            " " +
            getMyDay(this.state.blackout_end_others) +
            ", " +
            getMyYear(this.state.blackout_end_others) +
            ". ";
        }
      } else if (item["group"] === "MEXICO") {
        start_date = this.state.proposed_start_others_string;
        end_date = this.state.proposed_end_others_string;
        travel_start = this.state.travel_start_mexico;
        travel_end = this.state.travel_end_mexico;
        days_availability = this.state.days_availability_mexico;
        // Pulling BLACKOUT DATES and FORMING the sentence
        if (
          this.state.blackout_start_mexico !== null &&
          this.state.blackout_start_mexico !== null
        ) {
          black_out_date_sentence =
            "Blackout dates are from " +
            makeDateMonthInEnglish(this.state.blackout_start_mexico) +
            " " +
            getMyDay(this.state.blackout_start_mexico) +
            ", " +
            getMyYear(this.state.blackout_start_mexico) +
            " to " +
            makeDateMonthInEnglish(this.state.blackout_end_mexico) +
            " " +
            getMyDay(this.state.blackout_end_mexico) +
            ", " +
            getMyYear(this.state.blackout_end_mexico) +
            ". ";
        }
      } else if (item["group"] === "COSTA_RICA") {
        start_date = this.state.proposed_start_others_string;
        end_date = this.state.proposed_end_others_string;
        travel_start = this.state.travel_start_costa_rica;
        travel_end = this.state.travel_end_costa_rica;
        days_availability = this.state.days_availability_costa_rica;
        // Pulling BLACKOUT DATES and FORMING the sentence
        if (
          this.state.blackout_start_costa_rica !== null &&
          this.state.blackout_start_costa_rica !== null
        ) {
          black_out_date_sentence =
            "Blackout dates are from " +
            makeDateMonthInEnglish(this.state.blackout_start_costa_rica) +
            " " +
            getMyDay(this.state.blackout_start_costa_rica) +
            ", " +
            getMyYear(this.state.blackout_start_costa_rica) +
            " to " +
            makeDateMonthInEnglish(this.state.blackout_end_costa_rica) +
            " " +
            getMyDay(this.state.blackout_end_costa_rica) +
            ", " +
            getMyYear(this.state.blackout_end_costa_rica) +
            ". ";
        }
      } else if (item["group"] === "PAE") {
        start_date = this.state.proposed_start_pae_string;
        end_date = this.state.proposed_end_pae_string;
        travel_start = this.state.travel_start_others;
        travel_end = this.state.travel_end_others;
        days_availability = this.state.days_availability_others;
        // Pulling BLACKOUT DATES and FORMING the sentence
        if (
          this.state.blackout_start_others !== null &&
          this.state.blackout_start_others !== null
        ) {
          black_out_date_sentence =
            "Blackout dates are from " +
            makeDateMonthInEnglish(this.state.blackout_start_others) +
            " " +
            getMyDay(this.state.blackout_start_others) +
            ", " +
            getMyYear(this.state.blackout_start_others) +
            " to " +
            makeDateMonthInEnglish(this.state.blackout_end_others) +
            " " +
            getMyDay(this.state.blackout_end_others) +
            ", " +
            getMyYear(this.state.blackout_end_others) +
            ". ";
        }
      } else if (item["group"] === "OTHER_MARKET") {
        start_date = this.state.proposed_start_others_string;
        end_date = this.state.proposed_end_others_string;
        travel_start = this.state.travel_start_others;
        travel_end = this.state.travel_end_others;
        days_availability = this.state.days_availability_others;
        // Pulling BLACKOUT DATES and FORMING the sentence
        if (
          this.state.blackout_start_others !== null &&
          this.state.blackout_start_others !== null
        ) {
          black_out_date_sentence =
            "Blackout dates are from " +
            makeDateMonthInEnglish(this.state.blackout_start_others) +
            " " +
            getMyDay(this.state.blackout_start_others) +
            ", " +
            getMyYear(this.state.blackout_start_others) +
            " to " +
            makeDateMonthInEnglish(this.state.blackout_end_others) +
            " " +
            getMyDay(this.state.blackout_end_others) +
            ", " +
            getMyYear(this.state.blackout_end_others) +
            ". ";
        }
      } else {
      }

      let service_begin_sentence = "";
      let service_ends_sentence = "";
      let d_type = "";
      let f_type = "";

      if (this.state.selectedOption === "Mileage") {
        d_type = "MileagePlan";
        f_type = "Miles";
      } else {
        d_type = "Saver";
      }

      //console.log(item);
      doc.com(
        getMyMonth(this.state.sale_start_date) +
          "/" +
          getMyDay(this.state.sale_start_date) +
          " " +
          item["name"]
      );
      let deal_set = doc
        .ele("DealSet", {
          from: this.state.sale_start_date_string + "T00:00:01",
          to: this.state.sale_end_date_string + "T23:59:59",
        })
        .ele("DealInfo", {
          code:
            getMyYear(this.state.sale_start_date) +
            "" +
            getMyMonth(this.state.sale_start_date) +
            "" +
            getMyDay(this.state.sale_start_date) +
            "_SALE-" +
            item["name"],
          dealType: d_type,
          url: "",
        })
        .ele("TravelDates", {
          startdate: start_date + "T00:00:01",
          enddate: end_date + "T23:59:59",
        })
        .up()
        .ele("DealTitle")
        .up()
        .ele(
          "DealDescrip",
          "<![CDATA[Purchase by " +
            makeDateMonthInEnglish(this.state.sale_end_date) +
            " " +
            getMyDay(this.state.sale_end_date) +
            ", " +
            getMyYear(this.state.sale_end_date) +
            ".]]>"
        )
        .up()
        .ele(
          "terms",
          "<![CDATA[<strong>Fare Rules:</strong> Purchase by 11:59 pm (PT) on " +
            makeDateMonthInEnglish(this.state.sale_end_date) +
            " " +
            getMyDay(this.state.sale_end_date) +
            ", " +
            getMyYear(this.state.sale_end_date) +
            ", and at least " +
            this.state.advance_purchase +
            " prior to departure. Travel from " +
            item["origin_city"] +
            " (" +
            item["origin_code"] +
            ") to " +
            item["destination_city"] +
            " (" +
            item["destination_code"] +
            ") is valid " +
            days_availability +
            " from " +
            makeDateMonthInEnglish(travel_start) +
            " " +
            getMyDay(travel_start) +
            ", " +
            getMyYear(travel_start) +
            " - " +
            makeDateMonthInEnglish(travel_end) +
            " " +
            getMyDay(travel_end) +
            ", " +
            getMyYear(travel_end) +
            ". " +
            service_begin_sentence +
            "" +
            service_ends_sentence +
            "" +
            black_out_date_sentence +
            'Bag fees <a href="#terms">may apply</a> for <a href="/content/travel-info/baggage/checked-bags">checked baggage</a>. See <a href="#terms">bottom of page</a> for full terms and conditions.]]>'
        )
        .up()
        .up();
      let fares_layer = deal_set.ele("Fares");

      if (f_type === "Miles") {
        item["price_types"].map((item2) => {
          if (item["default"] === true) {
            fares_layer
              .ele("Row", { fareType: f_type, showAsDefault: "true" })
              .ele("Cell", "<Data>" + item["origin_code"] + "</Data>")
              .up()
              .ele(
                "Cell",
                "<Data>" + returnMyCityName(item["origin_code"]) + "</Data>"
              )
              .up()
              .ele("Cell", "<Data>" + item["destination_code"] + "</Data>")
              .up()
              .ele(
                "Cell",
                "<Data>" +
                  returnMyCityName(item["destination_code"]) +
                  "</Data>"
              )
              .up()
              .ele("Cell", "<Data>" + item2["price"] + "</Data>")
              .up()
              .ele("Cell", "<Data>" + item2["taxes"] + "</Data>")
              .up();
          } else {
            fares_layer
              .ele("Row", { fareType: f_type })
              .ele("Cell", "<Data>" + item["origin_code"] + "</Data>")
              .up()
              .ele(
                "Cell",
                "<Data>" + returnMyCityName(item["origin_code"]) + "</Data>"
              )
              .up()
              .ele("Cell", "<Data>" + item["destination_code"] + "</Data>")
              .up()
              .ele(
                "Cell",
                "<Data>" +
                  returnMyCityName(item["destination_code"]) +
                  "</Data>"
              )
              .up()
              .ele("Cell", "<Data>" + item2["price"] + "</Data>")
              .up()
              .ele("Cell", "<Data>" + item2["taxes"] + "</Data>")
              .up();
          }
        });
      } else {
        item["price_types"].map((item2) => {
          if (item["default"] === true && item2["fare_type"] === "Saver") {
            fares_layer
              .ele("Row", {
                fareType: item2["fare_type"],
                showAsDefault: "true",
              })
              .ele("Cell", "<Data>" + item["origin_code"] + "</Data>")
              .up()
              .ele(
                "Cell",
                "<Data>" + returnMyCityName(item["origin_code"]) + "</Data>"
              )
              .up()
              .ele("Cell", "<Data>" + item["destination_code"] + "</Data>")
              .up()
              .ele(
                "Cell",
                "<Data>" +
                  returnMyCityName(item["destination_code"]) +
                  "</Data>"
              )
              .up()
              .ele("Cell", "<Data>" + item2["price"] + "</Data>")
              .up();
          } else {
            fares_layer
              .ele("Row", { fareType: item2["fare_type"] })
              .ele("Cell", "<Data>" + item["origin_code"] + "</Data>")
              .up()
              .ele(
                "Cell",
                "<Data>" + returnMyCityName(item["origin_code"]) + "</Data>"
              )
              .up()
              .ele("Cell", "<Data>" + item["destination_code"] + "</Data>")
              .up()
              .ele(
                "Cell",
                "<Data>" +
                  returnMyCityName(item["destination_code"]) +
                  "</Data>"
              )
              .up()
              .ele("Cell", "<Data>" + item2["price"] + "</Data>")
              .up();
          }
        });
      }
    });

    what_exception_fares_to_make_xml_for.map((item) => {
      let start_date = "";
      let end_date = "";
      let travel_start = null;
      let travel_end = null;
      let days_availability = "";
      let black_out_date_sentence = "";

      if (item["group"] === "ALASKA_HAWAII") {
        start_date = this.state.proposed_start_hawaii_string;
        end_date = this.state.proposed_end_hawaii_string;
        travel_start = this.state.travel_start_alaska_to_from_hawaii;
        travel_end = this.state.travel_end_alaska_to_from_hawaii;
        days_availability = this.state.days_availability_hawaii;
        // Pulling BLACKOUT DATES and FORMING the sentence
        if (
          this.state.blackout_start_alaska_to_from_hawaii !== null &&
          this.state.blackout_end_alaska_to_from_hawaii !== null
        ) {
          black_out_date_sentence =
            "Blackout dates are from " +
            makeDateMonthInEnglish(
              this.state.blackout_start_alaska_to_from_hawaii
            ) +
            " " +
            getMyDay(this.state.blackout_start_alaska_to_from_hawaii) +
            ", " +
            getMyYear(this.state.blackout_start_alaska_to_from_hawaii) +
            " to " +
            makeDateMonthInEnglish(
              this.state.blackout_end_alaska_to_from_hawaii
            ) +
            " " +
            getMyDay(this.state.blackout_end_alaska_to_from_hawaii) +
            ", " +
            getMyYear(this.state.blackout_end_alaska_to_from_hawaii) +
            ". ";
        }
      } else if (item["group"] === "ALASKA_ALASKA") {
        start_date = this.state.proposed_start_others_string;
        end_date = this.state.proposed_end_others_string;
        travel_start = this.state.travel_start_others;
        travel_end = this.state.travel_end_others;
        days_availability = this.state.days_availability_others;
        // Pulling BLACKOUT DATES and FORMING the sentence
        if (
          this.state.blackout_start_others !== null &&
          this.state.blackout_start_others !== null
        ) {
          black_out_date_sentence =
            "Blackout dates are from " +
            makeDateMonthInEnglish(this.state.blackout_start_others) +
            " " +
            getMyDay(this.state.blackout_start_others) +
            ", " +
            getMyYear(this.state.blackout_start_others) +
            " to " +
            makeDateMonthInEnglish(this.state.blackout_end_others) +
            " " +
            getMyDay(this.state.blackout_end_others) +
            ", " +
            getMyYear(this.state.blackout_end_others) +
            ". ";
        }
      } else if (item["group"] === "FROM_ALASKA") {
        start_date = this.state.proposed_start_others_string;
        end_date = this.state.proposed_end_others_string;
        travel_start = this.state.travel_start_others;
        travel_end = this.state.travel_end_others;
        days_availability = this.state.days_availability_others;
        // Pulling BLACKOUT DATES and FORMING the sentence
        if (
          this.state.blackout_start_others !== null &&
          this.state.blackout_start_others !== null
        ) {
          black_out_date_sentence =
            "Blackout dates are from " +
            makeDateMonthInEnglish(this.state.blackout_start_others) +
            " " +
            getMyDay(this.state.blackout_start_others) +
            ", " +
            getMyYear(this.state.blackout_start_others) +
            " to " +
            makeDateMonthInEnglish(this.state.blackout_end_others) +
            " " +
            getMyDay(this.state.blackout_end_others) +
            ", " +
            getMyYear(this.state.blackout_end_others) +
            ". ";
        }
      } else if (item["group"] === "TO_ALASKA") {
        start_date = this.state.proposed_start_others_string;
        end_date = this.state.proposed_end_others_string;
        travel_start = this.state.travel_start_others;
        travel_end = this.state.travel_end_others;
        days_availability = this.state.days_availability_others;
        // Pulling BLACKOUT DATES and FORMING the sentence
        if (
          this.state.blackout_start_others !== null &&
          this.state.blackout_start_others !== null
        ) {
          black_out_date_sentence =
            "Blackout dates are from " +
            makeDateMonthInEnglish(this.state.blackout_start_others) +
            " " +
            getMyDay(this.state.blackout_start_others) +
            ", " +
            getMyYear(this.state.blackout_start_others) +
            " to " +
            makeDateMonthInEnglish(this.state.blackout_end_others) +
            " " +
            getMyDay(this.state.blackout_end_others) +
            ", " +
            getMyYear(this.state.blackout_end_others) +
            ". ";
        }
      } else if (
        item["group"] === "TO_HAWAII" ||
        item["group"] === "FROM_HAWAII"
      ) {
        start_date = this.state.proposed_start_hawaii_string;
        end_date = this.state.proposed_end_hawaii_string;
        travel_start = this.state.travel_start_hawaii;
        travel_end = this.state.travel_end_hawaii;
        days_availability = this.state.days_availability_hawaii;
        // Pulling BLACKOUT DATES and FORMING the sentence
        if (
          this.state.blackout_start_from_hawaii !== null &&
          this.state.blackout_end_from_hawaii !== null &&
          item["group"] === "FROM_HAWAII"
        ) {
          black_out_date_sentence =
            "Blackout dates are from " +
            makeDateMonthInEnglish(this.state.blackout_start_from_hawaii) +
            " " +
            getMyDay(this.state.blackout_start_from_hawaii) +
            ", " +
            getMyYear(this.state.blackout_start_from_hawaii) +
            " to " +
            makeDateMonthInEnglish(this.state.blackout_end_from_hawaii) +
            " " +
            getMyDay(this.state.blackout_end_from_hawaii) +
            ", " +
            getMyYear(this.state.blackout_end_from_hawaii) +
            ". ";
        }
        if (
          this.state.blackout_start_to_hawaii !== null &&
          this.state.blackout_start_to_hawaii !== null &&
          item["group"] === "TO_HAWAII"
        ) {
          black_out_date_sentence =
            "Blackout dates are from " +
            makeDateMonthInEnglish(this.state.blackout_start_to_hawaii) +
            " " +
            getMyDay(this.state.blackout_start_to_hawaii) +
            ", " +
            getMyYear(this.state.blackout_start_to_hawaii) +
            " to " +
            makeDateMonthInEnglish(this.state.blackout_end_to_hawaii) +
            " " +
            getMyDay(this.state.blackout_end_to_hawaii) +
            ", " +
            getMyYear(this.state.blackout_end_to_hawaii) +
            ". ";
        }
      } else if (item["group"] === "TO_FLORIDA") {
        start_date = this.state.proposed_start_others_string;
        end_date = this.state.proposed_end_others_string;
        travel_start = this.state.travel_start_florida;
        travel_end = this.state.travel_end_florida;
        days_availability = this.state.days_availability_to_florida;
        // Pulling BLACKOUT DATES and FORMING the sentence
        if (
          this.state.blackout_start_others !== null &&
          this.state.blackout_start_others !== null
        ) {
          black_out_date_sentence =
            "Blackout dates are from " +
            makeDateMonthInEnglish(this.state.blackout_start_others) +
            " " +
            getMyDay(this.state.blackout_start_others) +
            ", " +
            getMyYear(this.state.blackout_start_others) +
            " to " +
            makeDateMonthInEnglish(this.state.blackout_end_others) +
            " " +
            getMyDay(this.state.blackout_end_others) +
            ", " +
            getMyYear(this.state.blackout_end_others) +
            ". ";
        }
      } else if (item["group"] === "FROM_FLORIDA") {
        start_date = this.state.proposed_start_others_string;
        end_date = this.state.proposed_end_others_string;
        travel_start = this.state.travel_start_florida;
        travel_end = this.state.travel_end_florida;
        days_availability = this.state.days_availability_from_florida;
        // Pulling BLACKOUT DATES and FORMING the sentence
        if (
          this.state.blackout_start_others !== null &&
          this.state.blackout_start_others !== null
        ) {
          black_out_date_sentence =
            "Blackout dates are from " +
            makeDateMonthInEnglish(this.state.blackout_start_others) +
            " " +
            getMyDay(this.state.blackout_start_others) +
            ", " +
            getMyYear(this.state.blackout_start_others) +
            " to " +
            makeDateMonthInEnglish(this.state.blackout_end_others) +
            " " +
            getMyDay(this.state.blackout_end_others) +
            ", " +
            getMyYear(this.state.blackout_end_others) +
            ". ";
        }
      } else if (item["group"] === "MEXICO") {
        start_date = this.state.proposed_start_others_string;
        end_date = this.state.proposed_end_others_string;
        travel_start = this.state.travel_start_mexico;
        travel_end = this.state.travel_end_mexico;
        days_availability = this.state.days_availability_mexico;
        // Pulling BLACKOUT DATES and FORMING the sentence
        if (
          this.state.blackout_start_mexico !== null &&
          this.state.blackout_start_mexico !== null
        ) {
          black_out_date_sentence =
            "Blackout dates are from " +
            makeDateMonthInEnglish(this.state.blackout_start_mexico) +
            " " +
            getMyDay(this.state.blackout_start_mexico) +
            ", " +
            getMyYear(this.state.blackout_start_mexico) +
            " to " +
            makeDateMonthInEnglish(this.state.blackout_end_mexico) +
            " " +
            getMyDay(this.state.blackout_end_mexico) +
            ", " +
            getMyYear(this.state.blackout_end_mexico) +
            ". ";
        }
      } else if (item["group"] === "COSTA_RICA") {
        start_date = this.state.proposed_start_others_string;
        end_date = this.state.proposed_end_others_string;
        travel_start = this.state.travel_start_costa_rica;
        travel_end = this.state.travel_end_costa_rica;
        days_availability = this.state.days_availability_costa_rica;
        // Pulling BLACKOUT DATES and FORMING the sentence
        if (
          this.state.blackout_start_costa_rica !== null &&
          this.state.blackout_start_costa_rica !== null
        ) {
          black_out_date_sentence =
            "Blackout dates are from " +
            makeDateMonthInEnglish(this.state.blackout_start_costa_rica) +
            " " +
            getMyDay(this.state.blackout_start_costa_rica) +
            ", " +
            getMyYear(this.state.blackout_start_costa_rica) +
            " to " +
            makeDateMonthInEnglish(this.state.blackout_end_costa_rica) +
            " " +
            getMyDay(this.state.blackout_end_costa_rica) +
            ", " +
            getMyYear(this.state.blackout_end_costa_rica) +
            ". ";
        }
      } else if (item["group"] === "PAE") {
        start_date = this.state.proposed_start_pae_string;
        end_date = this.state.proposed_end_pae_string;
        travel_start = this.state.travel_start_others;
        travel_end = this.state.travel_end_others;
        days_availability = this.state.days_availability_others;
        // Pulling BLACKOUT DATES and FORMING the sentence
        if (
          this.state.blackout_start_others !== null &&
          this.state.blackout_start_others !== null
        ) {
          black_out_date_sentence =
            "Blackout dates are from " +
            makeDateMonthInEnglish(this.state.blackout_start_others) +
            " " +
            getMyDay(this.state.blackout_start_others) +
            ", " +
            getMyYear(this.state.blackout_start_others) +
            " to " +
            makeDateMonthInEnglish(this.state.blackout_end_others) +
            " " +
            getMyDay(this.state.blackout_end_others) +
            ", " +
            getMyYear(this.state.blackout_end_others) +
            ". ";
        }
      } else if (item["group"] === "OTHER_MARKET") {
        start_date = this.state.proposed_start_others_string;
        end_date = this.state.proposed_end_others_string;
        travel_start = this.state.travel_start_others;
        travel_end = this.state.travel_end_others;
        days_availability = this.state.days_availability_others;
        // Pulling BLACKOUT DATES and FORMING the sentence
        if (
          this.state.blackout_start_others !== null &&
          this.state.blackout_start_others !== null
        ) {
          black_out_date_sentence =
            "Blackout dates are from " +
            makeDateMonthInEnglish(this.state.blackout_start_others) +
            " " +
            getMyDay(this.state.blackout_start_others) +
            ", " +
            getMyYear(this.state.blackout_start_others) +
            " to " +
            makeDateMonthInEnglish(this.state.blackout_end_others) +
            " " +
            getMyDay(this.state.blackout_end_others) +
            ", " +
            getMyYear(this.state.blackout_end_others) +
            ". ";
        }
      } else {
      }

      /*SPECIFIC TO EXCEPTIONS ONLY*/
      if (item["days_available"] !== "") {
        days_availability = item["days_available"];
      }
      let service_begin_sentence = "";
      if (item["service_begins"] !== null) {
        service_begin_sentence =
          "Service begins " +
          makeDateMonthInEnglish(item["service_begins"]) +
          " " +
          getMyDay(item["service_begins"]) +
          ", " +
          getMyYear(item["service_begins"]) +
          ". ";
      }
      let service_ends_sentence = "";
      if (item["service_ends"] !== null) {
        service_ends_sentence =
          "Service ends " +
          makeDateMonthInEnglish(item["service_ends"]) +
          " " +
          getMyDay(item["service_ends"]) +
          ", " +
          getMyYear(item["service_ends"]) +
          ". ";
      }
      /*SPECIFIC TO EXCEPTIONS ONLY*/

      let d_type = "";
      let f_type = "";

      if (this.state.selectedOption === "Mileage") {
        d_type = "MileagePlan";
        f_type = "Miles";
      } else {
        d_type = "Saver";
      }

      //console.log(item);
      doc.com(
        getMyMonth(this.state.sale_start_date) +
          "/" +
          getMyDay(this.state.sale_start_date) +
          " " +
          item["name"] +
          " EXCEPTION"
      );
      let deal_set = doc
        .ele("DealSet", {
          from: this.state.sale_start_date_string + "T00:00:01",
          to: this.state.sale_end_date_string + "T23:59:59",
        })
        .ele("DealInfo", {
          code:
            getMyYear(this.state.sale_start_date) +
            "" +
            getMyMonth(this.state.sale_start_date) +
            "" +
            getMyDay(this.state.sale_start_date) +
            "_SALE-" +
            item["name"],
          dealType: d_type,
          url: "",
        })
        .ele("TravelDates", {
          startdate: start_date + "T00:00:01",
          enddate: end_date + "T23:59:59",
        })
        .up()
        .ele("DealTitle")
        .up()
        .ele(
          "DealDescrip",
          "<![CDATA[Purchase by " +
            makeDateMonthInEnglish(this.state.sale_end_date) +
            " " +
            getMyDay(this.state.sale_end_date) +
            ", " +
            getMyYear(this.state.sale_end_date) +
            ".]]>"
        )
        .up()
        .ele(
          "terms",
          "<![CDATA[<strong>Fare Rules:</strong> Purchase by 11:59 pm (PT) on " +
            makeDateMonthInEnglish(this.state.sale_end_date) +
            " " +
            getMyDay(this.state.sale_end_date) +
            ", " +
            getMyYear(this.state.sale_end_date) +
            ", and at least " +
            this.state.advance_purchase +
            " prior to departure. Travel from " +
            item["origin_city"] +
            " (" +
            item["origin_code"] +
            ") to " +
            item["destination_city"] +
            " (" +
            item["destination_code"] +
            ") is valid " +
            days_availability +
            " from " +
            makeDateMonthInEnglish(travel_start) +
            " " +
            getMyDay(travel_start) +
            ", " +
            getMyYear(travel_start) +
            " - " +
            makeDateMonthInEnglish(travel_end) +
            " " +
            getMyDay(travel_end) +
            ", " +
            getMyYear(travel_end) +
            ". " +
            service_begin_sentence +
            "" +
            service_ends_sentence +
            "" +
            black_out_date_sentence +
            'Bag fees <a href="#terms">may apply</a> for <a href="/content/travel-info/baggage/checked-bags">checked baggage</a>. See <a href="#terms">bottom of page</a> for full terms and conditions.]]>'
        )
        .up()
        .up();
      let fares_layer = deal_set.ele("Fares");
      if (f_type === "Miles") {
        item["price_types"].map((item2) => {
          if (item["default"] === true) {
            fares_layer
              .ele("Row", { fareType: f_type, showAsDefault: "true" })
              .ele("Cell", "<Data>" + item["origin_code"] + "</Data>")
              .up()
              .ele(
                "Cell",
                "<Data>" + returnMyCityName(item["origin_code"]) + "</Data>"
              )
              .up()
              .ele("Cell", "<Data>" + item["destination_code"] + "</Data>")
              .up()
              .ele(
                "Cell",
                "<Data>" +
                  returnMyCityName(item["destination_code"]) +
                  "</Data>"
              )
              .up()
              .ele("Cell", "<Data>" + item2["price"] + "</Data>")
              .up()
              .ele("Cell", "<Data>" + item2["taxes"] + "</Data>")
              .up();
          } else {
            fares_layer
              .ele("Row", { fareType: f_type })
              .ele("Cell", "<Data>" + item["origin_code"] + "</Data>")
              .up()
              .ele(
                "Cell",
                "<Data>" + returnMyCityName(item["origin_code"]) + "</Data>"
              )
              .up()
              .ele("Cell", "<Data>" + item["destination_code"] + "</Data>")
              .up()
              .ele(
                "Cell",
                "<Data>" +
                  returnMyCityName(item["destination_code"]) +
                  "</Data>"
              )
              .up()
              .ele("Cell", "<Data>" + item2["price"] + "</Data>")
              .up()
              .ele("Cell", "<Data>" + item2["taxes"] + "</Data>")
              .up();
          }
        });
      } else {
        item["price_types"].map((item2) => {
          if (item["default"] === true && item2["fare_type"] === "Saver") {
            fares_layer
              .ele("Row", {
                fareType: item2["fare_type"],
                showAsDefault: "true",
              })
              .ele("Cell", "<Data>" + item["origin_code"] + "</Data>")
              .up()
              .ele(
                "Cell",
                "<Data>" + returnMyCityName(item["origin_code"]) + "</Data>"
              )
              .up()
              .ele("Cell", "<Data>" + item["destination_code"] + "</Data>")
              .up()
              .ele(
                "Cell",
                "<Data>" +
                  returnMyCityName(item["destination_code"]) +
                  "</Data>"
              )
              .up()
              .ele("Cell", "<Data>" + item2["price"] + "</Data>")
              .up();
          } else {
            fares_layer
              .ele("Row", { fareType: item2["fare_type"] })
              .ele("Cell", "<Data>" + item["origin_code"] + "</Data>")
              .up()
              .ele(
                "Cell",
                "<Data>" + returnMyCityName(item["origin_code"]) + "</Data>"
              )
              .up()
              .ele("Cell", "<Data>" + item["destination_code"] + "</Data>")
              .up()
              .ele(
                "Cell",
                "<Data>" +
                  returnMyCityName(item["destination_code"]) +
                  "</Data>"
              )
              .up()
              .ele("Cell", "<Data>" + item2["price"] + "</Data>")
              .up();
          }
        });
      }
    });

    let element = doc.toString({ pretty: true });
    element = element.replace(/&lt;/g, "<");
    element = element.replace(/&gt;/g, ">");

    this.setState({
      xmloutput: element,
    });
  }
}
