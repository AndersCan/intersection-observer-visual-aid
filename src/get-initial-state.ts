import type { StateProps } from "./main";

export function getInitialState(): StateProps {
  const props = new URL(location.href).searchParams;
  const state: StateProps = {
    threshold: Number(props.get("threshold") || 0),
    marginTop: Number(props.get("marginTop") || -20),
    marginBot: Number(props.get("marginBot") || -20),
    marginLeft: Number(props.get("marginLeft") || -10),
    marginRight: Number(props.get("marginRight") || -10),
  };

  return state;
}
