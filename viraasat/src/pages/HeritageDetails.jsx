import React, { useEffect, useState } from 'react'
import HeritageNav from '../components/Heritage/HeritageNav'
import HeroGallery from '../components/HeritageDetails/HeroGallery'
import HeroInfo from '../components/HeritageDetails/HeroInfo'
import DetailTabs from '../components/HeritageDetails/DetailTabs'

import HeritageFooter from '../components/Heritage/HeritageFooter'
import { useParams } from 'react-router-dom'
import toast from 'react-hot-toast'
import { getHeritageBySlug } from '../services/exploreHeritage.service'
import { Eye, History, Landmark, MapPin, Store, Users, Utensils } from 'lucide-react'
import HeritageAbout from '../components/HeritageDetails/HeritageAbout'
import LocationCard from '../components/HeritageDetails/LocationCard'
import HeritageDetailsSkeleton from '../components/HeritageDetails/HeritageDetailsSkeleton'

export default function HeritageDetails() {
  const { slug } = useParams();

  const [heritage, setHeritage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchHeritage = async () => {
      try {
        setLoading(true);
        setError("");
        const response = await getHeritageBySlug(slug);


if (!response.data.success) {
  toast.error("Unable to fetch!");

  throw new Error(
    response.data.message || "Failed to fetch heritage"
  );
}

setHeritage(response.data.data);
      } catch (error) {
        console.error(error);
        toast.error("Unable to load!")
        setError(
          error.message || "Unable to load heritage"
        );
      } finally {
        setLoading(false);
      }
    };

    if (slug) {
      fetchHeritage();
    }
  }, [slug]);


 

if (loading) {
  return <HeritageDetailsSkeleton />;
}

if (error) {
  return (
    <div className="min-h-screen bg-[#FFFBF6] flex items-center justify-center">
      <div className="text-center">

        <h2 className="
          font-cormorant
          text-[30px]
          font-semibold
          text-[#2B1C12]
        ">
          Unable to load heritage
        </h2>

        <p className="mt-2 text-[#806F62]">
          {error}
        </p>

      </div>
    </div>
  );
}

if (!heritage) {
  return (
    <div className="min-h-screen bg-[#FFFBF6] flex items-center justify-center">
      <p className="text-[#806F62]">
        Heritage not found.
      </p>
    </div>
  );
}
  return (
    <>
    <div className="min-h-screen bg-[#FFFBF6]">

      {/* Navbar */}
      <div className="sticky top-0 left-0 z-[999] w-full bg-white/30
    backdrop-blur-[40px]
    border border-white/40
    shadow-md"><HeritageNav/></div>

    

      <div className="max-w-[1550px] mx-auto px-8 pb-20 ml-10">

        {/* Hero */}

        <section className="grid grid-cols-12 gap-12 mt-5">

          {/* Left */}

          <div className="col-span-4">

            <HeroGallery
  heritageId={heritage._id}
  image={heritage.image}
  images={heritage.images}
  isSaved={heritage.isSaved}
/>
<HeritageAbout heritage={heritage} />
<LocationCard heritage={heritage}/>

          </div>

          {/* Center */}

          <div className="col-span-8">

          <HeroInfo
  heritage={heritage}
  heritageId={heritage._id}
  isSaved={heritage.isSaved}
/>

    <div className="mt-5">

     <DetailTabs
   heritage={heritage}
  />
  

    </div>

          </div>

          {/* Right */}

          


        </section>

        {/* Tabs */}


        {/* Content */}

        <section className="grid grid-cols-12 gap-7 mt-6">

          {/* Main */}

          

          {/* Sidebar */}

         
        </section>

      </div>

    </div>
<HeritageFooter/>

    </>
  )

}
