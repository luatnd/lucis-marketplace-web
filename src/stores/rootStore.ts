import { WalletController } from "./../lib/WalletController"
import { createContext } from "react"
import { AuthStore } from "./AuthStore"

export const stores = {
  AuthStore: new AuthStore(),
  WalletController: new WalletController(),
}

export const rootStore = Object.freeze(stores)

export const storesContext = createContext(rootStore)
export const StoresProvider = storesContext.Provider

// How to create new Store
// 1. Create store in ./ directory by mobx (with makeAutoObservable keyword)
// 2. Add the store to rootStore like example
// 3. Wrap the components in obersever() from "mobx-react-lite"
// 4. Decalre the store in the components using stores: componentStore = useStore("<store-name>")
