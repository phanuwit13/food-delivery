import { FoodStoreResponse, FoodType } from '@/interface/food'
import { food } from '@/services'
import { withAuth } from '@/utils/withAuth'
import { Listbox, Transition } from '@headlessui/react'
import {
  ArrowLeft,
  CheckIcon,
  ChevronDown,
  MoreHorizontal,
  Search,
} from 'lucide-react'
import { GetServerSideProps } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { Fragment, useEffect, useRef, useState } from 'react'

type Props = {}

const StorePage = (props: Props) => {
  const router = useRouter()
  const people = [
    { name: 'Wade Cooper' },
    { name: 'Arlene Mccoy' },
    { name: 'Devon Webb' },
    { name: 'Tom Cook' },
    { name: 'Tanya Fox' },
    { name: 'Hellen Schmidt' },
  ]
  const [foodList, setFoodList] = useState<FoodStoreResponse | null>(null)
  const [foodListShow, setFoodListShow] = useState<FoodStoreResponse | null>(
    null
  )
  const [foodTypeList, setFoodTypeList] = useState<FoodType[]>([])
  const [selected, setSelected] = useState<FoodType>({
    food_type_name: 'ประเภทอาหาร',
    food_type_id: 0,
    fk_store_id: 0,
    food_type_image: '',
  })
  const [widthInput, setWidthInput] = useState(30)
  const ref = useRef(null)

  const getFoodList = async (id: string) => {
    const { data } = await food.getFoodByStore(id)
    if (data) {
      console.log('data', data)
      setFoodList(data)
      setFoodListShow(data)
    }
  }

  const getFoodTypeList = async (id: string) => {
    const { data } = await food.getFoodTypeByStore(id)
    if (data) {
      console.log('data', data)
      setFoodTypeList(data)
      if (data[0]) setSelected(data[0])
    }
  }

  const checkFocusInput = () => {
    setWidthInput(70)
  }
  const blurFocusInput = () => {
    setWidthInput(30)
  }

  const callData = async (id: string) => {
    await getFoodList(id)
    await getFoodTypeList(id)
  }

  useEffect(() => {
    if (router.query.storeId) {
      callData(router.query.storeId?.toString())
    }
  }, [router.query.storeId])

  return (
    <>
      <div className='bg-[#FFFFFF] min-h-[100vh]'>
        <div className='shadow-lg pb-[16px]'>
          <div className='flex justify-between p-[16px] text-[#444444]'>
            <Link href='/store'>
              <ArrowLeft />
            </Link>
            <div className='text-[#444444] sm:text-[20px]'>
              {foodList?.store_name}
            </div>
            <div>
              <MoreHorizontal />
            </div>
          </div>
          <div className='px-[16px] flex gap-[10px]'>
            <Listbox value={selected} onChange={setSelected}>
              <div
                className='relative mt-1'
                style={{
                  width: `${100 - widthInput}%`,
                }}
              >
                <Listbox.Button className='relative w-full cursor-default rounded-[20px] bg-[#F2F6FA] py-2 pl-3 pr-10 text-left sm:text-sm'>
                  <span className='block truncate'>
                    {selected?.food_type_name}
                  </span>
                  <span className='pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2'>
                    <ChevronDown
                      className='h-5 w-5 text-gray-400'
                      aria-hidden='true'
                    />
                  </span>
                </Listbox.Button>
                <Transition
                  as={Fragment}
                  leave='transition ease-in duration-100'
                  leaveFrom='opacity-100'
                  leaveTo='opacity-0'
                >
                  <Listbox.Options className='absolute min-h-[60px] mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm'>
                    {foodTypeList.map((typeFood, foodIdx) => (
                      <Listbox.Option
                        key={foodIdx}
                        className={({ active }) =>
                          `relative cursor-default select-none py-2 pl-10 pr-4 ${
                            active
                              ? 'bg-green-100 text-amber-900'
                              : 'text-gray-900'
                          }`
                        }
                        value={typeFood}
                      >
                        {({ selected }) => (
                          <>
                            <span
                              className={`block truncate ${
                                selected ? 'font-medium' : 'font-normal'
                              }`}
                            >
                              {typeFood.food_type_name}
                            </span>
                            {selected ? (
                              <span className='absolute inset-y-0 left-0 flex items-center pl-3 text-green-600'>
                                <CheckIcon
                                  className='h-5 w-5'
                                  aria-hidden='true'
                                />
                              </span>
                            ) : null}
                          </>
                        )}
                      </Listbox.Option>
                    ))}
                  </Listbox.Options>
                </Transition>
              </div>
            </Listbox>
            <div
              className='relative mt-1'
              ref={ref}
              style={{
                width: `${widthInput}%`,
              }}
            >
              <Search className='absolute w-[18px] top-[8px] left-[12px]' />
              <input
                onFocus={checkFocusInput}
                onBlur={blurFocusInput}
                className='pl-[40px] w-full cursor-default rounded-[20px] bg-[#F2F6FA] py-2 pr-[16px] text-left sm:text-sm focus-visible:outline-none'
                placeholder='ค้นหา'
                onChange={(e) => {
                  const data = foodList?.food.filter((item) =>
                    item.food_name.includes(e.target.value)
                  )
                  const result = {
                    ...foodList,
                    food: data,
                  } as any
                  setFoodListShow(result)
                }}
              />
            </div>
          </div>
        </div>
        <div className='mt-[10px] px-[16px]'>
          {foodListShow?.food.map((item) => {
            return (
              <Link
                href={`/store/${router.query.storeId?.toString()}/${
                  item.food_id
                }`}
                className='flex py-[16px] gap-[10px] border-b'
              >
                <div className='w-fit'>
                  <Image
                    src={item?.food_image}
                    className='w-[80px] h-[80px] sm:w-[100px] sm:h-[100px] object-cover rounded-lg'
                    width={100}
                    height={100}
                    alt='food image'
                  />
                </div>
                <div className='flex flex-col gap-[6px]'>
                  <div className='text-[14px]'>{item.food_name}</div>
                  <div className='bg-[#FFF4EB] p-[2px_4px] rounded-sm text-[14px] w-fit'>
                    {item.food_type_name}
                  </div>
                  <div className='text-[16px] font-[600]'>{item.price}</div>
                </div>
              </Link>
            )
          })}
        </div>
      </div>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = withAuth()

export default StorePage
