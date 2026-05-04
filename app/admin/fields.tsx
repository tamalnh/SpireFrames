"use client";

import { useId } from "react";

/* -------------------- Primitive fields -------------------- */

export function TextField({
  label,
  value,
  onChange,
  placeholder,
  hint,
  textarea,
  rows = 3
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  hint?: string;
  textarea?: boolean;
  rows?: number;
}) {
  const id = useId();
  return (
    <div>
      <label
        htmlFor={id}
        className="mb-2 block text-[10px] uppercase tracking-wide-2 text-cream/55"
      >
        {label}
      </label>
      {textarea ? (
        <textarea
          id={id}
          value={value ?? ""}
          rows={rows}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="block w-full resize-y rounded-lg border border-cream/15 bg-cream/[0.03] px-3 py-2.5 text-sm text-cream outline-none transition-colors focus:border-sage focus:bg-cream/[0.05]"
        />
      ) : (
        <input
          id={id}
          value={value ?? ""}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="block w-full rounded-lg border border-cream/15 bg-cream/[0.03] px-3 py-2.5 text-sm text-cream outline-none transition-colors focus:border-sage focus:bg-cream/[0.05]"
        />
      )}
      {hint && <p className="mt-1.5 text-[11px] text-cream/45">{hint}</p>}
    </div>
  );
}

export function ToggleField({
  label,
  value,
  onChange,
  hint
}: {
  label: string;
  value: boolean;
  onChange: (v: boolean) => void;
  hint?: string;
}) {
  return (
    <div className="flex items-center justify-between gap-4 rounded-lg border border-cream/15 bg-cream/[0.03] px-3 py-3">
      <div>
        <p className="text-sm text-cream">{label}</p>
        {hint && <p className="mt-0.5 text-[11px] text-cream/45">{hint}</p>}
      </div>
      <button
        type="button"
        onClick={() => onChange(!value)}
        aria-pressed={value}
        className={`relative h-6 w-11 shrink-0 rounded-full border transition-colors ${
          value
            ? "border-sage bg-sage"
            : "border-cream/30 bg-cream/10"
        }`}
      >
        <span
          className={`absolute top-0.5 h-5 w-5 rounded-full bg-cream transition-all ${
            value ? "left-5" : "left-0.5"
          }`}
        />
      </button>
    </div>
  );
}

/* -------------------- List of strings -------------------- */

export function StringListField({
  label,
  values,
  onChange,
  placeholder
}: {
  label: string;
  values: string[];
  onChange: (next: string[]) => void;
  placeholder?: string;
}) {
  const update = (i: number, v: string) => {
    const next = [...values];
    next[i] = v;
    onChange(next);
  };
  const remove = (i: number) => onChange(values.filter((_, idx) => idx !== i));
  const move = (i: number, dir: -1 | 1) => {
    const j = i + dir;
    if (j < 0 || j >= values.length) return;
    const next = [...values];
    [next[i], next[j]] = [next[j], next[i]];
    onChange(next);
  };

  return (
    <div>
      <p className="mb-2 text-[10px] uppercase tracking-wide-2 text-cream/55">
        {label}
      </p>
      <ul className="space-y-2">
        {values.map((v, i) => (
          <li key={i} className="flex items-center gap-2">
            <input
              value={v}
              onChange={(e) => update(i, e.target.value)}
              placeholder={placeholder}
              className="flex-1 rounded-lg border border-cream/15 bg-cream/[0.03] px-3 py-2 text-sm text-cream outline-none focus:border-sage"
            />
            <button
              type="button"
              onClick={() => move(i, -1)}
              className="rounded-md border border-cream/15 px-2 py-1 text-xs text-cream/70 hover:border-cream/40"
              aria-label="Move up"
            >
              ↑
            </button>
            <button
              type="button"
              onClick={() => move(i, 1)}
              className="rounded-md border border-cream/15 px-2 py-1 text-xs text-cream/70 hover:border-cream/40"
              aria-label="Move down"
            >
              ↓
            </button>
            <button
              type="button"
              onClick={() => remove(i)}
              className="rounded-md border border-red-300/20 px-2 py-1 text-xs text-red-300 hover:border-red-300/50"
              aria-label="Remove"
            >
              ×
            </button>
          </li>
        ))}
      </ul>
      <button
        type="button"
        onClick={() => onChange([...values, ""])}
        className="mt-2 rounded-full border border-cream/15 px-3 py-1.5 text-xs text-cream/80 hover:border-sage hover:text-cream"
      >
        + Add item
      </button>
    </div>
  );
}

