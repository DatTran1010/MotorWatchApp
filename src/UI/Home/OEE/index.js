import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  LayoutAnimation,
} from "react-native";
import React, { useEffect, useState, useCallback } from "react";
import { useDispatch } from "react-redux";
import moment from "moment";

import colors from "../../../Common/colors";
import { windowHeight, windowWidth } from "../../../Common/dimentions";
import IconButton from "../../../components/IconButton";
import OEEChart from "./OEEChart";
import CalendarComponent from "../../../components/CalendarComponent";
import callApi from "../../../ConText/api";

const OEEMain = ({ navigation, selectedID_DC }) => {
  const dispatch = useDispatch();

  //#region  State

  const [data, setData] = useState([{}]);
  const [showCalendar, setShowCalendar] = useState(false);
  const [dateToFrom, setDateToFrom] = useState({
    startDate: moment(new Date()).format("YYYY-MM-DD"),
    endDate: moment(new Date()).add(6, "days").format("YYYY-MM-DD"),
  });

  //#endregion

  //#region  xử lý handle Calendar
  const handleShowCaledar = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);

    setShowCalendar(!showCalendar);
  };

  const handleDoneDateCalendar = (date) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setDateToFrom(date);
    setShowCalendar(false);
  };

  const handlCancelDateCalendar = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setShowCalendar(false);
  };
  //#endregion

  //#region  get data

  const getData = async () => {
    const endpoint = "/api/motorwatch/bieudo3";
    const method = "GET";
    const params = {
      dTngay: dateToFrom.startDate,
      dDngay: dateToFrom.endDate,
      sdk: selectedID_DC,
    };

    const response = await callApi(
      dispatch,
      endpoint,
      method,
      null,
      "",
      params
    );
    setData(response.data);
  };

  useEffect(() => {
    getData();
  }, [dateToFrom, selectedID_DC]);

  const handleDetails = () => {
    navigation.navigate("DetailsOEE", {
      name: "DetailsOEE",
      listID_DC: selectedID_DC,
    });
  };
  //#endregion
  return (
    <View style={{ flex: 1, backgroundColor: colors.white }}>
      <View
        style={{
          flex: 1,
          borderWidth: 1,
          borderRadius: 5,
          borderColor: colors.border,
          shadowColor: "gray",
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.25,
          shadowRadius: 3.85,
          elevation: 5,
          marginBottom: 10,
          backgroundColor: colors.white,
        }}
      >
        <View style={styles.titleChart}>
          <Text style={styles.textTitle}>Chỉ số OEE</Text>
          <IconButton
            size={30}
            nameicon="document-text-outline"
            border={false}
            onPress={handleDetails}
          />
        </View>
        <View style={styles.fillControl}>
          <TouchableOpacity onPress={handleShowCaledar}>
            <Text>
              Tuần 30 (Ngày {dateToFrom.startDate} - {dateToFrom.endDate})
            </Text>
          </TouchableOpacity>
          {showCalendar && (
            <CalendarComponent
              onClickDone={handleDoneDateCalendar}
              onClickCancel={handlCancelDateCalendar}
              startDate={dateToFrom.startDate}
              endDate={dateToFrom.endDate}
            />
          )}
        </View>
        {data && data.some((item) => Object.keys(item).length > 0) ? (
          <OEEChart data={data} />
        ) : (
          <></>
        )}

        {data && data.some((item) => Object.keys(item).length > 0) && (
          <View style={styles.legendContainer}>
            <View style={styles.legendContent}>
              <View
                style={[
                  styles.iconLegend,
                  { backgroundColor: data[0].colorDAT },
                ]}
              ></View>
              <Text style={styles.textLegend}>OEE đạt</Text>
            </View>

            <View style={styles.legendContent}>
              <View
                style={[
                  styles.iconLegend,
                  { backgroundColor: data[0].colorKHONG_DAT },
                ]}
              ></View>
              <Text style={styles.textLegend}>OEE chưa đạt</Text>
            </View>

            <View style={styles.legendContent}>
              <View
                style={[
                  styles.iconLegend,
                  { backgroundColor: data[0].colorKHONG_HD },
                ]}
              ></View>
              <Text style={styles.textLegend}>Không hoạt động</Text>
            </View>
          </View>
        )}
      </View>
    </View>
  );
};

export default OEEMain;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.backgroundColor,
    padding: 10,
  },
  legendContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 10,
  },

  legendContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  textLegend: {
    color: colors.black,
    fontSize: 12,
    fontWeight: "400",
    marginHorizontal: 5,
  },
  iconLegend: {
    width: 20,
    height: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 1,
    elevation: 5,
  },

  titleChart: {
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    padding: 10,
  },
  fillControl: {
    paddingHorizontal: 10,
  },
  textTitle: {
    fontSize: 16,
    color: colors.black,
    fontWeight: "bold",
  },
});
