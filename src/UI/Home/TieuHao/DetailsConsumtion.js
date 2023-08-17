import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import colors from "../../../Common/colors";
import CalendarComponent from "../../../components/CalendarComponent";
import IconButton from "../../../components/IconButton";
import { windowHeight, windowWidth } from "../../../Common/dimentions";
import CalendarCustom from "../../../components/Calendar";
import GridViewComponent from "../../../components/GridViewConsumtion";
import HeaderApp from "../HeaderApp";

const DetailsConsumtion = ({ navigation }) => {
  const [dateToFrom, setDateToFrom] = useState({
    startDate: "2023-08-15",
    endDate: "2023-08-15",
  });

  const [data, setData] = useState([
    {
      id: 1,
      MA_DC: "DC-00001",
      MA_MAY: "DAC-002",
      CONG_XUAT: "85/105/57",
      TONG_TIEU_HAO: "405/62.3/6.5",
    },
    {
      id: 2,
      MA_DC: "DC-00002",
      MA_MAY: "DAC-003",
      CONG_XUAT: "85/105/57",
      TONG_TIEU_HAO: "405/62.3/6.5",
    },
    {
      id: 3,
      MA_DC: "DC-00003",
      MA_MAY: "DAC-004",
      CONG_XUAT: "85/105/57",
      TONG_TIEU_HAO: "405/62.3/6.5",
    },
    {
      id: 4,
      MA_DC: "DC-00005",
      MA_MAY: "DAC-005",
      CONG_XUAT: "85/105/57",
      TONG_TIEU_HAO: "405/62.3/6.5",
    },
  ]);

  const [dataHeader, setDataHeader] = useState([
    { id: 1, COLNAME: "Mã động cơ" },
    { id: 1, COLNAME: "Mã máy" },
    { id: 1, COLNAME: "Công suất,kW" },
    { id: 1, COLNAME: "Tổng tiêu hao,kWh" },
  ]);
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
          <View style={{ flex: 1, alignItems: "flex-end" }}>
            <IconButton
              nameicon={"information-circle-outline"}
              size={30}
              border={false}
            />
          </View>
        </View>
      </View>

      <View style={styles.body}>
        <GridViewComponent
          data={data}
          dataHeader={dataHeader}
          columnRemove={{ id: true }}
        />
      </View>

      <View style={styles.footer}></View>
    </View>
  );
};

export default DetailsConsumtion;

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
