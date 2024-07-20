import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import {CounterID, DecrementAction, IncrementAction, store} from "./store/store.ts";
import {useEffect, useReducer} from "react";

function App() {

    // const [, forceUpdate] = useReducer((x)=> x + 1, 0)

    // useEffect(() => {
    //     const unsubscribe = store.subscribe(()=>{
    //         forceUpdate()
    //     })
    //     return unsubscribe;
    // }, []);

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
                {/*counter{store.getState().counters[counterID]?.counter}*/}
                {/*<button onClick={() => store.dispatch({type: 'increment'})}>*/}
                {/*    increment*/}
                {/*</button>*/}
                {/*<button onClick={() => store.dispatch({type: 'decrement'})}>*/}
                {/*    decrement*/}
                {/*</button>*/}
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

export function Counter({counterID}: { counterID: CounterID }) {
    const [, forceUpdate] = useReducer((x) => x + 1, 0)
    useEffect(() => {
        return store.subscribe(() => {
            forceUpdate()
        });
    }, []);
    return <>
        counter{store.getState().counters[counterID]?.counter}
        <button onClick={() => store.dispatch({type: 'increment', payload: {counterID}} satisfies IncrementAction)}>
            increment
        </button>
        <button onClick={() => store.dispatch({type: 'decrement', payload: {counterID}} satisfies DecrementAction)}>
            decrement
        </button>
    </>
}

export default App
