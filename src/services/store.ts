import { iStoreItems, StoreType } from '@/interface/store'
import { endpoint } from '@/utils/config'
import axios from 'axios'

export const store = {
  getStoreList: (branchTypeId?:number) => {
    return new Promise<{
      data: iStoreItems[][] | undefined
      success: boolean
    }>(async (resolve) => {
      const response = await axios.get<{
        data: iStoreItems[][] | undefined
        success: boolean
      }>(`${endpoint}/api/store/list-store${branchTypeId ? '?branch_type_id='+branchTypeId :''}`)
      resolve(response.data)
    })
  },
  getStoreTypeList: () => {
    return new Promise<{
      data: StoreType[] | undefined
      success: boolean
    }>(async (resolve) => {
      const response = await axios.get<{
        data: StoreType[] | undefined
        success: boolean
      }>(`${endpoint}/api/branch/branch-type`)
      resolve(response.data)
    })
  },
}
