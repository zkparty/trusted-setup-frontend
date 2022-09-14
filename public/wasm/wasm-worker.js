import init, {init_threads, contribute_wasm} from "./pkg/kate_ptau_rs.js";

onmessage = async (event) => {
    const { transcript, entropy } = JSON.parse(event.data);
    console.log('inside worker');
    console.log("available threads: ", navigator.hardwareConcurrency);
    console.log("entropy: ", entropy);

    await init();
    await init_threads(navigator.hardwareConcurrency);

    var startTime = performance.now();
    console.log("start");
    var result = contribute_wasm(transcript, entropy);
    var endTime = performance.now();
    console.log(`Contribution took ${endTime - startTime} milliseconds`);

    postMessage(result);
}