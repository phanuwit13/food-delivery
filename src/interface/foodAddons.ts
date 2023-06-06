export interface FoodAddons {
  food_name: string
  price: string
  is_addon: boolean
  food_id: number
  fk_food_type: number
  fk_store_id: number
  food_image: string
  addons: Addons[][]
}

export interface Addons {
  group_select_addons_id: number
  fk_group_select: number
  fk_addons: number
  min_select: string
  must_select: string
  max_select: string
  is_selected: boolean
  group_select_id: number
  fk_store_id: number
  addons_name: string
  addons_price: string
  addons_id: number
}