/* -------------------- Generic object-list editor -------------------- */

export type ListEditorProps<T> = {
  label: string;
  items: T[];
  onChange: (next: T[]) => void;
  blank: () => T;
  renderItem: (
    item: T,
    update: (patch: Partial<T>) => void,
    api: { remove: () => void; moveUp: () => void; moveDown: () => void; index: number }
  ) => React.ReactNode;
  itemSummary?: (item: T, index: number) => string;
};

export function ListEditor<T>({
  label,
  items,
  onChange,
  blank,
  renderItem,
  itemSummary
}: ListEditorProps<T>) {
  const update = (i: number, patch: Partial<T>) => {
    const next = items.map((it, idx) => (idx === i ? { ...it, ...patch } : it));
    onChange(next);
  };
  const remove = (i: number) => onChange(items.filter((_, idx) => idx !== i));
  const move = (i: number, dir: -1 | 1) => {
    const j = i + dir;
    if (j < 0 || j >= items.length) return;
    const next = [...items];
    [next[i], next[j]] = [next[j], next[i]];
    onChange(next);
  };
  const add = () => onChange([...items, blank()]);

  return (
    <div>
      <div className="mb-3 flex items-center justify-between">
        <p className="text-[10px] uppercase tracking-wide-2 text-cream/55">{label}</p>
        <button
          type="button"
          onClick={add}
          className="rounded-full border border-sage/40 bg-sage/10 px-3 py-1.5 text-xs text-sage hover:bg-sage/20"
        >
          + Add
        </button>
      </div>

      <div className="space-y-3">
        {items.map((item, i) => (
          <details
            key={i}
            className="group rounded-xl border border-cream/10 bg-cream/[0.02] open:bg-cream/[0.04]"
          >
            <summary className="flex cursor-pointer list-none items-center justify-between gap-2 px-4 py-3 text-sm">
              <span className="flex items-center gap-3">
                <span className="font-mono text-[11px] text-cream/45">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="text-cream/90">
                  {itemSummary ? itemSummary(item, i) : `Item ${i + 1}`}
                </span>
              </span>
              <span className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    move(i, -1);
                  }}
                  className="rounded-md border border-cream/15 px-2 py-1 text-xs text-cream/70 hover:border-cream/40"
                  aria-label="Move up"
                >
                  ↑
                </button>
                <button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    move(i, 1);
                  }}
                  className="rounded-md border border-cream/15 px-2 py-1 text-xs text-cream/70 hover:border-cream/40"
                  aria-label="Move down"
                >
                  ↓
                </button>
                <button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    remove(i);
                  }}
                  className="rounded-md border border-red-300/20 px-2 py-1 text-xs text-red-300 hover:border-red-300/50"
                  aria-label="Remove"
                >
                  ×
                </button>
                <span className="ml-1 text-cream/45 transition-transform group-open:rotate-180">
                  ⌄
                </span>
              </span>
            </summary>
            <div className="border-t border-cream/10 p-4 sm:p-5">
              {renderItem(item, (patch) => update(i, patch), {
                remove: () => remove(i),
                moveUp: () => move(i, -1),
                moveDown: () => move(i, 1),
                index: i
              })}
            </div>
          </details>
        ))}

        {items.length === 0 && (
          <p className="rounded-lg border border-dashed border-cream/15 px-4 py-6 text-center text-xs text-cream/45">
            No items yet — click <span className="text-sage">+ Add</span>.
          </p>
        )}
      </div>
    </div>
  );
}
