import {
  View,
  Text,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Keyboard,
  RefreshControl,
} from "react-native";
import React, { useCallback, useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as yup from "yup";
import { Formik } from "formik";
import { useFocusEffect } from "@react-navigation/native";

import colors from "../../../Common/colors";
import CustomTextInput from "../../../components/TextInput";
import DropDown from "../../../components/DropDown";
import ModalQuestion from "../../../components/ModalQuestion";
import * as generaService from "../../../apiServices/generalService.js";
import * as workModeServices from "../../../apiServices/workModeService";
import HeaderApp from "../../Home/HeaderApp";
import FormButton from "../../../components/button";
import theme from "../../../Common/theme";
import { setShowToast } from "../../../Redux/appSlice";
import Animated, { FadeInDown } from "react-native-reanimated";

const WorkingMode = ({ navigation }) => {
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.app.userInfo);

  //#region  state
  const [dataCDLV, setDataCDLV] = useState({});
  const [dataMay, setDataMay] = useState([]);

  const [selectedMay, setSelectedMay] = useState();

  const [showModalSave, setShowModalSave] = useState(false);

  const [dataForm, setDataForm] = useState({});
  const [keyResetFormik, setKeyResetFormik] = useState(Date.now());

  const [refeshing, setRefeshing] = useState(false);
  //#endregion

  //#region  get Dữ liệu

  // get dữ liệu combo

  useFocusEffect(
    useCallback(() => {
      const getDataCboMay = async () => {
        const result = await generaService.getDataComBoMay(
          userInfo.USER_NAME,
          dispatch
        );

        setDataMay(result);
      };
      getDataCboMay();
    }, [])
  );
  // get dữ liệu data

  useFocusEffect(
    useCallback(() => {
      if (selectedMay === undefined) return;
      const getDataCDLV = async () => {
        const result = await workModeServices.getDataWorkMode(
          selectedMay,
          dispatch
        );

        if (result) {
          setDataCDLV(result);
        } else {
          setDataCDLV({});
        }
        setKeyResetFormik(Date.now());
      };

      getDataCDLV();
    }, [selectedMay, refeshing])
  );

  //#endregion
  //#region  các event xử lý sự kiện

  const handleSelectedMay = useCallback(
    (item) => {
      setSelectedMay(item.value);
    },
    [selectedMay]
  );

  const handleCloseModal = useCallback(() => {
    setShowModalSave(false);
  }, []);

  const handleSaveButton = (values) => {
    const allValuesEmpty = Object.values(values).every(
      (value) => value == 0 || value == ""
    );

    if (allValuesEmpty) {
      dispatch(
        setShowToast({
          showToast: true,
          title: "Thông báo",
          body: "Vui lòng nhập dữ liệu",
          type: "warning",
        })
      );
    } else {
      setShowModalSave(true);
      setDataForm(values);
    }
  };

  const handleConfirmModal = () => {
    setShowModalSave(false);

    const saveData = async () => {
      const datasave = {
        tG_T2: dataForm.valueT2 == "" ? 0 : dataForm.valueT2,
        tG_T3: dataForm.valueT3 == "" ? 0 : dataForm.valueT3,
        tG_T4: dataForm.valueT4 == "" ? 0 : dataForm.valueT4,
        tG_T5: dataForm.valueT5 == "" ? 0 : dataForm.valueT5,
        tG_T6: dataForm.valueT6 == "" ? 0 : dataForm.valueT6,
        tG_T7: dataForm.valueT7 == "" ? 0 : dataForm.valueT7,
        tG_CN: dataForm.valueCN == "" ? 0 : dataForm.valueCN,
        oeE_MUC_TIEU: dataForm.valueOEE == "" ? 0 : dataForm.valueOEE,
      };

      const result = await workModeServices.postSubmitDataWorkMode(
        selectedMay,
        dispatch,
        datasave
      );

      if (result === 1) {
        dispatch(
          setShowToast({
            showToast: true,
            title: "Thông báo",
            body: "Lưu thành công",
            type: "success",
          })
        );
      } else {
        dispatch(
          setShowToast({
            showToast: true,
            title: "Thông báo",
            body: "Lưu không thành công",
            type: "error",
          })
        );
      }
    };
    saveData();
  };
  //#endregion

  //#region  kiểm tra validation

  const validationSchema = yup.object().shape({
    valueT2: yup.string().matches(/^[0-9.]+$/, "Chỉ được nhập số"),
    valueT3: yup.string().matches(/^[0-9.]+$/, "Chỉ được nhập số"),
    valueT4: yup.string().matches(/^[0-9.]+$/, "Chỉ được nhập số"),
    valueT5: yup.string().matches(/^[0-9.]+$/, "Chỉ được nhập số"),
    valueT6: yup.string().matches(/^[0-9.]+$/, "Chỉ được nhập số"),
    valueT7: yup.string().matches(/^[0-9.]+$/, "Chỉ được nhập số"),
    valueCN: yup.string().matches(/^[0-9.]+$/, "Chỉ được nhập số"),
    valueOEE: yup.string().matches(/^[0-9.]+$/, "Chỉ được nhập số"),
  });

  //#endregion
  return (
    <View style={styles.container}>
      <HeaderApp
        navigation={navigation}
        headerLeftVisible={true}
        goBack={false}
      />

      <View style={{ flex: 1 }}>
        <View style={styles.filterControl}>
          <DropDown
            data={dataMay}
            labelField="name"
            valueField={"value"}
            placeholder="Chọn máy"
            handleValue={handleSelectedMay}
            value={selectedMay}
          />
        </View>
        {Object.keys(dataCDLV).length > 0 ? (
          <Formik
            key={keyResetFormik}
            enableReinitialize={true}
            initialValues={{
              valueT2: dataCDLV.tG_T2 && dataCDLV.tG_T2.toString(),
              valueT3: dataCDLV.tG_T3 && dataCDLV.tG_T3.toString(),
              valueT4: dataCDLV.tG_T4 && dataCDLV.tG_T4.toString(),
              valueT5: dataCDLV.tG_T5 && dataCDLV.tG_T5.toString(),
              valueT6: dataCDLV.tG_T6 && dataCDLV.tG_T6.toString(),
              valueT7: dataCDLV.tG_T7 && dataCDLV.tG_T7.toString(),
              valueCN: dataCDLV.tG_CN && dataCDLV.tG_CN.toString(),
              valueOEE:
                dataCDLV.oeE_MUC_TIEU && dataCDLV.oeE_MUC_TIEU.toString(),
            }}
            validationSchema={validationSchema}
            onSubmit={(values) => handleSaveButton(values)}
          >
            {({ handleChange, handleSubmit, values, errors }) => (
              <KeyboardAvoidingView
                style={{ flex: 1 }}
                behavior={Platform.OS === "ios" && "padding"}
              >
                <View style={{ flex: 5 }}>
                  <ScrollView
                    style={{ flex: 4 }}
                    refreshControl={
                      <RefreshControl
                        refreshing={false}
                        onRefresh={() => {
                          setRefeshing(!refeshing);
                        }}
                      />
                    }
                  >
                    <Animated.View
                      style={styles.input}
                      entering={FadeInDown.delay(100)
                        .duration(1000)
                        .springify()}
                    >
                      <CustomTextInput
                        placeholder={"Thứ 2"}
                        keyboardType="numbers-and-punctuation"
                        value={values.valueT2}
                        onChangeText={handleChange("valueT2")}
                      />
                      {errors.valueT2 && (
                        <Text
                          style={{
                            color: "red",
                            fontWeight: "600",
                          }}
                        >
                          {errors.valueT2}
                        </Text>
                      )}
                    </Animated.View>
                    <Animated.View
                      style={styles.input}
                      entering={FadeInDown.delay(200)
                        .duration(1000)
                        .springify()}
                    >
                      <CustomTextInput
                        placeholder={"Thứ 3"}
                        keyboardType="numbers-and-punctuation"
                        value={values.valueT3}
                        onChangeText={handleChange("valueT3")}
                      />
                      {errors.valueT3 && (
                        <Text
                          style={{
                            color: "red",
                            fontWeight: "600",
                          }}
                        >
                          {errors.valueT3}
                        </Text>
                      )}
                    </Animated.View>
                    <Animated.View
                      style={styles.input}
                      entering={FadeInDown.delay(300)
                        .duration(1000)
                        .springify()}
                    >
                      <CustomTextInput
                        placeholder={"Thứ 4"}
                        keyboardType="numbers-and-punctuation"
                        value={values.valueT4}
                        onChangeText={handleChange("valueT4")}
                      />
                      {errors.valueT4 && (
                        <Text
                          style={{
                            color: "red",
                            fontWeight: "600",
                          }}
                        >
                          {errors.valueT4}
                        </Text>
                      )}
                    </Animated.View>
                    <Animated.View
                      style={styles.input}
                      entering={FadeInDown.delay(400)
                        .duration(1000)
                        .springify()}
                    >
                      <CustomTextInput
                        placeholder={"Thứ 5"}
                        keyboardType="numbers-and-punctuation"
                        value={values.valueT5}
                        onChangeText={handleChange("valueT5")}
                      />
                      {errors.valueT5 && (
                        <Text
                          style={{
                            color: "red",
                            fontWeight: "600",
                          }}
                        >
                          {errors.valueT5}
                        </Text>
                      )}
                    </Animated.View>
                    <Animated.View
                      style={styles.input}
                      entering={FadeInDown.delay(500)
                        .duration(1000)
                        .springify()}
                    >
                      <CustomTextInput
                        placeholder={"Thứ 6"}
                        keyboardType="numbers-and-punctuation"
                        value={values.valueT6}
                        onChangeText={handleChange("valueT6")}
                      />
                      {errors.valueT6 && (
                        <Text
                          style={{
                            color: "red",
                            fontWeight: "600",
                          }}
                        >
                          {errors.valueT6}
                        </Text>
                      )}
                    </Animated.View>
                    <Animated.View
                      style={styles.input}
                      entering={FadeInDown.delay(600)
                        .duration(1000)
                        .springify()}
                    >
                      <CustomTextInput
                        placeholder={"Thứ 7"}
                        keyboardType="numbers-and-punctuation"
                        value={values.valueT7}
                        onChangeText={handleChange("valueT7")}
                      />
                      {errors.valueT7 && (
                        <Text
                          style={{
                            color: "red",
                            fontWeight: "600",
                          }}
                        >
                          {errors.valueT7}
                        </Text>
                      )}
                    </Animated.View>
                    <Animated.View
                      style={styles.input}
                      entering={FadeInDown.delay(700)
                        .duration(1000)
                        .springify()}
                    >
                      <CustomTextInput
                        placeholder={"Chủ nhật"}
                        keyboardType="numbers-and-punctuation"
                        value={values.valueCN}
                        onChangeText={handleChange("valueCN")}
                      />
                      {errors.valueCN && (
                        <Text
                          style={{
                            color: "red",
                            fontWeight: "600",
                          }}
                        >
                          {errors.valueCN}
                        </Text>
                      )}
                    </Animated.View>
                    <Animated.View
                      style={styles.input}
                      entering={FadeInDown.delay(800)
                        .duration(1000)
                        .springify()}
                    >
                      <CustomTextInput
                        placeholder={"OEE mục tiêu (%)"}
                        keyboardType="numbers-and-punctuation"
                        value={values.valueOEE}
                        onChangeText={handleChange("valueOEE")}
                      />
                      {errors.valueOEE && (
                        <Text
                          style={{
                            color: "red",
                            fontWeight: "600",
                          }}
                        >
                          {errors.valueOEE}
                        </Text>
                      )}
                    </Animated.View>
                  </ScrollView>
                  <View style={styles.button}>
                    <View
                      style={[styles.buttonView, { justifyContent: "center" }]}
                    >
                      <FormButton
                        buttonTitle={"LƯU"}
                        activeOpacity={0.7}
                        onPress={handleSubmit}
                      />
                    </View>
                    <View style={styles.buttonView}>
                      <FormButton
                        buttonTitle={"KHÔNG LƯU"}
                        colorButton={colors.colorHeader}
                        activeOpacity={0.6}
                        onPress={() => {
                          Keyboard.dismiss();
                          setRefeshing(!refeshing);
                        }}
                      />
                    </View>
                  </View>
                </View>
              </KeyboardAvoidingView>
            )}
          </Formik>
        ) : (
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
      {showModalSave && (
        <ModalQuestion
          onClose={handleCloseModal}
          onConfirm={handleConfirmModal}
          label="Bạn có chắc chắn muốn lưu dữ liệu ?"
          content="Lưu dữ liệu"
        />
      )}
    </View>
  );
};

export default WorkingMode;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.backgroundColor,
    padding: 10,
  },
  filterControl: {
    paddingVertical: 10,
  },
  input: {
    marginTop: 10,
    flex: 1,
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
