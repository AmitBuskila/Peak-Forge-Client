import { FormValues } from "../contexts/WorkoutForm.context";
import { Set } from "../entities/set.entity";
import { Template } from "../entities/template.entity";
import { Workout } from "../entities/workout.entity";

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
    workoutExercises: data.exercises.map((formExercise, index) => ({
      exercise: { id: formExercise.key },
      index,
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
  template: Template,
  latestWorkout: Workout | null
): Omit<FormValues, "totalTime"> => {
  return {
    workoutName: template.name,
    description: template.description || "",
    image: template.image || "",
    exercises: template.workoutExercises.map(
      (workoutExercise, exerciseIndex) => ({
        imageUri: workoutExercise.exercise?.image || "",
        label: workoutExercise.exercise?.name || "",
        notes: workoutExercise.notes,
        timer: workoutExercise.restTime,
        key: workoutExercise.exercise?.id.toString() || "",
        sets: workoutExercise.sets.map((set, setIndex) => {
          const previousSet: Set | undefined =
            latestWorkout?.workoutExercises[exerciseIndex].sets[setIndex];
          return {
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
      })
    ),
  };
};
