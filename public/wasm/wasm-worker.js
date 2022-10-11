import init, {
    init_threads,
    contribute_wasm,
} from "./pkg/wrapper_small_pot.js";

onmessage = async (event) => {
    await init();
    await init_threads(10);
    console.log("available threads:", navigator.hardwareConcurrency);
    const { action } = event.data;
    switch (action) {
        case 'contribute':
            contribute(event.data);
            break;
        case 'subgroupCheck':
            console.log('TODO: implement post subgroups checks')
            break;
        case 'getPotPubkeys':
            console.log('TODO: implemente getPotPubkeys')
            break;
        default:
            break;
    }
}


async function contribute(data){
    const {contributionString, entropy} = data;
    console.log("start contributing");
    const startTime = performance.now();
    const result = contribute_wasm(
        contributionString,
        entropy,
    );
    const endTime = performance.now();
    console.log(`Contribution took ${endTime - startTime} milliseconds`)
    postMessage({ contribution: result });
}

/*
function subgroupChecks(data){
    let { contribution, newContribution } = data;
    contribution = JSON.parse(contribution);
    // Temporary solution until sequencer sends potPubkey in contributions
    contribution['contributions'].forEach((contrib) => {
        contrib['potPubkey'] = '0x0001';
    })
    contribution = JSON.stringify(contribution);

    console.log("start subgroup checks");
    const startTime = performance.now();
    const checkContribution = subgroup_check_wasm(contribution);
    const checkNewContribution = subgroup_check_wasm(newContribution);
    const endTime = performance.now();
    console.log(`Subgroups checks took ${endTime - startTime} milliseconds`);
    const result = {
        checkContribution,
        checkNewContribution,
    }
    postMessage(result);
}

function getPotPubkeys(data){
    let { entropy } = data;
    console.log("start getPotPubkeys");
    const startTime = performance.now();
    const potPubkeys = get_pot_pubkeys_wasm(
        entropy[0],
        entropy[1],
        entropy[2],
        entropy[3],
    );
    const endTime = performance.now();
    console.log(`Get PotPubkeys took ${endTime - startTime} milliseconds`);
    postMessage(potPubkeys);
}
*/