import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  LayoutAnimation,
} from "react-native";
import React, { useState } from "react";

import IconButton from "../../../components/IconButton";
import CalendarCustom from "../../../components/Calendar";
import GridViewComponent from "../../../components/GridViewConsumtion";
import colors from "../../../Common/colors";
import DropDown from "../../../components/DropDown";
import { useCallback } from "react";
import HeaderApp from "../HeaderApp";

const DetailsEngineState = ({ navigation, route }) => {
  const { name, id } = route.params;

  const [dateToFrom, setDateToFrom] = useState({
    startDate: "2023-08-15",
    endDate: "2023-08-15",
  });

  const [isAscending, setIsAscending] = useState(false);

  const [data, setData] = useState([
    {
      id: 1,
      MA_MAY: "Máy 1",
      OEE_NGAY: "",
      OEE_MT: "90%",
      DAT: 83,
      OEE_TUAN: "80%",
      color: "red",
    },
    {
      id: 2,
      MA_MAY: "Máy 2",
      OEE_NGAY: "",
      OEE_MT: "90%",
      DAT: 80,
      OEE_TUAN: "80%",
      color: "blue",
    },
    {
      id: 3,
      MA_MAY: "Máy 3",
      OEE_NGAY: "",
      OEE_MT: "90%",
      DAT: 81,
      OEE_TUAN: "80%",
      color: "green",
    },
    {
      id: 4,
      MA_MAY: "Máy 4",
      OEE_NGAY: "",
      OEE_MT: "90%",
      DAT: 82,
      OEE_TUAN: "80%",
      color: "pink",
    },
  ]);

  const [dataHeader, setDataHeader] = useState([
    { id: 1, COLNAME: "Mã máy" },
    { id: 2, COLNAME: "OEE% (Ngày)" },
    { id: 3, COLNAME: "OEE mục tiêu" },
    { id: 4, COLNAME: "% đạt" },
    { id: 5, COLNAME: "OEE% (7 ngày)" },
  ]);

  const [dataTinhTrang, setDataTinhTrang] = useState([
    { id: -1, TEN_TT: "<ALL>" },
    { id: 1, TEN_TT: "Đạt" },
    { id: 2, TEN_TT: "Không đạt" },
    { id: 3, TEN_TT: "Không hoạt động" },
  ]);

  const handleSort = () => {
    const columnToSortBy = "DAT";

    const newData = [...data].sort((a, b) => {
      if (isAscending) {
        return a.DAT - b.DAT; // Sort ascending
      } else {
        return b.DAT - a.DAT; // Sort descending
      }
    });
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setData(newData);
    setIsAscending(!isAscending);
  };
  return (
    <View style={styles.container}>
      <HeaderApp
        navigation={navigation}
        title="Tiêu hao năng lượng"
        headerLeftVisible={true}
        goBack={true}
      />
      <View style={styles.header}>
        <View style={styles.headerContainer}>
          <TouchableOpacity style={{ flex: 1 }}>
            <CalendarCustom
              date={dateToFrom.startDate}
              //   setDateDNgay={setDateDNgay}
              placeholder={"Ngày"}
            />
          </TouchableOpacity>
          <View style={{ flex: 1, alignItems: "flex-end", marginLeft: 10 }}>
            <View style={{ flex: 1, width: "100%" }}>
              <DropDown
                data={dataTinhTrang}
                labelField="TEN_TT"
                valueField={"id"}
                placeholder="Tình trạng"
              />
            </View>
          </View>
        </View>
      </View>

      <View style={styles.body}>
        <GridViewComponent
          data={data}
          dataHeader={dataHeader}
          columnRemove={{ id: true, color: true }}
          onSortTable={handleSort}
        />
      </View>

      <View style={styles.footer}></View>
    </View>
  );
};

export default DetailsEngineState;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: colors.white,
  },
  header: {
    flex: 1,
  },

  headerContainer: {
    flex: 1,
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
  },

  body: {
    marginVertical: 10,

    backgroundColor: colors.white,
    flex: 15,
  },
  footer: {},
});
