export interface FoodStoreResponse {
  store_name: string
  store_id: number
  store_image: string
  food: FoodItem[]
}

export interface FoodItem {
  food_name: string
  price: string
  is_addon: boolean
  food_id: number
  fk_food_type: number
  fk_store_id: number
  food_image: string
  food_type_name:string
}

export interface FoodType {
  food_type_name: string
  food_type_id: number
  fk_store_id: number
  food_type_image: string
}
