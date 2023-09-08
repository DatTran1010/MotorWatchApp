import { View, Text, StyleSheet, Linking } from "react-native";
import React, { useEffect, useState } from "react";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";

import HeaderApp from "../Home/HeaderApp";
import colors from "../../Common/colors";
import DropDown from "../../components/DropDown";
import FormButton from "../../components/button";
import CalendarComponent from "../../components/CalendarComponent";
import * as reportServices from "../../apiServices/resquestReportServices";
import ModalQuestion from "../../components/ModalQuestion";
import NotificationApp from "../../components/NotificationApp";
const RequestReport = ({ navigation }) => {
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.userInfo);

  const [dateFromTo, setDataFromTo] = useState({
    startDate: moment(new Date()).add(-6, "days").format("YYYY-MM-DD"),
    endDate: moment(new Date()).format("YYYY-MM-DD"),
  });

  const [dataCboReport, setDataCboReport] = useState([]);
  const [dataDiaDiem, setDataCboDiaDiem] = useState([]);

  const [selectedValueReport, setSelectedValueReport] = useState({
    name: "",
    value: "",
  });
  const [selectedValueDiaDiem, setSelectedValueDiaDiem] = useState("");
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const getDataCboReport = async () => {
      const result = await reportServices.getDataCboReport(dispatch);
      setDataCboReport(result);
    };
    const getDataCboDiaDiem = async () => {
      const result = await reportServices.getDataCboDiaDiem(
        userInfo.USER_NAME,
        dispatch
      );
      setDataCboDiaDiem(result);
    };
    getDataCboReport();
    getDataCboDiaDiem();
  }, []);

  //handle
  const handleValueReport = (item) => {
    setSelectedValueReport({
      name: item.name,
      value: item.value,
    });
  };

  const handleValueDiaDiem = (item) => {
    setSelectedValueDiaDiem(item.value);
  };

  const handleDoneDate = (date) => {
    setDataFromTo(date);
  };

  const handleSendMail = () => {
    if (userInfo.EMAIL && userInfo.EMAIL !== "") {
      setShowModal(true);
    } else {
      dispatch({
        type: "SET_NOTIFER_WARNING",
        payload: {
          showNotifer: true,
          label: `Tài khoản của bạn chưa có email`,
          label2: "Vui lòng kiểm tra lại.",
        },
      });
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleConfirmSendEmail = () => {
    const sendEmail = async () => {
      const dataSend = {
        iBC: selectedValueReport.value,
        tNgay: selectedValueReport.value == 4 ? "" : dateFromTo.startDate,
        dNgay: selectedValueReport.value == 4 ? "" : dateFromTo.endDate,
        userName: userInfo.USER_NAME,
        mS_DON_VI: userInfo.MS_DV,
        mS_N_XUONG: selectedValueDiaDiem,
        email: userInfo.EMAIL,
      };

      const result = await reportServices.sendEmail(dataSend, dispatch);

      if (result === 1) {
        dispatch({
          type: "SET_NOTIFER_WARNING",
          payload: {
            showNotifer: true,
            label: `Báo cáo ${selectedValueReport.name} đã được gửi đến cho Mr/Ms ${userInfo.HO_TEN} theo địa chỉ email: ${userInfo.EMAIL} `,
            label2: "Vui lòng kiểm tra email để xem báo cáo. ",
          },
        });
      } else if (result === 2) {
        dispatch({
          type: "SET_NOTIFER_WARNING",
          payload: {
            showNotifer: true,
            label: `Không có dữ liệu gửi`,
            label2: "Vui lòng kiểm tra lại.",
          },
        });
      }
      // console.log(result);
    };
    setShowModal(false);
    sendEmail();
  };

  return (
    <View style={styles.container}>
      <HeaderApp
        navigation={navigation}
        headerLeftVisible={true}
        goBack={false}
      />
      <View style={styles.contentContainer}>
        <View style={styles.fillterControl}>
          <View>
            <DropDown
              placeholder={"Báo cáo"}
              labelField="name"
              valueField={"value"}
              data={dataCboReport}
              value={selectedValueReport.value}
              handleValue={handleValueReport}
            />
          </View>
          <View
            style={{
              flexDirection: "row",
              flex: 1,
            }}
          >
            <View style={styles.viewFilter}>
              <DropDown
                placeholder={"Địa điểm"}
                labelField="name"
                valueField={"value"}
                data={dataDiaDiem}
                handleValue={handleValueDiaDiem}
                value={selectedValueDiaDiem}
              />
            </View>
            {selectedValueReport.value !== "4" && (
              <View style={[styles.viewFilter, { marginLeft: 10 }]}>
                <CalendarComponent
                  isRight
                  startDate={dateFromTo.startDate}
                  endDate={dateFromTo.endDate}
                  placeholder="Từ ngày - Đến ngày"
                  onClickDone={handleDoneDate}
                />
              </View>
            )}
          </View>
        </View>
        <View style={styles.viewButton}>
          <View style={styles.buttonView}>
            <FormButton buttonTitle={"GỬI"} onPress={handleSendMail} />
          </View>
          <View style={styles.buttonView}>
            <FormButton
              buttonTitle={"CANCLE"}
              colorButton={colors.colorHeader}
            />
          </View>
        </View>
      </View>
      {showModal && (
        <ModalQuestion
          // onClose={handleCloseModal}
          // onConfirm={handleConfirmModal}
          label="Bạn có muốn gửi báo cáo ?"
          content="Gửi báo cáo"
          onClose={handleCloseModal}
          onConfirm={handleConfirmSendEmail}
        />
      )}
      <NotificationApp />
    </View>
  );
};

export default RequestReport;
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    flex: 1,
    backgroundColor: colors.backgroundColor,
    padding: 10,
  },
  fillterControl: {
    flex: 0.8,
  },
  viewButton: {
    flex: 0.2,
    marginBottom: 10,
  },
  buttonView: {
    marginVertical: 5,
  },
  viewFilter: {
    flex: 1,
  },
});
