import { useContext } from "react"
import { rootStore, storesContext } from "./rootStore"

export const useStores = () => useContext(storesContext)

export const useStore = <T extends keyof typeof rootStore>(
  store: T
): typeof rootStore[T] => useContext(storesContext)[store]
