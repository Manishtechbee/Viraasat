import { SlidersHorizontal ,Grid2x2,ChevronRight,ArrowUp,ChevronLeft,Heart,
  MapPin,
  Landmark,
  Church,
  Castle,
  Building2,
  LandmarkIcon,
  ChevronDown,
  Sparkles,
  Map,
  Bot,
  Star,} from "lucide-react";

import HeritageCard from "../components/Heritage/HeritageCard";
import SearchBar from "../components/SearchBar";

import taj from "../assets/taj.jpg";
import hampi from "../assets/hampi.jpg";
import Filter from "../components/Filter";
import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import FilterModal from "../components/Modals/FilterModal";
import NoResults from "../components/Modals/NoResults";

import noResultsImg from "../assets/no-results.png";
import HeritageNav from "../components/Heritage/HeritageNav";
import HeritageFooter from "../components/Heritage/HeritageFooter";
import { getHeritages } from "../services/exploreHeritage.service";
import toast from "react-hot-toast";
import HeritageCardSkeleton from "../components/Heritage/HeritageCardSkeleton";



// const heritageData = [
  
//   {
//     id: 1,
//     title: "Taj Mahal",
//     location: "Uttar Pradesh",
//     category: "UNESCO",
//     rating: 4.8,
//     image: taj,
//     liked: false,
//     slug:"taj-mahal",
//   },
//   {
//     id: 2,
//     title: "Hampi",
//     location: "Karnataka",
//     category: "Temple",
//     rating: 4.9,
//     image: hampi,
//     liked: false,
//     slug:"hampi",
//   },
//   {
//     id: 2,
//     title: "Hampi",
//     location: "Karnataka",
//     category: "Temple",
//     rating: 4.9,
//     image: hampi,
//     liked: false,
//     slug:"hampi",
//   },
//   {
//     id: 2,
//     title: "Hampi",
//     location: "Karnataka",
//     category: "Temple",
//     rating: 4.9,
//     image: hampi,
//     liked: false,
//     slug:"hampi",
//   },
//   {
//     id: 2,
//     title: "Hampi",
//     location: "Karnataka",
//     category: "Temple",
//     rating: 4.9,
//     image: hampi,
//     liked: false,
//     slug:"hampi",
//   },
  
// ];

const handleClick = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };


