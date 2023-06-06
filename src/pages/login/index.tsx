import { withoutAuth } from '@/utils/withoutAuth'
import { setCookie } from 'cookies-next'
import { GetServerSideProps } from 'next'
import Image from 'next/image'
import { useRouter } from 'next/router'

type Props = {}

const LoginPage = (props: Props) => {
  const router = useRouter()

  const handleOnLogin = () => {
    setCookie('access_token', new Date().getTime())
    router.push('/store')
  }

  return (
    <div className='min-h-[100vh]'>
      <div className='bg-[#15BE5F] p-[60px_40px]'>
        <div>
          <div className='m-auto w-fit'>
            <Image
              src='/images/white-logo.png'
              width={200}
              height={80}
              alt='logo grab'
            />
          </div>
          <div className='m-auto w-fit text-[#FFFFFF] mt-[16px] text-[18px] text-center'>
            แอปฯ ที่ตอบโจทย์ในชีวิตประจำวันของคุณ
          </div>
        </div>
      </div>
      <div className='flex flex-col justify-end bg-[#15BE5F] h-[calc(100vh-243px)] bg-[length:400px_400px] bg-size-[100px] bg-[center_top] bg-no-repeat bg-[url("/images/login-bg-3.png")]'>
        <div className='bg-[#FFFFFF] min-h-[160px] rounded-[40px_40px_0_0] p-[20px_20px] sm:p-[20px_60px] flex flex-col justify-center'>
          <button
            onClick={handleOnLogin}
            className='w-full rounded-[60px] bg-[#15BE5F] p-[10px_20px] sm:p-[20px_40px] text-[18px] font-[600] text-[#FFFFFF]'
          >
            Login
          </button>
        </div>
      </div>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = withoutAuth()

export default LoginPage
