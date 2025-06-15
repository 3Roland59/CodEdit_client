export default function Support() {
  return (
    <div className="relative isolate overflow-hidden bg-white py-24 sm:py-32">
      

      {/* Content */}
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <h2 className="text-center text-lg font-semibold text-gray-900">
          Trusted by the world’s most innovative teams
        </h2>
        <div className="mx-auto mt-10 grid max-w-lg grid-cols-4 items-center gap-x-8 gap-y-10 sm:max-w-xl sm:grid-cols-6 sm:gap-x-10 lg:mx-0 lg:max-w-none lg:grid-cols-5">
          {[
            "transistor",
            "reform",
            "tuple",
            "savvycal",
            "statamic",
          ].map((name, i) => (
            <img
              key={name+i}
              alt={name}
              src={`https://tailwindcss.com/plus-assets/img/logos/158x48/${name}-logo-gray-900.svg`}
              width={158}
              height={48}
              className={`col-span-2 max-h-12 w-full object-contain ${
                name === "savvycal"
                  ? "sm:col-start-2 lg:col-span-1"
                  : name === "statamic"
                  ? "col-start-2 sm:col-start-auto lg:col-span-1"
                  : "lg:col-span-1"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
