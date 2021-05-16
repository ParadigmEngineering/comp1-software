export interface minActualMax {
  min: number;
  actual: number;
  max: number;
};

export interface logData {
  advancing: boolean;
  retracting: boolean;
  neutral: boolean;
  cutterheadValve: number;
  augerValve: number;
}