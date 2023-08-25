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
import { useDispatch } from "react-redux";
import * as yup from "yup";
import { Formik } from "formik";
import Toast from "react-native-toast-message";
import { useFocusEffect } from "@react-navigation/native";

import colors from "../../../Common/colors";
import CustomTextInput from "../../../components/TextInput";
import DropDown from "../../../components/DropDown";
import ModalQuestion from "../../../components/ModalQuestion";
import * as generaService from "../../../apiServices/generalServiec.js";
import * as workModeServices from "../../../apiServices/workModeService";
import HeaderApp from "../../Home/HeaderApp";
const WorkingMode = ({ navigation }) => {
  const dispatch = useDispatch();
  //#region  state
  const [dataCDLV, setDataCDLV] = useState({});
  const [dataMay, setDataMay] = useState([]);

  const [selectedMay, setSelectedMay] = useState();

  const [showModalSave, setShowModalSave] = useState(false);

  const [dataForm, setDataForm] = useState({});
  const [keyResetFormik, setKeyResetFormik] = useState(Date.now());

  const isApiInProgress = useRef(false);

  //#endregion

  //#region  get Dữ liệu

  // get dữ liệu combo

  useFocusEffect(
    useCallback(() => {
      const getDataCboMay = async () => {
        const result = await generaService.getDataComBoMay("admin", dispatch);

        setDataMay(result);
      };
      getDataCboMay();
    }, [])
  );
  // get dữ liệu data

  useFocusEffect(
    useCallback(() => {
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
      };

      getDataCDLV();
    }, [selectedMay, keyResetFormik])
  );

  //#endregion
  //#region  các event xử lý sự kiện

  const handleSelectedMay = useCallback(
    (item) => {
      setSelectedMay(item.value);
      setKeyResetFormik(Date.now());
    },
    [selectedMay]
  );

  const handleCloseModal = useCallback(() => {
    setShowModalSave(false);
  }, []);

  const handleSaveButton = (values) => {
    setShowModalSave(true);
    setDataForm(values);
  };

  const handleConfirmModal = () => {
    setShowModalSave(false);

    const saveData = async () => {
      const datasave = {
        tG_T2: dataForm.valueT2,
        tG_T3: dataForm.valueT3,
        tG_T4: dataForm.valueT4,
        tG_T5: dataForm.valueT5,
        tG_T6: dataForm.valueT6,
        tG_T7: dataForm.valueT7,
        tG_CN: dataForm.valueCN,
        oeE_MUC_TIEU: dataForm.valueOEE,
      };

      const result = await workModeServices.postSubmitDataWorkMode(
        selectedMay,
        dispatch,
        datasave
      );

      if (result.status === 200) {
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
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={86}
      >
        <HeaderApp
          navigation={navigation}
          title={"CHẾ ĐỘ LÀM VIỆC"}
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
              <View style={{ flex: 5 }}>
                <ScrollView
                  style={{ flex: 4 }}
                  refreshControl={
                    <RefreshControl
                      onRefresh={() => {
                        setKeyResetFormik(Date.now());
                      }}
                    />
                  }
                >
                  <View style={styles.input}>
                    <CustomTextInput
                      placeholder={"Thứ 2"}
                      keyboardType="numbers-and-punctuation"
                      value={values.valueT2}
                      onChangeText={handleChange("valueT2")}
                    />
                    {errors.valueT2 && (
                      <Text style={{ color: "red", fontWeight: "600" }}>
                        {errors.valueT2}
                      </Text>
                    )}
                  </View>
                  <View style={styles.input}>
                    <CustomTextInput
                      placeholder={"Thứ 3"}
                      keyboardType="numbers-and-punctuation"
                      value={values.valueT3}
                      onChangeText={handleChange("valueT3")}
                    />
                    {errors.valueT3 && (
                      <Text style={{ color: "red", fontWeight: "600" }}>
                        {errors.valueT3}
                      </Text>
                    )}
                  </View>
                  <View style={styles.input}>
                    <CustomTextInput
                      placeholder={"Thứ 4"}
                      keyboardType="numbers-and-punctuation"
                      value={values.valueT4}
                      onChangeText={handleChange("valueT4")}
                    />
                    {errors.valueT4 && (
                      <Text style={{ color: "red", fontWeight: "600" }}>
                        {errors.valueT4}
                      </Text>
                    )}
                  </View>
                  <View style={styles.input}>
                    <CustomTextInput
                      placeholder={"Thứ 5"}
                      keyboardType="numbers-and-punctuation"
                      value={values.valueT5}
                      onChangeText={handleChange("valueT5")}
                    />
                    {errors.valueT5 && (
                      <Text style={{ color: "red", fontWeight: "600" }}>
                        {errors.valueT5}
                      </Text>
                    )}
                  </View>
                  <View style={styles.input}>
                    <CustomTextInput
                      placeholder={"Thứ 6"}
                      keyboardType="numbers-and-punctuation"
                      value={values.valueT6}
                      onChangeText={handleChange("valueT6")}
                    />
                    {errors.valueT6 && (
                      <Text style={{ color: "red", fontWeight: "600" }}>
                        {errors.valueT6}
                      </Text>
                    )}
                  </View>
                  <View style={styles.input}>
                    <CustomTextInput
                      placeholder={"Thứ 7"}
                      keyboardType="numbers-and-punctuation"
                      value={values.valueT7}
                      onChangeText={handleChange("valueT7")}
                    />
                    {errors.valueT7 && (
                      <Text style={{ color: "red", fontWeight: "600" }}>
                        {errors.valueT7}
                      </Text>
                    )}
                  </View>
                  <View style={styles.input}>
                    <CustomTextInput
                      placeholder={"Chủ nhật"}
                      keyboardType="numbers-and-punctuation"
                      value={values.valueCN}
                      onChangeText={handleChange("valueCN")}
                    />
                    {errors.valueCN && (
                      <Text style={{ color: "red", fontWeight: "600" }}>
                        {errors.valueCN}
                      </Text>
                    )}
                  </View>
                  <View style={styles.input}>
                    <CustomTextInput
                      placeholder={"OEE mục tiêu (%)"}
                      keyboardType="numbers-and-punctuation"
                      value={values.valueOEE}
                      onChangeText={handleChange("valueOEE")}
                    />
                    {errors.valueOEE && (
                      <Text style={{ color: "red", fontWeight: "600" }}>
                        {errors.valueOEE}
                      </Text>
                    )}
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
                      onPress={handleSubmit}
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
              </View>
            )}
          </Formik>
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
    flex: 0.1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
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
