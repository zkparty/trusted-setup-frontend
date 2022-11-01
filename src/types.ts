export type TryContributeRes = {
  ValidContribution: number
}

export type ContributeRes = {
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
  code: string
  error: string
  message?: string
}

export type SubgroupCheckResWasm = {
  checkContribution: boolean | null
  checkNewContribution: boolean | null
}
