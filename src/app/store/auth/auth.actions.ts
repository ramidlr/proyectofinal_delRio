import { createActionGroup, props } from "@ngrx/store";
import { User } from "src/app/features/dashboard/pages/users/models/model";

export const AuthActions = createActionGroup({
    source: 'Auth',
    events: {
        //we set the authenticated user below.
        'set auth user': props<{ payload: User | null }>(),
    }
})