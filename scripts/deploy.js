
// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
const hre = require("hardhat");
const contractJSON = require("../dist/a5bee9184ebc94b4f1dc60927f7598b32ae58a8f/artifacts/contracts/Poli.sol/Poli.json");

async function main() {
  // Hardhat always runs the compile task when running scripts with its command
  // line interface.
  //
  // If this script is run directly using `node` you may want to call compile
  // manually to make sure everything is compiled
  // await hre.run('compile');

  // We get the contract to deploy
const signers = await hre.ethers.getSigners();
const tokensOwner = "0x085a958427aaA3Ac8Be6174F630a96641538E280"; //Naeem

//console.log(contractJSON.abi);
//console.log(contractJSON.bytecode);
//return;

//const ContractToDeploy = await hre.ethers.getContractFactory("Poli");
const ContractToDeploy = await hre.ethers.ContractFactory(contractJSON.abi, contractJSON.bytecode, signers[0])

const poliContract = await ContractToDeploy.deploy(tokensOwner);

await poliContract.deployed();

console.log("Contract deployed at: " + poliContract.address);

}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
