export interface Workout {
  id: number;
  name: string;
  description?: string;
  templateImage: string;
  workoutImage?: string;
  exercises: Exercise[];
}

export interface Set {
  id: number;
  previous?: string;
  weight: number;
  minReps: number;
  maxReps: number;
  done?: number;
}

export interface Exercise {
  id: number;
  label: string;
  imageUri: string;
  sets: Set[];
  timer?: string;
  notes?: string;
}
