import React, {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useMemo,
  useState,
} from "react";
import { useForm, UseFormReturn } from "react-hook-form";
import { TemplateModal } from "../components/TemplateModal";

export interface Set {
  key: string;
  previous?: string;
  weight?: number;
  repRange?: {
    minReps: number;
    maxReps: number;
  };
  done?: number;
}

export interface Exercise {
  key: string;
  label: string;
  imageUri: string;
  sets: Set[];
}
export interface FormValues {
  image: string;
  workoutName: string;
  description: string;
  exercises: Exercise[];
}

const Context = createContext<{
  form: UseFormReturn<FormValues>;
  selectedExercise: [
    Exercise | null,
    Dispatch<SetStateAction<Exercise | null>>,
  ];
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
  const [selectedExercise, setSelectedExercise] = useState<Exercise | null>(
    null
  );

  const contextValue = useMemo(
    () => ({
      form,
      selectedExercise: [selectedExercise, setSelectedExercise] as [
        Exercise | null,
        Dispatch<SetStateAction<Exercise | null>>,
      ],
    }),
    [form, selectedExercise]
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

export const WorkoutFormWrapper = () => {
  return (
    <WorkoutFormProvider>
      <TemplateModal />
    </WorkoutFormProvider>
  );
};

export { useWorkoutFormContext, WorkoutFormProvider };
