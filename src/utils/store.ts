import { SetStateAction, useSyncExternalStore } from "react";

type StateType = {[key: string]: number | string | StateType };
type StoreType<X extends StateType> = ReturnType<typeof createStore<X extends StateType?X:StateType>>

const createStore = <T extends StateType>(initialState: T) => {
  let subscribers = new Set<SetStateAction<T>>();
  let currState = initialState;
  return {
    getState:() => currState,
    setState: (key:keyof T, val: T[keyof T]) => {
      currState[key] = val;
      subscribers.forEach((subscriber: any)  => subscriber(currState));
    },
    subscribe: (setState: any) => {
      subscribers.add(setState)
      return () => subscribers.delete(setState)
    }
  }
}

interface countStates extends StateType {
  count : number
}


interface buttonStates extends StateType {
  count : number
}

export const countStore:any = createStore({count: 0});
export const buttonStore:any = createStore({count: 0});

export const useStore = <T extends StateType>(store: StoreType<T>) => {
   return (selector: React.Dispatch<T | StateType>) => useSyncExternalStore(
     store.subscribe, () => selector(store.getState()));
}
