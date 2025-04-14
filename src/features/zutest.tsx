import { useBears } from "../store/zustore";
import { BearState } from "../../types/types.ts";

export function BearCounter() {
  const bears = useBears((state: BearState) => state.bears);
  return <h1>{bears} bears around here...</h1>;
}

export function Controls() {
  const increasePopulation = useBears(
    (state: BearState) => state.increasePopulation
  );
  return <button onClick={increasePopulation}>one up</button>;
}
export function RemoveAllBears() {
  const removeAllBears = useBears((state: BearState) => state.removeAllBears);
  return <button onClick={removeAllBears}>remove all</button>;
}
export function UpdateBears() {
  const updateBears = useBears((state: BearState) => state.updateBears);
  return (
    <button
      onClick={() => {
        const newBears = prompt("Enter new number of bears:");
        if (newBears !== null) {
          updateBears(Number(newBears));
        }
      }}
    >
      Update Bears
    </button>
  );
}
