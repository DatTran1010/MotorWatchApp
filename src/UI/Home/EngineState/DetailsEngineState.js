import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  LayoutAnimation,
  ScrollView,
} from "react-native";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";

import CalendarCustom from "../../../components/Calendar";
import GridViewComponent from "../../../components/GridViewConsumtion";
import colors from "../../../Common/colors";
import DropDown from "../../../components/DropDown";

import callApi from "../../../ConText/api";
import ContainerApp from "../ContainerApp";
import * as engineService from "../../../apiServices/engineStateServices";

const DetailsEngineState = ({ navigation, route }) => {
  const dispatch = useDispatch();
  const selectedID_DC = useSelector((state) => state.selectedIDTree);

  const [dateTNgay, setDateTNgay] = useState(
    moment(new Date()).format("YYYY-MM-DD")
  );

  const [data, setData] = useState([{}]);
  const [dataHeader, setDataHeader] = useState([
    { id: 1, COLNAME: "Mã ĐC" },
    { id: 2, COLNAME: "Mã máy" },
    { id: 3, COLNAME: "Tình trạng" },
    { id: 4, COLNAME: "Lỗi" },
  ]);
  const [dataTinhTrangOEE, setDataTinhTrangOEE] = useState([{}]);
  const [dataTinhTrangLoi, setDataTinhTrangLoi] = useState([{}]);

  const [selectedError, setSelectedError] = useState("-1");
  const [selectedTinhTrang, setSelectedTinhTrang] = useState(
    route.params.idTT.toString()
  );
  const [refesh, setRefesh] = useState(false);

  //#region  get Data Combo TinhTrang\

  useEffect(() => {
    const getDataDropdownTinhTrang = async () => {
      const result = await engineService.getCboTinhTrang(dispatch);
      setDataTinhTrangOEE(result);
    };

    const getDataDropdownTinhTrangLoi = async () => {
      const result = await engineService.getCboTinhTrangLoi(dispatch);
      setDataTinhTrangLoi(result);
    };

    getDataDropdownTinhTrang();
    getDataDropdownTinhTrangLoi();
  }, []);
  //#endregion

  //#region  get Data lưới
  //state

  const getDataDetails = async () => {
    const endpoint = "/api/motorwatch/databieudo2";
    const method = "GET";
    const params = {
      iTT: selectedTinhTrang,
      sLOI: selectedError,
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

    console.log(response.data);
    console.log("=======================");
    console.log(selectedTinhTrang);
    setData(response.data);
  };

  useEffect(() => {
    getDataDetails();
  }, [selectedTinhTrang, selectedError, selectedID_DC, refesh]);

  // xử lý handle load lại dữ liệu
  const handleNgay = (date) => {
    setDateTNgay(moment(date).format("YYYY-MM-DD"));
  };

  const handleTinhTrang = (item) => {
    setSelectedTinhTrang(item.value);
  };

  const handleSubmitSelectedMulti = (value) => {
    setSelectedError(value.join(","));
  };

  const handleRefeshing = () => {
    setRefesh(!refesh);
  };
  //#endregion
  return (
    <ContainerApp navigation={navigation} title="CHI TIẾT TÌNH TRẠNG ĐC">
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={styles.headerContainer}>
            <TouchableOpacity style={{ flex: 1 }}>
              <CalendarCustom
                date={dateTNgay}
                setDateDNgay={() => {}}
                placeholder={"Ngày"}
                mode="datetime"
              />
            </TouchableOpacity>
          </View>
          <View style={styles.filterControl}>
            <View style={styles.fillTinhTrang}>
              <DropDown
                value={selectedTinhTrang}
                data={dataTinhTrangOEE}
                labelField="name"
                valueField={"value"}
                placeholder="Tình trạng"
                handleValue={handleTinhTrang}
              />
            </View>
            <View style={[styles.fillTinhTrang, { marginLeft: 10 }]}>
              <DropDown
                data={dataTinhTrangLoi}
                labelField="lable"
                valueField={"value"}
                placeholder="Lỗi"
                multiselected={true}
                value={selectedError}
                onSubmitSelected={handleSubmitSelectedMulti}
              />
            </View>
          </View>
        </View>
        <View style={styles.body}>
          <GridViewComponent
            data={data}
            dataHeader={dataHeader}
            columnRemove={{ id: true, color: true }}
            onRefreshShing={handleRefeshing}
          />
        </View>

        <View style={styles.footer}></View>
      </View>
    </ContainerApp>
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
    flex: 0.2,
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
