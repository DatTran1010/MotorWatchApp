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
  unstable_batchedUpdates,
} from "react-native";
import React, { useCallback, useEffect, useState, useMemo } from "react";
import { useDispatch } from "react-redux";
import * as yup from "yup";
import { Formik } from "formik";
import Toast from "react-native-toast-message";
import moment from "moment";
import { useFocusEffect } from "@react-navigation/native";

import colors from "../../../Common/colors";
import CustomTextInput from "../../../components/TextInput";
import DropDown from "../../../components/DropDown";
import callApi from "../../../ConText/api";
import ModalQuestion from "../../../components/ModalQuestion";
import * as generaService from "../../../apiServices/generalServiec.js";
import * as workPlanServices from "../../../apiServices/workPlanServices";
import CalendarComponent from "../../../components/CalendarComponent";
import HeaderApp from "../../Home/HeaderApp";

const WorkPlan = ({ navigation }) => {
  const dispatch = useDispatch();
  //#region  state
  const [dataWorkPlan, setDataWorkPlan] = useState([]);
  const [dataMay, setDataMay] = useState([]);
  const [selectedMay, setSelectedMay] = useState();

  const [dateFromTo, setDataFromTo] = useState({
    startDate: moment(new Date()).format("YYYY-MM-DD"),
    endDate: moment(new Date()).add(6, "days").format("YYYY-MM-DD"),
  });

  const [showModalSave, setShowModalSave] = useState(false);

  const [dataForm, setDataForm] = useState({});

  const [keyResetFormik, setKeyResetFormik] = useState(Date.now());
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

  useFocusEffect(
    useCallback(() => {
      const getDataWorkPlan = async () => {
        unstable_batchedUpdates(async () => {
          const result = await workPlanServices.getDataWorkPlan(
            dateFromTo.startDate,
            dateFromTo.endDate,
            selectedMay,
            dispatch
          );

          if (result) {
            setDataWorkPlan(result);
          } else {
            setDataWorkPlan({});
          }
        });
      };

      getDataWorkPlan();
    }, [selectedMay, dateFromTo.startDate, dateFromTo.endDate, keyResetFormik])
  );

  //#endregion

  //#region  các event xử lý sự kiện

  const handleRefeshing = () => {
    setKeyResetFormik(Date.now());
  };

  const handleSelectedMay = useCallback(
    (item) => {
      setSelectedMay(item.value);
      setKeyResetFormik(Date.now());
    },
    [selectedMay]
  );

  const handleDoneDateCalendar = useCallback(
    (date) => {
      setDataFromTo(date);
      setKeyResetFormik(Date.now());
    },
    [dateFromTo.startDate, dateFromTo.endDate]
  );

  const handleCloseModal = useCallback(() => {
    setShowModalSave(false);
  }, []);

  const handleSaveButton = (values) => {
    setShowModalSave(true);
    setDataForm(values);
  };

  const handleConfirmModal = () => {
    console.log(JSON.stringify(dataWorkPlan));

    // setShowModalSave(false);

    // const saveData = async () => {
    //   const datasave = {
    //     tG_T2: dataForm.valueT2,
    //     tG_T3: dataForm.valueT3,
    //     tG_T4: dataForm.valueT4,
    //     tG_T5: dataForm.valueT5,
    //     tG_T6: dataForm.valueT6,
    //     tG_T7: dataForm.valueT7,
    //     tG_CN: dataForm.valueCN,
    //     oeE_MUC_TIEU: dataForm.valueOEE,
    //   };

    //   const result = await workPlanServices.postSaveDataWorkPlan(
    //     selectedMay,
    //     datasave,
    //     dispatch
    //   );

    //   if (result === 200) {
    //     Toast.show({
    //       type: "success",
    //       text1: "Thông báo",
    //       text2: "Lưu thành công",
    //     });
    //   } else {
    //     Toast.show({
    //       type: "error",
    //       text1: "Thông báo",
    //       text2: "Lưu không thành công",
    //     });
    //   }
    // };

    // saveData();
  };
  //#endregion

  //#region  kiểm tra validation

  const initialValues = useMemo(() => {
    if (dataWorkPlan.length > 0) {
      return dataWorkPlan.reduce((acc, item) => {
        acc[item.id] = item.sO_GIO.toString();
        return acc;
      }, {});
    }
    return [];
  }, [selectedMay]);

  const validationSchema = useMemo(() => {
    const schemaObj = {};
    if (dataWorkPlan.length > 0) {
      dataWorkPlan.forEach((item) => {
        schemaObj[item.id] = yup
          .string()
          .matches(/^[0-9.]+$/, "Chỉ được nhập số");
      });
    }

    return yup.object().shape(schemaObj);
  }, [dataWorkPlan]);

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
          title={"KẾ HOẠCH LÀM VIỆC"}
          headerLeftVisible={true}
          goBack={false}
        />
        <View style={{ flex: 1 }}>
          <View style={styles.filterControl}>
            <View style={{ flex: 1 }}>
              <DropDown
                data={dataMay}
                labelField="name"
                valueField={"value"}
                placeholder="Chọn máy"
                handleValue={handleSelectedMay}
                value={selectedMay}
              />
            </View>
            <View style={{ flex: 1 }}>
              <CalendarComponent
                startDate={dateFromTo.startDate}
                endDate={dateFromTo.endDate}
                onClickDone={handleDoneDateCalendar}
              />
            </View>
          </View>

          {dataWorkPlan.length > 0 && (
            <Formik
              key={keyResetFormik}
              enableReinitialize={true}
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={(values) => handleSaveButton(values)}
            >
              {({ handleChange, handleSubmit, values, errors }) => (
                <View style={{ flex: 5, zIndex: -1 }}>
                  <ScrollView
                    style={{ flex: 4 }}
                    refreshControl={
                      <RefreshControl onRefresh={handleRefeshing} />
                    }
                  >
                    {dataWorkPlan.map((item, index) => {
                      return (
                        <View key={index} style={styles.input}>
                          <CustomTextInput
                            placeholder={item.date}
                            keyboardType="numbers-and-punctuation"
                            value={values[item.id]}
                            onChangeText={handleChange(item.id)}
                          />
                          {errors[item.id] && (
                            <Text style={{ color: "red", fontWeight: "600" }}>
                              {errors[item.id]}
                            </Text>
                          )}
                        </View>
                      );
                    })}
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
      </KeyboardAvoidingView>
    </View>
  );
};

export default WorkPlan;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.backgroundColor,
    padding: 10,
  },
  filterControl: {
    paddingVertical: 10,
    flexDirection: "row",
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
