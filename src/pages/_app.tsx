import '@/app/globals.css'
import type { AppProps } from 'next/app'

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div className='max-w-[768px] w-full m-auto'>
      <Component {...pageProps} />
    </div>
  )
}
