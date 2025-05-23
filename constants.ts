import { Dimensions } from "react-native";

export const screenWidth = Dimensions.get("window").width;
export const screenHeight = Dimensions.get("window").height;
export const weightUnit: "weight" = "weight"; //PROD TODO: implement select unit
export const muscles = [
  "Chest",
  "Shoulders",
  "Triceps",
  "Biceps",
  "Forearms",
  "Traps",
  "Back",
  "Core",
  "Hip Flexors",
  "Quadriceps",
  "Hamstrings",
  "Glutes",
  "Calves",
];

export const generalMuscles = [
  "Chest",
  "Shoulders",
  "Triceps",
  "Back",
  "Biceps",
  "Legs",
  "Glutes",
  "Core",
];
