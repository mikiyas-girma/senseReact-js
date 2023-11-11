import {
  useEffect,
  useState,
  useReducer,
  useRef,
  useMemo,
  useCallback,
} from "react";
import { getPerson } from "./getPerson";
import { Reset } from "./Reset";

// some silly expensive function to illustrate useMemo
const sillyExpensiveFunction = () => {
  console.log("I am a silly expensive function");
  let sum = 0;
  for (let i = 0; i < 1000; i++) {
    sum += i;
  }
  return sum;
};

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

// useReducer  for state management (alternative to useState)

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

  const addButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    // in case if we use usesState
    //   getPerson().then((person) => {
    //     setLoading(false);
    //     setName(person.name);
    //   });
    // }, []);
    getPerson().then(({ name }) => dispatch({ type: "initialize", name }));
  }, []);

  useEffect(() => {
    if (!loading) {
      addButtonRef.current?.focus();
    }
  }, [loading]);

  // const expensiveCalculation = sillyExpensiveFunction();

  // fixing the above  problem with useMemo
  const expensiveCalculation = useMemo(() => sillyExpensiveFunction(), []);

  const handleReset = useCallback(() => dispatch({ type: "reset" }), []);

  if (loading) {
    return <div>Loading ...</div>;
  }

  return (
    <div>
      <h3>
        {name}, {score}
      </h3>
      <p>{expensiveCalculation}</p>
      {/* when we use usestate Hook */}
      {/* <button onClick={() => setScore(score + 1)}>Add</button>
      <button onClick={() => setScore(score - 1)}>Subtract</button>
      <button onClick={() => setScore(0)}>Reset</button> */}
      {/* when we use useReducer Hook */}
      <button
        ref={addButtonRef}
        onClick={() => dispatch({ type: "increment" })}
      >
        Add
      </button>
      <button onClick={() => dispatch({ type: "decrement" })}>Subtract</button>
      {/* <button onClick={() => dispatch({ type: "reset" })}>Reset</button> */}

      {/* // to implement using callBack Hook on Reset button */}
      <Reset onClick={handleReset} />
    </div>
  );
}
