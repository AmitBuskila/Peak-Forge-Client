import React, { createContext, useContext, useMemo } from "react";
import { useForm, UseFormReturn } from "react-hook-form";
import { TemplateModal } from "../components/TemplateModal";

export interface Set {
  index: number;
  previous?: string;
  weight: number;
  repRange: {
    minReps: number;
    maxReps: number;
  };
  done?: number;
}

export interface Exercise {
  index: number;
  sets: Set[];
}
export interface FormValues {
  image: string;
  workoutName: string;
  description: string;
  exercises: Exercise[];
}

const Context = createContext<{ form: UseFormReturn<FormValues> } | null>(null);

const WorkoutFormProvider = ({ children }: { children: JSX.Element }) => {
  const form = useForm<FormValues>();

  const contextValue = useMemo(
    () => ({
      form,
    }),
    [form]
  );

  return <Context.Provider value={contextValue}>{children}</Context.Provider>;
};

const useWorkoutFormContext = () => {
  const context = useContext(Context);
  if (!context) {
    throw new Error("context must be used within a provider");
  }
  return context.form;
};

export const WorkoutFormWrapper = () => {
  return (
    <WorkoutFormProvider>
      <TemplateModal />
    </WorkoutFormProvider>
  );
};

export { useWorkoutFormContext, WorkoutFormProvider };
