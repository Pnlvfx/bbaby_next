type SessionProps = {
    user?: {
      username: string
      avatar: string
      role: number
    }
    device?: {
      mobile: boolean
    }
    eu_cookie?: string
}

type UserProps = {
  username?: string
  avatar?: string
  role?: number
  email?: string
  country?: string
  hasExternalAccount?: boolean
  externalAccounts?: [
    {
      username: string
      provider: string
      url: string
    }
  ]
}
