export interface iStoreItems {
  store_name: string
  store_rating: string
  is_promotion: boolean
  store_id: number
  fk_branch: number
  store_image: string
  branch_id: number
  branch_name: string
  fk_branch_type: number
  branch_type_id: number
  branch_type_name: string
  branch_type_image: string
  distance: number
  shipping: number
  minute:number
  food: Food[]
}

export interface Food {
  food_name: string
  price: string
  is_addon: boolean
  food_id: number
  fk_food_type: number
  fk_store_id: number
  food_image: string
}


export interface StoreType {
  branch_type_id: number
  branch_type_name: string
  branch_type_image: string
}