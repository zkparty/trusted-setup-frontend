import init, {
  init_threads,
  verify_wasm,
  contribute_wasm,
  subgroup_check_wasm,
  get_pot_pubkeys_wasm
} from './pkg/wrapper_small_pot.js'

onmessage = async (event) => {
  await init()
  await init_threads(navigator.hardwareConcurrency)
  console.log('available threads:', navigator.hardwareConcurrency)
  const { action } = event.data
  switch (action) {
    case 'contribute':
      contribute(event.data)
      break
    case 'subgroupCheck':
      subgroupChecks(event.data)
      break
    case 'getPotPubkeys':
      getPotPubkeys(event.data)
      break
    case 'verify':
      verify(event.data)
      break
    default:
      break
  }
}

async function contribute(data) {
  const { contributionString, entropy, identity } = data
  console.log('start contributing')
  const startTime = performance.now()
  const result = contribute_wasm(contributionString, entropy, identity)
  const endTime = performance.now()
  console.log(`Contribution took ${endTime - startTime} milliseconds`)
  postMessage(result)
}

function subgroupChecks(data) {
  let { contribution, newContribution } = data

  console.log('start subgroup checks')
  const startTime = performance.now()
  const checkContribution = subgroup_check_wasm(contribution)
  const checkNewContribution = subgroup_check_wasm(newContribution)
  const endTime = performance.now()
  console.log(`Subgroups checks took ${endTime - startTime} milliseconds`)
  const result = {
    checkContribution,
    checkNewContribution
  }
  postMessage(result)
}

function getPotPubkeys(data) {
  const { entropy } = data
  console.log('start get potPubkeys')
  const startTime = performance.now()
  const potPubkeys = get_pot_pubkeys_wasm(entropy)
  const endTime = performance.now()
  console.log(`Get PotPubkeys took ${endTime - startTime} milliseconds`)
  postMessage(potPubkeys)
}

function verify(data) {
  const { contribution, newContribution } = data
  console.log('start verifying')
  const startTime = performance.now()
  const result = verify_wasm(contribution, newContribution)
  const endTime = performance.now()
  console.log(`Verification took ${endTime - startTime} milliseconds`)
  postMessage(result)
}
