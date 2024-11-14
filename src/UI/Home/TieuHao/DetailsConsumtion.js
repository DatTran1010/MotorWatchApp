import { View, Text, StyleSheet, TouchableOpacity, Modal } from "react-native";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";

import colors from "../../../Common/colors";
import IconButton from "../../../components/IconButton";
import CalendarCustom from "../../../components/Calendar";
import GridViewComponent from "../../../components/GridViewConsumtion";
import callApi from "../../../ConText/api";
import { useEffect } from "react";
import ContainerApp from "../ContainerApp";
import theme from "../../../Common/theme";
import FormButton from "../../../components/button";
import { getDetailData } from "../../../apiServices/consumtionServices";

const DetailsConsumtion = ({ navigation }) => {
  const selectedID_DC = useSelector((state) => state.app.selectedIDTree);

  const [dateTNgay, setDateTNgay] = useState(
    moment(new Date()).format("YYYY-MM-DD")
  );

  const [refeshing, setRefeshing] = useState(false);
  const [showInfo, setShowInfo] = useState(false);
  const dispatch = useDispatch();

  const [data, setData] = useState([{}]);

  const [dataHeader, setDataHeader] = useState([
    { id: 1, COLNAME: "Mã động cơ" },
    { id: 1, COLNAME: "Mã máy" },
    { id: 1, COLNAME: "Công suất,kW" },
    { id: 1, COLNAME: "Tổng tiêu hao,kWh" },
  ]);

  useEffect(() => {
    const getData = async () => {
      const result = await getDetailData(dispatch, dateTNgay, selectedID_DC);
      setData(result);
    };

    getData();
  }, [dateTNgay, selectedID_DC, refeshing]);

  //#region các event xử lý sự kiện load lại data

  const handleNgay = (date) => {
    setDateTNgay(moment(date).format("YYYY-MM-DD"));
  };

  const handleRefeshing = () => {
    setRefeshing(!refeshing);
  };
  //#endregion

  //#region  render chú thích
  const labelCongXuat =
    "Thể hiện theo thứ tự (189/386/139) \n- Công suất trung bình trong ngày \n- Công suất tối đa trong ngày \n- Công suất tối thiểu trong ngày ";
  const labelTieuHao =
    "Thể hiện theo thứ tự (405/62.3/6.5) \n- Tổng điện năng tiêu hao trong ngày \n- Tổng điện năng tiêu hao trên 1h máy chạy có tải \n- Tổng số giờ máy chạy có tải ";
  const RenderInfomation = () => {
    return (
      <Modal
        transparent={true}
        style={{ flex: 1 }}
        animationType="fade"
        visible={showInfo}
      >
        <TouchableOpacity style={styles.modalContainer} activeOpacity={1}>
          <View style={[styles.modalContent]}>
            <View style={{ backgroundColor: "rgba(0, 0, 0, 0.1)" }}>
              <Text
                style={{
                  fontWeight: "bold",
                  fontSize: 20,
                  padding: 15,
                  color: "#000",
                  fontFamily: theme.fontFamily,
                }}
              >
                Chi tiết
              </Text>
              <View
                style={{
                  width: "100%",
                  height: 1,
                  backgroundColor: "lightgray",
                }}
              ></View>
            </View>
            <View
              style={{
                backgroundColor: colors.backgroundColor,
                paddingVertical: 20,
                paddingHorizontal: 10,
              }}
            >
              <View>
                <Text
                  style={[theme.font, { fontWeight: "bold", fontSize: 16 }]}
                >
                  Công suất,kW
                </Text>
                <View
                  style={{
                    width: "100%",
                    height: 1,
                    backgroundColor: "lightgray",
                    margin: 10,
                  }}
                ></View>
                <Text style={theme.font}>{labelCongXuat}</Text>
              </View>
              <View style={{ marginTop: 15 }}>
                <Text
                  style={[theme.font, { fontWeight: "bold", fontSize: 16 }]}
                >
                  Tổng tiêu hao, kWh
                </Text>
                <View
                  style={{
                    width: "100%",
                    height: 1,
                    backgroundColor: "lightgray",
                    margin: 10,
                  }}
                ></View>
                <Text style={theme.font}>{labelTieuHao}</Text>
              </View>
            </View>
            <View style={{ padding: 10 }}>
              <FormButton
                buttonTitle={"ĐÃ HIỂU"}
                style={styles.buttonConfirm}
                activeOpacity={0.6}
                onPress={() => {
                  setShowInfo(false);
                }}
              />
            </View>
          </View>
        </TouchableOpacity>
      </Modal>
    );
  };
  //#endregion
  return (
    <ContainerApp
      navigation={navigation}
      title="CHI TIẾT TIÊU HAO"
      // children={renderItem}
    >
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
            <View style={{ flex: 1, alignItems: "flex-end" }}>
              <IconButton
                nameicon={"information-circle-outline"}
                size={30}
                border={false}
                onPress={() => {
                  setShowInfo(!showInfo);
                }}
              />
            </View>
          </View>
        </View>

        <View style={styles.body}>
          <GridViewComponent
            data={data}
            dataHeader={dataHeader}
            onRefreshShing={handleRefeshing}
            onSortTable={() => {}}
            // columnRemove={{ id: true }}
          />
        </View>

        <View style={styles.footer}></View>
      </View>
      <RenderInfomation />
    </ContainerApp>
  );
};

export default DetailsConsumtion;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
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
    flex: 15,
  },
  footer: {},
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.8)",
  },
  modalContent: {
    backgroundColor: colors.backgroundColor,
    width: "85%",
    borderRadius: 10,
  },
});
