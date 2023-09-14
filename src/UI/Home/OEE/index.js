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
import theme from "../../../Common/theme";
import { getDataBieuDo } from "../../../apiServices/oeeServices";

const OEEMain = ({ navigation, selectedID_DC, refeshing }) => {
  const dispatch = useDispatch();

  //#region  State

  const [data, setData] = useState([{}]);
  const [dateToFrom, setDateToFrom] = useState({
    startDate: moment(new Date()).add(-6, "days").format("YYYY-MM-DD"),
    endDate: moment(new Date()).format("YYYY-MM-DD"),
  });

  //#endregion

  //#region  xử lý handle Calendar
  const handleDoneDateCalendar = (date) => {
    setDateToFrom(date);
  };

  //#endregion

  //#region  get data
  useEffect(() => {
    const getData = async () => {
      const result = await getDataBieuDo(
        dispatch,
        dateToFrom.startDate,
        dateToFrom.endDate,
        selectedID_DC
      );
      setData(result);
    };

    getData();
  }, [dateToFrom.startDate, dateToFrom.endDate, selectedID_DC, refeshing]);

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
          <CalendarComponent
            onClickDone={handleDoneDateCalendar}
            startDate={dateToFrom.startDate}
            endDate={dateToFrom.endDate}
          />
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
    zIndex: -1,
  },

  legendContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  textLegend: {
    color: colors.black,
    fontSize: theme.fontSize,
    fontWeight: "400",
    marginHorizontal: 5,
  },
  iconLegend: {
    width: 20,
    height: 20,
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
  },
});
