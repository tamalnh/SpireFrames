type Props = {
  eyebrow?: string;
  title: string;
  body?: string;
  align?: "left" | "center";
};

export default function SectionHeader({ eyebrow, title, body, align = "left" }: Props) {
  const alignClass = align === "center" ? "text-center mx-auto" : "";
  return (
    <div className={`max-w-2xl ${alignClass}`}>
      {eyebrow && <p className="eyebrow mb-4">{eyebrow}</p>}
      <h2 className="display text-[2rem] leading-[1.05] sm:text-4xl lg:text-5xl">
        {title}
      </h2>
      {body && (
        <p className="mt-4 text-sm leading-relaxed text-cream/75 sm:mt-5 sm:text-base">
          {body}
        </p>
      )}
    </div>
  );
}
