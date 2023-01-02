# Verify and validate the sequencer receipt

After computing your contribution, the sequencer would send a receipt with important and verifiable information. The frontend web application would perform checks automatically but any participant would be able to download the receipt and run their own checks. The receipt looks like:

```
{
  "receipt": {
    "identity": "eth|0x123...",
    "witness": [
        "0x123...",
        "0x456...",
        "0x789...",
        "0x012..."
    ]
  },
  "signature": "ca3..."
}

```

## Checks

1. **Receipt signature address is equal to sequencer address:** to prove that the receipt was sent by the official sequencer, a participant can recover the public address from the signature and compare it with the official public address.

2. **Check that witnesses are equal to PoT Pubkeys:** the receipt sends back the PoT Pubkeys as "witnesses". A participant can check that each witness is equal to one PoT Pubkey.