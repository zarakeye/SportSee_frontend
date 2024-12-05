import React from "react";
import useFetchUserData from "../../hooks/useFetchUserData.ts";
import { useParams } from "react-router-dom";
import ActivityLink from "../../components/ActivityLink";
import yogaLogo from "../../assets/yogaLogo.svg";
import swimmingLogo from "../../assets/swimmingLogo.svg";
import cyclismLogo from "../../assets/cyclismLogo.svg";
import musculationLogo from "../../assets/musculationLogo.svg";
import useFetchUserActivity from "../../hooks/useFetchUserActivity";
import useFetchAverageSessions from "../../hooks/useFetchAverageSessions";
import useFetchUserPerformance from "../../hooks/useFetchUserPerformance";
import DailyActivity from "../../components/DailyActivity";
import AverageSession from "../../components/AverageSession/index.tsx";

const Home: React.FC = () => {
  const {userId} = useParams();
  console.log(typeof userId);
  const fetchedUserData = useFetchUserData(userId as string);
  const { userData } = fetchedUserData;
  const { data } = userData || {};
  const { id, userInfos, todayScore, score, keyData } = data || {};
  console.log(userInfos?.firstName);

  const fetchedUserActivity = useFetchUserActivity(userId as string);
  const { userActivity } = fetchedUserActivity;
  const { sessions } = userActivity?.data || {};
  console.log(sessions);

  const fetchedUserAverageSessions = useFetchAverageSessions(userId as string);
  const fetchedUserPerformance = useFetchUserPerformance(userId as string);

  return (
    <div className="flex">
      <aside className="position-relative w-[117px] bg-secondary h-screen position-relative flex flex-col justify-center items-center">
        <nav id="activitiesWrapper" className="flex flex-col justify-between gap-5">
          <ActivityLink href="/yoga" logo={yogaLogo} />
          <ActivityLink href="/swimming" logo={swimmingLogo} />
          <ActivityLink href="/cyclism" logo={cyclismLogo} />
          <ActivityLink href="/musculation" logo={musculationLogo} />
        </nav>
        <p className="absolute bottom-[20px] text-[12px] text-nowrap font-regular text-quaternary font-roboto rotate-[-90deg]">Copyright, SportSee 2020</p>
      </aside>
      <main className="flex-1 pt-[68px] pl-[107px] pr-[90px]">
        <header className="font-roboto flex flex-col justify-between h-[89px] gap-[40px] mb-[77px]">
          <p className="text-[48px] font-medium">
            Bonjour <span className="text-primary">{userInfos?.firstName}</span>
          </p>
          <p className="text-[18px] font-regular">Félicitations ! Vous avez explosé vos objectifs hier 👏</p>
        </header>
        <DailyActivity userId={userId as string} />
        <AverageSession userId={userId as string} />
      </main>
    </div>
  );
}

export default Home;