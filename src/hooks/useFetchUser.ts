import { useState } from 'react';
import useFetchUserData, { User }  from './useFetchUserData';
import useFetchUserActivity from './useFetchUserActivity';
import useFetchAverageSessions from './useFetchAverageSessions';
import useFetchUserPerformance from './useFetchUserPerformance';

type PerformanceType = 'cardio' | 'energy' | 'endurance' | 'strength' | 'speed' | 'intensity';

interface PerformanceData {
  value: number;
  kind: number;
}

interface ResultsSession {
  day: string;
  kilogram: number;
  calories: number;
}

interface SessionLength {
  day: number;
  sessionLength: number;
}

export interface Performance {
  value: number;
  kind: PerformanceType;
}

export interface UseFetchUserReturn {
  userCompiledData: UserCompiledData | null;
}

export interface UserCompiledData {
  userData: User | null;
  resultsSessions: ResultsSession[] | null;
  sessionsLength: SessionLength[] | null;
  performances: Performance[] | null;
}

const useFetchUser = (id: string) => {
  const [userCompiledData, setUserCompiledData] = useState<UserCompiledData | null>(null);

  const { userData } = useFetchUserData(id);
  const { userActivity } = useFetchUserActivity(id);
  const { userAverageSessions } = useFetchAverageSessions(id);
  const { userPerformance } = useFetchUserPerformance(id);

  const resultsSessions = userActivity?.data.sessions as ResultsSession[];
  const sessionsLength = userAverageSessions?.data.sessions as SessionLength[];
  const resultsPerformance = userPerformance?.data.data as PerformanceData[];

  const performances: Performance[] = [];
  resultsPerformance?.forEach(({ value, kind }) => {
    performances.push({
      value,
      kind: kind === 0 ? 'cardio' : kind === 1 ? 'energy' : kind === 2 ? 'endurance' : kind === 3 ? 'strength' : kind === 4 ? 'speed' : 'intensity',
    });
  });
  
  const data: UserCompiledData = {
    userData,
    resultsSessions,
    sessionsLength,
    performances,
  };

  setUserCompiledData(data);

  return { userCompiledData };
};

export default useFetchUser;
