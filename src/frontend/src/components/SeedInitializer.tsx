import { useEffect, useRef } from "react";
import { useActor } from "../hooks/useActor";

let seedInitialized = false;

export default function SeedInitializer() {
  const { actor, isFetching } = useActor();
  const calledRef = useRef(false);

  useEffect(() => {
    if (!actor || isFetching || seedInitialized || calledRef.current) return;
    calledRef.current = true;
    seedInitialized = true;

    actor.initializeSeedData().catch((err) => {
      console.warn("Seed data initialization failed (may already exist):", err);
    });
  }, [actor, isFetching]);

  return null;
}
