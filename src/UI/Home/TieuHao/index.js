import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  LayoutAnimation,
} from "react-native";
import React, { useEffect, useRef, useState, useCallback, memo } from "react";

import moment from "moment";
import { useDispatch, useSelector } from "react-redux";

import colors from "../../../Common/colors";
import IconButton from "../../../components/IconButton";
import ConsumtionChart from "./ConsumtionChart";
import CalendarComponent from "../../../components/CalendarComponent";
import callApi from "../../../ConText/api";
import theme from "../../../Common/theme";
const Consumption = ({ navigation, selectedID_DC }) => {
  //#region  State

  const [data, setData] = useState([{}]);

  const dispatch = useDispatch();

  const [showCalendar, setShowCalendar] = useState(false);
  const [dateToFrom, setDateToFrom] = useState({
    startDate: moment(new Date()).add(-6, "days").format("YYYY-MM-DD"),
    endDate: moment(new Date()).format("YYYY-MM-DD"),
  });

  //#endregion
  //#region  callAPI

  const getData = async () => {
    const endpoint = "/api/motorwatch/bieudo1";
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
  //#endregion

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

  useEffect(() => {
    getData();
  }, [dateToFrom, selectedID_DC]);

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
          <Text style={styles.textTitle}>Tiêu hao năng lượng</Text>
          <IconButton
            size={30}
            nameicon="document-text-outline"
            border={false}
            onPress={() => {
              navigation.navigate("DetailsConsumtion");
            }}
          />
        </View>
        <View style={styles.fillControl}>
          <CalendarComponent
            startDate={dateToFrom.startDate}
            endDate={dateToFrom.endDate}
            onClickDone={handleDoneDateCalendar}
            onClickCancel={handlCancelDateCalendar}
          />
        </View>
        {data && data.some((item) => Object.keys(item).length > 0) && (
          <ConsumtionChart data={data} />
        )}

        {data && data.some((item) => Object.keys(item).length > 0) && (
          <View style={styles.legendContainer}>
            <View style={styles.legendContent}>
              <View
                style={[
                  styles.iconLegend,
                  {
                    backgroundColor: data[0].colorTONG_TH,
                  },
                ]}
              ></View>
              <Text style={styles.textLegend}>Tổng tiêu hao điện năng</Text>
            </View>

            <View style={styles.legendContent}>
              <View
                style={[
                  styles.iconLegend,
                  {
                    backgroundColor: data[0].colorTONG_CX,
                  },
                ]}
              ></View>
              <Text style={styles.textLegend}>Tổng công xuất</Text>
            </View>
          </View>
        )}
      </View>
    </View>
  );
};

export default memo(Consumption);

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
    zIndex: -1,
  },

  legendContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  iconLegend: {
    width: 20,
    height: 20,
  },
  textLegend: {
    color: colors.black,
    fontSize: 12,
    fontWeight: "400",
    marginHorizontal: 5,
    fontFamily: theme.fontFamily,
  },

  titleChart: {
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    padding: 10,
  },
  fillControl: {
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  textTitle: {
    fontSize: 16,
    color: colors.black,
    fontWeight: "bold",
    fontFamily: theme.fontFamily,
  },
});
