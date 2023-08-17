import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  LayoutAnimation,
  ScrollView,
} from "react-native";
import React, { useState } from "react";

import CalendarCustom from "../../../components/Calendar";
import GridViewComponent from "../../../components/GridViewConsumtion";
import colors from "../../../Common/colors";
import DropDown from "../../../components/DropDown";
import HeaderApp from "../HeaderApp";

const DetailsOEE = ({ navigation }) => {
  const [dateToFrom, setDateToFrom] = useState({
    startDate: "2023-08-15",
    endDate: "2023-08-15",
  });

  const [data, setData] = useState([
    {
      id: 1,
      MA_DC: "Động cơ 1",
      MA_MAY: "ADC-001",
      TINH_TRANG: "Bất thường",
      LOI: "Sóng hơi cao",
      color: "red",
    },
    {
      id: 2,
      MA_DC: "Động cơ 2",
      MA_MAY: "ADC-002",
      TINH_TRANG: "Bất thường",
      LOI: "Sóng hơi cao",
      color: "red",
    },
    {
      id: 3,
      MA_DC: "Động cơ 3",
      MA_MAY: "ADC-003",
      TINH_TRANG: "Bất thường",
      LOI: "Sóng hơi cao",
      color: "green",
    },
    {
      id: 4,
      MA_DC: "Động cơ 4",
      MA_MAY: "ADC-004",
      TINH_TRANG: "Bất thường",
      LOI: "Lệch pha",
      color: "pink",
    },
  ]);

  const [dataHeader, setDataHeader] = useState([
    { id: 1, COLNAME: "Mã ĐC" },
    { id: 2, COLNAME: "Mã máy" },
    { id: 3, COLNAME: "Tình trạng" },
    { id: 4, COLNAME: "Lỗi" },
  ]);

  const [dataTinhTrang, setDataTinhTrang] = useState([
    { id: -1, TEN_TT: "<ALL>" },
    { id: 1, TEN_TT: "Đạt" },
    { id: 2, TEN_TT: "Không đạt" },
    { id: 3, TEN_TT: "Không hoạt động" },
  ]);

  const HeaderComponent = () => {
    return (
      <View style={styles.header}>
        <View style={styles.headerContainer}>
          <TouchableOpacity style={{ flex: 1 }}>
            <CalendarCustom
              date={dateToFrom.startDate}
              //   setDateDNgay={setDateDNgay}
              placeholder={"Ngày"}
              mode="datetime"
            />
          </TouchableOpacity>
        </View>
        <View style={styles.filterControl}>
          <View style={styles.fillTinhTrang}>
            <DropDown
              data={dataTinhTrang}
              labelField="TEN_TT"
              valueField={"id"}
              placeholder="Tình trạng"
            />
          </View>
          <View style={[styles.fillTinhTrang, { marginLeft: 10 }]}>
            <DropDown
              data={dataTinhTrang}
              labelField="TEN_TT"
              valueField={"id"}
              placeholder="Lỗi"
              handleValue={() => {}}
              multiselected={true}
            />
          </View>
        </View>
      </View>
    );
  };
  return (
    <View style={styles.container}>
      <HeaderApp
        navigation={navigation}
        title="Chỉ số OEE"
        headerLeftVisible={true}
        goBack={true}
      />
      <View style={styles.body}>
        <GridViewComponent
          data={data}
          dataHeader={dataHeader}
          columnRemove={{ id: true, color: true }}
          HeaderComponent={HeaderComponent}
        />
      </View>

      <View style={styles.footer}></View>
    </View>
  );
};

export default DetailsOEE;

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
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
    marginTop: 5,
  },

  body: {
    marginVertical: 10,
    backgroundColor: colors.white,
    flex: 1,
  },
  footer: {},
  filterControl: {
    marginVertical: 15,
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
  },
  fillTinhTrang: {
    flex: 1,
  },
});
