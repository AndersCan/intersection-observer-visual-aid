import type { StateProps } from "./main";

export function getInitialState(): StateProps {
  const props = new URL(location.href).searchParams;
  const state: StateProps = {
    threshold: Number(props.get("threshold") || 0),
    marginTop: Number(props.get("marginTop") || -20),
    marginBot: Number(props.get("marginBot") || -20),
    marginLeft: 0,
    marginRight: 0,
  };

  return state;
}
