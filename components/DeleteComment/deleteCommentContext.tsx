import { createContext, Dispatch, ReactNode, Reducer, useReducer } from 'react';

export enum DeleteCommentActionType {
  toggleModal = 'toogleModal',
  setLoading = 'setLoading',
  setError = 'setError',
}

type State = {
  modalVisible?: boolean;
  loading?: boolean;
  error?: any;
};

const defaultState: State = {
  modalVisible: false,
  loading: false,
  error: null,
};

type Action = {
  type: DeleteCommentActionType;
  payload?: State;
};

const deleteCommentReducer: Reducer<State, Action> = (
  state: State,
  action: Action
) => {
  const { type, payload } = action;

  switch (type) {
    case DeleteCommentActionType.toggleModal:
      return { ...state, modalVisible: payload?.modalVisible } as State;
    case DeleteCommentActionType.setLoading:
      return { ...state, loading: payload!.loading } as State;
    case DeleteCommentActionType.setError:
      return { ...state, error: payload!.error } as State;
    default:
      console.log('you are the best');
      return { ...state };
  }
};

export const DeleteCommentContext = createContext<{
  state: State;
  action: Dispatch<Action>;
} | null>(null);

const DeteteCommentProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(deleteCommentReducer, defaultState);

  return (
    <DeleteCommentContext.Provider value={{ state: state, action: dispatch }}>
      {children}
    </DeleteCommentContext.Provider>
  );
};

export default DeteteCommentProvider;
