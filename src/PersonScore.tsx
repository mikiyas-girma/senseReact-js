import { useEffect, useState, useReducer } from "react";
import { getPerson } from "./getPerson";

type State = {
  name: string | undefined;
  score: number;
  loading: boolean;
};

// using union types
type Action =
  | {
      type: "initialize";
      name: string;
    }
  | {
      type: "increment";
    }
  | {
      type: "decrement";
    }
  | {
      type: "reset";
    };

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "initialize":
      return {
        name: action.name,
        score: 0,
        loading: false,
      };
    case "increment":
      return {
        ...state,
        score: state.score + 1,
      };
    case "decrement":
      return {
        ...state,
        score: state.score - 1,
      };
    case "reset":
      return {
        ...state,
        score: 0,
      };
    default:
      return state;
  }
};

export function PersonScore() {
  // useState calls
  // const [name, setName] = useState<string | undefined>();
  // const [score, setScore] = useState(0);
  // const [loading, setLoading] = useState(true);

  // useReducer calls for state management (alternative to useState)
  const [{ name, score, loading }, dispatch] = useReducer(reducer, {
    name: undefined,
    score: 0,
    loading: true,
  });

  useEffect(() => {
    // in case if we use usesState
    //   getPerson().then((person) => {
    //     setLoading(false);
    //     setName(person.name);
    //   });
    // }, []);
    getPerson().then(({ name }) => dispatch({ type: "initialize", name }));
  }, []);
  if (loading) {
    return <div>Loading ...</div>;
  }

  return (
    <div>
      <h3>
        {name}, {score}
      </h3>
      {/* when we use usestate Hook */}
      {/* <button onClick={() => setScore(score + 1)}>Add</button>
      <button onClick={() => setScore(score - 1)}>Subtract</button>
      <button onClick={() => setScore(0)}>Reset</button> */}

      {/* when we use useReducer Hook */}

      <button onClick={() => dispatch({ type: "increment" })}>Add</button>
      <button onClick={() => dispatch({ type: "decrement" })}>Subtract</button>
      <button onClick={() => dispatch({ type: "reset" })}>Reset</button>
    </div>
  );
}
