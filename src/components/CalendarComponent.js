import {
  View,
  Text,
  Animated,
  TouchableOpacity,
  LayoutAnimation,
} from "react-native";
import React, { useState, useEffect, memo } from "react";
import { Calendar, Agenda } from "react-native-calendars";
import colors from "../Common/colors";
import { windowHeight, windowWidth } from "../Common/dimentions";
import theme from "../Common/theme";
import LinearGradient from "react-native-linear-gradient";

const CalendarComponent = ({
  onClickDone,
  startDate,
  endDate,
  isLeft = false,
  isRight = false,
  placeholder = "Từ ngày - Đến ngày",
}) => {
  const [markedDates, setMarkedDates] = useState({});

  const [showCalendar, setShowcalendar] = useState(false);

  const [dateFromTo, setDateFromTo] = useState({
    startDate: startDate,
    endDate: endDate,
  });

  useEffect(() => {
    const updatedMarkedDates = {};

    const start = new Date(dateFromTo.startDate);
    const end = new Date(dateFromTo.endDate);

    for (
      let date = new Date(start);
      date <= end;
      date.setDate(date.getDate() + 1)
    ) {
      const dateString = date.toISOString().split("T")[0];
      if (dateString === dateFromTo.startDate) {
        updatedMarkedDates[dateString] = {
          color: colors.primary,
        };
      } else if (dateString === dateFromTo.endDate) {
        updatedMarkedDates[dateString] = {
          color: colors.primary,
        };
      } else {
        updatedMarkedDates[dateString] = { color: "#e2b68b" };
      }
    }

    setMarkedDates(updatedMarkedDates);
  }, [dateFromTo.startDate, dateFromTo.endDate]);

  const handleDayCalendar = (day) => {
    if (dateFromTo.endDate === day.dateString) {
      setDateFromTo({
        ...dateFromTo,
        startDate: day.dateString,
      });
    } else if (dateFromTo.startDate === day.dateString) {
      setDateFromTo({
        ...dateFromTo,
        endDate: day.dateString,
      });
    } else if (new Date(dateFromTo.startDate) < new Date(day.dateString)) {
      setDateFromTo({
        ...dateFromTo,
        endDate: day.dateString,
      });
    } else if (new Date(dateFromTo.startDate) > new Date(day.dateString)) {
      setDateFromTo({
        ...dateFromTo,
        startDate: day.dateString,
      });
    }
  };

  const handleShowCalendar = () => {
    LayoutAnimation.configureNext({
      duration: 500,
      create: {
        type: LayoutAnimation.Types.spring,
        property: LayoutAnimation.Properties.scaleXY,
        springDamping: 0.7,
      },
      update: {
        type: LayoutAnimation.Types.spring,
        springDamping: 0.7,
      },
      delete: {
        type: LayoutAnimation.Types.easeOut,
        property: LayoutAnimation.Properties.scaleXY,
      },
    });

    setDateFromTo({
      startDate: startDate,
      endDate: endDate,
    });
    setShowcalendar(!showCalendar);
  };

  return (
    <Animated.View
      style={{
        flex: 1,
      }}
    >
      <Text
        style={{
          position: "absolute",
          backgroundColor: colors.backgroundColor,
          left: 10,
          top: -8,
          zIndex: 999,
          paddingHorizontal: 8,
          fontSize: theme.fontSize,
          fontFamily: theme.fontFamily,
          color: showCalendar ? colors.primary : colors.black,
        }}
      >
        {placeholder}
      </Text>
      <TouchableOpacity
        style={{
          paddingHorizontal: 10,
          justifyContent: "center",
          height: windowHeight / 18,
          borderColor: showCalendar ? colors.primary : colors.border,
          borderWidth: 1,
          borderRadius: 5,
          shadowColor: "gray",
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.25,
          shadowRadius: 3.85,
          elevation: 5,
          backgroundColor: colors.backgroundColor,
        }}
        onPress={handleShowCalendar}
      >
        <Text style={[theme.font, { fontSize: 12 }]}>
          {dateFromTo.startDate} - {dateFromTo.endDate}
        </Text>
      </TouchableOpacity>

      {showCalendar && (
        <Animated.View
          style={{
            left: isRight ? -windowWidth / 2 : 0,
            right: isLeft ? -windowHeight / 2 : -10,
            position: "absolute",
            top: windowHeight / 18,
          }}
        >
          <Calendar
            style={{
              borderRadius: 10,
              borderColor: colors.primary,
              borderWidth: 1,
              elevation: 2,
              margin: 10,
              paddingBottom: 30,
            }}
            current={dateFromTo.startDate}
            markedDates={markedDates}
            markingType={"period"}
            onDayPress={handleDayCalendar}
            onDayLongPress={handleDayCalendar}
          />

          <View
            style={{
              position: "absolute",
              right: 20,
              bottom: 10,
              padding: 5,
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <TouchableOpacity
              onPress={handleShowCalendar}
              style={{
                backgroundColor: colors.gray,
                alignItems: "center",
                justifyContent: "center",
                borderRadius: 2,
                width: 50,
                height: 30,
              }}
            >
              <Text
                style={{
                  fontSize: 14,
                  color: colors.white,
                  fontFamily: theme.fontFamily,
                  fontWeight: "700",
                }}
              >
                Cancel
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                onClickDone(dateFromTo);
                setShowcalendar(false);
              }}
            >
              <LinearGradient
                start={{ x: 0, y: 0 }}
                end={{ x: 2, y: 0 }}
                colors={colors.colorButton}
                style={{
                  backgroundColor: "red",
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: 3,
                  marginLeft: 10,
                  width: 50,
                  height: 30,
                }}
              >
                <Text
                  style={{
                    fontSize: 14,
                    color: colors.white,
                    fontFamily: theme.fontFamily,
                    fontWeight: "700",
                  }}
                >
                  Done
                </Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </Animated.View>
      )}
    </Animated.View>
  );
};

export default memo(CalendarComponent);
