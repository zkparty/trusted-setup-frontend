# KZG Ceremony Frontend


This React App is a graphic interface to interact with the [Ethereum KZG Ceremony](https://github.com/ethereum/kzg-ceremony). Participants can checkout the website at [ceremony.ethereum.org](https://ceremony.ethereum.org).

## Start

To start this app execute the following steps:

1. Run the sequencer app from [https://github.com/ethereum/kzg-ceremony-sequencer](). It is assumed that the assigned port is 3000 and that our react app would use port 3001. You can set `PORT` env variable with a specific port for React.

2. Setup environment variables:

- Sequencer API URL

    - Ubuntu: `export REACT_APP_API_ROOT=http://localhost:3000`
    - Windows (Powershell): ` $env:REACT_APP_API_ROOT="http://localhost:3000" `

- Environment

    - Ubuntu: `export REACT_APP_ENVIRONMENT="testnet"`
    - Windows (Powershell): `$env:REACT_APP_ENVIRONMENT="testnet"`

3. Install dependencies: `yarn install`

4. Start application: `yarn start`


Note: If the Rust code is updated, copy the `/wasm` directory from the [wrapper library](https://github.com/zkparty/wrapper-small-pot) in the `public/` directory. Most of the times the `wasm-worker.js` text will not change.

## Build for IPFS

A build for IPFS should result in the same CID as others who have built from the same source. However, it is necessary to use a compatible environment and tool set to ensure that differences aren't introduced. Docker images are available to provide the required environment.

The computation code is written in Rust and compiled to WASM. The compiled WASM package is available, for convenience, in the `public/wasm` folder, but a thorough build for IPFS will involve rebuilding that package. The code can be found [here](https://github.com/zkparty/wrapper-small-pot). The `zkparty/wasm-pack-wrapper` docker image includes the code as well as the environment for compiling to WASM.

#### Build and add using Docker

* Set required environment variables
  - `export REACT_APP_API_ROOT=https://seq.ceremony.ethereum.org`
  - `export REACT_APP_ENVIRONMENT=production`
* Build the WASM wrapper Docker image, or `docker pull zkparty/wasm-pack-wrapper`
* Pull a Docker image for node.js: `docker pull node:19-bullseye`
* Build the entire site, and run an IPFS node: `./docker-build.sh`
* Wait for the IPFS node to complete its startup. Watch the container's logs: `docker logs ipfs-host`
* Add the site to IPFS: `docker exec ipfs-host ipfs add -r /export`
* Run the ceremony from the IPFS site:
  * Note the hash generated for `/export` in the previous step
  * In your browser, navigate to `http://localhost:8080/ipfs/<hash>`
* Stop the container once you're finished: `docker stop ipfs-host`

This will result in a series of log messages reporting the CID of each object in the folder. The CID of the `export` folder itself is the important one for our purposes.

```
...
added QmV7zRBYTYf8wmQQzXfnfRFTyYBUByJGaLB37VuHjsj6Y6 export/wasm/pkg
added QmZTdJheNur4R2esdej5w1gktGS5aLHYHtLsChMjACmzuk export/wasm
added QmbTGA1mPf3nb5RRWehvrHn7cz3jwVQdj91r3c6eHmdx4k export
13.80 MiB / 13.80 MiB [=======================================================================================] 100.00%
```

The latest build has this CID: `Qmf8NfR8bKLNWzkTN7CDvaEGMXnHR4px3ypqCHRpvsubJU`

or, in base32: `bafybeihzogihryvljuwim2vh2n3rqderrkbiaguzu3fq4m4zhjtcm6xb3u`

The site can be added to pinning services by uploading the `build` folder.

You can access it using the ENS [latest.kzgceremony.eth](https://latest.kzgceremony.eth)


## Building from the Audited commit

An audit of the code was conducted by Sigma Prime. The audit report notes the commit hash at which the audit was restested following implementation of the audit recommendations.

To build the site at that commit:

* Checkout the `wrapper-small-pot` repo at tag `sigp-audit`. Build the WASM code as per above.
* Checkout this repo at tag `frontend-audit`.
* Set environment variables for running live. The `.env` file should contain these entries:
```
REACT_APP_API_ROOT=https://seq.ceremony.ethereum.org
REACT_APP_ENVIRONMENT=prod
```
* Build the site (see above).

The IPFS CID for the audited code is `QmevfvaP3nR5iMncWKa55B2f5mUgTAw9oDjFovD3XNrJTV`

1. Access it [here](https://ceremony-ipfs.efprivacyscaling.org/ipfs/QmevfvaP3nR5iMncWKa55B2f5mUgTAw9oDjFovD3XNrJTV)
1. Or use the ENS [audit.kzgceremony.eth](https://audit.kzgceremony.eth)
1. Or at other IPFS gateways.


