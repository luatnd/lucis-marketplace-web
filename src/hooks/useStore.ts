import { useContext } from "react"
import { rootStore, storesContext } from "../stores/rootStore"

export const useStores = () => useContext(storesContext)

export const useStore = <T extends keyof typeof rootStore>(
  store: T
): typeof rootStore[T] => useContext(storesContext)[store]
