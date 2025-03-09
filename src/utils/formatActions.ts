import { Exercise, Set, Workout } from "../../types/template";
import { FormValues } from "../contexts/WorkoutForm.context";
import { Template } from "../entities/template.entity";

//todo create return type
export const formatWorkoutToServer = (
  data: FormValues,
  userId: number,
  templateId: number
): any => {
  return {
    userId,
    templateId,
    totalTime: data.totalTime,
    startDate: new Date(new Date().getTime() - data.totalTime * 1000),
    workoutExercises: data.exercises.map((formExercise, index) => ({
      index,
      exercise: { id: formExercise.key },
      restTime: formExercise.timer,
      notes: formExercise.notes,
      sets: formExercise.sets.map((formSet) => ({
        minReps: +formSet.minReps,
        maxReps: +formSet.maxReps,
        weight: +formSet.weight,
        ...(formSet.done && { repsDone: +formSet.done }),
      })),
    })),
  };
};

export const formatTemplateToServer = (
  data: FormValues,
  userId: number
): any => {
  return {
    name: data.workoutName,
    description: data.description,
    image: data.image,
    userId,
    workoutExercises: data.exercises.map((formExercise) => ({
      exercise: { id: formExercise.key },
      restTime: formExercise.timer,
      notes: formExercise.notes,
      sets: formExercise.sets.map((formSet) => ({
        minReps: +formSet.minReps,
        maxReps: +formSet.maxReps,
        weight: +formSet.weight,
      })),
    })),
  };
};

export const formatWorkoutToFormValues = (
  workout: Template
): Omit<FormValues, "totalTime"> => {
  return {
    workoutName: workout.name,
    description: workout.description || "",
    image: workout.image || "",
    exercises: workout.workoutExercises.map((workoutExercise) => ({
      imageUri: workoutExercise.exercise?.image || "",
      label: workoutExercise.exercise?.name || "",
      notes: workoutExercise.notes,
      timer: workoutExercise.restTime,
      key: workoutExercise.exercise?.id.toString() || "",
      sets: workoutExercise.sets.map((set) => ({
        weight: set.weight,
        minReps: set.minReps,
        maxReps: set.maxReps,
        key: set.id.toString(),
      })),
    })),
  };
};
