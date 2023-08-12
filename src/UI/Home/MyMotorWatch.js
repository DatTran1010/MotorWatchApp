import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Platform,
  Animated,
  LayoutAnimation,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";

import {
  VictoryChart,
  VictoryBar,
  VictoryTheme,
  VictoryLegend,
  VictoryGroup,
  VictoryContainer,
} from "victory-native";

import { Calendar, CalendarList, LocaleConfig } from "react-native-calendars";

import colors from "../../Common/colors";
import { windowHeight, windowWidth } from "../../Common/dimentions";
import { Svg } from "react-native-svg";
import IconButton from "../../components/IconButton";
import DropDown from "../../components/DropDown";
const MyMotorWatch = () => {
  const data = [
    { date: "07/10", male: 30, female: 25 },
    { date: "08/10", male: 20, female: 15 },
    { date: "09/10", male: 20, female: 15 },
    { date: "10/10", male: 20, female: 15 },
    { date: "11/10", male: 20, female: 15 },
    { date: "12/10", male: 20, female: 15 },

    // Thêm dữ liệu cho các ngày khác
  ];

  const labels = data.map((item) => item.date);
  const maleData = data.map((item) => ({ x: item.date, y: item.male }));
  const femaleData = data.map((item) => ({ x: item.date, y: item.female }));

  const [focusedBar, setFocusedBar] = useState(null);

  const handleBarPressIn = (datum) => {
    setFocusedBar(datum);
  };

  const handleBarPressOut = () => {
    setFocusedBar(null);
  };

  const [dataFill, setDataFill] = useState([
    { label: "Trong xưởng", value: 1 },
    { label: "Văn phòng", value: 2 },
    { label: "Nhà vệ sinh", value: 3 },
    { label: "Nhà Kho", value: 4 },
    { label: "Tầng Thượng", value: 5 },
    { label: "Sân Bãi", value: 6 },
    { label: "Cây dừa", value: 7 },
    { label: "Cây tre", value: 8 },
  ]);

  const markedDates = useRef({});

  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  useEffect(() => {
    const updatedMarkedDates = {};

    const start = new Date(startDate);
    const end = new Date(endDate);

    for (
      let date = new Date(start);
      date <= end;
      date.setDate(date.getDate() + 1)
    ) {
      const dateString = date.toISOString().split("T")[0];
      if (dateString === startDate) {
        updatedMarkedDates[dateString] = {
          color: colors.primary,
        };
      } else if (dateString === endDate) {
        updatedMarkedDates[dateString] = {
          color: colors.primary,
        };
      } else {
        updatedMarkedDates[dateString] = { color: "#e2b68b" };
      }

      //   updatedMarkedDates[dateString] = {
      //     selected: true,
      //     color: "blue",
      //   };
    }

    markedDates.current = updatedMarkedDates;
  }, [startDate, endDate]);

  const [showCalendar, setShowCalendar] = useState(false);
  return (
    <View style={{ flex: 1 }}>
      <ScrollView style={styles.container}>
        <View style={{ flex: 1, borderWidth: 1 }}>
          <View style={styles.titleChart}>
            <Text style={styles.textTitle}>Tiêu hao năng lượng</Text>
            <IconButton
              size={30}
              nameicon="document-text-outline"
              border={false}
            />
          </View>
          <View style={styles.fillControl}>
            <TouchableOpacity
              onPress={() => {
                LayoutAnimation.configureNext(
                  LayoutAnimation.Presets.easeInEaseOut
                );

                setShowCalendar(!showCalendar);
              }}
            >
              <Text>Ngày</Text>
            </TouchableOpacity>
            {showCalendar && (
              <Animated.View style={{ flex: 1 }}>
                <Calendar
                  style={{
                    flex: 1,
                    borderRadius: 10,
                    borderColor: colors.primary,
                    borderWidth: 1,
                    elevation: 2,
                    margin: 10,
                    paddingBottom: 30,
                  }}
                  current={startDate}
                  onDayPress={(day) => {
                    if (
                      startDate.toString() === "" &&
                      endDate.toString() === ""
                    ) {
                      setStartDate(day.dateString);
                    } else if (startDate.toString() !== "") {
                      setEndDate(day.dateString);
                    }
                  }}
                  markedDates={markedDates.current}
                  markingType={"period"}
                />
                <View
                  style={{
                    position: "absolute",
                    right: 20,
                    bottom: 10,
                    padding: 2,
                  }}
                >
                  <TouchableOpacity>
                    <Text style={{ fontSize: 20 }}>Ok</Text>
                  </TouchableOpacity>
                </View>
              </Animated.View>
            )}
          </View>
          <VictoryChart
            theme={VictoryTheme.material}
            domainPadding={20}
            width={windowWidth + 10} // Tùy chỉnh chiều rộng của biểu đồ
            height={windowHeight / 2} // Tùy chỉnh chiều cao của biểu đồ
            containerComponent={<Svg />}
          >
            <VictoryGroup offset={20}>
              <VictoryBar
                animate
                data={maleData}
                style={{
                  data: {
                    width: 20,
                    fill: "blue",
                  },
                }}

                //   labels={({ datum }) => `${datum.y}`}
              />
              <VictoryBar
                animate
                data={femaleData}
                style={{
                  data: {
                    width: 20,
                    fill: colors.primary,
                  },
                }}
                events={[
                  {
                    target: "data",
                    eventHandlers: {
                      onPress: () => {
                        alert(123);
                      },
                    },
                  },
                ]}

                //   labels={({ datum }) => `${datum.y}`}
              />
            </VictoryGroup>
            {/* <VictoryLegend
              x={windowWidth / 3} // Canh giữa theo chiều ngang
              orientation="horizontal"
              gutter={20}
              colorScale={["blue", "red"]}
              data={[{ name: "Nam" }, { name: "Nữ" }]}
            /> */}
          </VictoryChart>

          <View style={styles.legendContainer}>
            <View style={styles.legendContent}>
              <View
                style={{
                  width: 20,
                  height: 20,
                  backgroundColor: colors.primary,
                }}
              ></View>
              <Text style={styles.textLegend}>Tổng tiêu hao điện năng</Text>
            </View>

            <View style={styles.legendContent}>
              <View
                style={{
                  width: 20,
                  height: 20,
                  backgroundColor: "blue",
                }}
              ></View>
              <Text
                style={{
                  color: colors.black,
                  fontSize: 14,
                  fontWeight: "400",
                }}
              >
                Tổng công xuất
              </Text>
            </View>
          </View>
          {/* </VictoryContainer> */}
        </View>
      </ScrollView>
    </View>
  );
};

export default MyMotorWatch;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.backgroundColor,
    padding: 10,
  },
  legendContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    padding: 10,
  },

  legendContent: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  textLegend: {
    color: colors.black,
    fontSize: 14,
    fontWeight: "400",
  },

  titleChart: {
    padding: 10,
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
  },
  textTitle: {
    fontSize: 16,
    color: colors.black,
    fontWeight: "bold",
  },
});
