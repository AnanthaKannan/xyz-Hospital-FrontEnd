import React, {  useContext, createContext, Dispatch } from 'react'

interface Actions {
  type: boolean;
  value: any;
}

interface SidebarProps {
  show: boolean;
  content: JSX.Element | null;
}

// interface SidebarProviderProps {
//   reducer: Reducer<SidebarProps, Actions>;
//   initState: SidebarProps;
// }

interface InitContextProps {
  state: SidebarProps;
  dispatch: Dispatch<any>;
}

const LoaderContext = createContext({} as any);
export default LoaderContext;

export const useLoadContext = () => useContext(LoaderContext);
