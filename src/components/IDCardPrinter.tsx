import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { CreditCard, Printer, RotateCw, CheckCircle, ArrowRight, User, Upload, RefreshCw } from "lucide-react";

export default function IDCardPrinter() {
  const [studentName, setStudentName] = useState("Aanya Sharma");
  const [grade, setGrade] = useState("Grade VII - B");
  const [rollNumber, setRollNumber] = useState("SE-2026-948");
  const [bloodGroup, setBloodGroup] = useState("O+");
  const [emergencyContact, setEmergencyContact] = useState("9632325991");
  const [cardTheme, setCardTheme] = useState<"yellow" | "red" | "blue" | "green">("yellow");
  
  const [isPrinting, setIsPrinting] = useState(false);
  const [printStep, setPrintStep] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [cardPrinted, setCardPrinted] = useState(true);

  const printSteps = [
    "Compiling template design...",
    "Injecting high-definition student photo vector...",
    "Feeding premium 30mil gloss PVC card stock...",
    "Applying thermal dye-sublimation print layer...",
    "Sealing with scratch-resistant clear coat laminate...",
    "Card complete! Ejecting from printer tray..."
  ];

  const handlePrint = () => {
    setIsPrinting(true);
    setCardPrinted(false);
    setPrintStep(0);
    setIsFlipped(false);

    const interval = setInterval(() => {
      setPrintStep((prev) => {
        if (prev >= printSteps.length - 1) {
          clearInterval(interval);
          setIsPrinting(false);
          setCardPrinted(true);
          return prev;
        }
        return prev + 1;
      });
    }, 800);
  };

  const getThemeColors = () => {
    switch (cardTheme) {
      case "red":
        return {
          banner: "bg-red-600",
          text: "text-red-400",
          accent: "border-red-500",
          bg: "from-red-950 to-zinc-950",
          bannerText: "text-white"
        };
      case "blue":
        return {
          banner: "bg-blue-600",
          text: "text-blue-400",
          accent: "border-blue-500",
          bg: "from-blue-950 to-zinc-950",
          bannerText: "text-white"
        };
      case "green":
        return {
          banner: "bg-emerald-600",
          text: "text-emerald-400",
          accent: "border-emerald-500",
          bg: "from-emerald-950 to-zinc-950",
          bannerText: "text-white"
        };
      case "yellow":
      default:
        return {
          banner: "bg-orange-400",
          text: "text-orange-400",
          accent: "border-orange-400",
          bg: "from-orange-950 to-zinc-950",
          bannerText: "text-zinc-950"
        };
    }
  };

  const colors = getThemeColors();

  return (
    <div className="w-full bg-white border border-slate-200 rounded-2xl p-4 shadow-sm relative overflow-hidden sm:rounded-3xl sm:p-6 md:p-8">
      {/* Decorative vector grid */}
      <div className="absolute inset-0 bg-[radial-gradient(#cbd5e1_1px,transparent_1px)] [background-size:16px_16px] opacity-40" />

      <div className="grid grid-cols-1 gap-6 items-center relative z-10 lg:grid-cols-12 lg:gap-8">
        
        {/* Left column: input details form */}
        <div className="lg:col-span-5 space-y-4 sm:space-y-5">
          <div>
            <span className="inline-flex max-w-full text-[10px] font-mono font-bold text-orange-700 uppercase tracking-wider bg-slate-50 px-2.5 py-1 rounded border border-slate-200 sm:text-xs sm:tracking-widest">
              SERVICE #4: FREE ID CARD PRINTING
            </span>
            <h3 className="text-xl sm:text-2xl md:text-3xl font-semibold tracking-tight text-slate-900 mt-3">
              PVC ID Card <span className="text-orange-600">Generator</span>
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 mt-2">
              Every school partner receives high-grade, premium gloss PVC student & staff ID cards <strong className="text-slate-800">Free of Cost</strong>. Test the 3D printer below!
            </p>
          </div>

          <div className="bg-slate-50 rounded-2xl border border-slate-200 p-4 space-y-3 sm:space-y-4 sm:p-5">
            <div>
              <label className="block text-[10px] font-mono text-slate-500 uppercase mb-1">Student Full Name</label>
              <input
                type="text"
                value={studentName}
                onChange={(e) => setStudentName(e.target.value)}
                className="w-full bg-white border border-slate-200 focus:border-orange-400 rounded-lg px-3 py-2.5 text-sm text-slate-900 outline-none transition"
                placeholder="Enter Student Name"
              />
            </div>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <div>
                <label className="block text-[10px] font-mono text-slate-500 uppercase mb-1">Class / Grade</label>
                <input
                  type="text"
                  value={grade}
                  onChange={(e) => setGrade(e.target.value)}
                  className="w-full bg-white border border-slate-200 focus:border-orange-400 rounded-lg px-3 py-2.5 text-sm text-slate-900 outline-none transition"
                  placeholder="e.g. Class VII-A"
                />
              </div>
              <div>
                <label className="block text-[10px] font-mono text-slate-500 uppercase mb-1">ID Number</label>
                <input
                  type="text"
                  value={rollNumber}
                  onChange={(e) => setRollNumber(e.target.value)}
                  className="w-full bg-white border border-slate-200 focus:border-orange-400 rounded-lg px-3 py-2.5 text-sm text-slate-900 outline-none transition"
                  placeholder="e.g. SE-2026"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <div>
                <label className="block text-[10px] font-mono text-slate-500 uppercase mb-1">Blood Group</label>
                <select
                  value={bloodGroup}
                  onChange={(e) => setBloodGroup(e.target.value)}
                  className="w-full bg-white border border-slate-200 focus:border-orange-400 rounded-lg px-3 py-2.5 text-sm text-slate-900 outline-none transition cursor-pointer"
                >
                  <option value="A+">A+</option>
                  <option value="B+">B+</option>
                  <option value="O+">O+</option>
                  <option value="AB+">AB+</option>
                  <option value="A-">A-</option>
                  <option value="B-">B-</option>
                </select>
              </div>
              <div>
                <label className="block text-[10px] font-mono text-slate-500 uppercase mb-1">Emergency Mobile</label>
                <input
                  type="text"
                  value={emergencyContact}
                  onChange={(e) => setEmergencyContact(e.target.value)}
                  className="w-full bg-white border border-slate-200 focus:border-orange-400 rounded-lg px-3 py-2.5 text-sm text-slate-900 outline-none transition"
                  placeholder="e.g. 9632325991"
                />
              </div>
            </div>

            {/* Template Card theme choice */}
            <div>
              <label className="block text-[10px] font-mono text-slate-500 uppercase mb-2">Card Template Theme</label>
              <div className="flex gap-2 sm:gap-3">
                {(["yellow", "red", "blue", "green"] as const).map((t) => (
                  <button
                    key={t}
                    onClick={() => setCardTheme(t)}
                    className={`w-9 h-9 sm:w-8 sm:h-8 rounded-full border-2 transition ${
                      t === "yellow" ? "bg-orange-400" : t === "red" ? "bg-red-500" : t === "blue" ? "bg-blue-500" : "bg-emerald-500"
                    } ${cardTheme === t ? "border-white scale-110" : "border-transparent opacity-60 hover:opacity-100"}`}
                    title={`${t} Theme`}
                  />
                ))}
              </div>
            </div>

            <button
              onClick={handlePrint}
              disabled={isPrinting}
              className="w-full py-3 bg-slate-900 text-white font-bold hover:bg-slate-800 disabled:bg-slate-300 disabled:text-slate-500 rounded-xl transition flex items-center justify-center gap-2 text-sm"
            >
              <Printer className="w-4 h-4" />
              {isPrinting ? "Printing Card..." : "Print Free PVC Card"}
            </button>
          </div>
        </div>

        {/* Right column: 3D interactive layout */}
        <div className="lg:col-span-7 flex flex-col items-center justify-center min-h-[300px] sm:min-h-[350px] md:min-h-[400px]">
          
          <AnimatePresence mode="wait">
            {isPrinting ? (
              /* Screen A: Printing Progress Mode */
              <motion.div
                key="printing"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="w-full max-w-[340px] bg-slate-50 p-6 rounded-2xl border border-slate-200 text-center space-y-4 shadow-sm"
              >
                <div className="w-16 h-16 bg-slate-100 border border-slate-200 rounded-full flex items-center justify-center mx-auto text-orange-600 animate-spin">
                  <RefreshCw className="w-6 h-6" />
                </div>
                <div className="space-y-1">
                  <h4 className="text-xs font-mono font-bold text-orange-700 tracking-wider">PRINTING UNDERWAY</h4>
                  <div className="text-sm font-semibold text-slate-900">Shiva High-Speed PVC Press</div>
                </div>

                <div className="h-1 w-full bg-slate-200 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-slate-500"
                    initial={{ width: "0%" }}
                    animate={{ width: `${((printStep + 1) / printSteps.length) * 100}%` }}
                    transition={{ duration: 0.6 }}
                  />
                </div>

                <p className="text-xs font-mono text-slate-500 min-h-[32px] px-2">
                  {printSteps[printStep]}
                </p>
              </motion.div>
            ) : (
              /* Screen B: Render the printed card in 3D perspective with flipping! */
              <motion.div
                key="card"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center gap-5"
              >
                {/* 3D Container */}
                <div
                  className="w-full max-w-[280px] aspect-[7/11] cursor-pointer"
                  style={{ perspective: "1000px" }}
                  onClick={() => setIsFlipped(!isFlipped)}
                >
                  <motion.div
                    className="w-full h-full relative"
                    style={{ transformStyle: "preserve-3d" }}
                    animate={{ rotateY: isFlipped ? 180 : 0 }}
                    transition={{ type: "spring", stiffness: 120, damping: 15 }}
                  >
                    
                    {/* CARD FRONT SIDE */}
                    <div
                      className={`absolute inset-0 rounded-2xl overflow-hidden border-2 border-zinc-800/80 shadow-2xl flex flex-col justify-between ${colors.accent}`}
                      style={{
                        backfaceVisibility: "hidden",
                        background: "linear-gradient(135deg, #18181b 0%, #0c0c0f 100%)",
                      }}
                    >
                      {/* Card Header Band */}
                      <div className={`p-4 text-center ${colors.banner} ${colors.bannerText} relative overflow-hidden`}>
                        <div className="absolute -top-10 -right-10 w-24 h-24 bg-white/10 rounded-full blur-xl" />
                        <h4 className="text-xs font-sans font-extrabold tracking-wider leading-tight">
                          SHIVA ACADEMY OF EXCELLENCE
                        </h4>
                        <p className="text-[8px] opacity-80 tracking-widest font-mono mt-0.5 uppercase">
                          CIB Colony, Kalaburagi
                        </p>
                      </div>

                      {/* Card Body / Student Details */}
                      <div className="p-5 flex-grow flex flex-col items-center justify-center space-y-4">
                        {/* Student Photo */}
                        <div className="relative">
                          <div className={`w-24 h-24 rounded-xl overflow-hidden border-2 bg-zinc-900 flex items-center justify-center ${colors.accent} relative`}>
                            {/* Face representation as stylish illustration */}
                            <svg className="w-16 h-16 text-zinc-600" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                            </svg>
                          </div>
                          {/* Holographic Crest */}
                          <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-gradient-to-tr from-orange-400 to-indigo-400 opacity-80 border border-zinc-800 flex items-center justify-center text-[8px] font-bold text-zinc-950 font-mono shadow">
                            S
                          </div>
                        </div>

                        {/* Name & Title */}
                        <div className="text-center">
                          <div className="text-base font-bold text-white tracking-wide">{studentName}</div>
                          <div className={`text-[10px] font-mono font-bold mt-0.5 ${colors.text}`}>{grade}</div>
                        </div>

                        {/* ID Specifications Table */}
                        <div className="w-full bg-zinc-950/80 rounded-lg p-2.5 border border-zinc-800/60 grid grid-cols-2 gap-y-1.5 text-left text-[9px] font-mono text-zinc-400">
                          <div>
                            <span className="text-zinc-600 block text-[7px] uppercase">ID Number</span>
                            <span className="text-zinc-200 font-bold">{rollNumber}</span>
                          </div>
                          <div>
                            <span className="text-zinc-600 block text-[7px] uppercase">Blood Group</span>
                            <span className="text-zinc-200 font-bold">{bloodGroup}</span>
                          </div>
                          <div className="col-span-2">
                            <span className="text-zinc-600 block text-[7px] uppercase">Emergency Mobile</span>
                            <span className="text-zinc-200 font-bold">{emergencyContact}</span>
                          </div>
                        </div>
                      </div>

                      {/* Card Footer */}
                      <div className="px-4 py-2 bg-zinc-950 border-t border-zinc-900 flex justify-between items-center text-[7px] font-mono text-zinc-500">
                        <span>STUDENT ID CARD</span>
                        <span>SHIVA GROUP</span>
                      </div>
                    </div>

                    {/* CARD BACK SIDE */}
                    <div
                      className="absolute inset-0 rounded-2xl overflow-hidden border-2 border-zinc-800 shadow-2xl flex flex-col justify-between p-5 text-left text-[9px] font-mono text-zinc-400 bg-zinc-950"
                      style={{
                        backfaceVisibility: "hidden",
                        transform: "rotateY(180deg)",
                      }}
                    >
                      <div className="space-y-4">
                        <div className="border-b border-zinc-800 pb-2 flex justify-between items-center">
                          <span className="text-[10px] font-bold text-white uppercase tracking-wider">Instructions</span>
                          <span className="text-[7px] text-zinc-600">CARD ID_{rollNumber}</span>
                        </div>

                        <ul className="space-y-2 list-disc list-inside text-[8px] text-zinc-500 leading-relaxed">
                          <li>This card is non-transferable and remains the property of the issuing institution.</li>
                          <li>In case of loss or theft, report immediately to the administration.</li>
                          <li>Wearing this card inside the campus is strictly mandatory for all.</li>
                          <li>Emergency Medical: If found injured, contact the emergency mobile on front immediately.</li>
                        </ul>

                        <div className="pt-3 border-t border-zinc-900 space-y-2">
                          <div className="text-zinc-600 text-[7px] uppercase">REGISTRAR SIGNATURE</div>
                          <div className="h-8 border-b border-zinc-800/60 relative flex items-center justify-center">
                            {/* Stylized vector signature */}
                            <svg className="w-24 h-6 text-zinc-600" fill="none" stroke="currentColor" strokeWidth="1">
                              <path d="M10 15 Q 30 5, 50 15 T 90 10" />
                            </svg>
                          </div>
                        </div>
                      </div>

                      {/* Barcode representation */}
                      <div className="space-y-1.5 flex flex-col items-center">
                        <div className="h-10 w-full bg-zinc-900 border border-zinc-800/80 rounded p-1 flex items-center justify-center gap-1">
                          {/* barcode bars */}
                          {Array.from({ length: 28 }).map((_, i) => (
                            <div
                              key={i}
                              className="h-full bg-zinc-500"
                              style={{ width: i % 3 === 0 ? "3px" : i % 4 === 0 ? "1px" : "2px" }}
                            />
                          ))}
                        </div>
                        <span className="text-[7px] text-zinc-600 uppercase">{rollNumber}</span>
                      </div>
                    </div>

                  </motion.div>
                </div>

                {/* Flip Hint */}
                <div className="flex items-center gap-1.5 text-slate-500 text-xs hover:text-orange-600 transition">
                  <RotateCw className="w-3.5 h-3.5" />
                  <span>Click Card to Flip 180°</span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

        </div>

      </div>
    </div>
  );
}

