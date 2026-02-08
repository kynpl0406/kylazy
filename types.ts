export interface SensorData {
  id: number;
  time: string;
  f1: number;
  r1: number;
}

export enum FloodStatus {
  SAFE = 'Safe',
  WARNING = 'Warning',
  DANGER = 'Danger',
}

export interface SystemConfig {
  safeLimit: number;
  warningLimit: number;
  maxLevel: number;
}