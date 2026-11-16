import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // The chapter PDF lives outside /public so it is only served after the form.
  outputFileTracingIncludes: {
    "/api/chapter-download": ["./private/**/*"],
  },
};

export default nextConfig;
