import { FoodAddons } from '@/interface/foodAddons'
import { foodAddons } from '@/services'
import { withAuth } from '@/utils/withAuth'
import { Share2, X } from 'lucide-react'
import { GetServerSideProps } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useRef, useState } from 'react'

type Props = {}

const StorePage = (props: Props) => {
  const router = useRouter()
  const [addonsList, setAddonsList] = useState<FoodAddons | null>(null)

  const [widthInput, setWidthInput] = useState(30)
  const ref = useRef(null)

  const getFoodList = async (id: string) => {
    const { data } = await foodAddons.getFoodAddons(id)
    if (data) {
      console.log('data', data)
      setAddonsList(data)
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
    // await getFoodTypeList(id)
  }

  useEffect(() => {
    if (router.query.foodId) {
      callData(router.query.foodId?.toString())
    }
  }, [router.query.foodId])

  return (
    <>
      {addonsList && (
        <div className='bg-[#F7F7F7] min-h-[100vh]'>
          <div className='relative'>
            {addonsList.food_image && (
              <Image
                src={addonsList?.food_image}
                className='w-[100%] aspect-[16/9] object-cover'
                width={600}
                height={337.5}
                alt='food image'
              />
            )}
            <Link
              href={`/store/${router.query.storeId?.toString()}`}
              className='absolute top-[20px] left-[20px] bg-[#FFFFFF] p-[4px] rounded-full'
            >
              <X />
            </Link>
            <button className='absolute top-[20px] right-[20px] bg-[#FFFFFF] p-[4px] rounded-full'>
              <Share2 />
            </button>
          </div>
          <div className='p-[16px] bg-[#FFFFFF]'>
            <div className='flex justify-between'>
              <div className='text-[18px] sm:text-[20px] font-[600]'>
                {addonsList.food_name}
              </div>
              <div>
                <div className='text-[18px] sm:text-[20px] font-[600] text-end'>
                  {addonsList.price}
                </div>
                <div className='text-[12px] sm:text-[14px] text-[#A4A4A4]'>
                  ราคาเริ่มต้น
                </div>
              </div>
            </div>
            <div className='text-[14px] text-[#A4A4A4] mt-[20px]'>
              Recommend
            </div>
          </div>
          {addonsList.addons.map((item, index) => {
            return (
              !!item.length && (
                <div className='mt-[10px] min-h-[200px] p-[16px] bg-[#FFFFFF]'>
                  <div className='flex gap-[6px] items-center'>
                    <span>AddOn {index + 1}</span>
                    {!item[0]?.is_selected && (
                      <span className='text-[#A4A4A4] text-[10px] sm:text-[12px]'>
                        ไม่จำเป็นต้องระบุ
                      </span>
                    )}
                    {item[0]?.is_selected && (
                      <span className='text-[#A4A4A4] text-[10px] sm:text-[12px]'>
                        จำเป็นต้องระบุ {item[0].must_select}
                      </span>
                    )}
                    {item[0]?.min_select && (
                      <span className='text-[#A4A4A4] text-[10px] sm:text-[12px]'>
                        อย่างน้อย {item[0].min_select}
                      </span>
                    )}
                    {item[0]?.max_select && (
                      <span className='text-[#A4A4A4] text-[10px] sm:text-[12px]'>
                        สูงสุด {item[0].max_select}
                      </span>
                    )}
                  </div>
                  <div className='mt-[10px]'>
                    <ul>
                      {item.map((v) => {
                        return (
                          <li className='border-b py-[10px] flex justify-between items-center'>
                            <label className='flex items-center gap-[16px] text-[#A4A4A4] text-[14px]'>
                              <input
                                type='checkbox'
                                className='w-[16px] h-[16px]'
                              />
                              {v.addons_name}
                            </label>
                            <span className='text-[#A4A4A4] text-[14px]'>
                              +{v.addons_price}
                            </span>
                          </li>
                        )
                      })}
                    </ul>
                  </div>
                </div>
              )
            )
          })}
        </div>
      )}
    </>
  )
}

export const getServerSideProps: GetServerSideProps = withAuth()

export default StorePage
