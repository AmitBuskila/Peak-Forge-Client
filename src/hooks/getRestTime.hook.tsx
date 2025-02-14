import { FormExercise } from "../contexts/WorkoutForm.context";

export const timeStringToSeconds = (time: string): number => {
  const parts = time.split(":").map(Number);
  return parts.length === 3
    ? parts[0] * 3600 + parts[1] * 60 + parts[2]
    : parts[0] * 60 + parts[1];
};

export const getRestTime = (exercises: FormExercise[]): number => {
  for (
    let exerciseIndex = 0;
    exerciseIndex < exercises.length;
    exerciseIndex++
  ) {
    const exercise = exercises[exerciseIndex];
    for (let setIndex = 0; setIndex < exercise.sets.length; setIndex++) {
      if (!exercise.sets[setIndex].done) {
        if (exerciseIndex === 0 && setIndex === 0) {
          return 0;
        }
        return timeStringToSeconds(exercise?.timer || "1:00");
      }
    }
  }
  return 0;
};
