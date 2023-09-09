import { FlatList, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import firestore from "@react-native-firebase/firestore";
import { useDispatch, useSelector } from "react-redux";

import colors from "../../../Common/colors";
import theme from "../../../Common/theme";
import DropDown from "../../../components/DropDown";
import * as generalService from "../../../apiServices/generalService";
import HeaderApp from "../../Home/HeaderApp";

const WorkRealtime = ({ navigation }) => {
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.userInfo);

  const [data, setData] = useState([]);
  const [dataCboMay, setDataCboMay] = useState([]);
  const [selectedValueMay, setSelectedValueMay] = useState("");
  const [dataCboDongCo, setDataCboDongCo] = useState([]);
  const [selectedValueDongCo, setSelectedValueDongCo] = useState({
    name: "-1",
    value: -1,
  });

  useEffect(() => {
    const getDataCboMay = async () => {
      const resultCboMay = await generalService.getDataComBoMay(
        userInfo.USER_NAME,
        dispatch
      );

      setDataCboMay(resultCboMay);
      setSelectedValueMay(resultCboMay[0].value);
    };
    getDataCboMay();
  }, []);

  useEffect(() => {
    if (selectedValueMay == "") return;
    const getDataCboDongCo = async () => {
      const resultCboDongCo = await generalService.getDataComBoDongCo(
        selectedValueMay,
        dispatch
      );

      setDataCboDongCo(resultCboDongCo);
      if (resultCboDongCo !== undefined) {
        setSelectedValueDongCo({
          value: resultCboDongCo[0].value,
          name: resultCboDongCo[0].name,
        });
      }
    };
    getDataCboDongCo();
  }, [selectedValueMay]);

  useEffect(() => {
    const listGTDCCollection = firestore()
      .collection("listGTDC")
      .doc(selectedValueDongCo.name);
    listGTDCCollection.onSnapshot((querySnapshot) => {
      // const data = [];
      // querySnapshot.forEach((doc) => {
      //     data.push({

      //     })
      // })

      const dataRealtime = querySnapshot.data();

      const dataArray =
        dataRealtime &&
        Object.keys(dataRealtime).map((key) => ({
          [key]: dataRealtime[key],
        }));

      console.log(dataArray);
      setData(dataArray);
      //   console.log(querySnapshot.data());
    });
  }, [selectedValueDongCo.value]);

  //#region  xử lý sự kiện
  const handleValueCboMay = (item) => {
    setSelectedValueMay(item.value);
    // setSelectedValueDongCo(dataCboDongCo[0].value);
  };

  const handleValueCboDongCo = (item) => {
    setSelectedValueDongCo({ name: item.name, value: item.value });
  };

  //#endregion
  return (
    <View style={styles.container}>
      <HeaderApp
        navigation={navigation}
        title={"KẾ HOẠCH LÀM VIỆC"}
        headerLeftVisible={true}
        goBack={false}
      />
      <View style={styles.headerContent}>
        <View style={{ flex: 1, flexDirection: "row", paddingTop: 10 }}>
          <View style={styles.dropDownFilter}>
            <DropDown
              data={dataCboMay}
              valueField="value"
              labelField="name"
              placeholder={"Máy"}
              handleValue={handleValueCboMay}
              value={selectedValueMay}
            />
          </View>
          <View style={[styles.dropDownFilter, { marginLeft: 10 }]}>
            <DropDown
              data={dataCboDongCo}
              valueField="value"
              labelField="name"
              placeholder={"Động cơ"}
              handleValue={handleValueCboDongCo}
              value={selectedValueDongCo.value}
            />
          </View>
        </View>
      </View>
      <View style={styles.bodyContent}>
        {data !== undefined ? (
          <FlatList
            data={data}
            keyExtractor={(item, index) => index + ""}
            renderItem={({ item, index }) => {
              return (
                <View
                  style={{
                    flex: 1,
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                    paddingVertical: 10,
                    backgroundColor: index % 2 == 1 ? "#f2f2f2" : "white",
                  }}
                >
                  <View style={{ flex: 1, alignItems: "center" }}>
                    <Text style={theme.font}>{Object.keys(item)[0]}</Text>
                  </View>
                  <View style={{ flex: 1, alignItems: "center" }}>
                    <Text style={theme.font}>{Object.values(item)[0]}</Text>
                  </View>
                </View>
              );
            }}
          />
        ) : (
          //render giao diện khi không có dữ liệu
          <View
            style={{
              alignItems: "center",
              justifyContent: "center",
              flex: 1,
            }}
          >
            <Text style={theme.font}>Không có dữ liệu </Text>
          </View>
        )}
      </View>
    </View>
  );
};

export default WorkRealtime;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: colors.backgroundColor,
  },
  headerContent: {
    flex: 0.1,
  },

  dropDownFilter: {
    flex: 1,
  },
  bodyContent: {
    flex: 0.9,
  },
});
