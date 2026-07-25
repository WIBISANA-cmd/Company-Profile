import { Reveal } from "./Reveal";

interface SectionHeadingProps {
  badge?: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center";
}

export function SectionHeading({
  badge,
  title,
  subtitle,
  align = "center",
}: SectionHeadingProps) {
  const alignment = align === "center" ? "text-center mx-auto max-w-2xl" : "text-left max-w-2xl";

  return (
    <div className={`mb-12 ${alignment}`}>
      <Reveal>
        {badge && (
          <span className="inline-block px-3.5 py-1 mb-3 text-xs font-semibold tracking-wider text-brand-600 uppercase bg-brand-50 rounded-full border border-brand-200">
            {badge}
          </span>
        )}
        <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-ink">
          {title}
        </h2>
        {subtitle && (
          <p className="mt-4 text-base sm:text-lg text-body leading-relaxed">
            {subtitle}
          </p>
        )}
      </Reveal>
    </div>
  );
}
