import { notFound } from "next/navigation";
import { isAdminEnabled } from "@/lib/env";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  if (!isAdminEnabled()) {
    notFound();
  }
  return (
    <div className="container-edge py-12">
      <div className="mb-10 flex items-center justify-between border-b border-cream/10 pb-6">
        <div>
          <p className="eyebrow">Dev only</p>
          <h1 className="display mt-2 text-3xl">Admin Panel</h1>
        </div>
        <span className="rounded-full border border-sage/40 bg-sage/10 px-3 py-1 text-[10px] uppercase tracking-wide-2 text-sage">
          {process.env.NODE_ENV}
        </span>
      </div>
      {children}
    </div>
  );
}
