export interface Composition {
  _id: string;
  name: string;
  lengthRange: string;
  actualPercentage: string;
}

export interface DefectRice {
  _id: string;
  name: string;
  actualPercentage: string;
}

export interface RiceInfo {
  _id: string;
  name: string;
  imageURL: string;
  inspectionId: string;
  standard: string;
  totalSample: number;
  note: string;
  price: number;
  dateTimeOfSampling: string;
  samplingPoint: string[];
  composition: Array<Composition>;
  defectRice: Array<DefectRice>;
  createdAt: string;
  updatedAt: string;
}

export interface Config<RiceInfo> {
  label: string;
  render: (item: RiceInfo) => JSX.Element | string | number;
  sortValue?: (item: RiceInfo) => string | number | Date;
  header?: () => JSX.Element;
}

// export interface ConfigCompositionTable<Composition> {
//   label: string;
//   render: (item: Composition) => string | number;
// }

// export interface ConfigDefectRiceTable<DefectRice> {
//   label: string;
//   render: (item: DefectRice) => string | number;
// }
