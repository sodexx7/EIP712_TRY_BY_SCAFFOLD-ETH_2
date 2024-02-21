import { expect } from "chai";
import { ethers } from "hardhat";
import { ERC20PermitContract } from "../typechain-types";
import { utils } from "ethers";

describe("ERC20PermitContract", function () {
  // We define a fixture to reuse the same setup in every test.

  let eRC20PermitContract: ERC20PermitContract;
  before(async () => {
    const eRC20PermitContractFactory = await ethers.getContractFactory("ERC20PermitContract");
    eRC20PermitContract = (await eRC20PermitContractFactory.deploy()) as ERC20PermitContract;
    await eRC20PermitContract.waitForDeployment();
  });

  describe("Deployment", function () {
    it("Name test", async function () {
      expect(await eRC20PermitContract.name()).to.equal("Tony");
    });
  });

  //  test ERC20Permit permit function
  // describe("permit function test", function () {
  //   it("permit function test", async function () {
  //     const owner = await eRC20PermitContract.getAddress();
  //     const spender = await ethers.Wallet.createRandom().getAddress();
  //     const amount = ethers.parseEther("1");
  //     const deadline = Math.floor(Date.now() / 1000) + 60 * 60 * 24;
  //     const nonce = (await eRC20PermitContract.nonces(owner)).toString();
  //     const chainId = (await ethers.provider.getNetwork()).chainId;
  //     const verifyingContract = eRC20PermitContract.getAddress();
  //     const name = await eRC20PermitContract.name();
  //     const version = "1";

  //     const EIP712Domain = [
  //       { name: "name", type: "string" },
  //       { name: "version", type: "string" },
  //       { name: "chainId", type: "uint256" },
  //       { name: "verifyingContract", type: "address" },
  //     ];

  //     const Permit = [
  //       { name: "owner", type: "address" },
  //       { name: "spender", type: "address" },
  //       { name: "value", type: "uint256" },
  //       { name: "nonce", type: "uint256" },
  //       { name: "deadline", type: "uint256" },
  //     ];

  //     const domain = {
  //       name,
  //       version,
  //       // chainId,
  //       verifyingContract,
  //     };

  //     const message = {
  //       owner,
  //       spender,
  //       // amount,
  //       // nonce,
  //       // deadline,
  //     };

  //     const data = JSON.stringify({
  //       types: {
  //         EIP712Domain,
  //         Permit,
  //       },
  //       domain,
  //       primaryType: "Permit",
  //       message,
  //     });

  //     const signature = await ethers.provider.send("eth_signTypedData_v4", [owner, data]);

  //     const { v, r, s } = utils.splitSignature(signature);

  //     await eRC20PermitContract.permit(owner, spender, amount, deadline, v, r, s);

  //     expect(await eRC20PermitContract.allowance(owner, spender)).to.equal(amount);
  //   });
  // });
});
