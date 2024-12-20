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
// import ChartWrapper from "../../components/ChartWrapper/index.tsx";
import ScoreRadialChart from "../../components/ScoreRadialChart/index.tsx";
import InfoCard from "../../components/InfoCard/index.tsx";

const Home: React.FC = () => {
  const {userId} = useParams();
  const fetchedUserData = useFetchUserData(userId as string);
  const { userData } = fetchedUserData;
  const { data } = userData || {};
  const { userInfos, todayScore, score, keyData } = data || {};
  console.log(userInfos?.firstName);

  return (
    <div className="flex">
      <aside className="relative w-[117px] bg-secondary h-screen flex flex-col justify-end items-center mb-[20px]">
        <nav id="activitiesWrapper" className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col justify-between gap-5">
          <ActivityLink href="/yoga" logo={yogaLogo} />
          <ActivityLink href="/swimming" logo={swimmingLogo} />
          <ActivityLink href="/cyclism" logo={cyclismLogo} />
          <ActivityLink href="/musculation" logo={musculationLogo} />
        </nav>
        <p className="text-[12px] text-nowrap font-regular text-quaternary font-roboto rotate-[-90deg] mb-[200px]">Copyright, SportSee 2020</p>
      </aside>
      <main className="relative shadow-inner before:absolute before:inset-x-0 before:top-0 before:h-1 before:bg-gradient-to-b before:from-gray-300/80 before:to-transparent flex-1 pt-[68px] pl-[107px] pr-[90px]">
        <header className="font-roboto flex flex-col justify-between h-[89px] gap-[40px] mb-[77px]">
          <h1 className="sr-only">Page d'accueil de {userInfos?.firstName + " " + userInfos?.lastName}</h1>
          <p className="text-[48px] font-medium">
            Bonjour <span className="text-primary">{userInfos?.firstName}</span>
          </p>
          <p className="text-[18px] font-regular">Félicitations ! Vous avez explosé vos objectifs hier 👏</p>
        </header>

        <div className="flex justify-between gap-[20px]">
          <div className="flex flex-col w-[835px] gap-[20px]">
            <div className="relative bg-[#FBFBFB] w-full h-[320px] mb-[28px] rounded-[5px]">
              <DailyActivityBarPlot userId={userId as string}  />
            </div>

            <div className="flex justify-between w-full h-[263px] items-center">
              <div className="flex justify-between items-center w-[258px] h-full rounded-[5px] bg-[#E60000]">
                <AverageSessionLineChart userId={userId as string} width={258} height={263} backgroundColor="#E60000" />
              </div>
              <div className="flex justify-center items-center w-[258px] h-full rounded-[5px] bg-[#282D30]">
                <PerformancesRadarChart userId={userId as string} />
              </div>
              <div className="flex justify-center items-center w-[258px] h-full rounded-[5px] bg-[#FBFBFB]">
                <ScoreRadialChart score={score as number} todayScore={todayScore as number} width={258} height={263} />
              </div>
            </div>
          </div>
          <div className="flex flex-col justify-between gap-[39px] h-full">
          {
            keyData && Object.values(keyData).map((value, index) => (
              <InfoCard key={index} dataType={Object.keys(keyData)[index]} value={value} />
            ))
          }
          </div> 
        </div>

        
      </main>
    </div>
  );
}

export default Home;