import { FC } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Dimensions,
  FlatList,
} from "react-native";
import { WorkoutTemplate } from "../components/WorkoutTemplate";
import { SafeAreaView } from "react-native-safe-area-context";
import { Template } from "../../types/template";
import AnimatedFlatList from "../components/AnimatedFlatList";

const templates: Template[] = [
  {
    id: 1,
    name: "Push x Abs",
    uri: "https://legacy.reactjs.org/logo-og.png",
  },
  {
    id: 2,
    name: "Pull x Legs",
    uri: "https://legacy.reactjs.org/logo-og.png",
  },
  {
    id: 3,
    name: "Pull x Legs",
    uri: "https://legacy.reactjs.org/logo-og.png",
  },
  {
    id: 4,
    name: "Pull x Legs",
    uri: "https://legacy.reactjs.org/logo-og.png",
  },
  {
    id: 0,
    name: "",
    uri: "https://w7.pngwing.com/pngs/626/231/png-transparent-addition-add-sign-s-purple-violet-rectangle.png",
  },
];

export const HomeScreen: FC<{ navigation: any }> = ({ navigation }) => {
  return (
    <SafeAreaView>
      <ScrollView className="bg-primary h-full ">
        <View className="mt-3 px-4">
          <Text className="text-3xl font-pblack color-secondary-200">
            My Templates
          </Text>
        </View>
        <View className="justify-center items-center ">
          <AnimatedFlatList
            data={templates}
            renderItem={({ item }) => <WorkoutTemplate template={item} />}
            horizontal={true}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
