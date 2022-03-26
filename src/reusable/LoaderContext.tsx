import React, {  useContext, createContext, Dispatch } from 'react'


const LoaderContext = createContext({} as any);
export default LoaderContext;

export const useLoadContext = () => useContext(LoaderContext);
