"use client";

// import { Twitter } from "lucide-react";

interface Ambassador {
  name: string;
  handle: string;
  role: string;
  tags: string[];
  avatar: string;
}

export default function AmbassadorsPage() {
  
  const ambassadors: Ambassador[] = Array(6).fill({
    name: "cynthontheblock",
    handle: "@JardasPrs",
    role: "xAmbassador",
    tags: ["Advisor", "Blockchain expert"],
    avatar: "/avator_img.png", 
  });

  return (
    <div className="min-h-screen pt-24 sm:pt-32 px-4 sm:px-6 pb-12 sm:pb-20">
      <div className="max-w-6xl mx-auto">
        
        <div className="mb-12 sm:mb-16">
          <div className="flex items-center gap-2 sm:gap-3 mb-4">
            <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M26.6667 28.3333H15.625C14.9861 28.3333 14.4653 28.5278 14.0625 28.9167C13.6597 29.3056 13.4167 29.75 13.3333 30.25C13.25 30.75 13.3264 31.2361 13.5625 31.7083C13.7986 32.1806 14.2222 32.5278 14.8333 32.75L24.375 36.5417C24.6528 36.6528 24.9236 36.6875 25.1875 36.6458C25.4514 36.6042 25.6944 36.5139 25.9167 36.375C26.1389 36.2361 26.3194 36.0486 26.4583 35.8125C26.5972 35.5764 26.6667 35.3056 26.6667 35V28.3333ZM16.6667 3.33333C18.5 3.33333 20.0694 3.98611 21.375 5.29166C22.6806 6.59722 23.3333 8.16666 23.3333 10C23.3333 11.8333 22.6806 13.4028 21.375 14.7083C20.0694 16.0139 18.5 16.6667 16.6667 16.6667C14.8333 16.6667 13.2639 16.0139 11.9583 14.7083C10.6528 13.4028 10 11.8333 10 10C10 8.16666 10.6528 6.59722 11.9583 5.29166C13.2639 3.98611 14.8333 3.33333 16.6667 3.33333ZM32.0417 18.3333C32.8472 18.3333 33.5417 18.6042 34.125 19.1458C34.7083 19.6875 35 20.3611 35 21.1667C35 21.8056 34.8194 22.3889 34.4583 22.9167C34.0972 23.4444 33.6111 23.8194 33 24.0417L30 25H15.625C14.0417 25 12.7083 25.5417 11.625 26.625C10.5417 27.7083 10 29.0417 10 30.625C10 31.125 10.0694 31.6042 10.2083 32.0625C10.3472 32.5208 10.5278 32.9444 10.75 33.3333H5V26.6667C5 24.3611 5.8125 22.3958 7.4375 20.7708C9.0625 19.1458 11.0278 18.3333 13.3333 18.3333H32.0417Z" fill="#9095A4" />
            </svg>

            <h1 className="text-3xl sm:text-4xl md:text-5xl text-gray-400">
              <span className="font-museo">xCombinator</span> <span className="text-gray-300 font-bold font-museo">Ambassadors</span>
            </h1>
          </div>
          <p className="text-gray-400 text-base sm:text-lg font-museo">
            Ambassadors are trusted builders connecting real projects with real expertise.
          </p>
        </div>

        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {ambassadors.map((ambassador, index) => (
            <div
              key={index}
              className="relative group"
            >
             
              <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-500/20 via-pink-500/20 to-orange-500/20 rounded-2xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

          
              <div className="relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-4 sm:p-6 hover:border-white/20 transition-all h-full">
                
                <div className="inline-block px-3 py-1 font-museo rounded-full text-xm text-gray-300 mb-4">
                  xAmbassador
                </div>

                
                <div className="flex flex-col sm:flex-row items-center gap-4 mb-4">

                  <div className="flex-1 text-center sm:text-left sm:mt-10">
                    <h3 className="text-lg sm:text-xl font-bold mb-1">{ambassador.name}</h3>
                    <p className="text-sm text-gray-400">{ambassador.handle}</p>
                  </div>

              
                  <div className="relative order-first sm:order-last">
                 
                    <img
                      src={ambassador.avatar}
                      alt={ambassador.name}
                      className="w-24 h-24 sm:w-32 sm:h-32 rounded-full object-cover border-2 border-white/10"
                    />

                  </div>


                </div>

             
                <div className="flex flex-wrap gap-2">
                  {ambassador.tags.map((tag: string, tagIndex: number) => (
                    <span
                      key={tagIndex}
                      className="px-3 py-1 bg-white/5  border-white/10 rounded-full text-xs text-gray-300"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

       
        <div className="mt-8 sm:mt-12 text-center">
          <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 sm:p-8">
            <h3 className="text-xl sm:text-2xl font-bold mb-3">Become an xAmbassador</h3>
            <p className="text-gray-400 mb-6 max-w-md mx-auto text-sm sm:text-base">
              Join our network of trusted builders and help shape the future of Solana projects
            </p>
            <button className="px-6 py-3 bg-white/10 hover:bg-white/20 border border-white/20 rounded-full transition-all font-medium text-sm sm:text-base">
              Apply Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}