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


## Build for IPFS

### Clone this repo

`git clone https://github.com/zkparty/trusted-setup-frontend.git`

### Install dependencies

`cd trusted-setup-frontend`

`yarn install`

### Build the computation code
The computation code is written in Rust and compiled to WASM. The compiled WASM package is available in this repo for convenience, but a thorough build for IPFS will involve rebuilding that package.

Clone the repo at 
https://github.com/zkparty/wrapper-small-pot

Follow the instructions there to build the code as a wasm package.

Copy the `wrapper-small-pot/wasm` folder to `trusted-setup-frontend/wasm`

### Build the front-end 

`yarn run build-ipfs`

This will create the `build` folder and add the site content to it.

### Add to IPFS

Choose an IPFS node, or install one locally. See [here](https://docs.ipfs.tech/install/ipfs-desktop/) to install a node.

The site needs to be added to IPFS as a folder. The command to this in ipfs cli is: ```ipfs add -r <your path>/trusted-setup-frontend/build```

This will result in a series of log messages reporting the CID of each object in the folder. The CID of the build folder itself is the important one for our purposes. 

> ...
> `added QmV7zRBYTYf8wmQQzXfnfRFTyYBUByJGaLB37VuHjsj6Y6 build/wasm/pkg`
> `added QmZTdJheNur4R2esdej5w1gktGS5aLHYHtLsChMjACmzuk build/wasm`
> added <span style='color:yellow'>QmbTGA1mPf3nb5RRWehvrHn7cz3jwVQdj91r3c6eHmdx4k</span> build
> `13.80 MiB / 13.80 MiB [=======================================================================================] 100.00%`

The reported CID is expected to match the CID of the client, as published.


