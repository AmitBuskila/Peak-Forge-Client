import { SetStateAction, useEffect, Dispatch } from "react";
import {
  FormExercise,
  useWorkoutFormContext,
} from "../contexts/WorkoutForm.context";
import { Template } from "../entities/template.entity";
import { useLazyGetLatestWorkoutQuery } from "../store/apis/serverApi";
import { formatWorkoutToFormValues } from "../utils/formatActions";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { User } from "../entities/user.entity";
import { useAppContext } from "../contexts/AppContext.context";
import { getRestTime } from "./getRestTime.hook";
import { useWatch } from "react-hook-form";

export const useInitializeForm = (template: Template | undefined) => {
  const [getLatestWorkout] = useLazyGetLatestWorkoutQuery();
  const { setValue } = useWorkoutFormContext().form;
  const [_, setIsMainSetType] = useWorkoutFormContext().isMainSet;
  const [__, setCurrExerciseIndex] = useWorkoutFormContext().currExerciseIndex;

  useEffect(() => {
    (async () => {
      if (template) {
        setIsMainSetType(1);
        setCurrExerciseIndex(0);
        const latestWorkout = await getLatestWorkout(template.id).unwrap();
        setValue(
          "exercises",
          template
            ? formatWorkoutToFormValues(template, latestWorkout).exercises
            : []
        );
      }
    })();
  }, [template]);
};

export const useLoadUnsavedWorkout = (user: User | null) => {
  const modalRef = useAppContext().activeWorkoutModalRef;
  const [_, setActiveWorkout] = useAppContext().activeWorkout;

  useEffect(() => {
    (async () => {
      const activeWorkout: string | null =
        await AsyncStorage.getItem("activeWorkout");
      if (activeWorkout && user?.templates.length) {
        setActiveWorkout(JSON.parse(activeWorkout));
        modalRef.current?.present();
      }
    })();
  }, [user?.id]);
};

export const useLoadUnsavedData = () => {
  const { reset } = useWorkoutFormContext().form;

  useEffect(() => {
    (async () => {
      const workoutData: string | null =
        await AsyncStorage.getItem("workoutData");
      if (workoutData) {
        //todo make it not shitty with timeout
        const timer = setTimeout(() => {
          reset(JSON.parse(workoutData));
        }, 2000);
        return () => clearTimeout(timer);
      }
    })();
  }, []);
};

export const useProgressWorkout = ({
  setDuration,
  setTimerKey,
}: {
  setDuration: Dispatch<SetStateAction<number>>;
  setTimerKey: Dispatch<SetStateAction<number>>;
}) => {
  const { control, getValues } = useWorkoutFormContext().form;
  const exercises: FormExercise[] = useWatch({ control, name: "exercises" });
  const [activeWorkout] = useAppContext().activeWorkout;

  const doneStates: (number | undefined)[][] = exercises?.map((exercise) =>
    exercise?.sets?.map((set) => set.done)
  );
  useEffect(() => {
    if (activeWorkout) {
      const restTime: number = getRestTime(exercises);
      setDuration(restTime);
      setTimerKey((prev: number) => prev + 1);
      AsyncStorage.setItem("workoutData", JSON.stringify(getValues()));
    }
  }, [JSON.stringify(doneStates)]);
};
