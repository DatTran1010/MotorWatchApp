import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  Animated,
  LayoutAnimation,
} from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useFocusEffect } from "@react-navigation/native";

import colors from "../../../Common/colors";
import CustomTextInput from "../../../components/TextInput";
import { windowHeight, windowWidth } from "../../../Common/dimentions";
import ModalQuestion from "../../../components/ModalQuestion";
import callApi from "../../../ConText/api";
import HeaderApp from "../../Home/HeaderApp";
import FormButton from "../../../components/button";

const ElictricPrice = ({ navigation }) => {
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.userInfo);

  //#region  sate

  const [lowUnitPrice, setLowUnitPrice] = useState("");
  const [normalUnitPrice, setNormalUnitPrice] = useState("");
  const [highUnitPrice, setHighUnitPrice] = useState("");

  const [showModalSave, setShowModalSave] = useState(false);

  const [data, setData] = useState([]);
  const [refeshing, setRefeshing] = useState(false);
  //#endregion

  //#region  load dữ liệu

  useFocusEffect(
    React.useCallback(() => {
      const getData = async () => {
        const endpoint = "/api/motorwatch/loaddongiadien";
        const method = "GET";
        const params = {
          Username: userInfo.USER_NAME,
        };

        const response = await callApi(
          dispatch,
          endpoint,
          method,
          null,
          "",
          params
        );

        setLowUnitPrice(...response.data[0].donGiaT.toString());
        setNormalUnitPrice(response.data[0].donGiaTB.toString());
        setHighUnitPrice(response.data[0].donGiaTB.toString());
        setData(response.data);
      };

      getData();
    }, [refeshing])
  );

  // useEffect(() => {
  //   getData();
  // }, [refeshing]);

  //#endregion

  //#region  xử lý sự kiện handle

  const handleChangeTextLowUnitPrice = useCallback(
    (value) => {
      setLowUnitPrice(value.toString());
    },
    [lowUnitPrice]
  );

  const handleChangeTextNormalUnitPrice = useCallback(
    (value) => {
      setNormalUnitPrice(value.toString());
    },
    [normalUnitPrice]
  );

  const handleChangeTextHighUnitPrice = useCallback(
    (value) => {
      setHighUnitPrice(value.toString());
    },
    [highUnitPrice]
  );

  const handleCloseModal = useCallback(() => {
    setShowModalSave(false);
  }, []);

  const handleConfirmModal = useCallback(() => {
    setShowModalSave(false);

    const saveData = async () => {
      const endpoint = "/api/motorwatch/savedongiadien";
      const method = "POST";
      const params = null;
      const datasave = {
        msDonGia: data[0].msDonGia,
        donGiaT: lowUnitPrice,
        donGiaTB: normalUnitPrice,
        donGiaC: highUnitPrice,
        msDonVi: data[0].msDonVi,
        ngayHieuLuc: data[0].ngayHieuLuc,
      };

      const response = await callApi(
        dispatch,
        endpoint,
        method,
        datasave,
        "",
        params
      );

      if (response.status === 200) {
        Toast.show({
          type: "success",
          text1: "Thông báo",
          text2: "Lưu thành công",
        });
      } else {
        Toast.show({
          type: "error",
          text1: "Thông báo",
          text2: "Lưu không thành công",
        });
      }
      return response.status;
    };

    const result = saveData();
  }, [lowUnitPrice, normalUnitPrice, highUnitPrice]);

  const handleSaveButton = () => {
    setShowModalSave(true);
  };
  //#endregion

  return (
    <>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === "ios" && "padding"}
        keyboardVerticalOffset={86}
      >
        <HeaderApp
          navigation={navigation}
          title={"ĐƠN GIÁ ĐIỆN"}
          headerLeftVisible={true}
          goBack={false}
        />
        <ScrollView style={{ flex: 0.7 }}>
          <View style={{ flex: 1 }}>
            <View style={styles.input}>
              <CustomTextInput
                value={lowUnitPrice}
                placeholder={"Đơn giá thấp điểm"}
                onChangeText={handleChangeTextLowUnitPrice}
                keyboardType="numbers-and-punctuation"
              />
            </View>
            <View style={styles.input}>
              <CustomTextInput
                value={normalUnitPrice}
                placeholder={"Đơn giá bình thường"}
                onChangeText={handleChangeTextNormalUnitPrice}
                keyboardType="numbers-and-punctuation"
              />
            </View>

            <View style={styles.input}>
              <CustomTextInput
                value={highUnitPrice}
                placeholder={"Đơn giá cao điểm"}
                onChangeText={handleChangeTextHighUnitPrice}
                keyboardType="numbers-and-punctuation"
              />
            </View>
          </View>
        </ScrollView>
        <View style={styles.button}>
          <View style={[styles.buttonView, { justifyContent: "center" }]}>
            <FormButton
              buttonTitle={"LƯU"}
              activeOpacity={0.7}
              onPress={handleSaveButton}
            />
          </View>
          <View style={styles.buttonView}>
            <FormButton
              buttonTitle={"KHÔNG LƯU"}
              colorButton={colors.colorHeader}
              activeOpacity={0.6}
              onPress={() => {
                setRefeshing(!refeshing);
                Keyboard.dismiss();
              }}
            />
          </View>
        </View>
        {showModalSave && (
          <ModalQuestion
            onClose={handleCloseModal}
            onConfirm={handleConfirmModal}
            label="Bạn có chắc chắn muốn lưu dữ liệu ?"
            content="Lưu dữ liệu"
          />
        )}
      </KeyboardAvoidingView>
    </>
  );
};

export default ElictricPrice;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.backgroundColor,
    padding: 10,
  },
  input: {
    marginTop: 10,
  },
  button: {
    flex: 0.3,
    marginBottom: 10,
  },
  buttonView: {
    flex: 1,
    marginVertical: 5,
  },
});
