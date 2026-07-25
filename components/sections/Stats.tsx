import { Counter } from "@/components/ui/Counter";
import { Reveal } from "@/components/ui/Reveal";
import { StatData } from "@/sanity/queries";

interface StatsProps {
  stats: StatData[];
}

export function Stats({ stats }: StatsProps) {
  return (
    <section className="relative z-10 -mt-10 sm:-mt-14 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="bg-surface rounded-2xl border border-line shadow-xl p-6 sm:p-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 divide-y sm:divide-y-0 sm:divide-x divide-line">
          {stats.map((item, idx) => (
            <Reveal key={item._id} delayMs={idx * 100} className={idx > 0 ? "pt-4 sm:pt-0 sm:pl-6" : ""}>
              <div className="flex flex-col items-center text-center">
                <span className="text-3xl sm:text-4xl font-extrabold text-brand-600 tracking-tight">
                  <Counter target={item.value} suffix={item.suffix || ""} />
                </span>
                <span className="mt-1.5 text-xs sm:text-sm font-medium text-body">
                  {item.label}
                </span>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
