export interface IPlay {
  name: string;
  type: string;
}

export interface IPlays {
  [key: string]: IPlay;
}

export interface IPerfomance {
  playID: keyof IPlays;
  audience: number;
}

export interface IInvoice {
  customer: string;
  perfomances: IPerfomance[];
}

export interface IStatmentData {
  customer: string;
  perfomances: IPerfomance[];
}
