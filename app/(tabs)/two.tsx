
import EmergencyLocation from "@/components/EmergencyLocation";
import { StyleSheet } from "react-native";

import { View, Text } from "react-native";

export default function TabTwoScreen() {
  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        height: "100%",
        width: "100%",
      }}
    >
      <EmergencyLocation />
     
    </View>
  );
}
