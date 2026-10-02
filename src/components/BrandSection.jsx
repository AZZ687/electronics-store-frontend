
const brands = [
  {
    name: "Samsung",
    logo: "https://commons.wikimedia.org/wiki/Special:Redirect/file/Samsung_logo_wordmark.svg",
  },
  {
    name: "LG",
    logo: "https://commons.wikimedia.org/wiki/Special:Redirect/file/LG_logo_(2014).svg",
  },
  {
    name: "Hisense",
    logo: "https://commons.wikimedia.org/wiki/Special:Redirect/file/Hisense_logo.svg",
  },
  {
    name: "TCL",
    logo: "https://commons.wikimedia.org/wiki/Special:Redirect/file/TCL-Global-logo.svg",
  },
];

const BrandSection = () => {
  return (
    <section className="relative overflow-hidden bg-slate-50 py-20 sm:py-24">

      {/* Background decoration */}
      <div className="pointer-events-none absolute -left-40 top-10 h-96 w-96 rounded-full bg-primary/5 blur-3xl" />
      <div className="pointer-events-none absolute -right-40 bottom-0 h-96 w-96 rounded-full bg-primary/5 blur-3xl" />

      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="mx-auto mb-14 max-w-2xl text-center">

          <div className="mb-4 flex items-center justify-center gap-3">
            <span className="h-px w-8 bg-primary/40" />

            <span className="text-xs font-bold uppercase tracking-[0.25em] text-primary">
              Trusted Brands
            </span>

            <span className="h-px w-8 bg-primary/40" />
          </div>

          <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            Brands You Can Trust
          </h2>

          <p className="mx-auto mt-5 max-w-xl text-sm leading-7 text-slate-500 sm:text-base">
            We work with leading global brands to bring you reliable
            appliances, innovative technology, and lasting quality.
          </p>
        </div>

        {/* Brand Grid */}
        <div className="grid grid-cols-2 gap-5 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">

          {brands.map((brand) => (
            <div
              key={brand.name}
              className="
                group relative
                h-40 sm:h-44
                overflow-hidden
                rounded-3xl
                border border-slate-200/80
                bg-white
                transition-all duration-500
                hover:-translate-y-2
                hover:border-slate-300
                hover:shadow-[0_25px_60px_rgba(15,23,42,0.10)]
              "
            >

              {/* Decorative circle */}
              <div
                className="
                  absolute
                  -right-10
                  -top-10
                  h-32
                  w-32
                  rounded-full
                  bg-slate-50
                  transition-all
                  duration-500
                  group-hover:scale-150
                  group-hover:bg-primary/5
                "
              />

              {/* Second decorative circle */}
              <div
                className="
                  absolute
                  -bottom-12
                  -left-12
                  h-32
                  w-32
                  rounded-full
                  border
                  border-slate-100
                  transition-all
                  duration-500
                  group-hover:scale-125
                  group-hover:border-primary/10
                "
              />

              {/* Logo container */}
              <div className="relative z-10 flex h-full flex-col items-center justify-center px-6">

                <div
                  className="
                    flex
                    h-20
                    w-full
                    items-center
                    justify-center
                    transition-all
                    duration-500
                    group-hover:scale-105
                  "
                >
                  <img
                    src={brand.logo}
                    alt={`${brand.name} logo`}
                    className="
                      max-h-12
                      max-w-[170px]
                      w-auto
                      object-contain
                      opacity-90
                      transition-all
                      duration-500
                      group-hover:opacity-100
                    "
                    loading="lazy"
                    onError={(e) => {
                      e.currentTarget.style.display = "none";
                    }}
                  />
                </div>

                {/* Brand name */}
                <span
                  className="
                    mt-3
                    text-[10px]
                    font-semibold
                    uppercase
                    tracking-[0.25em]
                    text-slate-400
                    transition-colors
                    duration-300
                    group-hover:text-primary
                  "
                >
                  {brand.name}
                </span>

              </div>

              {/* Bottom accent */}
              <div
                className="
                  absolute
                  bottom-0
                  left-1/2
                  h-0.5
                  w-0
                  -translate-x-1/2
                  bg-primary
                  transition-all
                  duration-500
                  group-hover:w-16
                "
              />

            </div>
          ))}

        </div>

        {/* Bottom text */}
        <div className="mt-10 text-center">
          <p className="text-xs font-medium tracking-wide text-slate-400">
            Quality brands · Reliable products · Better living
          </p>
        </div>

      </div>
    </section>
  );
};

export default BrandSection;

