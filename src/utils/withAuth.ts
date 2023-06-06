import { hasCookie } from 'cookies-next'
import { GetServerSidePropsContext } from 'next'

type CallbackExtendProps = GetServerSidePropsContext
type WithAuthProps<T> = {
  redirect?: string
  extendProps?: (context: CallbackExtendProps) => T
}

export const withAuth =
  <T>(props?: WithAuthProps<T>) =>
  async (ctx: GetServerSidePropsContext) => {
    const { req } = ctx
    const isLogin = hasCookie('access_token', { req })

    if (!isLogin) {
      return {
        redirect: {
          permanent: false,
          destination: props?.redirect || '/login'
        }
      }
    }

    return {
      props: {
        ...props?.extendProps?.(ctx),
        isLogin
      }
    }
  }
