export interface StandardData {
  conditionMax: string;
  conditionMin: string;
  key: string;
  name: string;
  shape: string[];
  maxLength: number;
  minLength: number;
}

export interface Standard {
  id: string;
  name: string;
  createDate: string;
  standardData: StandardData[];
}
