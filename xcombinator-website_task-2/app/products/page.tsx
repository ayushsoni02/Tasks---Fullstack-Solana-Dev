"use client";

import { ArrowUpRight, Twitter, Send, Globe } from "lucide-react";

export default function ProductsPage() {
  return (
    <div className="min-h-screen pt-32 px-6 pb-20">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-16">
          <div className="flex items-center gap-3 mb-4">
            <svg width="39" height="39" viewBox="0 0 39 39" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M31.9313 34.125L21.6125 23.8063L23.8875 21.5313L34.2063 31.85L31.9313 34.125ZM9.75001 32.9875C7.04168 30.3333 5.45053 27.2188 4.97657 23.6438C4.50261 20.0688 5.11876 16.724 6.82501 13.6094C6.90626 14.5302 7.13647 15.5662 7.51564 16.7172C7.8948 17.8682 8.41616 19.0802 9.0797 20.3531C9.74324 21.626 10.5354 22.9328 11.4563 24.2734C12.3771 25.6141 13.3927 26.9344 14.5031 28.2344L9.75001 32.9875ZM16.7375 26C15.4375 24.7 14.3 23.2849 13.325 21.7547C12.35 20.2245 11.5849 18.7417 11.0297 17.3063C10.4745 15.8708 10.163 14.5641 10.0953 13.3859C10.0276 12.2078 10.2781 11.3344 10.8469 10.7656C11.4156 10.1698 12.2891 9.89896 13.4672 9.95313C14.6453 10.0073 15.9589 10.312 17.4078 10.8672C18.8568 11.4224 20.3464 12.1943 21.8766 13.1828C23.4068 14.1714 24.8219 15.3156 26.1219 16.6156L16.7375 26ZM28.3563 14.3813C27.0833 13.2708 25.7766 12.2688 24.436 11.375C23.0953 10.4813 21.7953 9.69584 20.536 9.01876C19.2766 8.34167 18.0714 7.80678 16.9203 7.41407C15.7693 7.02136 14.7333 6.78438 13.8125 6.70313C16.9271 5.07813 20.2651 4.51615 23.8266 5.01719C27.388 5.51823 30.4688 7.06876 33.0688 9.66876L28.3563 14.3813Z" fill="#9095A4" />
            </svg>

            <h1 className="text-5xl font-museo">
              Products under <span className="text-white font-museo font-bold">xCombinator</span>
            </h1>
          </div>
          <p className="text-gray-400 text-lg font-museo">
            <span className="font-museo">xCombinator</span> serves as an <span className="text-gray-300 font-bold">umbrella organization</span> for our suite of products
          </p>
        </div>

        {/* Product Card - xApple */}
        {/* xApple Card */}
        <div className="relative group w-1/3">
          <div className="absolute -inset-0.5 bg-gradient-to-r from-pink-500/20 to-red-500/20 rounded-2xl blur opacity-0 group-hover:opacity-100 transition-opacity"></div>
          <div className="relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 hover:border-white/20 transition-all">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <svg width="41" height="52" viewBox="0 0 41 32" fill="none" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
                  <rect x="0.641113" y="0.148682" width="40.1903" height="31.2591" fill="url(#pattern0_99_110)" />
                  <defs>
                    <pattern id="pattern0_99_110" patternContentUnits="objectBoundingBox" width="1" height="1">
                      <use xlinkHref="#image0_99_110" transform="scale(0.00925926 0.0119048)" />
                    </pattern>
                    <image id="image0_99_110" width="108" height="84" preserveAspectRatio="none" xlinkHref="data:image/png;base64,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" />
                  </defs>
                </svg>
              </div>
              <button className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center transition-all">
                <ArrowUpRight className="w-4 h-4 text-gray-400" />
              </button>
            </div>
            <div className="flex items-center gap-2 mb-1">
              <h2 className="text-2xl font-bold">xApple</h2>

              <span className="px-2 py-0.5 bg-white/10 rounded-full text-xs text-gray-300">Launchpad</span>
            </div>
            <p className="text-gray-300 mb-6 max-w-2xl mt-6">
              xApple—fair launches, real liquidity, and rewards that put traders first.
            </p>
            <div className="flex items-center gap-2">
              <button className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center transition-all">
                <Twitter className="w-3.5 h-3.5 text-gray-400" />
              </button>
              <button className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center transition-all">
                <Send className="w-3.5 h-3.5 text-gray-400" />
              </button>
              <button className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center transition-all">
                <Globe className="w-3.5 h-3.5 text-gray-400" />
              </button>
            </div>
          </div>
        </div>


      </div>
    </div>
  );
}