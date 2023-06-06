import { FoodAddons } from '@/interface/foodAddons'
import { endpoint } from '@/utils/config'
import axios from 'axios'

export const foodAddons = {
  getFoodAddons: (foodId?:string) => {
    return new Promise<{
      data: FoodAddons | undefined
      success: boolean
    }>(async (resolve) => {
      const response = await axios.get<{
        data: FoodAddons | undefined
        success: boolean
      }>(`${endpoint}/api/food/get-food-addons${foodId ? '?food_id='+foodId :''}`)
      resolve(response.data)
    })
  },

}
