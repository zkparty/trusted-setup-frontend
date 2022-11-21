# KZG Ceremony Frontend

**Work in Progress**

This React App is a graphic interface to interact with the [Ethereum KZG Ceremony](https://github.com/ethereum/kzg-ceremony). Participants can checkout the website at [https://kzg-ceremony.party/](https://kzg-ceremony.party/)

## Start

To start this app execute the following steps:

1. Run the sequencer app from [https://github.com/ethereum/kzg-ceremony-sequencer](). It is assumed that the assigned port is 3000 and that our react app would use port 3001. You can set `PORT` env variable with a specific port for React.

1. Setup environment variables:

    Ubuntu: `export REACT_APP_API_ROOT=http://localhost:3000`
    Windows (Powershell): ` $env:REACT_APP_API_ROOT="http://localhost:3000" `

    Ubuntu: `export REACT_APP_SIGNIN_REDIRECT_URL=http://localhost:3001/signin`
    Windows (Powershell): ` $env:REACT_APP_SIGNIN_REDIRECT_URL="http://localhost:3001/signin" `

2. Install dependencies: `yarn install`

3. Copy the `/wasm` directory from the [wrapper library](https://github.com/zkparty/wrapper-small-pot) in the `public/` directory. Most of the times the `wasm-worker.js` will not change

4. Start application: `yarn start`


*Note:* In case you get a **crossOriginIsolated error** when running the contribution function in the web worker, it might be caused by this [known-and-soon-to-be-solved issue](https://web.dev/why-coop-coep/). You would need to change the token in the http-equiv="origin-trial" meta tag in `index,html` to:

1. Production (https://kzg-ceremony.party/): ` AjVfwdWSdxno9LR/Mwggz6Rrx0m9MlVHZB07xLFSPIMcLXr0xGnTDxZw3w77clkyTlK432VilcN6ANw3n4ydwAgAAAB8eyJvcmlnaW4iOiJodHRwczovL2t6Zy1jZXJlbW9ueS5wYXJ0eTo0NDMiLCJmZWF0dXJlIjoiVW5yZXN0cmljdGVkU2hhcmVkQXJyYXlCdWZmZXIiLCJleHBpcnkiOjE2NzUyOTU5OTksImlzU3ViZG9tYWluIjp0cnVlfQ== `

2. Production (https://ceremony.ethereum.org/): ` AvsLzQGkkiX4UwxTyYMhzquGZArOggtZJbQDbVpKgq6Zat45IcAG0do6ok9UV8jpbS1FSIb7IBpdDE8RKe4uVAkAAABseyJvcmlnaW4iOiJodHRwczovL2NlcmVtb255LmV0aGVyZXVtLm9yZzo0NDMiLCJmZWF0dXJlIjoiVW5yZXN0cmljdGVkU2hhcmVkQXJyYXlCdWZmZXIiLCJleHBpcnkiOjE2NzUyOTU5OTl9 `

2. Development (http://localhost:3001/): `AtOhr2NvRTD4rPvKdQBaVfFcVEQiDeBR97NMxxYIFp2F+FdWsKpROhrE1lUKhib4bVcJyxBNAOy1+90xRk3cyAYAAABgeyJvcmlnaW4iOiJodHRwOi8vbG9jYWxob3N0OjMwMDEiLCJmZWF0dXJlIjoiVW5yZXN0cmljdGVkU2hhcmVkQXJyYXlCdWZmZXIiLCJleHBpcnkiOjE2NzUyOTU5OTl9 `

In case you need to ask for another token, you can go here [https://developer.chrome.com/origintrials/#/view_trial/303992974847508481]()


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


