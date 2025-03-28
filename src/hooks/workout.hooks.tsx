import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect } from "react";
import { useAppContext } from "../contexts/AppContext.context";
import { useWorkoutFormContext } from "../contexts/WorkoutForm.context";
import { Template } from "../entities/template.entity";
import { User } from "../entities/user.entity";
import { useLazyGetLatestWorkoutQuery } from "../store/apis/serverApi";
import { formatTemplateToFormValues } from "../utils/formatActions";

export const useInitializeForm = (template: Template | undefined): boolean => {
  const [getLatestWorkout, { isFetching }] = useLazyGetLatestWorkoutQuery();
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
            ? formatTemplateToFormValues(template, latestWorkout).exercises
            : []
        );
      }
    })();
  }, [template]);

  return isFetching;
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
