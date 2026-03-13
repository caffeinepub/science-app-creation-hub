import { useEffect } from "react";
import { useActor } from "../hooks/useActor";
import { useInitializeSeedData } from "../hooks/useQueries";

export default function SeedInitializer() {
  const { actor, isFetching } = useActor();
  const { mutate: initSeed } = useInitializeSeedData();

  useEffect(() => {
    if (actor && !isFetching) {
      initSeed();
    }
  }, [actor, isFetching, initSeed]);

  return null;
}
