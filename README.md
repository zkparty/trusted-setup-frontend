# KZG Ceremony Frontend

**Work in Progress**

This React App is a graphic interface to interact with the [Ethereum KZG Ceremony](https://github.com/ethereum/kzg-ceremony). Participants can checkout the website at [https://kzg-ceremony.party/](https://kzg-ceremony.party/)

## Start

To start this app execute the following steps:

1. Run the sequencer app from [https://github.com/ethereum/kzg-ceremony-sequencer](). It is assumed that the assigned port is 3000 and that our react app would use port 3001. You can set `PORT` env variable with a specific port for React.

1. Setup environment variables:

    Ubuntu: `export REACT_APP_API_ROOT=http://localhost:3000`
    Windows (Powershell): ` $env:REACT_APP_API_ROOT="http://localhost:3000" `

    Ubuntu: `export REACT_APP_SIGNIN_REDIRECT_URL=http://localhost:3001/redirect`
    Windows (Powershell): ` $env:REACT_APP_SIGNIN_REDIRECT_URL="http://localhost:3001/redirect" `

2. Install dependencies: `yarn install`

4. Start application: `yarn start`


Note: If the Rust code is updated, copy the `/wasm` directory from the [wrapper library](https://github.com/zkparty/wrapper-small-pot) in the `public/` directory. Most of the times the `wasm-worker.js` text will not change.

