import { makeAutoObservable } from "mobx"
export class BlockchainStore {
  constructor() {
    makeAutoObservable(this)
  }

  public blockchain_id = 0
  public blockchain_Array = []

  public setBlockchainId(id: number) {
    this.blockchain_id = id
  }
  public setBlockchain_Array(data: any) {
    this.blockchain_Array = data
  }
}
