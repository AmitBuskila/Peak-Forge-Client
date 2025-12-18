import { FormWorkoutSet } from "../../../contexts/WorkoutForm.context";
import { Workout } from "../../../entities/workout.entity";

export const getFlexResolver = (
  isWorkout: boolean
): Partial<Record<keyof FormWorkoutSet, number>> => ({
  key: isWorkout ? 0.7 : 0.5,
  previous: 2,
  weight: isWorkout ? 1 : 2,
  maxReps: isWorkout ? 3.5 : 2,
  done: 1.2,
});
