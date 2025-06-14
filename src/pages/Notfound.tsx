import { Ghost, Home, LifeBuoy } from "lucide-react";

export default function Notfound() {
  return (
    <div className="grid min-h-full place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8">
      <div className="text-center space-y-6">
        <div className="flex justify-center">
          <Ghost className="w-16 h-16 text-indigo-500 animate-bounce-slow" />
        </div>
        <p className="text-base font-semibold text-indigo-600">404</p>
        <h1 className="text-5xl font-semibold tracking-tight text-gray-900 sm:text-7xl">
          Page not found
        </h1>
        <p className="text-lg font-medium text-gray-500 sm:text-xl">
          Sorry, we couldn’t find the page you’re looking for.
        </p>
        <div className="mt-8 flex items-center justify-center gap-x-6">
          <a
            href="/"
            className="inline-flex items-center gap-2 rounded-full bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-500"
          >
            <Home className="w-4 h-4 animate-fade-in" />
            Go back home
          </a>
          <a
            href="/support"
            className="inline-flex items-center gap-2 text-sm font-semibold text-gray-900 hover:underline"
          >
            <LifeBuoy className="w-4 h-4 animate-fade-in" />
            Contact support <span aria-hidden="true">→</span>
          </a>
        </div>
      </div>
    </div>
  );
}
