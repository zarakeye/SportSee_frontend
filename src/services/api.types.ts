export interface UserInfos {
  firstName: string;
  lastName: string;
  age: number;
}

export interface UserKeyData {
  calorieCount: number;
  proteinCount: number;
  carbohydrateCount: number;
  lipidCount: number;
}

export interface User {
  id: number;
  userInfos: UserInfos;
  todayScore?: number;
  score?: number;
  keyData: UserKeyData;
}

export interface UserData {
  data: User;
}

export interface ActivitySession {
  day: string;
  kilogram: number;
  calories: number;
}

export interface UserActivitySession {
  id: number;
  sessions: ActivitySession[];
}

export interface ActivityData {
  data: UserActivitySession;
}

export interface AverageSessions {
  day: number;
  sessionLength: number;
}

export interface UserAverageSessions {
  id: number;
  sessions: AverageSessions[];
}

export interface AverageSessionsData {
  data: UserAverageSessions;
}

export type PerformanceType = 'cardio' | 'energy' | 'endurance' | 'strength' | 'speed' | 'intensity';

export interface Performance {
  value: number;
  kind: number;
}

export interface UserPerformance {
  id: number;
  kind: {
    1: PerformanceType;
    2: PerformanceType;
    3: PerformanceType;
    4: PerformanceType;
    5: PerformanceType;
    6: PerformanceType;
  };
  data: Performance[];
}

export interface PerformanceData {
  data: UserPerformance;
}
