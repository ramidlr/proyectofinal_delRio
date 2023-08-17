import { createActionGroup, emptyProps } from "@ngrx/store";

export const CounterActions = createActionGroup({
    source: 'Counter',
    events: {
        'increment': emptyProps(),
        'decrease': emptyProps(),
    }

})
