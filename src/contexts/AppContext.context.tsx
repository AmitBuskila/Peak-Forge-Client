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
import { Template } from "../entities/template.entity";
import { TimerProps } from "../../types/template";

const Context = createContext<{
  activeWorkout: [Template | null, Dispatch<SetStateAction<Template | null>>];
  activeWorkoutModalRef: RefObject<BottomSheetModal>;
  timer: [TimerProps, Dispatch<SetStateAction<TimerProps>>];
} | null>(null);

const AppProvider = ({ children }: { children: JSX.Element }) => {
  const [activeWorkout, setActiveWorkout] = useState<Template | null>(null);
  const activeWorkoutModalRef = useRef<BottomSheetModal>(null);
  const [timer, setTimer] = useState<TimerProps>({
    key: 0,
    duration: 0,
  });

  const contextValue = useMemo(
    () => ({
      activeWorkoutModalRef,
      activeWorkout: [activeWorkout, setActiveWorkout] as [
        Template | null,
        Dispatch<SetStateAction<Template | null>>,
      ],
      timer: [timer, setTimer] as [
        TimerProps,
        Dispatch<SetStateAction<TimerProps>>,
      ],
    }),
    [activeWorkout, activeWorkoutModalRef, timer]
  );

  return <Context.Provider value={contextValue}>{children}</Context.Provider>;
};

const useAppContext = () => {
  const context = useContext(Context);
  if (!context) {
    throw new Error("context must be used within a provider");
  }
  return context;
};

export { AppProvider, useAppContext };
