import { makeAutoObservable } from "mobx"
export class BlockchainStore {
  constructor() {
    makeAutoObservable(this)
  }

  public blockchain_id = null

  public setBlockchainId(id: number) {
    this.blockchain_id = id
  }
}
