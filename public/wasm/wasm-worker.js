import init, {
    init_threads,
    contribute_wasm,
    subgroup_check_wasm,
} from "./pkg/wrapper_small_pot.js";

onmessage = async (event) => {
    await init();
    await init_threads(navigator.hardwareConcurrency);
    console.log("available threads:", navigator.hardwareConcurrency);
    const { action } = event.data;
    switch (action) {
        case 'contribute':
            contribute(event.data);
            break;
        case 'subgroupCheck':
            subgroupChecks(event.data);
            break;
        default:
            break;
    }
}


async function contribute(data){
    const {contributionString, entropy} = data;
    let contribution = JSON.parse(contributionString);
    // Temporary solution until sequencer sends potPubkey in contributions
    contribution['contributions'].forEach((contrib) => {
        contrib['potPubkey'] = '0x0001';
    })
    contribution = JSON.stringify(contribution);

    let secrets = await Promise.all([
        sha256(entropy[0]),
        sha256(entropy[1]),
        sha256(entropy[2]),
        sha256(entropy[3]),
    ]);
    secrets = secrets.map(secret => '0x' + secret);

    console.log("start contributing");
    const startTime = performance.now();
    const result = contribute_wasm(
        contribution,
        secrets[0],
        secrets[1],
        secrets[2],
        secrets[3],
    );
    const endTime = performance.now();
    console.log(`Contribution took ${endTime - startTime} milliseconds`)
    const postContribution = JSON.parse(result.contribution)
    const contributions = postContribution.contributions;
    const newResult = {
        'contribution': JSON.stringify({
            'contributions': contributions
        }),
        'proofs': result.proofs,
    }

    postMessage(newResult);
}

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

async function sha256(message) {
    // encode as UTF-8
    const msgBuffer = new TextEncoder().encode(message);
    // hash the message
    const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
    // convert ArrayBuffer to Array
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    // convert bytes to hex string
    const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    return hashHex;
}
