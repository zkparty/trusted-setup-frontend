export type TryContributeRes = {
  ValidContribution: number
}

export type ContributeRes = {
  proofs: string | null
  receipt: string | null
  signature: string | null
  contribution: string | null
}

// TODO: API backend is sending session_id & other params
export type GetAuthorizedRes = {
  id_token: string
  session_id: string
}

export type ErrorRes = {
  error: string
  message?: string
}
