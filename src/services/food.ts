
import { FoodStoreResponse, FoodType } from '@/interface/food'
import { endpoint } from '@/utils/config'
import axios from 'axios'

export const food = {
  getFoodByStore: (storeId?:string) => {
    return new Promise<{
      data: FoodStoreResponse | undefined
      success: boolean
    }>(async (resolve) => {
      const response = await axios.get<{
        data: FoodStoreResponse | undefined
        success: boolean
      }>(`${endpoint}/api/food/get-food${storeId ? '?store_id='+storeId :''}`)
      resolve(response.data)
    })
  },
  getFoodTypeByStore: (storeId?:string) => {
    return new Promise<{
      data: FoodType[] | undefined
      success: boolean
    }>(async (resolve) => {
      const response = await axios.get<{
        data: FoodType[] | undefined
        success: boolean
      }>(`${endpoint}/api/food/get-food-type${storeId ? '?store_id='+storeId :''}`)
      resolve(response.data)
    })
  },
 
}
