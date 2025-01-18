import { useHeaderHeight } from "@react-navigation/elements";
import { useState } from "react";
import { SafeAreaView, View, Button, Text } from "react-native";

export const ActiveWorkout = () => {
  const [expanded, setExpanded] = useState(false);
  const headerHeight = useHeaderHeight(); // to get the current height of the header

  return (
    <SafeAreaView style={{ flex: 1 }}>
      {/* Header with Toggle Button */}
      <View
        style={{
          height: headerHeight,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Button
          title={expanded ? "Collapse" : "Expand"}
          onPress={() => setExpanded((prev) => !prev)}
        />
      </View>

      {/* Content Area */}
      <View
        style={{
          flex: 1,
          paddingTop: headerHeight,
          backgroundColor: expanded ? "skyblue" : "white",
        }}
      >
        <Text>{expanded ? "Full Screen Content" : "Collapsed Content"}</Text>
      </View>
    </SafeAreaView>
  );
};
