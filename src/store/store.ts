import {configureStore} from '@reduxjs/toolkit'

type CounterState = {
    counter: number
}
export type CounterID = string;

type State = {
    counters: Record<CounterID, CounterState | undefined>,
}

export type IncrementAction = {
    type: 'increment'
    payload: {
        counterID: CounterID
    }
}
export type DecrementAction = {
    type: 'decrement'
    payload: {
        counterID: CounterID
    }
}
type Action = IncrementAction | DecrementAction

const initialCounterState: CounterState = {counter: 0}

const initialState: State = {
    counters: {}
}

const reducer = (state = initialState, action: Action): State => {
    switch (action.type) {
        case "increment":{
            const {counterID} = action.payload;
            const currentCounter = state.counters[counterID] ?? initialCounterState
            return {
                ...state,
                counters: {
                    ...state.counters,
                    [counterID]: {
                        ...currentCounter,
                        counter: currentCounter.counter + 1
                    }
                },
            };
        }
        case "decrement":{
            const {counterID} = action.payload;
            const currentCounter = state.counters[counterID] ?? initialCounterState
            return {
                ...state,
                counters: {
                    ...state.counters,
                    [counterID]: {
                        ...currentCounter,
                        counter: currentCounter.counter - 1
                    }
                },
            }
        }
        default:
            return state;
    }
}

export const store = configureStore({
    reducer: reducer,
})

export type AppStateType = ReturnType<typeof store.getState>

// store.dispatch;
// store.getState;
// store.subscribe;