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
import { useDispatch } from "react-redux";
import Toast from "react-native-toast-message";
import { useFocusEffect } from "@react-navigation/native";

import colors from "../../../Common/colors";
import CustomTextInput from "../../../components/TextInput";
import { windowHeight, windowWidth } from "../../../Common/dimentions";
import ModalQuestion from "../../../components/ModalQuestion";
import callApi from "../../../ConText/api";
import HeaderApp from "../../Home/HeaderApp";

const ElictricPrice = ({ navigation }) => {
  const dispatch = useDispatch();

  //#region  sate

  const [lowUnitPrice, setLowUnitPrice] = useState("");
  const [normalUnitPrice, setNormalUnitPrice] = useState("");
  const [highUnitPrice, setHighUnitPrice] = useState("");

  const [showModalSave, setShowModalSave] = useState(false);

  const [data, setData] = useState([]);
  const [refeshing, setRefeshing] = useState(false);
  //#endregion

  //#region  load dữ liệu

  console.log("render-lan 1");
  useFocusEffect(
    React.useCallback(() => {
      const getData = async () => {
        const endpoint = "/api/motorwatch/loaddongiadien";
        const method = "GET";
        const params = {
          Username: "admin",
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
        <ScrollView>
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
          <View style={styles.savebutton}>
            <TouchableOpacity
              style={{
                width: 100,
                height: 40,
                alignItems: "center",
                justifyContent: "center",
                borderRadius: 6,
                backgroundColor: colors.primary,
              }}
              activeOpacity={0.6}
              onPress={handleSaveButton}
            >
              <Text
                style={{
                  fontWeight: "500",
                  color: colors.white,
                }}
              >
                Lưu
              </Text>
            </TouchableOpacity>
          </View>

          <View style={styles.dontsavebutton}>
            <TouchableOpacity
              style={{
                width: 100,
                height: 40,
                alignItems: "center",
                justifyContent: "center",
                borderRadius: 6,
                borderWidth: 1,
                borderColor: colors.primary,
                backgroundColor: colors.backgroundColor,
              }}
              activeOpacity={0.6}
              onPress={() => {
                setRefeshing(!refeshing);
                Keyboard.dismiss();
              }}
            >
              <Text
                style={{
                  fontWeight: "500",
                  color: colors.black,
                }}
              >
                Không lưu
              </Text>
            </TouchableOpacity>
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
    flex: 0.1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },
  savebutton: {
    flex: 1,

    alignItems: "center",
    justifyContent: "center",
  },
  dontsavebutton: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});