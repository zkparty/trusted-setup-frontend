import { useQuery } from '@tanstack/react-query'
export type Record = {
  id: string
  sequenceNumber: number
  publicKey: string
  transcript: string // maybe JSON stringified string?
}

// TODO: get from API
const mockData: Record[] = [
  {
    id: 'Chiali.eth',
    sequenceNumber: 3,
    publicKey:
      '0x23,0xa69e43f72f1d8f07a6baae6ea0b0ce81cbe949345a0a5e307ae89e9cf58b20a17571af39e951faf61c45ef2ca9e21897eb9bc226473783ed9c3f6e30c4a84fa625373af96f41f8d9670484b52a33072eae6bb5433a2f00c672c20d7a03636a1b26af15b0d3ed376b9699e8653caa198637be88282333e8038bed63b9a2c6d179',
    transcript: 'some transcript string'
  },
  {
    id: 'JohnDoe.eth',
    sequenceNumber: 2,
    publicKey:
      '0x23,0xa69e43f72f1d8f07a6baae6ea0b0ce81cbe949345a0a5e307ae89e9cf58b20a17571af39e951faf61c45ef2ca9e21897eb9bc226473783ed9c3f6e30c4a84fa625373af96f41f8d9670484b52a33072eae6bb5433a2f00c672c20d7a03636a1b26af15b0d3ed376b9699e8653caa198637be88282333e8038bed63b9a2c6d179',
    transcript: 'some transcript string'
  },
  {
    id: 'Jane Doe',
    sequenceNumber: 1,
    publicKey:
      '0x23,0xa69e43f72f1d8f07a6baae6ea0b0ce81cbe949345a0a5e307ae89e9cf58b20a17571af39e951faf61c45ef2ca9e21897eb9bc226473783ed9c3f6e30c4a84fa625373af96f41f8d9670484b52a33072eae6bb5433a2f00c672c20d7a03636a1b26af15b0d3ed376b9699e8653caa198637be88282333e8038bed63b9a2c6d179',
    transcript: 'some transcript string'
  }
]

export default function useRecord(query: string = '') {
  return useQuery(['record', query], async () => {
    if (query === '') {
      // search all
    }

    return mockData
  })
}
