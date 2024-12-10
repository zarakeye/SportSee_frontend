import React from "react";
import useFetchUserData from "../../hooks/useFetchUserData.ts";
import { useParams } from "react-router-dom";
import ActivityLink from "../../components/ActivityLink";
import yogaLogo from "../../assets/yogaLogo.svg";
import swimmingLogo from "../../assets/swimmingLogo.svg";
import cyclismLogo from "../../assets/cyclismLogo.svg";
import musculationLogo from "../../assets/musculationLogo.svg";
import DailyActivityBarPlot from "../../components/DailyActivityBarPlot";
import AverageSessionLineChart from "../../components/AverageSessionLineChart";
import PerformancesRadarChart from "../../components/PerformancesRadarChart";

const Home: React.FC = () => {
  const {userId} = useParams();
  const fetchedUserData = useFetchUserData(userId as string);
  const { userData } = fetchedUserData;
  const { data } = userData || {};
  const { id, userInfos, todayScore, score, keyData } = data || {};
  console.log(userInfos?.firstName);

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
          <h1 className="sr-only">Page d'accueil de {userInfos?.firstName + " " + userInfos?.lastName}</h1>
          <p className="text-[48px] font-medium">
            Bonjour <span className="text-primary">{userInfos?.firstName}</span>
          </p>
          <p className="text-[18px] font-regular">Félicitations ! Vous avez explosé vos objectifs hier 👏</p>
        </header>

        <div className="grid grid-cols-4 grid-rows-4">
          <div className="col-start-1 col-span-3 row-span-2">
            <DailyActivityBarPlot userId={userId as string} />
          </div>

          <div className="col-span-1 row-start-3 row-span-2 rounded-[5px]">        
            <AverageSessionLineChart userId={userId as string} />
          </div>
          <div className="col-start-2 col-span-1 row-span-2 h-[263px] w-[258px] rounded-[5px] bg-[#282D30] flex flex-col justify-center items-center">
            <PerformancesRadarChart userId={userId as string} />
          </div>
        </div>

        
      </main>
    </div>
  );
}

export default Home;