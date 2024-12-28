import { FC } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Dimensions,
  FlatList,
} from "react-native";
import { SessionTemplate } from "../components/SessionTemplate";
import { SafeAreaView } from "react-native-safe-area-context";
import { Template } from "../../types/template";
import AnimatedFlatList from "../components/AnimatedFlatList";

const templates: Template[] = [
  {
    id: 1,
    name: "Push x Abs",
    uri: "https://www.vecteezy.com/vector-art/17459613-hand-holding-dumbbell-barbell-gym-bodybuilding-or-sport-design-vector-illustration",
  },
  {
    id: 2,
    name: "Pull x Legs",
    uri: "https://www.vecteezy.com/vector-art/17459613-hand-holding-dumbbell-barbell-gym-bodybuilding-or-sport-design-vector-illustration",
  },
  {
    id: 3,
    name: "Pull x Legs",
    uri: "https://www.vecteezy.com/vector-art/17459613-hand-holding-dumbbell-barbell-gym-bodybuilding-or-sport-design-vector-illustration",
  },
  {
    id: 4,
    name: "Pull x Legs",
    uri: "https://www.vecteezy.com/vector-art/17459613-hand-holding-dumbbell-barbell-gym-bodybuilding-or-sport-design-vector-illustration",
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
            renderItem={({ item }) => <SessionTemplate template={item} />}
            horizontal={true}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
