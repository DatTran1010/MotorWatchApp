import { View, Text, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import moment from "moment";
import { useDispatch } from "react-redux";

import HeaderApp from "../Home/HeaderApp";
import colors from "../../Common/colors";
import DropDown from "../../components/DropDown";
import FormButton from "../../components/button";
import CalendarComponent from "../../components/CalendarComponent";
import * as reportServices from "../../apiServices/resquestReportServices";
const RequestReport = ({ navigation }) => {
  const dispatch = useDispatch();

  const [dateFromTo, setDataFromTo] = useState({
    startDate: moment(new Date()).add(-6, "days").format("YYYY-MM-DD"),
    endDate: moment(new Date()).format("YYYY-MM-DD"),
  });

  const [dataCboReport, setDataCboReport] = useState([]);
  const [selectedValueReport, setSelectedValueReport] = useState("");

  useEffect(() => {
    const getDataCboReport = async () => {
      const result = await reportServices.getDataCboReport(dispatch);
      setDataCboReport(result);
    };
    getDataCboReport();
  }, []);

  //handle

  const handleValueReport = (item) => {
    setSelectedValueReport(item.value);
  };
  return (
    <View style={styles.container}>
      <HeaderApp
        navigation={navigation}
        headerLeftVisible={true}
        goBack={false}
      />
      <View style={styles.contentContainer}>
        <View style={styles.fillterControl}>
          <View>
            <DropDown
              placeholder={"Báo cáo"}
              labelField="name"
              valueField={"value"}
              data={dataCboReport}
              value={selectedValueReport}
              handleValue={handleValueReport}
            />
          </View>
          <View
            style={{
              flexDirection: "row",
              flex: 1,
            }}
          >
            <View style={styles.viewFilter}>
              <DropDown placeholder={"Địa điểm"} labelField="Địa điểm" />
            </View>
            <View style={[styles.viewFilter, { marginLeft: 10 }]}>
              <CalendarComponent
                isRight
                startDate={dateFromTo.startDate}
                endDate={dateFromTo.endDate}
              />
            </View>
          </View>
        </View>
        <View style={styles.viewButton}>
          <FormButton buttonTitle={"GỬI"} />
          <FormButton buttonTitle={"CANCLE"} colorButton={colors.colorHeader} />
        </View>
      </View>
    </View>
  );
};

export default RequestReport;
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    flex: 1,
    backgroundColor: colors.backgroundColor,
    padding: 10,
  },
  fillterControl: {
    flex: 0.8,
  },
  viewButton: {
    flex: 0.2,
  },
  viewFilter: {
    flex: 1,
  },
});