export default function Heritage() {
  const [searchParams]= useSearchParams();
  const queryFromParams = searchParams.get("search") || "";
  const [filterOpen, setFilterOpen] = useState(false);
  const [visible, setVisible] = useState(false);
  const [heritageData, setHeritageData]= useState([]);
  const [loading, setLoading] = useState(true);
const [error, setError] = useState(null);
const [hasLoadedOnce, setHasLoadedOnce] = useState(false);
const [showMoreCategories, setShowMoreCategories] = useState(false);
const [filters, setFilters] = useState({
  search: queryFromParams,
  category: "",
  state: "",
  city: "",
  era: "",
  rating: "",
  unesco: "",
  sort: "newest",
});
const [pagination, setPagination] = useState({
  page: 1,
  totalPages: 1,
  total: 0,
  hasNextPage: false,
  hasPreviousPage: false,
});


  useEffect(() => {
    fetchHeritages(1);
  }, []);

  useEffect(() => {
  const onScroll = () => {
    setVisible(window.scrollY > 300);
  };
  window.addEventListener("scroll", onScroll);
  return () => window.removeEventListener("scroll", onScroll);
}, []);




const fetchHeritages = async (
  page = 1,
  customFilters = filters
) => {
  try {
    setLoading(true);
    setError(null);

    const response = await getHeritages({
      ...customFilters,
      page,
      limit: 12,
    });

    setHeritageData(response.data.data);

    setPagination(response.data.pagination);

    setHasLoadedOnce(true);
  } catch (error) {
    console.error("Failed to fetch heritages:", error);

    setError(
      error.response?.data?.message ||
      "Failed to load heritage places"
    );

    toast.error("Failed to fetch heritage places");
  } finally {
    setLoading(false);
  }
};

  if (error && hasLoadedOnce && heritageData.length === 0) {
  return <div>{error}</div>;
}



const handleCategoryChange = (category) => {
  const newFilters = {
    ...filters,
    category: category === "All" ? "" : category,
  };

  setFilters(newFilters);

  fetchHeritages(1, newFilters);
};

const handleApplyFilters = (newFilters) => {
  setFilters(newFilters);
  setFilterOpen(false);

  fetchHeritages(1, newFilters);
};



  return (

<>
    







<div className="sticky top-0 left-0 z-[999] w-full bg-white/30
backdrop-blur-[40px]
border border-white/40
shadow-md"><HeritageNav/></div>



{loading && heritageData.length === 0 ? (
  <section className="grid grid-cols-1 gap-6 md:grid-cols-3 lg:grid-cols-4 m-10">
    {Array.from({ length: 15 }).map((_, index) => (
      <HeritageCardSkeleton key={index} />
    ))}
  </section>
) :heritageData.length === 0 ?(<main className="min-h-[calc(100vh-170px)] flex items-center justify-center">
      <NoResults
  image={noResultsImg}
  onClear={() => {
    const defaultFilters = {
  search: "",
  category: "",
  state: "",
  city: "",
  era: "",
  sort: "newest",
  rating: "",
  unesco: "",
};

    setFilters(defaultFilters);

    fetchHeritages(1, defaultFilters);
  }}
/>
    </main>
    ) :  (<section className="w-full bg-[#f9f2ecec] pb-20">
  <div className="mx-auto max-w-[1600px] px-7 pt-10 pb-8">

    {/* Hero */}
    <div className="flex justify-between items-start">

      {/* Left */}

        <div className="w-[57%]">

  {/* Heading */}
  <h1
    className="
      font-cormorant
      text-[56px]
      leading-[1.05]
      font-extrabold
      tracking-[1px]
      text-[#2B190F]
    "
  >
    Explore Heritage
  </h1>

  {/* Decorative Divider */}
  <div className="mt-1.5 flex items-center">

    <div className="h-px w-[175px] bg-[#E8D7C5]" />

    <div className="mx-4 flex items-center justify-center">

      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
      >
        <path
          d="M12 2L13.8 7.2L19 9L13.8 10.8L12 16L10.2 10.8L5 9L10.2 7.2L12 2Z"
          fill="#C99242"
        />
      </svg>

    </div>

    <div className="h-px w-[175px] bg-[#E8D7C5]" />

  </div>

  {/* Subtitle */}

  <p
    className="
      mt-0
      max-w-[540px]
      text-[20px]
      leading-[30px]
      text-[#5F5248]
      font-cormorant
    "
  >
    Find the most amazing places, forts and treasures across India.
  </p>

</div>

      

      {/* Right */}


        <div className="relative w-[42%]">

  {/* Search + Filter */}
  <div className="flex items-center justify-end gap-[18px]">

    <div className="w-[500px]">
     <SearchBar
  value={filters.search}
  onChange={(value) => {
    setFilters((prev) => ({
      ...prev,
      search: value,
    }));
  }}
  onSearch={(value) => {
    const newFilters = {
      ...filters,
      search: value,
    };

    setFilters(newFilters);

    fetchHeritages(1, newFilters);
  }}
/>
    </div>

    <div className="w-[160px]">
       <Filter onClick={() => setFilterOpen(true)} />
    </div>
    

      <FilterModal
  open={filterOpen}
  onClose={() => setFilterOpen(false)}
  filters={filters}
  onApply={handleApplyFilters}
/>

  </div>

  
</div>

      

    </div>

    {/* Categories */}

      <div className=" relative mb-8 mt-8 flex flex-wrap gap-4">

       
        <button
  onClick={() => handleCategoryChange("All")}
  className={`
    flex h-[38px] items-center gap-3 rounded-2xl p-5.5
    transition
    ${
      filters.category === ""
        ? "bg-[#8C4A15] text-white shadow"
        : "border border-[#E8D6C4] bg-white text-[#7A4419]"
    }
  `}
>
  <Grid2x2 size={16} />
  <span className="text-[16px] font-medium">
    All
  </span>
</button>

          
          
        {[
          { icon: Landmark, text: "UNESCO" },
  { icon: Church, text: "Temple" },
  { icon: Castle, text: "Fort" },
  { icon: Building2, text: "Museum" },
  { icon: LandmarkIcon, text: "Palace" },
].map(({ icon: Icon, text }) => (
  <button
    key={text}
    onClick={() => handleCategoryChange(text)}
    className={`
      flex h-[38px] items-center gap-3 rounded-2xl p-5.5
      transition
      ${
        filters.category === text
          ? "bg-[#8C4A15] text-white shadow"
          : "border border-[#E8D6C4] bg-white text-[#7A4419]"
      }
    `}
  >
    <Icon size={16} />

    <span className="text-[16px] font-medium">
      {text}
    </span>
  </button>
))}

       
        <button
  type="button"
  onClick={() => setShowMoreCategories((prev) => !prev)}
  className="flex h-[38px] items-center gap-3 rounded-2xl border border-[#E8D6C4] bg-white p-5.5 text-[#7A4419]"
>
  <span className="text-[16px] font-medium">
    More
  </span>

  <ChevronDown
    size={16}
    className={`transition-transform duration-100 ${
      showMoreCategories ? "rotate-180" : ""
    }`}
  />
</button>
{showMoreCategories && (
  <div
    className="
      absolute
      right-125
      top-full
      z-50
      mt-2
      w-[220px]
      rounded-2xl
      border border-[#E8D6C4]
      bg-white/75
      p-3
      shadow-[0_8px_25px_rgba(91,55,28,0.12)]
    "
  >
    {[
      "Cave",
      "Church",
      "Stepwell",
      "Archaeological Site",
      "Historic Building",
    ].map((category) => (
      <button
        key={category}
        type="button"
        onClick={() => {
  const newFilters = {
    ...filters,
    category,
  };

  setFilters(newFilters);
  setShowMoreCategories(false);
  fetchHeritages(1, newFilters);
}}
        className="
          w-full
          rounded-xl
          px-3
          py-2.5
          text-left
          text-[14px]
          text-[#5E4939]
          transition
          hover:bg-[#faecde]
          hover:text-[#7A4419]
        "
      >
        {category}
      </button>
    ))}
  </div>
)}
      </div>

    {/* Stats */}

      <div className="flex h-[105px] w-[83%] backdrop-blur-2xl items-center rounded-[22px] border-[1px] border-[#e6cfb9] bg-[#FAF2E8] ">

        {[
          {
            icon: Building2,
            value: "10,000+",
            label: "Heritage Places",
          },
          {
            icon: Star,
            value: "4.8",
            label: "Average Rating",
          },
          {
            icon: MapPin,
            value: "28",
            label: "States Covered",
          },
          {
            icon: Landmark,
            value: "40+",
            label: "UNESCO Sites",
          },
        ].map(({ icon: Icon, value, label }, index) => (
          <div
            key={label}
            className="flex flex-1 items-center justify-center"
          >
            <div className="flex items-center gap-5">

              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#F8E8CF]">
                <Icon
                  size={30}
                  className="text-[#8C4A15]"
                />
              </div>

              <div>
                <h3 className="text-[18px] font-bold text-[#3C2415]">
                  {value}
                </h3>

                <p className="text-[16px] text-[#5E5044]">
                  {label}
                </p>
              </div>

            </div>

            {index !== 3 && (
              <div className="ml-12 h-16 w-px bg-[#e3c7ac]" />
            )}
          </div>
        ))}

      </div>



    {/* Cards */}
        <div className="grid grid-cols-4 gap-6 mt-8">
  {heritageData.map((card,idx) => (
    <HeritageCard
  key={card._id}
  id={card._id}
  image={card.image}
  title={card.name}
  location={`${card.city}, ${card.state}`}
  rating={card.rating}
  tag={card.category}
  slug={card.slug}
  isSaved={card.isSaved}
/>
  ))}
</div>

  </div>




  {/*  bottom pages */}
  <div className="mt-8 flex items-center justify-center gap-7">

  {/* Previous */}
  <button
    disabled={!pagination.hasPreviousPage}
    onClick={() => {
      fetchHeritages(
        pagination.page - 1,
        filters
      );

      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }}
    className="
      flex h-[42px] w-[42px]
      items-center justify-center
      rounded-[10px]
      border border-[#E7D9C9]
      bg-white
      text-[#8C4A18]
      transition
      hover:bg-[#FBF6F1]
      disabled:cursor-not-allowed
      disabled:opacity-40
    "
  >
    <ChevronLeft size={18} />
  </button>


  {/* Pages */}
  <div className="flex items-center gap-8">

    {Array.from(
      { length: pagination.totalPages },
      (_, index) => index + 1
    ).map((page) => (
      <button
        key={page}
        onClick={() => {
          fetchHeritages(page, filters);

          window.scrollTo({
            top: 0,
            behavior: "smooth",
          });
        }}
        className={`
          flex h-[38px] w-[38px]
          items-center justify-center
          rounded-[10px]
          text-[17px]
          font-medium
          transition

          ${
            pagination.page === page
              ? "bg-[#8C4A18] text-white font-semibold"
              : "text-[#35251C] hover:text-[#8C4A18]"
          }
        `}
      >
        {page}
      </button>
    ))}

  </div>


  {/* Next */}
  <button
    disabled={!pagination.hasNextPage}
    onClick={() => {
      fetchHeritages(
        pagination.page + 1,
        filters
      );

      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }}
    className="
      flex h-[42px] w-[42px]
      items-center justify-center
      rounded-[10px]
      border border-[#E7D9C9]
      bg-white
      text-[#8C4A18]
      transition
      hover:bg-[#FBF6F1]
      disabled:cursor-not-allowed
      disabled:opacity-40
    "
  >
    <ChevronRight size={18} />
  </button>

</div>



    {/* scroll to top button */}
    {visible?<button
      onClick={handleClick}
      className="
        fixed
        bottom-10
        right-10
        z-50
        flex
        h-[56px]
        w-[56px]
        items-center
        justify-center
        rounded-full
        bg-[#B46A2A]
        text-white
        shadow-[0_12px_30px_rgba(180,106,42,.25)]
        transition-all
        duration-300
        hover:-translate-y-1
        hover:bg-[#A65D20]
      "
    >
      <ArrowUp size={22} strokeWidth={2.5} />
    </button>:null}
</section>)}





<HeritageFooter/>

      </>
    
  );
}