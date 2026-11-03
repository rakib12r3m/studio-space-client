
import { Clapperboard } from "lucide-react";

const Loading = () => {
  return (
    <main className="flex min-h-[75vh] flex-col items-center justify-center overflow-hidden bg-[#080D20] px-4 py-16">

      {/* Brand Logo */}
      <div className="mb-10 flex items-center gap-3">
        <div className="rounded-xl bg-[#102A72] p-3 shadow-lg shadow-blue-500/20">
          <Clapperboard
            size={30}
            className="text-[#CCFF00]"
          />
        </div>

        <div>
          <h1 className="text-2xl font-black tracking-tight text-white">
            Studio<span className="text-[#CCFF00]">Space</span>
          </h1>

          <p className="text-[9px] font-semibold uppercase tracking-[3px] text-blue-200/50">
            Creative Hub
          </p>
        </div>
      </div>

      {/* Skeleton Content */}
      <div className="w-full max-w-5xl animate-pulse">

        {/* Heading Skeleton */}
        <div className="mb-8 space-y-3 text-center">
          <div className="mx-auto h-3 w-28 rounded-full bg-lime-400/30" />
          <div className="mx-auto h-8 w-64 max-w-full rounded-lg bg-white/10" />
          <div className="mx-auto h-3 w-80 max-w-full rounded-full bg-white/5" />
        </div>

        {/* Cards Skeleton */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">

          {[1, 2, 3].map((item) => (
            <div
              key={item}
              className="overflow-hidden rounded-2xl border border-white/10 bg-[#111B38] p-3"
            >
              {/* Image */}
              <div className="h-48 w-full rounded-xl bg-white/10" />

              {/* Card Content */}
              <div className="space-y-4 p-3">

                <div className="h-3 w-24 rounded-full bg-lime-400/20" />

                <div className="h-5 w-3/4 rounded-md bg-white/10" />

                <div className="h-3 w-1/2 rounded-full bg-white/5" />

                <div className="flex items-center justify-between pt-2">
                  <div className="h-5 w-20 rounded-md bg-lime-400/20" />

                  <div className="h-9 w-24 rounded-lg bg-white/10" />
                </div>

              </div>
            </div>
          ))}

        </div>
      </div>

      {/* Loading Indicator */}
      <div className="mt-12 flex flex-col items-center gap-4">

        <div className="flex items-center gap-2">
          <span className="h-2 w-2 animate-bounce rounded-full bg-[#CCFF00]" />
          <span className="h-2 w-2 animate-bounce rounded-full bg-[#CCFF00] [animation-delay:150ms]" />
          <span className="h-2 w-2 animate-bounce rounded-full bg-[#CCFF00] [animation-delay:300ms]" />
        </div>

        <p className="text-xs font-medium tracking-widest text-blue-100/50">
          PREPARING YOUR CREATIVE SPACE...
        </p>

      </div>

    </main>
  );
};

export default Loading;
