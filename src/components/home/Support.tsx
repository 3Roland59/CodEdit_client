export default function Support() {
  return (
    <section className="py-20 bg-slate-50/50">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-10">
          <div className="max-w-xs text-center md:text-left">
            <h2 className="text-xl font-black text-slate-900 tracking-tight mb-2">
              Trusted by Innovators
            </h2>
            <p className="text-sm font-medium text-slate-500">
              Empowering leading institutions and teams worldwide to redefine coding education.
            </p>
          </div>

          <div className="flex-1 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 items-center gap-x-8 gap-y-10 opacity-70 grayscale hover:grayscale-0 transition-all duration-700">
            {[
              "transistor",
              "reform",
              "tuple",
              "savvycal",
              "statamic",
            ].map((name, i) => (
              <div key={name + i} className="flex justify-center group">
                <img
                  alt={name}
                  src={`https://tailwindcss.com/plus-assets/img/logos/158x48/${name}-logo-gray-900.svg`}
                  width={120}
                  height={40}
                  className="max-h-8 w-auto object-contain transition-transform duration-500 group-hover:scale-110"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
