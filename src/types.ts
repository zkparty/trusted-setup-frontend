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

export type RequestLinkRes = {
  eth_auth_url: string
  github_auth_url: string
}

export type SubgroupCheckResWasm = {
  checkContribution: boolean | null
  checkNewContribution: boolean | null
}

export type Transcript = {
  transcripts: SubTranscript[],
  participantIds: string[],
  participantEcdsaSignatures: string[],
}

export type SubTranscript = {
  numG1Powers: number,
  numG2Powers: number,
  powersOfTau: {
    G1Powers: string[]
    G2Powers: string[]
  },
  witness: {
    potPubkeys: string[],
    blsSignatures: string[],
    runningProducts: string[],
  }
}

export type Record = {
  position: number
  participantId: string | null
  participantEcdsaSignature: string | null
  transcripts: TranscriptDetails[]
}

export type TranscriptDetails = {
  potPubkeys: string,
  blsSignature: string
}

export type SequencerStatus = {
  lobby_size: number,
  num_contributions: number,
  sequencer_address: string,
  status: string,
}