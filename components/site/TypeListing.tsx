import Link from "next/link";
import { PageContextScript } from "@/components/PageContextScript";
import { PropertyCard } from "@/components/site/PropertyCard";
import { getProperties } from "@/lib/content";
import { SITE } from "@/lib/content/sample";

/** Section page for one property type. Lists approved properties of that type, or an honest holding message. */
export async function TypeListing({
  type,
  eyebrow,
  title,
  lede,
  empty,
}: {
  type: string;
  eyebrow: string;
  title: string;
  lede: string;
  empty: string;
}) {
  const properties = (await getProperties()).filter((p) => p.type === type);
  return (
    <main>
      <PageContextScript page_type="property_search" journey="buyer" />
      <section className="bg-sand">
        <div className="wrap py-[clamp(56px,8vw,112px)]">
          <div className="eyebrow">{eyebrow}</div>
          <div className="rule" />
          <h1 className="display !text-[clamp(42px,6.4vw,84px)]">{title}</h1>
          <p className="mt-5 max-w-[640px] text-[17px]">{lede}</p>
        </div>
      </section>
      <section className="wrap section">
        {properties.length > 0 ? (
          <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
            {properties.map((p) => (
              <PropertyCard key={p.id} property={p} />
            ))}
          </div>
        ) : (
          <p className="max-w-[640px] font-serif text-[clamp(24px,2.6vw,32px)] leading-snug text-ocean">{empty}</p>
        )}
        <div className="mt-10 flex flex-wrap gap-3">
          <a href={SITE.phoneHref} className="btn btn-ocean">
            Call James · {SITE.phoneDisplay}
          </a>
          <Link href="/build" className="btn btn-line">
            Build your island dream home
          </Link>
        </div>
      </section>
    </main>
  );
}
