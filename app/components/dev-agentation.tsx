'use client';

import dynamic from "next/dynamic";

const AgentationLoader = dynamic(() => import("./agentation-wrapper"), { ssr: false });

export default function DevAgentation() {
  return <AgentationLoader />;
}
