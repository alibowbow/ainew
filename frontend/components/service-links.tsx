import Link from "next/link";

import { Service } from "@/lib/types";

export function ServiceLinks({ services }: { services: Service[] }) {
  return (
    <div className="grid gap-3 sm:grid-cols-3">
      {services.map((service) => (
        <Link
          key={service.slug}
          href={`/service/${service.slug}`}
          className="rounded-2xl border border-border bg-white p-4 shadow-card transition hover:-translate-y-0.5"
        >
          <div className="text-sm font-medium text-indigo-700">{service.company_name}</div>
          <div className="mt-1 text-lg font-semibold text-ink">{service.display_name}</div>
          <p className="mt-2 text-sm text-muted">{service.description}</p>
        </Link>
      ))}
    </div>
  );
}
