import chai from "chai";
import { solidity } from "ethereum-waffle";
import type { Poli } from "../typechain/Poli";
import { ethers } from "hardhat";

chai.use(solidity);
const { expect, assert } = chai;

describe("Poli", async function () {
  it("should have 18 decimals", async () => {
    const signers = await ethers.getSigners();

    const alice = signers[0];

    const poliFactory = await ethers.getContractFactory("Poli");
    const poli = (await poliFactory.deploy(alice.address)) as Poli;
    await poli.deployed();

    const decimals = await poli.decimals();
    const expected = 18;
    assert(
      decimals === expected,
      `wrong decimals ${decimals} expected ${expected}`
    );
  });

  it("should have correct name and symbol", async function () {
    const signers = await ethers.getSigners();

    const alice = signers[0];

    const poliFactory = await ethers.getContractFactory("Poli");
    const poli = (await poliFactory.deploy(alice.address)) as Poli;
    await poli.deployed();

    const name = await poli.name();
    const expectedName = "Polinate";
    assert(
      name === expectedName,
      `wrong name ${name} expected ${expectedName}`
    );

    const symbol = await poli.symbol();
    const expectedSymbol = "POLI";
    assert(
      symbol === expectedSymbol,
      `wrong symbol ${symbol} expected ${expectedSymbol}`
    );
  });

  it("should have 1 billion supply", async function () {
    const signers = await ethers.getSigners();

    const alice = signers[0];
    const bob = signers[1];
    const carol = signers[2];

    const poliFactory = await ethers.getContractFactory("Poli");
    const poli = (await poliFactory.deploy(bob.address)) as Poli;
    await poli.deployed();

    const supply = await poli.totalSupply();
    const expectedSupply = ethers.BigNumber.from(
      "1000000000000000000000000000"
    );
    assert(
      supply.eq(expectedSupply),
      `wrong supply ${supply} expected ${expectedSupply}`
    );

    const ownedByDeployer = await poli.balanceOf(alice.address);
    const ownedByDistributor = await poli.balanceOf(bob.address);
    const ownedByAnon = await poli.balanceOf(carol.address);
    assert(
      ownedByDeployer.eq(0),
      `wrong ownedByDeployer ${ownedByDeployer} expected 0`
    );
    assert(
      ownedByDistributor.eq(expectedSupply),
      `wrong ownedByDistributor ${ownedByDistributor} expected ${expectedSupply}`
    );
    assert(ownedByAnon.eq(0), `wrong ownedByAnon ${ownedByAnon} expected 0`);
  });
});
