type SessionProps = {
    session? : {
        user: {
            username: string
            avatar: string
            role: number
        }
    }
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