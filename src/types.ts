export type TryContributeRes = {
  ValidContribution: number
}

export type ContributeRes = any

export type GetAuthorizedRes = {
  id_token: string
  session_id: string
}

export type ErrorRes = {
  error: string
}
