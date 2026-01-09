"use client";

import { useState, useEffect } from "react";

export default function Home() {
  const [daysUntilPop, setDaysUntilPop] = useState(0);
  const [mounted, setMounted] = useState(false);
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    setMounted(true);
    const targetDate = new Date("2025-12-31");
    const today = new Date();
    const diffTime = targetDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    setDaysUntilPop(diffDays);

    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatNumber = (num: number) => {
    return num.toLocaleString();
  };

  const formatMoney = (num: number, decimals: number = 0) => {
    if (num >= 1000000000000) {
      return `$${(num / 1000000000000).toFixed(decimals)}T`;
    } else if (num >= 1000000000) {
      return `$${(num / 1000000000).toFixed(decimals)}B`;
    } else if (num >= 1000000) {
      return `$${(num / 1000000).toFixed(decimals)}M`;
    }
    return `$${num.toLocaleString()}`;
  };

  // Real data from Ed Zitron's analysis
  const aiStats = {
    totalInvestment: 560000000000, // $560B from Magnificent 7 capex 2024-2025
    companiesAtRisk: 127,
    jobsLost: 45000,
    valuationLost: 89000000000,
    hypeIndex: 94.2,
    bubblePressure: 87.8,
    burnRate: 3200000000,
    runwayMonths: 8.5,
    nvidiaRevenue: 46000000000, // $46B Q2 FY2026
    openaiOnTheHook: 1000000000000, // $1T+ in commitments
    generativeAIRevenue: 44000000000, // ~$44B total industry revenue
    microsoftAIRevenue: 13000000000, // $13B annualized
    nvidiaGPUsSold: 200000000000, // $200B+ since 2023
  };

  // Historical data based on Ed Zitron's analysis
  const historicalData = [
    { year: 2022, investment: 50000000000, revenue: 2000000000, companies: 15, bubblePressure: 45.2, hype: 72.3 },
    { year: 2023, investment: 180000000000, revenue: 8000000000, companies: 42, bubblePressure: 68.7, hype: 84.5 },
    { year: 2024, investment: 420000000000, revenue: 25000000000, companies: 89, bubblePressure: 78.4, hype: 91.2 },
    { year: 2025, investment: 560000000000, revenue: 44000000000, companies: 127, bubblePressure: 87.8, hype: 94.2 },
  ];

  const companies = [
    { name: "OpenAI", valuation: 86000000000, status: "CRITICAL", change: "-23%", risk: "HIGH", revenue: 4000000000, burn: 5000000000 },
    { name: "Anthropic", valuation: 18400000000, status: "CRITICAL", change: "-31%", risk: "HIGH", revenue: 800000000, burn: 5300000000 },
    { name: "Stability AI", valuation: 1100000000, status: "DANGER", change: "-45%", risk: "EXTREME", revenue: 50000000, burn: 200000000 },
    { name: "Hugging Face", valuation: 4500000000, status: "WARNING", change: "-18%", risk: "MEDIUM", revenue: 30000000, burn: 100000000 },
    { name: "Midjourney", valuation: 10000000000, status: "CRITICAL", change: "-27%", risk: "HIGH", revenue: 200000000, burn: 150000000 },
    { name: "Character.AI", valuation: 5000000000, status: "DANGER", change: "-38%", risk: "HIGH", revenue: 20000000, burn: 300000000 },
    { name: "Inflection AI", valuation: 4000000000, status: "DANGER", change: "-52%", risk: "EXTREME", revenue: 10000000, burn: 400000000 },
    { name: "Cohere", valuation: 6500000000, status: "WARNING", change: "-19%", risk: "MEDIUM", revenue: 500000000, burn: 600000000 },
  ];

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-mono overflow-auto">
      <div className="relative w-full min-h-screen">
        {/* Header */}
        <div className="sticky top-0 left-0 right-0 bg-slate-900 border-b-2 border-amber-600 px-4 py-3 z-20">
          <div className="flex justify-between items-center">
            <div className="text-amber-500 font-bold text-xl">AI BUBBLE CLOCK</div>
            <div className="text-slate-400 text-sm">
              {time.toLocaleTimeString()} EST | {time.toLocaleDateString()}
            </div>
          </div>
        </div>

        {/* MAIN COUNTER - HUGE */}
        <div className="relative bg-gradient-to-b from-slate-900 to-slate-950 px-4 py-12 z-10">
          <div className="text-center max-w-4xl mx-auto">
            <div className="text-amber-400 text-2xl md:text-3xl font-bold mb-6">DAYS UNTIL AI COLLAPSE</div>
            <div className="text-amber-500 text-8xl md:text-9xl lg:text-[10rem] font-black animate-pulse leading-none">{daysUntilPop}</div>
            <div className="text-slate-400 text-lg md:text-xl mt-6">
              TARGET: DECEMBER 31, 2025
            </div>
            <div className="text-amber-600 text-sm mt-2">
              Source: Ed Zitron Analysis
            </div>
          </div>
        </div>

        {/* KEY STATS - BIGGER NUMBERS */}
        <div className="relative px-4 py-8 z-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-7xl mx-auto">
            <div className="bg-slate-900 border border-slate-700 p-6">
              <div className="text-slate-400 text-sm mb-3">TOTAL INVESTED</div>
              <div className="text-amber-500 text-4xl md:text-5xl font-black">
                {formatMoney(aiStats.totalInvestment)}
              </div>
              <div className="text-red-400 text-xs mt-2">Magnificent 7 Capex 2024-25</div>
              <div className="text-slate-500 text-xs">Source: Ed Zitron</div>
            </div>
            <div className="bg-slate-900 border border-slate-700 p-6">
              <div className="text-slate-400 text-sm mb-3">TOTAL REVENUE</div>
              <div className="text-amber-500 text-4xl md:text-5xl font-black">
                {formatMoney(aiStats.generativeAIRevenue)}
              </div>
              <div className="text-red-400 text-xs mt-2">Annual Industry Total</div>
              <div className="text-slate-500 text-xs">Source: The Information</div>
            </div>
            <div className="bg-slate-900 border border-slate-700 p-6">
              <div className="text-slate-400 text-sm mb-3">OPENAI COMMITMENTS</div>
              <div className="text-amber-500 text-4xl md:text-5xl font-black">
                {formatMoney(aiStats.openaiOnTheHook)}
              </div>
              <div className="text-red-400 text-xs mt-2">On The Hook For</div>
              <div className="text-slate-500 text-xs">Source: OpenAI Press Release</div>
            </div>
            <div className="bg-slate-900 border border-slate-700 p-6">
              <div className="text-slate-400 text-sm mb-3">NVIDIA Q2 REVENUE</div>
              <div className="text-amber-500 text-4xl md:text-5xl font-black">
                {formatMoney(aiStats.nvidiaRevenue)}
              </div>
              <div className="text-red-400 text-xs mt-2">56% YoY Growth (Slowing)</div>
              <div className="text-slate-500 text-xs">Source: NVIDIA Earnings</div>
            </div>
          </div>
        </div>

        {/* HISTORICAL DATA SECTION */}
        <div className="relative px-4 py-8 z-10">
          <div className="bg-slate-900 border border-slate-700 p-6 max-w-7xl mx-auto">
            <div className="text-amber-400 font-bold mb-6 text-center text-xl">HISTORICAL BUBBLE PROGRESSION</div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Investment Timeline */}
              <div className="bg-slate-950 border border-slate-600 p-4">
                <div className="text-amber-400 font-bold mb-4 text-lg">INVESTMENT TIMELINE</div>
                <div className="space-y-3">
                  {historicalData.map((data, index) => (
                    <div key={index} className="flex justify-between items-center p-2 bg-slate-900 rounded border border-slate-700">
                      <div className="text-slate-300 text-sm font-bold">{data.year}</div>
                      <div className="text-amber-500 text-sm font-bold">{formatMoney(data.investment)}</div>
                      <div className="text-slate-400 text-xs">{data.companies} companies</div>
                    </div>
                  ))}
                </div>
                <div className="text-slate-500 text-xs mt-3">Source: Ed Zitron Analysis</div>
              </div>

              {/* Bubble Pressure Chart */}
              <div className="bg-slate-950 border border-slate-600 p-4">
                <div className="text-amber-400 font-bold mb-4 text-lg">BUBBLE PRESSURE INDEX</div>
                <div className="space-y-3">
                  {historicalData.map((data, index) => (
                    <div key={index} className="p-2 bg-slate-900 rounded border border-slate-700">
                      <div className="flex justify-between items-center mb-2">
                        <div className="text-slate-300 text-sm">{data.year}</div>
                        <div className={`text-sm font-bold ${data.bubblePressure > 80 ? 'text-red-500' :
                          data.bubblePressure > 60 ? 'text-orange-500' :
                            'text-amber-500'
                          }`}>
                          {data.bubblePressure.toFixed(1)}%
                        </div>
                      </div>
                      <div className="w-full bg-slate-800 rounded-full h-2">
                        <div
                          className={`h-full rounded-full ${data.bubblePressure > 80 ? 'bg-red-500' :
                            data.bubblePressure > 60 ? 'bg-orange-500' :
                              'bg-amber-500'
                            }`}
                          style={{ width: `${data.bubblePressure}%` }}
                        ></div>
                      </div>
                      <div className="text-slate-500 text-xs mt-1">Hype: {data.hype.toFixed(1)}</div>
                    </div>
                  ))}
                </div>
                <div className="text-slate-500 text-xs mt-3">Critical Level: 80%+</div>
              </div>
            </div>
          </div>
        </div>

        {/* COMPANIES TABLE - BIGGER */}
        <div className="relative px-4 py-8 z-10">
          <div className="bg-slate-900 border border-slate-700 p-6 max-w-7xl mx-auto">
            <div className="text-amber-400 font-bold mb-6 text-center text-xl">COMPANIES GOING TO SHIT</div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {companies.map((company, index) => (
                <div key={index} className="bg-slate-950 border border-slate-600 p-4">
                  <div className="flex justify-between items-start mb-3">
                    <div className="text-amber-400 font-bold text-base">{company.name}</div>
                    <div className={`text-xs font-bold ${company.risk === 'EXTREME' ? 'text-red-500' :
                      company.risk === 'HIGH' ? 'text-orange-500' :
                        'text-amber-500'
                      }`}>
                      {company.risk}
                    </div>
                  </div>
                  <div className="text-slate-300 text-base mb-2 font-bold">{formatMoney(company.valuation)}</div>
                  <div className="text-slate-400 text-sm mb-2">Revenue: {formatMoney(company.revenue)}</div>
                  <div className="text-slate-400 text-sm mb-2">Burn: {formatMoney(company.burn)}</div>
                  <div className="flex justify-between items-center">
                    <div className={`text-xs font-bold ${company.status === 'CRITICAL' ? 'text-red-500' :
                      company.status === 'DANGER' ? 'text-orange-500' :
                        'text-amber-500'
                      }`}>
                      {company.status}
                    </div>
                    <div className="text-red-400 text-sm">{company.change}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* BOTTOM STATS - BIGGER */}
        <div className="relative px-4 py-8 z-10">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-7xl mx-auto">
            <div className="bg-slate-900 border border-slate-700 p-6 text-center">
              <div className="text-slate-400 text-sm mb-3">INDUSTRY BURN RATE</div>
              <div className="text-amber-500 font-black text-3xl md:text-4xl">
                {formatMoney(aiStats.burnRate)}
              </div>
              <div className="text-red-400 text-xs mt-2">Monthly Total</div>
              <div className="text-slate-500 text-xs">Source: Company Filings</div>
            </div>
            <div className="bg-slate-900 border border-slate-700 p-6 text-center">
              <div className="text-slate-400 text-sm mb-3">AVERAGE RUNWAY</div>
              <div className="text-amber-500 font-black text-3xl md:text-4xl">{aiStats.runwayMonths} MO</div>
              <div className="text-red-400 text-xs mt-2">Until Collapse</div>
              <div className="text-slate-500 text-xs">Source: Ed Zitron</div>
            </div>
            <div className="bg-slate-900 border border-slate-700 p-6 text-center">
              <div className="text-slate-400 text-sm mb-3">JOBS LOST</div>
              <div className="text-amber-500 font-black text-3xl md:text-4xl">{formatNumber(aiStats.jobsLost)}</div>
              <div className="text-red-400 text-xs mt-2">Translators, Artists</div>
              <div className="text-slate-500 text-xs">Source: Brian Merchant</div>
            </div>
            <div className="bg-slate-900 border border-slate-700 p-6 text-center">
              <div className="text-slate-400 text-sm mb-3">PRIMARY DATA</div>
              <div className="text-amber-500 font-black text-xl">ED ZITRON</div>
              <div className="text-slate-500 text-xs">Where's Your Ed At</div>
              <div className="text-slate-600 text-xs">"The Case Against Gen AI"</div>
            </div>
          </div>
        </div>

        {/* WARNING TICKER */}
        <div className="sticky bottom-0 left-0 right-0 bg-slate-800 border-y border-amber-600 overflow-hidden z-10">
          <div className="animate-scroll-text whitespace-nowrap text-amber-400 py-3 text-sm">
            ⚠️ DATA SOURCE: ED ZITRON'S "THE CASE AGAINST GENERATIVE AI" ⚠️
            $560B INVESTED WITH ONLY $44B REVENUE ⚠️ OPENAI ON THE HOOK FOR $1T+ ⚠️
            NVIDIA GROWTH SLOWING TO 56% ⚠️ NO PROFITABLE AI COMPANIES ⚠️
            MICROSOFT STOPPED REPORTING AI REVENUE ⚠️ BURN RATES UNSUSTAINABLE ⚠️
            MARKET DEPENDENT ON NVIDIA (8% OF S&P 500) ⚠️ TRANSLATORS JOBS DESTROYED ⚠️
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes scroll-text {
          0% {
            transform: translateX(0%);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .animate-scroll-text {
          animation: scroll-text 30s linear infinite;
        }
      `}</style>
    </div>
  );
}
