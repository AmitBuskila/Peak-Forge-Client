import { BottomSheetModal } from "@gorhom/bottom-sheet";
import React, {
  createContext,
  Dispatch,
  RefObject,
  SetStateAction,
  useContext,
  useMemo,
  useRef,
  useState,
} from "react";
import { useForm, UseFormReturn } from "react-hook-form";

export interface FormWorkoutSet {
  key: string;
  previous?: string;
  weight: number;
  minReps: number;
  maxReps: number;
  done?: number;
}

export interface FormExercise {
  key: string;
  label: string;
  imageUri: string;
  sets: FormWorkoutSet[];
}
export interface FormValues {
  image: string;
  workoutName: string;
  description: string;
  exercises: FormExercise[];
}

const Context = createContext<{
  form: UseFormReturn<FormValues>;
  currExerciseIndex: [number, Dispatch<SetStateAction<number>>];
  activeWorkoutModalRef: RefObject<BottomSheetModal>;
} | null>(null);

const WorkoutFormProvider = ({ children }: { children: JSX.Element }) => {
  const form = useForm<FormValues>({
    defaultValues: {
      workoutName: "",
      description: "",
      image: "",
      exercises: [],
    },
  });
  const [currExerciseIndex, setCurrExerciseIndex] = useState<number>(0);
  const activeWorkoutModalRef = useRef<BottomSheetModal>(null);

  const contextValue = useMemo(
    () => ({
      form,
      currExerciseIndex: [currExerciseIndex, setCurrExerciseIndex] as [
        number,
        Dispatch<SetStateAction<number>>,
      ],
      activeWorkoutModalRef,
    }),
    [form, currExerciseIndex, activeWorkoutModalRef]
  );

  return <Context.Provider value={contextValue}>{children}</Context.Provider>;
};

const useWorkoutFormContext = () => {
  const context = useContext(Context);
  if (!context) {
    throw new Error("context must be used within a provider");
  }
  return context;
};

export { useWorkoutFormContext, WorkoutFormProvider };
