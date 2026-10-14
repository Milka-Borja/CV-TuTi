// components/DateField.tsx
import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Platform } from "react-native";
import DateTimePicker, { DateTimePickerEvent } from "@react-native-community/datetimepicker";
import { TuTiTheme } from "../constants/theme";

interface DateFieldProps {
  label: string;
  value: string;
  onChangeDate: (dateString: string) => void;
  error?: string;
}

export const DateField: React.FC<DateFieldProps> = ({ label, value, onChangeDate, error }) => {
  const [show, setShow] = useState(false);
  const dateValue = value ? new Date(value) : new Date();

  const handleChange = (event: DateTimePickerEvent, selectedDate?: Date) => {
    setShow(Platform.OS === "ios");
    if (selectedDate) {
      // Formatear la fecha a YYYY-MM-DD o el formato deseado
      const formattedDate = selectedDate.toISOString().split("T")[0];
      onChangeDate(formattedDate);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <TouchableOpacity style={[styles.input, error && styles.inputError]} onPress={() => setShow(true)}>
        <Text style={[styles.text, !value && styles.placeholder]}>
          {value || "Selecciona una fecha (YYYY-MM-DD)"}
        </Text>
      </TouchableOpacity>
      {error && <Text style={styles.errorText}>{error}</Text>}

      {show && (
        <DateTimePicker
          value={dateValue}
          mode="date"
          display="default"
          onChange={handleChange}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    color: TuTiTheme.textMain,
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: TuTiTheme.border,
    borderRadius: 6,
    padding: 12,
    backgroundColor: TuTiTheme.card,
    justifyContent: "center",
  },
  text: {
    fontSize: 16,
    color: TuTiTheme.textMain,
  },
  placeholder: {
    color: TuTiTheme.placeholder,
  },
  inputError: {
    borderColor: TuTiTheme.error,
  },
  errorText: {
    color: TuTiTheme.error,
    fontSize: 12,
    marginTop: 4,
  },
});