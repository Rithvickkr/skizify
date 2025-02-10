import React from "react";
import WorldMap from "../../../../components/ui/world-map";

const dots = [
  {
    start: { lat: 64.2008, lng: -149.4937 },
    end: { lat: 34.0522, lng: -118.2437 },
  },
  {
    start: { lat: 64.2008, lng: -149.4937 },
    end: { lat: -15.7975, lng: -47.8919 },
  },
  {
    start: { lat: -15.7975, lng: -47.8919 },
    end: { lat: 38.7223, lng: -9.1393 },
  },
  {
    start: { lat: 51.5074, lng: -0.1278 },
    end: { lat: 28.6139, lng: 77.209 },
  },
  {
    start: { lat: 28.6139, lng: 77.209 },
    end: { lat: 43.1332, lng: 131.9113 },
  },
  {
    start: { lat: 28.6139, lng: 77.209 },
    end: { lat: -1.2921, lng: 36.8219 },
  },
];

const BentoMap: React.FC = () => {
  return (
    <div className="group relative h-full w-full overflow-hidden rounded-3xl bg-gradient-to-br from-black to-zinc-900 transition-all duration-500 hover:shadow-2xl">
      {/* World map background */}
      <div className="absolute inset-0 opacity-50 transition-opacity duration-500 group-hover:opacity-70">
        <WorldMap dots={dots} />
      </div>

      <div className="absolute inset-0 opacity-30 mix-blend-overlay">
        <div
          className="animate-grain absolute inset-0"
          style={{
            background: `url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj4KICA8ZmlsdGVyIGlkPSJub2lzZSIgeD0iMCIgeT0iMCI+CiAgICA8ZmVUdXJidWxlbmNlIHR5cGU9ImZyYWN0YWxOb2lzZSIgYmFzZUZyZXF1ZW5jeT0iMC42NSIgbnVtT2N0YXZlcz0iMyIgc3RpdGNoVGlsZXM9InN0aXRjaCI+PC9mZVR1cmJ1bGVuY2U+CiAgPC9maWx0ZXI+CiAgPHJlY3Qgd2lkdGg9IjMwMCIgaGVpZ2h0PSIzMDAiIGZpbHRlcj0idXJsKCNub2lzZSkiIG9wYWNpdHk9IjAuNCI+PC9yZWN0Pgo8L3N2Zz4=")`,
          }}
        />
      </div>
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: "url('/retrofuturegreen3.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          opacity: 0.6,
        }}
      />

      <div className="absolute inset-0 bg-gradient-to-tr from-green-400/20 to-transparent" />
      {/* <div className="absolute inset-0 backdrop-blur-sm" /> */}

      {/* Animated gradient overlay */}
      {/* <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" /> */}

      {/* Content */}
      <div className="relative flex h-full flex-col justify-end space-y-4 p-8">
        <div className="flex items-center space-x-2">
          <div className="h-3 w-3 animate-pulse rounded-full bg-green-400" />
          <span className="text-sm font-medium text-green-400">
            Live Connections
          </span>
        </div>

        <h2 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-black-500/70 drop-shadow-lg">
          Connect Globally
        </h2>

        <p className="mt-2 max-w-md text-zinc-400">
          Join Skizify's worldwide network of professionals. Collaborate,
          create, and innovate across borders.
        </p>

        {/* Stats */}
        <div className="flex space-x-6 pt-4">
          <div className="group cursor-pointer transition transform duration-300 hover:scale-105">
            <span className="block text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-black-500/70 drop-shadow-lg">
              150+
            </span>
            <span className="text-sm text-zinc-400">Countries</span>
          </div>
          <div className="group cursor-pointer transition transform duration-300 hover:scale-105">
            <span className="block text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-black-500/70 drop-shadow-lg">
              1M+
            </span>
            <span className="text-sm text-zinc-400">Professionals</span>
          </div>
          <div className="group cursor-pointer transition transform duration-300 hover:scale-105">
            <span className="block text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-black-500/70 drop-shadow-lg">
              24/7
            </span>
            <span className="text-sm text-zinc-400">Active</span>
          </div>
        </div>

        {/* Decorative elements */}
      </div>

      {/* Hover effect gradient border */}
      {/* <div className="group-hover:border-gradient-to-r absolute inset-0 rounded-3xl border border-transparent transition-all duration-500 group-hover:from-blue-500 group-hover:to-purple-500" /> */}
    </div>
  );
};

export default BentoMap;
