import React, { useState, useEffect } from 'react';
import {
  Play,
  Pause,
  RotateCcw,
  Volume2,
  VolumeX,
  Maximize2,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  Monitor,
  GraduationCap,
  CalendarCheck,
  Wallet,
  Award,
  CreditCard,
  BarChart3
} from 'lucide-react';

interface VideoDemoSectionProps {
  onExploreSystem: () => void;
}

export const VideoDemoSection: React.FC<VideoDemoSectionProps> = ({ onExploreSystem }) => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [progress, setProgress] = useState(25);
  const [activeChapterIndex, setActiveChapterIndex] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);

  const chapters = [
    {
      time: '00:00',
      progress: 0,
      title: 'Institutional Dashboard Overview',
      subtitle: 'Real-time KPIs, active student count, attendance rate & cash flow',
      icon: Monitor,
      screenTag: 'Dashboard Screen'
    },
    {
      time: '01:15',
      progress: 20,
      title: 'Student Admissions & Bio-Data',
      subtitle: 'Class allocations, guardian credentials and emergency contacts',
      icon: GraduationCap,
      screenTag: 'Students Module'
    },
    {
      time: '02:30',
      progress: 40,
      title: 'Smart Attendance & Absent SMS',
      subtitle: 'One-click daily roll call with automated SMS gateway integration',
      icon: CalendarCheck,
      screenTag: 'Attendance Screen'
    },
    {
      time: '03:45',
      progress: 60,
      title: '3-Copy Bank Fee Challans',
      subtitle: 'Automatic monthly vouchers, late fines and instant cash receipts',
      icon: Wallet,
      screenTag: 'Fees Module'
    },
    {
      time: '05:00',
      progress: 80,
      title: 'Examinations & Computerized DMC',
      subtitle: 'Marks calculation, position badges and progress report cards',
      icon: Award,
      screenTag: 'Exams Module'
    },
    {
      time: '06:30',
      progress: 100,
      title: 'Teachers Payroll & Financial Reports',
      subtitle: 'Faculty payslips, expense ledger and audit export reports',
      icon: CreditCard,
      screenTag: 'Payroll & Accounts'
    },
  ];

  // Auto progression simulation when playing
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying) {
      interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) return 0;
          const nextVal = prev + 0.5 * playbackSpeed;
          // find chapter
          const matchingIdx = chapters.findIndex((c, i) => {
            const nextChapter = chapters[i + 1];
            return nextVal >= c.progress && (!nextChapter || nextVal < nextChapter.progress);
          });
          if (matchingIdx !== -1) setActiveChapterIndex(matchingIdx);
          return nextVal;
        });
      }, 300);
    }
    return () => clearInterval(interval);
  }, [isPlaying, playbackSpeed]);

  const selectChapter = (index: number) => {
    setActiveChapterIndex(index);
    setProgress(chapters[index].progress);
    setIsPlaying(true);
  };

  const currentChapter = chapters[activeChapterIndex] || chapters[0];

  return (
    <section id="video-demo" className="py-20 relative bg-gradient-to-b from-[#FFFFFF] via-[#F4FFF8] to-[#FFFFFF] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Above Video Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#DDF7E8] text-[#123B2A] text-xs font-bold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5 text-[#19A66A]" />
            Official Software Walkthrough
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold font-['Outfit'] text-[#123B2A] tracking-tight">
            See School Markaz In Action
          </h2>
          <p className="mt-2 text-lg font-medium text-[#19A66A]">
            See How School Markaz Works
          </p>
          <p className="mt-2 text-sm sm:text-base text-[#123B2A]/70">
            Explore the real School Markaz interface and see how everyday school management becomes simpler, faster and more organized.
          </p>
        </div>

        {/* Video Player Device Container Frame */}
        <div className="max-w-5xl mx-auto rounded-3xl bg-white/80 backdrop-blur-xl border border-[#19A66A]/30 shadow-2xl green-glow-lg overflow-hidden transition-all duration-300">
          
          {/* Top Browser Bar */}
          <div className="bg-[#123B2A] px-4 py-3 flex items-center justify-between text-white border-b border-[#19A66A]/20">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-rose-500" />
              <span className="w-3 h-3 rounded-full bg-amber-500" />
              <span className="w-3 h-3 rounded-full bg-emerald-500" />
              <span className="ml-3 text-xs font-semibold text-emerald-200 hidden sm:inline">
                School Markaz Software Video Demonstration
              </span>
            </div>
            <div className="flex items-center gap-2 text-xs">
              <span className="bg-[#19A66A]/40 text-emerald-200 px-2.5 py-0.5 rounded-full text-[11px] font-bold">
                1080p Full HD
              </span>
            </div>
          </div>

          {/* Interactive Video Playback Canvas */}
          <div className="relative aspect-video w-full bg-[#0A1F16] overflow-hidden flex flex-col justify-between p-4 sm:p-8 text-white">
            
            {/* Background Simulated Software Screen */}
            <div className="absolute inset-0 opacity-25 pointer-events-none bg-[radial-gradient(#19A66A_1px,transparent_1px)] [background-size:16px_16px]" />

            {/* In-Video Active Demonstration Display Area */}
            <div className="relative z-10 my-auto max-w-2xl mx-auto text-center space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs font-semibold text-emerald-300">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                <span>Now Playing: {currentChapter.screenTag}</span>
              </div>

              <h3 className="text-xl sm:text-3xl font-extrabold font-['Outfit'] tracking-tight">
                {currentChapter.title}
              </h3>

              <p className="text-xs sm:text-sm text-white/80 max-w-lg mx-auto">
                {currentChapter.subtitle}
              </p>

              {/* Realistic Software Screen Card inside Video */}
              <div className="p-4 rounded-2xl bg-[#123B2A]/90 border border-emerald-500/30 text-left shadow-2xl max-w-lg mx-auto space-y-2.5">
                <div className="flex items-center justify-between text-xs pb-2 border-b border-emerald-500/20">
                  <span className="font-bold text-emerald-300">🎓 School Markaz System View</span>
                  <span className="text-[10px] text-emerald-400">Timestamp {currentChapter.time}</span>
                </div>
                
                {/* Simulated Content based on active chapter */}
                {activeChapterIndex === 0 && (
                  <div className="grid grid-cols-3 gap-2 text-xs">
                    <div className="p-2 bg-white/5 rounded-lg">
                      <div className="text-[10px] text-gray-400">Students</div>
                      <div className="text-base font-bold text-white">1,250</div>
                    </div>
                    <div className="p-2 bg-white/5 rounded-lg">
                      <div className="text-[10px] text-gray-400">Teachers</div>
                      <div className="text-base font-bold text-white">85</div>
                    </div>
                    <div className="p-2 bg-white/5 rounded-lg">
                      <div className="text-[10px] text-gray-400">Attendance</div>
                      <div className="text-base font-bold text-emerald-400">94%</div>
                    </div>
                  </div>
                )}

                {activeChapterIndex === 1 && (
                  <div className="text-xs space-y-1 text-gray-200">
                    <div className="flex justify-between font-mono text-[11px] text-emerald-300">
                      <span>Roll: 8A-12</span>
                      <span>Muhammad Ahmed</span>
                    </div>
                    <div className="text-[10px] text-gray-400">Father: Tariq Ahmed • Grade 8 - Section A • Status: Enrolled</div>
                  </div>
                )}

                {activeChapterIndex === 2 && (
                  <div className="text-xs space-y-1">
                    <div className="flex justify-between text-emerald-300 font-semibold">
                      <span>Class 8-A: 40 Students</span>
                      <span>38 Present • 2 Absent</span>
                    </div>
                    <div className="text-[10px] text-emerald-400 bg-white/5 p-1.5 rounded">
                      ✓ Instant SMS dispatched to Absent Parents via Markaz SMS Gateway
                    </div>
                  </div>
                )}

                {activeChapterIndex === 3 && (
                  <div className="text-xs space-y-1 text-gray-200">
                    <div className="flex justify-between font-bold text-emerald-300">
                      <span>3-Copy Bank Challan</span>
                      <span>Rs. 3,500</span>
                    </div>
                    <div className="text-[10px] text-gray-400">Generated: School Copy | Bank Copy | Student Copy</div>
                  </div>
                )}

                {activeChapterIndex === 4 && (
                  <div className="text-xs space-y-1 text-gray-200">
                    <div className="flex justify-between font-bold text-emerald-300">
                      <span>Bilal Tariq (10-A)</span>
                      <span className="text-amber-300">Position: 1st (95.2%)</span>
                    </div>
                    <div className="text-[10px] text-emerald-400">Automated DMC card ready with grades & remarks</div>
                  </div>
                )}

                {activeChapterIndex === 5 && (
                  <div className="text-xs space-y-1 text-gray-200">
                    <div className="flex justify-between font-bold text-emerald-300">
                      <span>Monthly Surplus</span>
                      <span>Rs. 270,000</span>
                    </div>
                    <div className="text-[10px] text-gray-400">Income: Rs. 450,000 | Expenses: Rs. 180,000</div>
                  </div>
                )}

              </div>

              {/* Big Play Overlay Button if paused */}
              {!isPlaying && (
                <button
                  onClick={() => setIsPlaying(true)}
                  className="w-16 h-16 rounded-full bg-[#19A66A] text-white flex items-center justify-center mx-auto shadow-xl hover:scale-110 transition-transform cursor-pointer"
                  aria-label="Play video"
                >
                  <Play className="w-8 h-8 fill-white ml-1" />
                </button>
              )}
            </div>

            {/* Custom Video Controls Bar */}
            <div className="relative z-10 bg-black/60 backdrop-blur-md rounded-2xl p-3 sm:p-4 border border-white/10 space-y-2">
              {/* Scrub / Progress Bar */}
              <div
                className="w-full bg-white/20 h-2 rounded-full overflow-hidden cursor-pointer relative"
                onClick={(e) => {
                  const rect = e.currentTarget.getBoundingClientRect();
                  const clickX = e.clientX - rect.left;
                  const newPercent = (clickX / rect.width) * 100;
                  setProgress(newPercent);
                }}
              >
                <div
                  className="bg-gradient-to-r from-[#19A66A] to-emerald-400 h-full rounded-full transition-all"
                  style={{ width: `${progress}%` }}
                />
              </div>

              {/* Bottom Buttons */}
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setIsPlaying(!isPlaying)}
                    className="p-1.5 hover:bg-white/10 rounded-lg transition-colors cursor-pointer"
                    aria-label={isPlaying ? 'Pause' : 'Play'}
                  >
                    {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 fill-white" />}
                  </button>

                  <button
                    onClick={() => {
                      setProgress(0);
                      setActiveChapterIndex(0);
                      setIsPlaying(true);
                    }}
                    className="p-1.5 hover:bg-white/10 rounded-lg transition-colors cursor-pointer"
                    aria-label="Restart"
                  >
                    <RotateCcw className="w-4 h-4" />
                  </button>

                  <button
                    onClick={() => setIsMuted(!isMuted)}
                    className="p-1.5 hover:bg-white/10 rounded-lg transition-colors cursor-pointer"
                    aria-label={isMuted ? 'Unmute' : 'Mute'}
                  >
                    {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                  </button>

                  <span className="font-mono text-emerald-300 text-[11px] hidden sm:inline">
                    {currentChapter.time} / 08:30
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setPlaybackSpeed(playbackSpeed === 1 ? 1.5 : playbackSpeed === 1.5 ? 2 : 1)}
                    className="px-2 py-0.5 rounded bg-white/10 text-emerald-300 font-bold text-[10px] hover:bg-white/20 cursor-pointer"
                  >
                    {playbackSpeed}x
                  </button>

                  <button
                    onClick={() => alert('Full screen presentation mode')}
                    className="p-1.5 hover:bg-white/10 rounded-lg transition-colors cursor-pointer"
                    aria-label="Fullscreen"
                  >
                    <Maximize2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

          </div>

          {/* Interactive Chapter Selector Below Video */}
          <div className="p-4 sm:p-6 bg-white border-t border-[#19A66A]/15">
            <div className="text-xs font-bold text-[#123B2A] mb-3 flex items-center justify-between">
              <span>Jump To Software Module:</span>
              <span className="text-[#19A66A] text-[11px]">Click any chapter to preview</span>
            </div>
            
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
              {chapters.map((ch, idx) => {
                const Icon = ch.icon;
                const isSelected = idx === activeChapterIndex;
                return (
                  <button
                    key={ch.time}
                    onClick={() => selectChapter(idx)}
                    type="button"
                    className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-[#DDF7E8] border-[#19A66A] shadow-xs'
                        : 'bg-white hover:bg-[#F4FFF8] border-[#19A66A]/15'
                    }`}
                  >
                    <div className="flex items-center gap-1.5 text-[10px] font-mono font-bold text-[#19A66A]">
                      <Icon className="w-3 h-3" />
                      <span>{ch.time}</span>
                    </div>
                    <div className="text-xs font-bold text-[#123B2A] truncate mt-1">
                      {ch.screenTag}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Below Video CTA */}
            <div className="mt-6 pt-6 border-t border-[#19A66A]/15 flex flex-col sm:flex-row items-center justify-between gap-4">
              <p className="text-xs sm:text-sm text-[#123B2A]/80 text-center sm:text-left">
                Ready to experience the speed and simplicity of School Markaz in your own school?
              </p>
              <button
                onClick={onExploreSystem}
                type="button"
                className="w-full sm:w-auto px-6 py-3 text-sm font-bold text-white bg-[#19A66A] hover:bg-[#158f5b] rounded-xl shadow-md shadow-[#19A66A]/20 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Explore The System</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
