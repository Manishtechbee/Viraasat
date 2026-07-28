import React, { useEffect, useMemo, useState } from "react";
import {
  Plus,
  MapPin,
  CalendarDays,
  ChevronRight,
  Sparkles,
  Route,
  RefreshCw,
  Compass,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import * as journeyService from "../../../services/journey.service";
import toast from "react-hot-toast";

export default function MyJourneys() {
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState("All");
  const [journeys, setJourneys] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // =====================================================
  // FETCH JOURNEYS
  // =====================================================

  const fetchJourneys = async () => {
    try {
      setLoading(true);
      setError("");

      const data = await journeyService.getJourneys();

      setJourneys(data?.journeys || []);
    } catch (error) {
      console.error("Failed to fetch journeys:", error);

      const message =
        error?.response?.data?.message ||
        "Unable to load your journeys.";

      setError(message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJourneys();
  }, []);

  // =====================================================
  // PROGRESS
  // =====================================================

  const getProgress = (journey) => {
    const places = journey?.places || [];

    if (!places.length) return 0;

    const visited = places.filter(
      (place) => place?.visited === true
    ).length;

    return Math.round((visited / places.length) * 100);
  };

  // =====================================================
  // STATUS
  // =====================================================

  const getStatus = (journey) => {
    const progress = getProgress(journey);

    if (progress === 100) {
      return "Completed";
    }

    if (progress > 0) {
      return "Ongoing";
    }

    if (journey?.startDate) {
      const startDate = new Date(journey.startDate);

      if (!Number.isNaN(startDate.getTime())) {
        if (startDate > new Date()) {
          return "Upcoming";
        }
      }
    }

    return "Draft";
  };

  // =====================================================
  // FILTER
  // =====================================================

  const filteredJourneys = useMemo(() => {
    return journeys.filter((journey) => {
      if (activeTab === "All") {
        return true;
      }

      return getStatus(journey) === activeTab;
    });
  }, [journeys, activeTab]);

  // =====================================================
  // DATE FORMAT
  // =====================================================

  const formatDate = (date) => {
    if (!date) return "Date not set";

    const parsedDate = new Date(date);

    if (Number.isNaN(parsedDate.getTime())) {
      return "Date not set";
    }

    return parsedDate.toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  // =====================================================
  // ACTIONS
  // =====================================================

  const handleNewJourney = () => {
    navigate("/my-journeys/new");
  };

  const handlePlanWithAI = () => {
    navigate("/ai-guide", {
      state: {
        intent: "plan-journey",
      },
    });
  };

  const handleViewJourney = (journey) => {
    navigate(`/my-journeys/${journey._id}`);
  };

  // =====================================================
  // LOADING
  // =====================================================

  if (loading) {
    return (
      <div className="min-h-screen bg-[#FAF7F2] px-8 py-7 text-[#35281F]">

        {/* Header skeleton */}
        <div className="mb-8 flex items-start justify-between">

          <div>
            <div className="h-10 w-56 animate-pulse rounded-lg bg-[#EDE3D8]" />

            <div className="mt-3 h-4 w-80 animate-pulse rounded bg-[#F0E7DE]" />
          </div>

          <div className="flex gap-3">
            <div className="h-11 w-32 animate-pulse rounded-xl bg-[#EDE3D8]" />
            <div className="h-11 w-36 animate-pulse rounded-xl bg-[#E5D7C8]" />
          </div>

        </div>

        {/* Tabs skeleton */}
        <div className="mb-7 flex gap-7 border-b border-[#E6DBD0] pb-3">
          {[1, 2, 3, 4].map((item) => (
            <div
              key={item}
              className="h-4 w-16 animate-pulse rounded bg-[#EDE3D8]"
            />
          ))}
        </div>

        {/* Cards */}
        <div className="space-y-5">
          {[1, 2, 3].map((item) => (
            <JourneySkeleton key={item} />
          ))}
        </div>

      </div>
    );
  }

  // =====================================================
  // ERROR
  // =====================================================

  if (error) {
    return (
      <div className="min-h-screen bg-[#FAF7F2] px-8 py-8">

        <div className="flex min-h-[60vh] items-center justify-center">

          <div className="max-w-md text-center">

            <div
              className="
                mx-auto
                mb-5
                flex
                h-16
                w-16
                items-center
                justify-center
                rounded-full
                bg-[#F5E5D5]
                text-[#A96017]
              "
            >
              <Route size={28} />
            </div>

            <h2 className="font-cormorant text-[28px] font-bold text-[#302117]">
              Unable to load journeys
            </h2>

            <p className="mt-2 text-sm leading-6 text-[#806F63]">
              {error}
            </p>

            <button
              onClick={fetchJourneys}
              className="
                mt-6
                inline-flex
                items-center
                gap-2
                rounded-xl
                bg-[#8C4A15]
                px-5
                py-2.5
                text-sm
                font-medium
                text-white
                transition
                hover:bg-[#733B10]
              "
            >
              <RefreshCw size={15} />
              Try Again
            </button>

          </div>

        </div>

      </div>
    );
  }

  // =====================================================
  // MAIN
  // =====================================================

  return (
    <div className="min-h-screen bg-[#FAF7F2] px-8 py-7 text-[#35281F]">

      {/* =================================================
          HEADER
      ================================================= */}

      <div className="mb-8 flex items-start justify-between">

        <div>

          <div className="mb-2 flex items-center gap-3">
            <div className="h-px w-9 bg-[#C98A45]" />

            <span className="text-[10px] font-semibold uppercase tracking-[3px] text-[#A56A32]">
              Your Adventures
            </span>
          </div>

          <h1 className="font-cormorant text-[40px] font-bold leading-none text-[#241B15]">
            My Journeys
          </h1>

          <p className="mt-2 text-[13px] text-[#806F62]">
            Plan, remember and continue your heritage adventures.
          </p>

        </div>

        <div className="flex gap-3">

          {/* AI */}
          <button
            onClick={handlePlanWithAI}
            className="
              flex
              h-11
              items-center
              gap-2
              rounded-xl
              border
              border-[#DFD2C5]
              bg-white
              px-4
              text-[13px]
              font-medium
              text-[#654D3A]
              shadow-[0_3px_12px_rgba(76,48,27,0.04)]
              transition-all
              hover:border-[#CDA77E]
              hover:bg-[#FFFDFC]
              hover:text-[#A96017]
            "
          >
            <Sparkles
              size={16}
              className="text-[#B86B18]"
            />

            Plan with AI
          </button>

          {/* New journey */}
          <button
            onClick={handleNewJourney}
            className="
              flex
              h-11
              items-center
              gap-2
              rounded-xl
              bg-[#B86B18]
              px-5
              text-[13px]
              font-semibold
              text-white
              shadow-[0_5px_15px_rgba(184,107,24,0.18)]
              transition-all
              hover:bg-[#965511]
              hover:-translate-y-0.5
            "
          >
            <Plus size={17} />

            New Journey
          </button>

        </div>

      </div>

      {/* =================================================
          TABS
      ================================================= */}

      <div className="mb-7 flex gap-7 border-b border-[#E6DBD0]">

        {[
          "All",
          "Upcoming",
          "Ongoing",
          "Completed",
          "Draft",
        ].map((tab) => {

          const active = activeTab === tab;

          const count =
            tab === "All"
              ? journeys.length
              : journeys.filter(
                  (journey) => getStatus(journey) === tab
                ).length;

          return (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`
                relative
                flex
                items-center
                gap-2
                pb-3
                text-[12px]
                font-medium
                transition

                ${
                  active
                    ? "text-[#A96017]"
                    : "text-[#796B60] hover:text-[#A96017]"
                }
              `}
            >
              {tab}

              <span
                className={`
                  rounded-full
                  px-1.5
                  py-0.5
                  text-[9px]
                  ${
                    active
                      ? "bg-[#F3E2CF] text-[#A96017]"
                      : "bg-[#F0E8DF] text-[#8B7A6C]"
                  }
                `}
              >
                {count}
              </span>

              {active && (
                <span
                  className="
                    absolute
                    bottom-[-1px]
                    left-0
                    h-[2px]
                    w-full
                    rounded-full
                    bg-[#A96017]
                  "
                />
              )}

            </button>
          );
        })}

      </div>

      {/* =================================================
          EMPTY STATE
      ================================================= */}

      {filteredJourneys.length === 0 ? (

        <div
          className="
            flex
            min-h-[380px]
            items-center
            justify-center
            rounded-[24px]
            border
            border-dashed
            border-[#DCCDBD]
            bg-white/40
          "
        >

          <div className="text-center">

            <div
              className="
                mx-auto
                mb-5
                flex
                h-16
                w-16
                items-center
                justify-center
                rounded-full
                bg-[#F3E3D0]
                text-[#A96017]
              "
            >
              <Compass size={27} />
            </div>

            <h2 className="font-cormorant text-[27px] font-bold text-[#35271D]">
              {activeTab === "All"
                ? "No journeys yet"
                : `No ${activeTab.toLowerCase()} journeys`}
            </h2>

            <p className="mt-2 text-[13px] text-[#89776A]">
              Start planning your next heritage adventure.
            </p>

            <button
              onClick={handleNewJourney}
              className="
                mt-5
                inline-flex
                items-center
                gap-2
                rounded-xl
                bg-[#8C4A15]
                px-4
                py-2.5
                text-[12px]
                font-semibold
                text-white
                transition
                hover:bg-[#733B10]
              "
            >
              <Plus size={15} />
              Create Journey
            </button>

          </div>

        </div>

      ) : (

        /* =================================================
           JOURNEY CARDS
        ================================================= */

        <div className="space-y-5">

          {filteredJourneys.map((journey) => {

            const progress = getProgress(journey);
            const status = getStatus(journey);

            const placesCount =
              journey?.places?.length || 0;

            return (
              <article
                key={journey._id}
                className="
                  group
                  overflow-hidden
                  rounded-[22px]
                  border
                  border-[#E8DCD0]
                  bg-white
                  shadow-[0_5px_20px_rgba(76,48,27,0.05)]
                  transition-all
                  duration-300
                  hover:-translate-y-1
                  hover:shadow-[0_14px_35px_rgba(76,48,27,0.10)]
                "
              >

                <div className="flex">

                  {/* IMAGE */}

                  <div className="relative h-[205px] w-[235px] shrink-0 overflow-hidden">

                    <JourneyImage journey={journey} />

                    <div
                      className="
                        pointer-events-none
                        absolute
                        inset-0
                        bg-gradient-to-r
                        from-black/5
                        to-black/20
                      "
                    />

                    <span
                      className="
                        absolute
                        left-3
                        top-3
                        rounded-full
                        bg-[#6C3D17]/90
                        px-2.5
                        py-1
                        text-[10px]
                        font-semibold
                        text-white
                        backdrop-blur-md
                      "
                    >
                      {status}
                    </span>

                  </div>

                  {/* CONTENT */}

                  <div className="min-w-0 flex-1 p-5">

                    <div className="flex justify-between gap-4">

                      <div className="min-w-0">

                        <h2
                          className="
                            truncate
                            font-cormorant
                            text-[25px]
                            font-bold
                            text-[#2E2118]
                          "
                          title={journey.title}
                        >
                          {journey.title || "Untitled Journey"}
                        </h2>

                        <div
                          className="
                            mt-2
                            flex
                            flex-wrap
                            gap-x-5
                            gap-y-2
                            text-[12px]
                            text-[#88766A]
                          "
                        >

                          {journey.location && (
                            <span className="flex items-center gap-1.5">
                              <MapPin size={13} />
                              {journey.location}
                            </span>
                          )}

                          {journey.startDate && (
                            <span className="flex items-center gap-1.5">
                              <CalendarDays size={13} />
                              {formatDate(journey.startDate)}
                            </span>
                          )}

                          {journey.endDate && (
                            <span className="flex items-center gap-1.5">
                              <CalendarDays size={13} />
                              {formatDate(journey.endDate)}
                            </span>
                          )}

                        </div>

                      </div>

                      <button
                        type="button"
                        onClick={() =>
                          handleViewJourney(journey)
                        }
                        className="
                          shrink-0
                          text-[#806E61]
                          transition
                          hover:text-[#A96017]
                        "
                        aria-label="View journey"
                      >
                        <ChevronRight size={20} />
                      </button>

                    </div>

                    {/* PROGRESS */}

                    <div className="mt-6">

                      <div className="mb-2 flex justify-between">

                        <span className="text-[11px] text-[#806F63]">
                          Journey Progress
                        </span>

                        <span className="text-[11px] font-semibold text-[#A96118]">
                          {progress}%
                        </span>

                      </div>

                      <div className="h-1.5 overflow-hidden rounded-full bg-[#EEE4DA]">

                        <div
                          className="
                            h-full
                            rounded-full
                            bg-[#B96D1B]
                            transition-all
                            duration-700
                          "
                          style={{
                            width: `${progress}%`,
                          }}
                        />

                      </div>

                    </div>

                    {/* FOOTER */}

                    <div className="mt-5 flex items-center justify-between">

                      <span className="text-[12px] text-[#817166]">
                        {placesCount}{" "}
                        {placesCount === 1
                          ? "heritage place"
                          : "heritage places"}
                      </span>

                      <button
                        type="button"
                        onClick={() =>
                          handleViewJourney(journey)
                        }
                        className="
                          flex
                          items-center
                          gap-1.5
                          text-[12px]
                          font-semibold
                          text-[#A96017]
                          transition
                          hover:text-[#7D430F]
                        "
                      >
                        <Route size={14} />
                        View Journey
                      </button>

                    </div>

                  </div>

                </div>

              </article>
            );
          })}

        </div>

      )}

    </div>
  );
}


// =====================================================
// JOURNEY IMAGE
// =====================================================

function JourneyImage({ journey }) {
  const [imageError, setImageError] = useState(false);

  const image =
    journey?.places?.[0]?.heritage?.image ||
    journey?.image;

  if (!image || imageError) {
    return (
      <div
        className="
          flex
          h-full
          w-full
          items-center
          justify-center
          bg-gradient-to-br
          from-[#F4E5D2]
          via-[#EBD2B5]
          to-[#D9B88F]
          text-[#9B5E27]
        "
      >
        <Route
          size={38}
          strokeWidth={1.2}
        />
      </div>
    );
  }

  return (
    <img
      src={image}
      alt={journey?.title || "Journey"}
      onError={() => setImageError(true)}
      className="
        h-full
        w-full
        object-cover
        transition-transform
        duration-700
        group-hover:scale-[1.04]
      "
    />
  );
}


// =====================================================
// JOURNEY SKELETON
// =====================================================

function JourneySkeleton() {
  return (
    <div
      className="
        overflow-hidden
        rounded-[22px]
        border
        border-[#E8DCD0]
        bg-white
      "
    >
      <div className="flex">

        {/* Image */}
        <div
          className="
            h-[205px]
            w-[235px]
            shrink-0
            animate-pulse
            bg-[#EDE3D8]
          "
        />

        {/* Content */}
        <div className="flex-1 p-5">

          <div className="h-4 w-20 animate-pulse rounded bg-[#EDE3D8]" />

          <div className="mt-3 h-7 w-64 animate-pulse rounded bg-[#EDE3D8]" />

          <div className="mt-3 h-4 w-80 animate-pulse rounded bg-[#F0E7DE]" />

          <div className="mt-7 h-1.5 w-full animate-pulse rounded-full bg-[#EDE3D8]" />

          <div className="mt-6 flex justify-between">

            <div className="h-4 w-28 animate-pulse rounded bg-[#F0E7DE]" />

            <div className="h-4 w-24 animate-pulse rounded bg-[#F0E7DE]" />

          </div>

        </div>

      </div>
    </div>
  );
}