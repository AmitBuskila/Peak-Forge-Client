export interface Template {
  id: number;
  name: string;
  uri: string;
}

export interface Set {
  index: number;
  previous?: string;
  weight: number;
  repTarget: number;
  actualReps?: number;
}
