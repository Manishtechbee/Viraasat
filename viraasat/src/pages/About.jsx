import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import hero from "../assets/hero.png"
import {
  Target,
  Eye,
  Landmark,
  Map,
  Bot,
  Headphones,
  Image,
  Globe2,
  ShieldCheck,
  HeartHandshake,
  Lightbulb,
  Users,
  ArrowRight,
  ArrowLeft,
} from "lucide-react";

const missionVision = [
  {
    icon: Target,
    title: "Our Mission",
    description:
      "To make India's cultural heritage accessible through technology while encouraging education, tourism, cultural awareness, and preservation for future generations.",
    bg: "bg-white",
    text: "text-gray-900",
    iconBg: "bg-[#20196D]/10",
    iconColor: "text-[#20196D]",
  },
  {
    icon: Eye,
    title: "Our Vision",
    description:
      "To become India's most trusted digital heritage ecosystem where history meets innovation through immersive experiences powered by modern technology.",
    bg: "bg-[#20196D]",
    text: "text-white",
    iconBg: "bg-white/10",
    iconColor: "text-white",
  },
];

const values = [
  {
    icon: ShieldCheck,
    title: "Authenticity",
    description:
      "We present verified historical information from trusted sources.",
  },
  {
    icon: HeartHandshake,
    title: "Preservation",
    description:
      "Protecting India's rich cultural legacy for generations to come.",
  },
  {
    icon: Lightbulb,
    title: "Innovation",
    description:
      "Using AI and immersive technology to transform heritage exploration.",
  },
  {
    icon: Users,
    title: "Accessibility",
    description:
      "Making history easy to discover for everyone, everywhere.",
  },
];


export const features = [
  {
    icon: Landmark,
    title: "Heritage Sites",
    description:
      "Explore India's iconic monuments, UNESCO World Heritage Sites, forts, temples, palaces, and historic landmarks with detailed insights.",
    button: "Explore Sites",
    link: "/explore",
  },
  {
    icon: Map,
    title: "Interactive Maps",
    description:
      "Navigate heritage destinations using interactive maps with nearby attractions, routes, and travel recommendations.",
    button: "Open Map",
    link: "/map",
  },
  {
    icon: Bot,
    title: "AI Heritage Guide",
    description:
      "Get instant answers, historical facts, travel tips, and personalized recommendations through our intelligent AI guide.",
    button: "Ask AI Guide",
    link: "/ai-guide",
  },
  {
    icon: Headphones,
    title: "Audio Tours",
    description:
      "Experience monuments through immersive multilingual audio guides and engaging historical storytelling.",
    button: "Listen Now",
    link: "/audio-guides",
  },
  {
    icon: Image,
    title: "Gallery",
    description:
      "Browse stunning collections of heritage photography, architecture, artwork, and cultural moments from across India.",
    button: "View Gallery",
    link: "/gallery",
  },
  {
    icon: Globe2,
    title: "Cultural Experiences",
    description:
      "Discover India's vibrant festivals, traditions, cuisine, dance, music, and regional cultures through immersive experiences.",
    button: "Discover Culture",
    link: "/culture",
  },
];


const heroData = {
  badge: "Discover • Preserve • Experience",
  title: "Preserving India's Heritage,",
  highlight: "One Story at a Time.",
  description:
    "Viraasat is a modern digital heritage platform that brings India's timeless monuments, traditions, architecture, and stories together through immersive technology. Whether you're a traveler, student, or history enthusiast, Viraasat makes cultural exploration more engaging than ever.",
  buttonText: "Explore Heritage",
  buttonLink: "/explore",
};

const storyData = {
  title: "Our Story",
  paragraphs: [
    "India is home to thousands of magnificent forts, temples, monuments, museums, and cultural traditions that span thousands of years. Despite this incredible legacy, much of our heritage remains unexplored or difficult to experience in today's digital world.",

    "Viraasat was born from a simple vision—to preserve India's cultural treasures while making them accessible to everyone. By combining modern technologies like Artificial Intelligence, interactive maps, virtual experiences, and digital storytelling, we transform history into an engaging journey for every visitor.",

    "We believe heritage is not just about preserving monuments; it's about preserving stories, traditions, and identities that inspire future generations.",
  ],
};

