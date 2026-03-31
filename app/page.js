"use client"
import Image from "next/image";
import { useSession, signIn, signOut } from "next-auth/react"


export default function Home() {
  
  return (
    <>
      <div className="text-white flex flex-col justify-center items-center h-[50vh] gap-6 text-center px-4">
        <h1 className="font-bold text-5xl md:text-6xl flex items-center gap-3">
          Welcome to <span className="text-purple-400">ChaFund</span>
          <img width={80} src="/tea.gif" alt="chai" />
        </h1>

        <p className="max-w-2xl text-gray-300 text-lg">
          Let your supporters fund your passion. ChaFund makes it easy for
          creators and developers to receive small contributions and grow with
          their community.
        </p>

        <div className="flex gap-4">
          <button className="px-6 py-3 rounded-2xl bg-[linear-gradient(135deg,_rgb(100,103,242),_rgb(133,80,226))] hover:opacity-90 transition">
            Start Fundraising
          </button>

          <button className="px-6 py-3 rounded-2xl border border-white/30 hover:bg-white/10 transition">
            Learn More
          </button>
        </div>

        <p className="mt-4 text-gray-400 text-sm">
          Fuel your projects, one chai at a time ☕
        </p>
      </div>

      {/* seperator */}

        <div className="bg-white h-[2px] opacity-10"></div>


      <div className="text-white container mx-auto px-6 py-32">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
          How ChaFund Works
        </h2>

        <div className="flex flex-col md:flex-row items-center justify-center gap-12">
          {/* Card 1 */}
          <div className="space-y-4 flex flex-col items-center text-center max-w-xs">
            <img
              className="bg-slate-700 p-4 rounded-full"
              src="/man.gif"
              alt="Supporters"
              width={100}
            />
            <p className="font-semibold text-lg">Fans Support Your Work</p>
            <p className="text-gray-300 text-sm">
              People who love what you create can send micro-support to help
              your projects grow.
            </p>
          </div>

          {/* Card 2 */}
          <div className="space-y-4 flex flex-col items-center text-center max-w-xs">
            <img
              className="bg-slate-700 p-4 rounded-full"
              src="/coin.gif"
              alt="Funding"
              width={100}
            />
            <p className="font-semibold text-lg">
              Turn Appreciation into Funding
            </p>
            <p className="text-gray-300 text-sm">
              Small contributions from many fans can fund your next big idea
              without ads or sponsors.
            </p>
          </div>

          {/* Card 3 */}
          <div className="space-y-4 flex flex-col items-center text-center max-w-xs">
            <img
              className="bg-slate-700 p-4 rounded-full"
              src="/group.gif"
              alt="Community"
              width={100}
            />
            <p className="font-semibold text-lg">Grow a Loyal Community</p>
            <p className="text-gray-300 text-sm">
              Build stronger connections with your supporters and let them be
              part of your journey.
            </p>
          </div>
        </div>
      </div>

   <div className=" py-32">
  <div className="container mx-auto px-6 text-center">
    <h1 className="text-3xl md:text-4xl font-bold text-white mb-16">
      Learn More About Us ☕
    </h1>

    <div className="flex flex-col md:flex-row justify-center items-stretch gap-8">

      {/* Card 1 */}
      <div className="bg-gradient-to-br from-purple-700 to-blue-500 rounded-2xl p-8 flex-1 shadow-xl hover:scale-105 transform transition">
        <h2 className="text-xl font-semibold text-white mb-2">Our Mission</h2>
        <p className="text-white/80 text-sm">
          Empower creators and developers by providing a simple way for fans to fund their work.
        </p>
      </div>

      {/* Card 2 */}
      <div className="bg-gradient-to-br  to-blue-500 rounded-2xl p-8 flex-1 shadow-xl hover:scale-105 transform transition">
        <h2 className="text-xl font-semibold text-white mb-2">Why We Exist</h2>
        <p className="text-white/80 text-sm">
          Many creators and open-source developers struggle to get direct support. ChaFund makes it simple for fans to help.
        </p>
      </div>

      {/* Card 3 */}
      <div className="bg-gradient-to-br from-purple-700 to-blue-500 rounded-2xl p-8 flex-1 shadow-xl hover:scale-105 transform transition">
        <h2 className="text-xl font-semibold text-white mb-2">Our Vision</h2>
        <p className="text-white/80 text-sm">
          A world where creators focus on building, while their community actively supports them—one chai at a time.
        </p>
      </div>

    </div>

    <p className="text-gray-400 text-center mt-12 max-w-2xl mx-auto">
      Built by developers for developers and creators. ChaFund connects fans and creators seamlessly.
    </p>
  </div>
</div>
    </>
  );
}
