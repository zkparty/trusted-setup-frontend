const ethers = require('ethers');
const data = require('./data.json');

async function main(){

    let { signature, receipt } = data;

    // 1. check that signature address is equal to sequencer address
    const hash = ethers.utils.hashMessage(receipt);
    const signer = ethers.utils.recoverAddress(hash, '0x' + signature);
    // get sequencer address from https://ceremony.ethereum.org/#/record
    const sequencer = '0x1C5c1289620f4f02D7cC29dda63C71106c04a7EC';
    console.log('Receipt signature check: ' + (signer === sequencer) + '\n');
    console.log(signer);
    console.log(sequencer);
    console.log('\n');

    // 2. check that the witnesses are equal to your PoT pubkeys
    console.log('Receipt witnesses: \n')
    const { witness } = JSON.parse(receipt);
    for (let i = 0, ni=witness.length; i < ni; i++) {
        const w = witness[i];
        console.log('Witness ' + i + ': ' + w);
    }
}

main();