export default function About() {
    const navigate= useNavigate();
  return (
    <>
    <div className="p-8  bg-[#F8F3EC]">
          <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-[#20196D] text-[#20196D] hover:bg-[#20196D] hover:text-white transition"
          >
            <ArrowLeft size={18} />
            Back
          </button>
        </div>
   <section className="bg-[#F8F3EC] overflow-hidden">

  <div className="max-w-7xl mx-auto px-5 py-2 grid lg:grid-cols-2 gap-20 items-center">

    {/* Left */}

    <div>

      <span className="inline-flex items-center rounded-full bg-[#20196D]/10 text-[#20196D] px-5 py-2 text-sm font-semibold">

        {heroData.badge}

      </span>

      <h1 className="mt-8 text-5xl lg:text-6xl font-extrabold leading-tight text-gray-900">

        {heroData.title}

        <span className="block text-[#20196D]">
          {heroData.highlight}
        </span>

      </h1>

      <p className="mt-8 text-lg leading-8 text-gray-600 max-w-xl">

        {heroData.description}

      </p>

      <div className="flex gap-5 mt-10">

        <Link to={heroData.buttonLink}>

          <button className="px-8 py-4 rounded-xl bg-[#20196D] text-white hover:bg-[#312783] transition">

            {heroData.buttonText}

          </button>

        </Link>

        <Link to="/heritage">

          <button className="px-8 py-4 rounded-xl border border-[#20196D] text-[#20196D] hover:bg-[#20196D] hover:text-white transition">

            Browse Sites

          </button>

        </Link>

      </div>

      {/* Statistics */}

      <div className="grid grid-cols-3 gap-8 mt-16">

        <div>

          <h3 className="text-3xl font-bold text-[#20196D]">
            1500+
          </h3>

          <p className="text-gray-500">
            Heritage Sites
          </p>

        </div>

        <div>

          <h3 className="text-3xl font-bold text-[#20196D]">
            28
          </h3>

          <p className="text-gray-500">
            States Covered
          </p>

        </div>

        <div>

          <h3 className="text-3xl font-bold text-[#20196D]">
            24/7
          </h3>

          <p className="text-gray-500">
            AI Guide
          </p>

        </div>

      </div>

    </div>

    {/* Right */}

    <div className="relative">

      <div className="absolute -top-6 -left-6 w-full h-full bg-[#20196D]/10 rounded-3xl"></div>

      <img
        src={hero}
        alt="Viraasat"
        className="relative rounded-3xl shadow-2xl"
      />

    </div>

  </div>

</section>
<section className="bg-[#FCF8F2]">

  <div className="max-w-7xl mx-auto px-8 py-24">

    <div className="grid lg:grid-cols-2 gap-20 items-center">

      <div>

        <img
          src={hero}
          alt="Our Story"
          className="rounded-3xl shadow-xl"
        />

      </div>

      <div>

        <span className="inline-block px-4 py-2 rounded-full bg-[#20196D]/10 text-[#20196D] font-semibold">

          Our Journey

        </span>

        <h2 className="mt-6 text-5xl font-bold">

          {storyData.title}

        </h2>

        {storyData.paragraphs.map((paragraph, index) => (

          <p
            key={index}
            className="mt-6 text-lg leading-8 text-gray-600"
          >
            {paragraph}
          </p>

        ))}

        <Link to="/explore">

          <button className="mt-10 px-8 py-4 rounded-xl bg-[#20196D] text-white hover:bg-[#312783] transition">

            Start Exploring

          </button>

        </Link>

      </div>

    </div>

  </div>

</section>
<section className="bg-[#FCF8F2] py-24">

<div className="max-w-7xl mx-auto px-8">

<div className="text-center mb-16">

<span className="px-4 py-2 rounded-full bg-[#20196D]/10 text-[#20196D] font-semibold">
Mission & Vision
</span>

<h2 className="text-5xl font-bold mt-6">
Driven by Culture. Powered by Technology.
</h2>

</div>

<div className="grid lg:grid-cols-2 gap-8">

{missionVision.map(
({
icon: Icon,
title,
description,
bg,
text,
iconBg,
iconColor,
})=>(

<div
key={title}
className={`${bg} ${text} rounded-3xl p-10 shadow-lg`}
>

<div className={`w-16 h-16 rounded-2xl ${iconBg} flex items-center justify-center`}>

<Icon className={iconColor} size={30}/>

</div>

<h3 className="text-3xl font-bold mt-8">
{title}
</h3>

<p className="mt-5 leading-8 opacity-90">
{description}
</p>

</div>

))}

</div>

</div>
</section>


<section className="py-24 bg-[#F8F3EC]">
      <div className="max-w-7xl mx-auto px-8">
        {/* Heading */}
        <div className="text-center max-w-3xl mx-auto">
          <span className="inline-block px-4 py-2 rounded-full bg-[#4338CA]/10 text-[#4338CA] font-medium">
            What We Offer
          </span>

          <h2 className="mt-5 text-4xl md:text-5xl font-bold text-gray-900">
            Experience Heritage Like Never Before
          </h2>

          <p className="mt-6 text-lg text-gray-600 leading-8">
            Viraasat combines technology with culture to make India's heritage
            more accessible, engaging, and immersive for everyone.
          </p>
        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-16">
          {features.map(
  ({ icon: Icon, title, description, button, link }) => (
    <div
      key={title}
      className="group bg-white rounded-3xl p-8 shadow-sm border border-[#E8DFD3] hover:shadow-xl hover:-translate-y-2 transition-all duration-300"
    >
      <div className="w-16 h-16 rounded-2xl bg-[#20196D]/10 flex items-center justify-center group-hover:bg-[#20196D] transition">
        <Icon
          size={30}
          className="text-[#20196D] group-hover:text-white transition"
        />
      </div>

      <h3 className="mt-6 text-2xl font-semibold text-gray-900">
        {title}
      </h3>

      <p className="mt-4 text-gray-600 leading-7">
        {description}
      </p>

      <Link
        to={link}
        className="mt-6 inline-flex items-center gap-2 text-[#20196D] font-semibold hover:gap-3 transition-all"
      >
        {button}
        <ArrowRight size={18} />
      </Link>
    </div>
  )
)}
        </div>
      </div>
    </section>
<section className="bg-[#F8F3EC] py-24">

<div className="max-w-7xl mx-auto px-8">

<div className="text-center">

<span className="px-4 py-2 rounded-full bg-[#20196D]/10 text-[#20196D]">

Our Values

</span>

<h2 className="text-5xl font-bold mt-6">

The Principles Behind Viraasat

</h2>

</div>

<div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mt-16">

{values.map(({icon:Icon,title,description})=>(

<div
key={title}
className="bg-white rounded-3xl p-8 text-center hover:-translate-y-2 transition shadow-sm hover:shadow-xl"
>

<div className="w-16 h-16 rounded-full bg-[#20196D]/10 mx-auto flex items-center justify-center">

<Icon
size={28}
className="text-[#20196D]"
/>

</div>

<h3 className="text-2xl font-semibold mt-6">
{title}
</h3>

<p className="mt-4 text-gray-600 leading-7">
{description}
</p>

</div>

))}

</div>

</div>

</section>

<section className="bg-[#FCF8F2] py-24">

<div className="max-w-6xl mx-auto px-8">

<div className="rounded-[40px] bg-gradient-to-r from-[#161152] to-[#31279e] text-center text-white p-20 shadow-2xl">

<span className="px-5 py-2 rounded-full bg-white/10">

Start Your Journey

</span>

<h2 className="text-5xl font-bold mt-8">

Discover India's Living Heritage

</h2>

<p className="mt-6 text-lg opacity-90 max-w-2xl mx-auto leading-8">

Every monument tells a story.
Every tradition carries a legacy.
Begin exploring India's cultural treasures with Viraasat today.

</p>

<div className="flex justify-center gap-6 mt-12">

<Link to="/explore">

<button className="bg-white text-[#20196D] px-8 py-4 rounded-xl font-semibold hover:scale-105 transition">

Explore Heritage

</button>

</Link>

<Link to="/map">

<button className="border border-white px-8 py-4 rounded-xl hover:bg-white hover:text-[#20196D] transition">

Interactive Map

</button>

</Link>

</div>

</div>

</div>

</section>
</>
  )
}
