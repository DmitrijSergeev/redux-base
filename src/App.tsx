import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import {AppStateType, CounterID, DecrementAction, IncrementAction, store} from "./store/store.ts";
import {useEffect, useReducer, useRef} from "react";

function App() {

    return (
        <>
            <div>
                <a href="https://vitejs.dev" target="_blank">
                    <img src={viteLogo} className="logo" alt="Vite logo"/>
                </a>
                <a href="https://react.dev" target="_blank">
                    <img src={reactLogo} className="logo react" alt="React logo"/>
                </a>
            </div>
            <h1>Vite + React</h1>
            <div className="card">
                <Counter counterID={'first'}/>
                <Counter counterID={'second'}/>
                <p>
                    Edit <code>src/App.tsx</code> and save to test HMR
                </p>
            </div>
            <p className="read-the-docs">
                Click on the Vite and React logos to learn more
            </p>
        </>
    )
}

const selectCounter = (state: AppStateType, counterId: CounterID) => state.counters[counterId]

export function Counter({counterID}: { counterID: CounterID }) {
    const [, forceUpdate] = useReducer((x) => x + 1, 0)
    console.log('render Counter', counterID)

    const lastStateRef = useRef<ReturnType<typeof selectCounter>>()

    useEffect(() => {
        return store.subscribe(() => {
            const currentState = selectCounter(store.getState(), counterID)
            const lastState = lastStateRef.current

            if (currentState !== lastState) {
                forceUpdate()
            }
            lastStateRef.current = currentState
        });
    }, [counterID]);

    const counterState = selectCounter(store.getState(), counterID)

    return <>
        counter{counterState?.counter}
        <button onClick={() => store.dispatch({type: 'increment', payload: {counterID}} satisfies IncrementAction)}>
            increment
        </button>
        <button onClick={() => store.dispatch({type: 'decrement', payload: {counterID}} satisfies DecrementAction)}>
            decrement
        </button>
    </>
}

export default App
