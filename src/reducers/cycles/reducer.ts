import { produce } from "immer";
import { ActionTypes } from "./actions";

export interface Cycle {
  id: string;
  task: string;
  minutesAmount: number;
  startDate: Date;
  interruptedDate?: Date;
  finishedDate?: Date;
}

interface CyclesState {
  cycles: Cycle[];
  activeCycleId: string | null;
}

export const cyclesReducer = (state: CyclesState, action: any) => {
  switch (action.type) {
    case ActionTypes.ADD_NEW_CYCLE:
      return produce(state, (draftState) => {
        draftState.cycles.push(action.payload.newCycle);
        draftState.activeCycleId = action.payload.newCycle.id;
      });
    case ActionTypes.INTERRUPT_CURRENT_CYCLE: {
      const activeCyleIndex = state.cycles.findIndex(
        (cycle) => cycle.id === state.activeCycleId
      );

      if (activeCyleIndex === -1) {
        return state;
      }

      return produce(state, (draftState) => {
        draftState.cycles[activeCyleIndex].interruptedDate = new Date();
        draftState.activeCycleId = null;
      });
    }
    case ActionTypes.MARK_CURRENT_CYCLE_AS_FINISHED: {
      const activeCyleIndex = state.cycles.findIndex(
        (cycle) => cycle.id === state.activeCycleId
      );

      if (activeCyleIndex === -1) {
        return state;
      }

      return produce(state, (draftState) => {
        draftState.cycles[activeCyleIndex].finishedDate = new Date();
        draftState.activeCycleId = null;
      });
    }
    default:
      return state;
  }
};
