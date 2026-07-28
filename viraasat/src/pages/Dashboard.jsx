import DashboardSidebar from "../components/Dashboard/DashboardSidebar";
import DashboardHeader from "../components/Dashboard/DashboardHeader";
import StatsCards from "../components/Dashboard/StatsCards";
import ContinueJourney from "../components/Dashboard/ContinueJourney";
import JourneyMap from "../components/Dashboard/JourneyMap";
import RecentActivity from "../components/Dashboard/RecentActivity";
// import RecommendedPlaces from "../components/Dashboard/RecommendedPlaces";

export default function Dashboard() {
  return (
    <section className="min-h-screen bg-[#F9F6F1]">
      <div className="max-w-[1600px] flex">

        <main className="flex-1 px-10 py-8">

          <DashboardHeader />

          <div className="mt-8">
            <StatsCards />
          </div>

          <div className="mt-8">
            <ContinueJourney />
          </div>

          <div className="grid grid-cols-12 gap-6 mt-8">
            <div className="col-span-7">
              <JourneyMap />
            </div>
           

            <div className="col-span-5">
              <RecentActivity />
            </div>
          </div>
           
          {/* <div className="mt-8 pb-10">
            <RecommendedPlaces />
          </div>  */}

        </main>

      </div>
    </section>
  );
}