import { FormValues } from "../contexts/WorkoutForm.context";
import { Set } from "../entities/set.entity";
import { Template } from "../entities/template.entity";
import { Workout } from "../entities/workout.entity";
import { WorkoutExercise } from "../entities/workoutExercise.entity";

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
    workoutExercises: data.exercises.map((formExercise, index) => {
      return {
        index,
        exercise: { id: +formExercise.key },
        restTime: formExercise.timer,
        notes: formExercise.notes,
        sets: formExercise.sets.map((formSet) => {
          return {
            isSecondary: formSet.isSecondary,
            minReps: +formSet.minReps,
            maxReps: +formSet.maxReps,
            weight: +formSet.weight,
            repsDone: Number(
              formSet.done || formSet.previous?.split("X")[1].trim()
            ),
          };
        }),
      };
    }),
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
    workoutExercises: data.exercises.map((formExercise, index) => ({
      exercise: {
        id: +formExercise.key,
        image: formExercise.imageUri,
        name: formExercise.label,
      },
      index,
      restTime: formExercise.timer,
      notes: formExercise.notes,
      sets: formExercise.sets.map((formSet, index) => ({
        index,
        isSecondary: formSet.isSecondary,
        minReps: +formSet.minReps,
        maxReps: +formSet.maxReps,
        weight: +formSet.weight,
      })),
    })),
  };
};

export const formatTemplateToFormValues = (
  template: Template,
  latestWorkout: Workout | null
): Omit<FormValues, "totalTime"> => {
  return {
    workoutName: template.name,
    description: template.description || "",
    image: template.image || "",
    exercises: template.workoutExercises.map((workoutExercise) => {
      const latestWorkoutExercise: WorkoutExercise | undefined =
        latestWorkout?.workoutExercises.find(
          (prevExercise) =>
            prevExercise.exercise?.id === workoutExercise.exercise?.id
        );

      return {
        imageUri: workoutExercise.exercise?.image || "",
        label: workoutExercise.exercise?.name || "",
        notes: latestWorkoutExercise?.notes || workoutExercise.notes,
        timer: workoutExercise.restTime,
        key: workoutExercise.exercise?.id.toString() || "",
        sets: workoutExercise.sets.map((set, setIndex) => {
          const previousSet: Set | undefined =
            latestWorkoutExercise?.sets[setIndex];
          return {
            isSecondary: set.isSecondary,
            weight: set.weight,
            previous: previousSet?.repsDone
              ? parseFloat(previousSet?.weight?.toString() || "") +
                " X " +
                previousSet?.repsDone?.toString()
              : undefined,
            minReps: set.minReps,
            maxReps: set.maxReps,
            key: set.id.toString(),
          };
        }),
      };
    }),
  };
};
