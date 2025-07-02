import { BottomSheetModal } from "@gorhom/bottom-sheet";
import React, {
  createContext,
  Dispatch,
  JSX,
  RefObject,
  SetStateAction,
  useContext,
  useMemo,
  useRef,
  useState,
} from "react";
import { useForm, UseFormReturn } from "react-hook-form";
import { TextInput } from "react-native";
import { ICarouselInstance } from "react-native-reanimated-carousel";
import { useTextInputRefsMatrix } from "../hooks/textInputRefsMatrix.hook";

export interface FormWorkoutSet {
  key: string;
  previous?: string;
  weight: number;
  minReps: number;
  maxReps: number;
  isSecondary: boolean;
  done?: number;
}

export interface FormExercise {
  key: string;
  label: string;
  imageUri: string;
  timer?: string;
  notes?: string;
  sets: FormWorkoutSet[];
}
export interface FormValues {
  image: string;
  totalTime: number;
  workoutName: string;
  description: string;
  exercises: FormExercise[];
}

export interface TextInputRef {
  ref: RefObject<TextInput | null>;
  isReady: boolean;
}

const Context = createContext<{
  form: UseFormReturn<FormValues>;
  currExerciseIndex: [number, Dispatch<SetStateAction<number>>];
  currSetIndex: [number, Dispatch<SetStateAction<number>>];
  activeWorkoutModalRef: RefObject<BottomSheetModal | null>;
  carouselRef: RefObject<ICarouselInstance | null>;
  isMainSet: [number, Dispatch<SetStateAction<number>>];
  textInputRefs: TextInputRef[][];
} | null>(null);

const WorkoutFormProvider = ({ children }: { children: JSX.Element }) => {
  const form = useForm<FormValues>({
    defaultValues: { totalTime: 0, exercises: [] },
  });
  const [currExerciseIndex, setCurrExerciseIndex] = useState<number>(0);
  const [currSetIndex, setCurrSetIndex] = useState<number>(-2);
  const activeWorkoutModalRef = useRef<BottomSheetModal>(null);
  const carouselRef = useRef<ICarouselInstance | null>(null);
  const [isMainSetType, setIsMainSetType] = useState<number>(1);
  const textInputRefs: TextInputRef[][] = useTextInputRefsMatrix(form);

  const contextValue = useMemo(
    () => ({
      form,
      currExerciseIndex: [currExerciseIndex, setCurrExerciseIndex] as [
        number,
        Dispatch<SetStateAction<number>>,
      ],
      currSetIndex: [currSetIndex, setCurrSetIndex] as [
        number,
        Dispatch<SetStateAction<number>>,
      ],
      activeWorkoutModalRef,
      carouselRef,
      isMainSet: [isMainSetType, setIsMainSetType] as [
        number,
        Dispatch<SetStateAction<number>>,
      ],
      textInputRefs,
    }),
    [
      form,
      currExerciseIndex,
      currSetIndex,
      activeWorkoutModalRef,
      isMainSetType,
      textInputRefs,
      carouselRef,
    ]
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
