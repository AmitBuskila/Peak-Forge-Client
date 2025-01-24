import { Exercise, Set, Workout } from "../../types/template";
import { FormValues } from "../contexts/WorkoutForm.context";

export const formatWorkoutTemplate = (data: FormValues): Workout => {
  return {
    id: new Date().getTime(),
    name: data.workoutName,
    description: data?.description || "",
    templateImage: data?.image || "",
    exercises: data.exercises.map((formExercise) => {
      const { key, ...exercise } = formExercise;
      const sets: Set[] = exercise.sets.map((formSet) => {
        const { key, ...set } = formSet;
        return { id: new Date().getTime(), ...set };
      });
      const newExercise: Exercise = {
        id: new Date().getTime(),
        ...exercise,
        sets,
      };
      return newExercise;
    }),
  };
};

export const formatWorkoutToFormValues = (workout: Workout): FormValues => {
  return {
    workoutName: workout.name,
    description: workout.description || "",
    image: workout.templateImage || "",
    exercises: workout.exercises.map((exercise) => ({
      ...exercise,
      key: exercise.id.toString(),
      sets: exercise.sets.map((set) => ({
        ...set,
        key: set.id.toString(),
      })),
    })),
  };
};
