import {
  createContext,
  Dispatch,
  ReactNode,
  Reducer,
  useContext,
  useReducer,
} from 'react';
import { CommentContext } from '../Comment';

export type UpdateCommentActionType =
  | 'updateComment'
  | 'setEditMode'
  | 'setLoading'
  | 'setError'
  | 'setState'
  | 'reset';

type State = {
  comment?: string;
  oldComment?: string;
  editing?: boolean;
  loading?: boolean;
  error?: any;
};

type Action = {
  type: UpdateCommentActionType;
  payload: State;
};

const setState: Reducer<State, Action> = (state: State, action: Action) => {
  const { type, payload } = action;

  const result: Record<UpdateCommentActionType, State> = {
    updateComment: { ...state, comment: payload!.comment },
    setEditMode: { ...state, editing: payload!.editing },
    setLoading: { ...state, loading: payload!.loading },
    setError: { ...state, error: payload!.error },
    setState: payload!,
    reset: {
      comment: state.oldComment,
      oldComment: state.oldComment,
      loading: false,
      editing: false,
      error: false,
    },
  };

  return result[type];
};

export const UpdateCommentContext = createContext<{
  state?: State;
  action?: Dispatch<Action>;
}>({});

const UpdateCommentProvider = ({ children }: { children: ReactNode }) => {
  const comment = useContext(CommentContext);
  const [state, dispatch] = useReducer(setState, {
    comment: comment?.html,
    oldComment: comment?.html,
  });

  return (
    <UpdateCommentContext.Provider value={{ state: state, action: dispatch }}>
      {children}
    </UpdateCommentContext.Provider>
  );
};

export default UpdateCommentProvider;
