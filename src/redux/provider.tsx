import { FC, ReactNode } from "react"
import { Provider } from "react-redux"
import { store } from "./store"

interface ReducerProps {
  children : ReactNode
}

const ReducerProvider: FC<ReducerProps> = ({children}) => {
  return (
    <Provider store={store}>{children}</Provider>
  )
}
export default ReducerProvider