import { iStoreItems, StoreType } from '@/interface/store'
import { store } from '@/services'
import { withAuth } from '@/utils/withAuth'
import { Dialog, Transition } from '@headlessui/react'
import { ArrowUpDown, SlidersHorizontal, Star, Truck } from 'lucide-react'
import { GetServerSideProps } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { Fragment, useEffect, useState } from 'react'

type Props = {}

const IndexPage = (props: Props) => {
  const sortList = [
    {
      name: 'เรียงตาม',
      icon: <ArrowUpDown size={20} />,
    },
    {
      name: 'โปรโมชั่น',
      icon: '',
    },
    {
      name: 'ค่าจัดส่ง',
      icon: <Truck size={20} />,
    },
  ]

  const [storeList, setStoreList] = useState<iStoreItems[][]>([])
  const [storeTypeList, setStoreTypeList] = useState<StoreType[]>([])
  const [isOpenFilter, setIsOpenFilter] = useState(false)
  const [isOtherStore, setIsOtherStore] = useState<iStoreItems[]>([])

  function closeModal() {
    setIsOpenFilter(false)
  }

  function openModal() {
    setIsOpenFilter(true)
  }

  function openOtherStore(store: iStoreItems[]) {
    setIsOtherStore(store)
  }
  function closeOtherStore() {
    setIsOtherStore([])
  }

  const getStoreList = async (branchTypeId?: number) => {
    const { data } = await store.getStoreList(branchTypeId)
    if (data) {
      console.log('data', data)
      setStoreList(data)
    }
  }
  const getStoreTypeList = async () => {
    const { data } = await store.getStoreTypeList()
    if (data) {
      console.log('data', data)
      setStoreTypeList(data)
    }
  }

  const callData = async () => {
    await getStoreList()
    await getStoreTypeList()
  }

  useEffect(() => {
    callData()
  }, [])

  return (
    <>
      <div className='bg-[#F7F7F7] min-h-[100vh]'>
        <div className='flex gap-[12px] p-[20px] bg-[#FFFFFF] items-start overflow-auto'>
          <div
            className='bg-[#F5F5F5] rounded-[16px] p-[6px_10px] flex items-center min-w-[fit-content]'
            role='button'
            onClick={openModal}
          >
            <SlidersHorizontal size={20} />
          </div>
          {sortList.map((item, index) => {
            return (
              <div
                key={`filter-icon-${index}`}
                className='bg-[#F5F5F5] rounded-[16px] p-[6px_10px] flex items-center gap-[8px] min-w-[fit-content]'
                role='button'
              >
                {item.name}
                {item.icon}
              </div>
            )
          })}
        </div>
        <div className='flex flex-col gap-[20px]'>
          {storeList.map((item, index) => {
            return (
              <div
                key={`store-${index}`}
                className='p-[20px_20px_10px_20px] bg-[#FFFFFF]'
              >
                <Link
                  href={`/store/${item[0]?.store_id}`}
                  className='flex items-start justify-between mb-[20px]'
                >
                  <div>
                    <div className='text-[12px] sm:text-[14px] text-[#F98A46]'>
                      โปรโมชั่น
                    </div>
                    <div className='font-[500] sm:text-[18px]'>
                      {item[0]?.store_name}
                    </div>
                    <div className='text-[12px] sm:text-[14px] items-center flex gap-[4px]'>
                      <span>{item[0]?.minute} นาที</span>•
                      <span>{item[0]?.distance} กม</span>•
                      <div className='flex items-center gap-[4px]'>
                        <Star fill='#F7C941' width={12} color='#F7C941' />{' '}
                        <span>{item[0]?.store_rating}</span>
                      </div>
                      •
                      <span>
                        $$<span className='text-[#D2D2D2]'>$$</span>
                      </span>
                    </div>
                    <div className='text-[12px] sm:text-[14px] items-center flex gap-[4px] text-[#737373]'>
                      <Truck color='#363636' width={12} />
                      <span className='text-[#737373]'>
                        ฿{Math.floor(item[0]?.distance * 2)}
                      </span>
                      •<span className='text-[#737373]'>Coupon</span>•
                      <div className='text-[#737373]'>
                        {item[0]?.branch_type_name}
                      </div>
                    </div>
                    <div className='flex text-[10px] sm:text-[12px] gap-[8px] mt-[10px]'>
                      <div className='bg-[#FFF4EB] p-[2px_6px] rounded-sm'>
                        เมนูลดราคา
                      </div>
                      <div className='bg-[#FFF4EB] p-[2px_6px] rounded-sm'>
                        ของแถม
                      </div>
                    </div>
                  </div>
                  <div className='border-1 border w-fit rounded-lg overflow-hidden'>
                    <Image
                      src={item[0]?.store_image}
                      className='w-[120px] h-[120px] sm:w-[180px] sm:h-[180px] aspect-square object-cover'
                      width={180}
                      height={180}
                      alt='store image'
                    />
                  </div>
                </Link>
                {item[0].food.map((v) => {
                  return (
                    <Link
                      href={`/store/${item[0]?.store_id}/${v.food_id}`}
                      key={`store-${index}-food-${v.food_id}`}
                      className='border-t flex justify-between pt-[6px] mt-[6px]'
                    >
                      <div className='flex flex-col justify-between'>
                        <div className='text-[14px] sm:text-[16px]'>
                          {v.food_name}
                        </div>
                        <div className='font-[500] sm:text-[18px]'>
                          {v?.price}
                        </div>
                      </div>
                      <div>
                        <Image
                          src={v?.food_image}
                          className='w-[50px] h-[50px] sm:w-[80px] sm:h-[80px] object-cover rounded-lg'
                          width={80}
                          height={80}
                          alt='food image'
                        />
                      </div>
                    </Link>
                  )
                })}
                {item.length > 1 && (
                  <button
                    onClick={() => openOtherStore(item)}
                    className='border-t flex items-center justify-between mt-[6px] min-h-[57px] w-full text-[#737373] text-[14px]'
                  >
                    ดูทั้งหมด {item.length} ร้าน
                  </button>
                )}
              </div>
            )
          })}
        </div>
      </div>
      <Transition appear show={isOpenFilter} as={Fragment}>
        <Dialog as='div' className='relative z-10' onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter='ease-out duration-300'
            enterFrom='opacity-0'
            enterTo='opacity-100'
            leave='ease-in duration-200'
            leaveFrom='opacity-100'
            leaveTo='opacity-0'
          >
            <div className='fixed inset-0 bg-black bg-opacity-25' />
          </Transition.Child>

          <div className='fixed inset-0 overflow-y-auto'>
            <div className='flex min-h-full items-center justify-center p-4 text-center'>
              <Transition.Child
                as={Fragment}
                enter='ease-out duration-300'
                enterFrom='opacity-0 scale-95'
                enterTo='opacity-100 scale-100'
                leave='ease-in duration-200'
                leaveFrom='opacity-100 scale-100'
                leaveTo='opacity-0 scale-95'
              >
                <Dialog.Panel className='w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all'>
                  <Dialog.Title
                    as='h3'
                    className='text-lg font-medium leading-6 text-gray-900'
                  >
                    ประเภทอาหาร
                  </Dialog.Title>
                  <div className='mt-[20px] flex gap-[20px] flex-wrap'>
                    {storeTypeList.map((item) => {
                      return (
                        <div
                          key={`type-store-${item.branch_type_id}`}
                          onClick={() => {
                            getStoreList(item.branch_type_id)
                            closeModal()
                          }}
                          role='button'
                          className='w-[calc(50%-10px)] aspect-square relative bg-[#000000] rounded-lg'
                        >
                          <Image
                            src={item.branch_type_image}
                            width={300}
                            height={300}
                            alt='type food'
                            className='object-cover h-[100%] object-center rounded-lg opacity-[0.8]'
                          />
                          <span className='absolute translate-x-[-50%] left-[50%] top-[calc(50%-10px)] text-[#FFFFFF] font-[700] whitespace-nowrap text-[20px]'>
                            {item.branch_type_name}
                          </span>
                        </div>
                      )
                    })}
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>

      <Transition appear show={!!isOtherStore.length} as={Fragment}>
        <Dialog as='div' className='relative z-10' onClose={closeOtherStore}>
          <Transition.Child
            as={Fragment}
            enter='ease-out duration-300'
            enterFrom='opacity-0'
            enterTo='opacity-100'
            leave='ease-in duration-200'
            leaveFrom='opacity-100'
            leaveTo='opacity-0'
          >
            <div className='fixed inset-0 bg-black bg-opacity-25' />
          </Transition.Child>

          <div className='fixed inset-0 overflow-y-auto'>
            <div className='flex min-h-full items-center justify-center p-4 text-center'>
              <Transition.Child
                as={Fragment}
                enter='ease-out duration-300'
                enterFrom='opacity-0 scale-95'
                enterTo='opacity-100 scale-100'
                leave='ease-in duration-200'
                leaveFrom='opacity-100 scale-100'
                leaveTo='opacity-0 scale-95'
              >
                <Dialog.Panel className='w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all'>
                  <Dialog.Title
                    as='h3'
                    className='text-lg font-medium leading-6 text-gray-900'
                  >
                    สาขาทั้งหมด
                  </Dialog.Title>
                  <div className='mt-[20px] flex gap-[20px] flex-col'>
                    {isOtherStore.map((item, index) => {
                      return (
                        <div
                          key={`other-store-${index}`}
                          className='p-[20px_20px_10px_20px] bg-[#FFFFFF]'
                        >
                          <Link
                            href={`/store/${item.store_id}`}
                            className='flex items-start justify-between mb-[20px]'
                          >
                            <div>
                              <div className='text-[12px] sm:text-[14px] text-[#F98A46]'>
                                โปรโมชั่น
                              </div>
                              <div className='font-[500] sm:text-[18px]'>
                                {item?.store_name}
                              </div>
                              <div className='text-[12px] sm:text-[14px] items-center flex gap-[4px]'>
                                <span>{item?.minute} นาที</span>•
                                <span>{item?.distance} กม</span>•
                                <div className='flex items-center gap-[4px]'>
                                  <Star
                                    fill='#F7C941'
                                    width={12}
                                    color='#F7C941'
                                  />{' '}
                                  <span>{item?.store_rating}</span>
                                </div>
                                •
                                <span>
                                  $$<span className='text-[#D2D2D2]'>$$</span>
                                </span>
                              </div>
                              <div className='text-[12px] sm:text-[14px] items-center flex gap-[4px] text-[#737373]'>
                                <Truck color='#363636' width={12} />
                                <span className='text-[#737373]'>
                                  ฿{Math.floor(item?.distance * 2)}
                                </span>
                                •<span className='text-[#737373]'>Coupon</span>•
                                <div className='text-[#737373]'>
                                  {item?.branch_type_name}
                                </div>
                              </div>
                              <div className='flex text-[10px] sm:text-[12px] gap-[8px] mt-[10px]'>
                                <div className='bg-[#FFF4EB] p-[2px_6px] rounded-sm'>
                                  เมนูลดราคา
                                </div>
                                <div className='bg-[#FFF4EB] p-[2px_6px] rounded-sm'>
                                  ของแถม
                                </div>
                              </div>
                            </div>
                            <div className='border-1 border w-fit rounded-lg overflow-hidden'>
                              <Image
                                src={item?.store_image}
                                className='w-[120px] sm:w-[180px]'
                                width={180}
                                height={180}
                                alt='store image'
                              />
                            </div>
                          </Link>
                        </div>
                      )
                    })}
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = withAuth()

export default IndexPage
