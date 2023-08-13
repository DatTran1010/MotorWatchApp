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
import React, { useEffect, useRef, useState, useCallback } from "react";
import {
    VictoryChart,
    VictoryBar,
    VictoryTheme,
    VictoryLegend,
    VictoryGroup,
    VictoryContainer,
} from "victory-native";
import { Svg } from "react-native-svg";
import { Calendar } from "react-native-calendars";

import colors from "../../../Common/colors";
import { windowHeight, windowWidth } from "../../../Common/dimentions";
import IconButton from "../../../components/IconButton";
import ConsumtionChart from "./ConsumtionChart";
import CalendarComponent from "../../../components/CalendarComponent";

const Consumption = () => {
    //#region  State

    const [data, setData] = useState([
        { date: "07/10", male: 60, female: 25 },
        { date: "08/10", male: 20, female: 15 },
        { date: "09/10", male: 20, female: 15 },
        { date: "10/10", male: 20, female: 15 },
        { date: "11/10", male: 20, female: 15 },
        { date: "12/10", male: 20, female: 15 },
    ]);
    const [showCalendar, setShowCalendar] = useState(false);
    const [dateToFrom, setDateToFrom] = useState({
        startDate: "2023-08-12",
        endDate: "2023-08-12",
    });

    //#endregion

    const handleShowCaledar = () => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);

        setShowCalendar(!showCalendar);
    };

    const handleDoneDateCalendar = (date) => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        setDateToFrom(date);
        setShowCalendar(false);
    };

    const handlCancelDateCalendar = () => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        setShowCalendar(false);
    };

    return (
        <View style={{ flex: 1, backgroundColor: colors.white }}>
            <View
                style={{
                    flex: 1,
                    borderWidth: 1,
                    borderRadius: 5,
                    borderColor: colors.border,
                    shadowColor: "gray",
                    shadowOffset: { width: 0, height: 2 },
                    shadowOpacity: 0.25,
                    shadowRadius: 3.85,
                    elevation: 5,
                    marginBottom: 10,
                    backgroundColor: colors.white,
                }}
            >
                <View style={styles.titleChart}>
                    <Text style={styles.textTitle}>Tiêu hao năng lượng</Text>
                    <IconButton
                        size={30}
                        nameicon="document-text-outline"
                        border={false}
                    />
                </View>
                <View style={styles.fillControl}>
                    <TouchableOpacity onPress={handleShowCaledar}>
                        <Text>
                            Tuần 30 (Ngày {dateToFrom.startDate} -{" "}
                            {dateToFrom.endDate})
                        </Text>
                    </TouchableOpacity>
                    {showCalendar && (
                        <CalendarComponent
                            onClickDone={handleDoneDateCalendar}
                            onClickCancel={handlCancelDateCalendar}
                            startDate={dateToFrom.startDate}
                            endDate={dateToFrom.endDate}
                        />
                    )}
                </View>
                {data && <ConsumtionChart data={data} />}

                <View style={styles.legendContainer}>
                    <View style={styles.legendContent}>
                        <View
                            style={{
                                width: 20,
                                height: 20,
                                backgroundColor: colors.primary,
                            }}
                        ></View>
                        <Text style={styles.textLegend}>
                            Tổng tiêu hao điện năng
                        </Text>
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
            </View>
        </View>
    );
};

export default Consumption;

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
        justifyContent: "space-between",
        alignItems: "center",
        flexDirection: "row",
        padding: 10,
    },
    fillControl: {
        paddingHorizontal: 10,
    },
    textTitle: {
        fontSize: 16,
        color: colors.black,
        fontWeight: "bold",
    },
});
