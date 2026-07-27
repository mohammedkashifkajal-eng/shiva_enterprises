import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Bus, Globe, Shield, CreditCard, Sparkles, TrendingDown } from "lucide-react";

export default function InsuranceCalculator() {
  const [busCount, setBusCount] = useState(5);
  const [studentCount, setStudentCount] = useState(250);
  const [isCalculating, setIsCalculating] = useState(false);

  const websiteCost = 1500;
  const trackingCostPerBus = 120;
  const cameraCostPerBus = 450;
  const idCardCostPerStudent = 3.5;

  const [savedWebsite, setSavedWebsite] = useState(websiteCost);
  const [savedTracking, setSavedTracking] = useState(busCount * trackingCostPerBus);
  const [savedCamera, setSavedCamera] = useState(busCount * cameraCostPerBus);
  const [savedIdCards, setSavedIdCards] = useState(studentCount * idCardCostPerStudent);
  const [totalSavings, setTotalSavings] = useState(0);

  useEffect(() => {
    setIsCalculating(true);
    const timer = setTimeout(() => {
      setSavedTracking(busCount * trackingCostPerBus);
      setSavedCamera(busCount * cameraCostPerBus);
      setSavedIdCards(studentCount * idCardCostPerStudent);
      setIsCalculating(false);
    }, 300);
    return () => clearTimeout(timer);
  }, [busCount, studentCount]);

  useEffect(() => {
    setTotalSavings(websiteCost + savedTracking + savedCamera + savedIdCards);
  }, [savedWebsite, savedTracking, savedCamera, savedIdCards]);

  return (
    <div className="w-full bg-white border border-slate-200 rounded-2xl p-4 relative overflow-hidden shadow-sm sm:rounded-3xl sm:p-6 md:p-8">
      <div className="grid grid-cols-1 gap-6 items-center relative z-10 lg:grid-cols-12 lg:gap-8">
        
        {/* Left Column: Interactive Inputs */}
        <div className="lg:col-span-5 space-y-5 sm:space-y-6">
          <div>
            <div className="inline-flex max-w-full items-center gap-2 px-3 py-1 bg-slate-50 border border-slate-200 rounded-full text-orange-700 text-[10px] font-mono mb-2 sm:text-xs">
              <Sparkles className="w-3 h-3 shrink-0 animate-pulse" />
              THE INSURANCE REINVESTMENT MODEL
            </div>
            <h3 className="text-xl sm:text-2xl md:text-3xl font-sans font-semibold tracking-tight text-slate-900">
              Calculate Your <span className="text-orange-600">School's Savings</span>
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 mt-2 leading-relaxed">
              When you renew or purchase your mandatory <span className="text-slate-900 font-semibold">School Bus Insurance</span> through Shiva Enterprises, we reinvest our broker commissions to build your digital campus entirely <span className="text-orange-600 font-semibold">Free of Cost</span>!
            </p>
          </div>

          <div className="space-y-4 sm:space-y-5 bg-slate-50 p-4 rounded-2xl border border-slate-200 sm:p-5">
            {/* Bus Count Slider */}
            <div className="space-y-2">
              <div className="flex items-center justify-between gap-3 text-sm">
                <span className="text-slate-700 font-medium flex items-center gap-2">
                  <Bus className="w-4 h-4 text-orange-600" />
                  <span className="hidden sm:inline">Number of School Buses:</span>
                  <span className="sm:hidden">Buses:</span>
                </span>
                <span className="text-orange-600 font-bold font-mono text-base sm:text-lg">{busCount}</span>
              </div>
              <input
                type="range"
                min="1"
                max="30"
                value={busCount}
                onChange={(e) => setBusCount(parseInt(e.target.value))}
                className="w-full h-2 sm:h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-slate-500"
              />
              <div className="flex justify-between text-[10px] text-slate-400 font-mono">
                <span>1</span>
                <span>15</span>
                <span>30</span>
              </div>
            </div>

            {/* Student Count Slider */}
            <div className="space-y-2">
              <div className="flex items-center justify-between gap-3 text-sm">
                <span className="text-slate-700 font-medium flex items-center gap-2">
                  <CreditCard className="w-4 h-4 text-orange-600" />
                  <span className="hidden sm:inline">Total Active Students:</span>
                  <span className="sm:hidden">Students:</span>
                </span>
                <span className="text-orange-600 font-bold font-mono text-base sm:text-lg">{studentCount}</span>
              </div>
              <input
                type="range"
                min="50"
                max="1500"
                step="50"
                value={studentCount}
                onChange={(e) => setStudentCount(parseInt(e.target.value))}
                className="w-full h-2 sm:h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-slate-500"
              />
              <div className="flex justify-between text-[10px] text-slate-400 font-mono">
                <span>50</span>
                <span>750</span>
                <span>1500</span>
              </div>
            </div>
          </div>

          <div className="p-3 sm:p-4 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-600 flex items-start gap-2">
            <TrendingDown className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
            <span>
              <strong>Zero Hidden Charges:</strong> These software platforms, GPS trackers, live CCTV integrations, and PVC cards are 100% free of charge once your school buses are insured with Shiva Enterprises.
            </span>
          </div>
        </div>
        {/* Right Column: Dynamic Saving Breakdown */}
        <div className="lg:col-span-7 space-y-4">
          <div className="bg-white rounded-2xl border border-slate-200 p-5 md:p-6 space-y-4 shadow-sm">
            <h4 className="text-xs font-mono font-semibold tracking-wider text-slate-500 uppercase">
              REINVESTMENT VALUE BREAKDOWN
            </h4>

            <div className="space-y-3">
              {/* Item 1: Website */}
              <div className="flex items-center justify-between gap-3 p-3 rounded-xl bg-slate-50 border border-slate-200">
                <div className="flex min-w-0 items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-indigo-50 border border-indigo-200 flex items-center justify-center text-indigo-600">
                    <Globe className="w-4 h-4" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-xs font-medium text-slate-900">School Website</div>
                    <div className="text-[10px] text-slate-400">Full Custom Dev + Hosting</div>
                  </div>
                </div>
                <div className="shrink-0 text-right">
                  <div className="text-xs font-mono line-through text-slate-400">₹1,25,000</div>
                  <div className="text-xs font-mono font-bold text-emerald-600">FREE</div>
                </div>
              </div>

              {/* Item 2: GPS Tracker */}
              <div className="flex items-center justify-between gap-3 p-3 rounded-xl bg-slate-50 border border-slate-200">
                <div className="flex min-w-0 items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-slate-50 border border-slate-200 flex items-center justify-center text-orange-600">
                    <Bus className="w-4 h-4" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-xs font-medium text-slate-900">GPS Tracker Software</div>
                    <div className="text-[10px] text-slate-400">Live Parents Tracking App</div>
                  </div>
                </div>
                <div className="shrink-0 text-right">
                  <div className="text-xs font-mono line-through text-slate-400">
                    ₹{(busCount * 10000).toLocaleString("en-IN")}
                  </div>
                  <div className="text-xs font-mono font-bold text-emerald-600">FREE</div>
                </div>
              </div>

              {/* Item 3: CCTV Security Camera */}
              <div className="flex items-center justify-between gap-3 p-3 rounded-xl bg-slate-50 border border-slate-200">
                <div className="flex min-w-0 items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-pink-50 border border-pink-200 flex items-center justify-center text-pink-600">
                    <Shield className="w-4 h-4" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-xs font-medium text-slate-900">High-End In-Bus CCTV</div>
                    <div className="text-[10px] text-slate-400">{busCount} Active CCTV Cameras</div>
                  </div>
                </div>
                <div className="shrink-0 text-right">
                  <div className="text-xs font-mono line-through text-slate-400">
                    ₹{(busCount * 30000).toLocaleString("en-IN")}
                  </div>
                  <div className="text-xs font-mono font-bold text-emerald-600">FREE</div>
                </div>
              </div>

              {/* Item 4: PVC ID Cards */}
              <div className="flex items-center justify-between gap-3 p-3 rounded-xl bg-slate-50 border border-slate-200">
                <div className="flex min-w-0 items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600">
                    <CreditCard className="w-4 h-4" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-xs font-medium text-slate-900">Premium PVC ID Cards</div>
                    <div className="text-[10px] text-slate-400">{studentCount} High-Grade Badges</div>
                  </div>
                </div>
                <div className="shrink-0 text-right">
                  <div className="text-xs font-mono line-through text-slate-400">
                    ₹{(studentCount * 120).toLocaleString("en-IN")}
                  </div>
                  <div className="text-xs font-mono font-bold text-emerald-600">FREE</div>
                </div>
              </div>
            </div>

            {/* Total Reinvestment Saving Showcase */}
            <div className="pt-4 border-t border-slate-200 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <div className="text-[10px] font-mono text-slate-500 tracking-wider">TOTAL REINVESTMENT VALUE</div>
                <div className="text-xs text-slate-400">Value of Digital Systems Unlocked</div>
              </div>
              <div className="text-left sm:text-right">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={totalSavings}
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 5 }}
                    className="text-2xl md:text-3xl font-mono font-bold text-slate-900"
                  >
                    ₹{(totalSavings * 85).toLocaleString("en-IN")}
                  </motion.div>
                </AnimatePresence>
                <div className="text-[10px] text-emerald-600 font-mono">₹0 Out of Pocket</div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

