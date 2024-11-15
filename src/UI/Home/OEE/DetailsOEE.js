import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  LayoutAnimation,
} from "react-native";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";

import CalendarCustom from "../../../components/Calendar";
import GridViewComponent from "../../../components/GridViewConsumtion";
import colors from "../../../Common/colors";
import DropDown from "../../../components/DropDown";
import callApi from "../../../ConText/api";
import { useEffect } from "react";
import ContainerApp from "../ContainerApp";
import * as oeeServices from "../../../apiServices/oeeServices";

const DetailsOEE = ({ navigation }) => {
  const dispatch = useDispatch();
  const selectedID_DC = useSelector((state) => state.app.selectedIDTree);

  const [dateTNgay, setDateTNgay] = useState(
    moment(new Date()).format("YYYY-MM-DD")
  );

  const [isAscending, setIsAscending] = useState(false);
  const [refeshing, setRefeshing] = useState(false);
  const [data, setData] = useState([{}]);

  const dataHeader = [
    { id: 1, COLNAME: "Mã máy" },
    { id: 2, COLNAME: "OEE% (Ngày)" },
    { id: 3, COLNAME: "OEE mục tiêu" },
    { id: 4, COLNAME: "% đạt" },
    { id: 5, COLNAME: "OEE% (7 ngày)" },
  ];

  const [dataTinhTrang, setDataTinhTrang] = useState([{}]);

  const handleSort = (item) => {
    if (item != "% đạt") return;

    const newData = [...data].sort((a, b) => {
      if (isAscending) {
        return a.dat - b.dat; // Sort ascending
      } else {
        return b.dat - a.dat; // Sort descending
      }
    });
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setData(newData);
    setIsAscending(!isAscending);
  };

  //#region  get Data Combo TinhTrang\

  useEffect(() => {
    const getDataDropdownTinhTrang = async () => {
      const result = await oeeServices.getCboTinhTrangDC(dispatch);
      setDataTinhTrang(result);
    };

    getDataDropdownTinhTrang();
  }, []);
  //#endregion

  //#region  get Data lưới

  //state
  const [selectedTinhTrang, setSelectedTinhTrang] = useState("-1");

  useEffect(() => {
    const getDataDetails = async () => {
      const result = await oeeServices.getDataDetails(
        dispatch,
        dateTNgay,
        selectedTinhTrang,
        selectedID_DC
      );
      console.log("DATA BIỂU ĐỒ 3", result);
      setData(result);
    };

    getDataDetails();
  }, [dateTNgay, selectedTinhTrang, selectedID_DC, refeshing]);

  // xử lý handle load lại dữ liệu
  const handleNgay = (date) => {
    setDateTNgay(moment(date).format("YYYY-MM-DD"));
  };

  const handleTinhTrang = (item) => {
    setSelectedTinhTrang(item.value);
  };

  const handleRefeshing = () => {
    setRefeshing(!refeshing);
  };
  //#endregion

  return (
    <ContainerApp navigation={navigation} title="CHI TIẾT OEE">
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={styles.headerContainer}>
            <TouchableOpacity style={{ flex: 1 }}>
              <CalendarCustom
                date={dateTNgay}
                //   setDateDNgay={setDateDNgay}
                placeholder={"Ngày"}
                setDateDNgay={handleNgay}
              />
            </TouchableOpacity>
            <View style={{ flex: 1, alignItems: "flex-end", marginLeft: 10 }}>
              <View style={{ flex: 1, width: "100%" }}>
                <DropDown
                  data={dataTinhTrang}
                  labelField="name"
                  valueField={"value"}
                  placeholder="Tình trạng"
                  handleValue={handleTinhTrang}
                  value={selectedTinhTrang}
                />
              </View>
            </View>
          </View>
        </View>

        <View style={styles.body}>
          <GridViewComponent
            data={data}
            dataHeader={dataHeader}
            columnRemove={{ id: true, tt: true }}
            onSortTable={handleSort}
            onRefreshShing={handleRefeshing}
          />
        </View>

        <View style={styles.footer}></View>
      </View>
    </ContainerApp>
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
