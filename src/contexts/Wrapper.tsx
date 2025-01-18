import { TemplateModal } from "../components/Workouts/TemplateModal";
import { WorkoutFormProvider } from "./WorkoutForm.context";

//todo make provider as should
export const WorkoutFormWrapper = () => {
  return (
    <WorkoutFormProvider>
      <TemplateModal />
    </WorkoutFormProvider>
  );
};
