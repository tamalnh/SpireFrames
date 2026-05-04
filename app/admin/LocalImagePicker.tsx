"use client";

import { useId, useRef, useState } from "react";

type Props = {
  /** Current src value (remote URL or /public path). */
  value: string;
  /** Called with the new src string. */
  onChange: (src: string) => void;
  /** Slug used to suggest a target folder under /public/portfolio. */
  slug?: string;
  label?: string;
  hint?: string;
};

/**
 * Lets a user pick a local image from disk:
 *  1. Reads it as a data URL for an instant preview
 *  2. Suggests a `/portfolio/{slug}/{filename}` public path
 *  3. Downloads the file (so the user can drop it into `/public/portfolio/{slug}`)
 *  4. Sets `src` to that suggested path
 *
 * Also accepts a manually-typed path or remote URL.
 */
export default function LocalImagePicker({
  value,
  onChange,
  slug,
  label = "Image source",
  hint
}: Props) {
  const inputId = useId();
  const fileRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<string>("");
  const [pendingFilename, setPendingFilename] = useState<string>("");
  const [pendingBlobUrl, setPendingBlobUrl] = useState<string>("");

  const sanitize = (name: string) =>
    name
      .toLowerCase()
      .replace(/\.[^.]+$/, (ext) => ext)
      .replace(/[^a-z0-9._-]+/g, "-")
      .replace(/-+/g, "-")
      .replace(/^-|-$/g, "");

  const onFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const filename = sanitize(file.name) || `image-${Date.now()}.jpg`;
    const folder = slug ? `/portfolio/${slug}` : `/portfolio`;
    const path = `${folder}/${filename}`;

    // Preview
    const reader = new FileReader();
    reader.onload = () => setPreview(String(reader.result ?? ""));
    reader.readAsDataURL(file);

    // Blob URL for re-download (so the user can save the file to /public)
    if (pendingBlobUrl) URL.revokeObjectURL(pendingBlobUrl);
    const blobUrl = URL.createObjectURL(file);
    setPendingBlobUrl(blobUrl);
    setPendingFilename(filename);

    onChange(path);
  };

  const downloadAgain = () => {
    if (!pendingBlobUrl || !pendingFilename) return;
    const a = document.createElement("a");
    a.href = pendingBlobUrl;
    a.download = pendingFilename;
    a.click();
  };

  const showPreview = preview || (value && !value.startsWith("data:") ? value : "");

  return (
    <div>
      <label
        htmlFor={inputId}
        className="mb-2 block text-[10px] uppercase tracking-wide-2 text-cream/55"
      >
        {label}
      </label>

      <div className="grid gap-3 sm:grid-cols-[120px_1fr]">
        {/* Preview */}
        <div className="relative aspect-square overflow-hidden rounded-lg border border-hairline/20 bg-surface">
          {showPreview ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={showPreview}
              alt=""
              className="absolute inset-0 h-full w-full object-cover"
            />
          ) : (
            <div className="flex h-full items-center justify-center text-[10px] uppercase tracking-wide-2 text-cream/40">
              No image
            </div>
          )}
        </div>

        {/* Controls */}
        <div className="space-y-2">
          <input
            id={inputId}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder="/portfolio/my-project/cover.jpg  or  https://..."
            className="block w-full rounded-lg border border-hairline/20 bg-surface px-3 py-2.5 text-sm text-cream outline-none transition-colors focus:border-sage"
          />
          <div className="flex flex-wrap items-center gap-2">
            <input
              ref={fileRef}
              type="file"
              accept="image/*"
              onChange={onFile}
              className="hidden"
            />
            <button
              type="button"
              onClick={() => fileRef.current?.click()}
              className="rounded-full border border-hairline/20 px-3 py-1.5 text-xs text-cream/85 hover:border-sage hover:text-cream"
            >
              Pick local image…
            </button>
            {pendingBlobUrl && (
              <button
                type="button"
                onClick={downloadAgain}
                className="rounded-full bg-sage px-3 py-1.5 text-xs font-medium text-ink hover:opacity-90"
              >
                Download file again
              </button>
            )}
            {value && (
              <button
                type="button"
                onClick={() => {
                  if (pendingBlobUrl) URL.revokeObjectURL(pendingBlobUrl);
                  setPendingBlobUrl("");
                  setPendingFilename("");
                  setPreview("");
                  onChange("");
                }}
                className="text-xs text-red-300 hover:underline"
              >
                Clear
              </button>
            )}
          </div>
          {pendingFilename && (
            <p className="rounded-md border border-sage/30 bg-sage/10 px-3 py-2 text-[11px] leading-relaxed text-cream/85">
              <strong className="text-sage">Save the downloaded file to:</strong>{" "}
              <code className="rounded bg-cream/10 px-1.5 py-0.5">
                public{value}
              </code>
            </p>
          )}
          {hint && <p className="text-[11px] text-cream/45">{hint}</p>}
        </div>
      </div>
    </div>
  );
}
