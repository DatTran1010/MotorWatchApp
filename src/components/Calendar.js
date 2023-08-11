import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Keyboard,
  TouchableOpacity,
  Platform,
} from 'react-native';
import React, {useState, useContext} from 'react';
// import { Calendar, LocaleConfig } from "react-native-calendars";
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import moment from 'moment';
import Ionicons from 'react-native-vector-icons/Ionicons';

import colors from '../Common/colors';
import {windowHeight} from '../Common/dimentions';
const CalendarCustom = ({
  mode,
  format,
  date,
  setDateDNgay,
  placeholder,
  ...props
}) => {
  const [focus, setFocus] = useState(false);
  const renderLabel = () => {
    if (date != '' || focus) {
      return (
        <Text style={[styles.label, focus && {color: colors.primary}]}>
          {placeholder}
        </Text>
      );
    }
    return null;
  };
  return (
    <>
      {renderLabel()}
      <TouchableOpacity
        style={[
          styles.container,
          {
            borderColor: focus ? colors.primary : colors.border,
            flexDirection: 'row',
            alignItems: 'center',
          },
        ]}
        onPress={() => {
          setFocus(true);
        }}>
        <Text
          style={{
            width: '100%',
            height: '100%',
            justifyContent: 'center',
            fontSize: 16,
            paddingTop: 12,
          }}
          // onFocus={() => {
          //     setFocus(true);
          // }}
          // onBlur={() => {
          //     setFocus(false);
          // }}
          {...props}>
          {moment(date).format(format === undefined ? 'DD/MM/YYYY' : format)}
        </Text>
        <View style={styles.iconCalendar}>
          <Ionicons name="calendar-outline" size={25} />
        </View>
      </TouchableOpacity>

      {focus && (
        <View
          style={{
            flex: 1,
          }}>
          {/* <Calendar
                        style={{
                            flex: 1,
                            borderRadius: 5,
                            borderColor: colors.primary,
                            borderWidth: 1,
                            top: 0,
                            marginTop: 5,
                            position: "absolute",
                        }}
                        onDayPress={(day) => {}}
                        initialDate={"2023-05-30"}
                    /> */}
          <DateTimePickerModal
            display={Platform.OS === 'ios' ? 'inline' : 'default'}
            isVisible={focus}
            mode={mode === undefined ? 'date' : 'datetime'}
            onConfirm={date => {
              setDateDNgay(date);
              setFocus(false);
            }}
            onCancel={() => {
              setFocus(false);
            }}
            is24Hour={true}
          />
        </View>
      )}
    </>
  );
};

export default CalendarCustom;
const styles = StyleSheet.create({
  container: {
    height: windowHeight / 18,
    justifyContent: 'center',
    paddingHorizontal: 10,
    borderRadius: 5,
    backgroundColor: colors.backgroundColor,
    shadowColor: 'gray',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 3.85,
    elevation: 5,
    borderWidth: 1,
  },
  iconCalendar: {
    position: 'absolute',
    right: 10,
  },
  label: {
    position: 'absolute',
    backgroundColor: colors.backgroundColor,
    left: 10,
    top: -8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
  },
});
