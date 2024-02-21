import { useState } from "react";
import { Abi } from "abitype";
import { ethers } from "ethers";
import { Address as AddressType } from "viem";
import { useAccount, useContractRead, useContractWrite, useNetwork } from "wagmi";
import { AddressInput, IntegerInput } from "~~/components/scaffold-eth";
import { Contract, ContractName } from "~~/utils/scaffold-eth/contract";

export const SignDataTest = ({ deployedContractData }: { deployedContractData: Contract<ContractName> }) => {
  const [spenderAddress, setspenderAddress] = useState<AddressType>();
  const [amount, setAmount] = useState<string | bigint>("");
  const [deadLine, setDeadline] = useState<string | bigint>("");
  const [nonces, setNonces] = useState<string | bigint>("");

  const { chain: ConnectedChain } = useNetwork();
  const { address: connectedAddress } = useAccount();

  const contractnonces = useContractRead({
    address: deployedContractData.address,
    functionName: "nonces",
    abi: deployedContractData.abi as Abi,
    args: [connectedAddress],
    enabled: true,
    onError: (error: any) => {
      console.log(error);
    },
    onSuccess(data) {
      console.log("connectedaddress: " + connectedAddress, "nonces:", data);
      setNonces(data as string | bigint);
    },
  });

  const { write } = useContractWrite({
    address: deployedContractData.address,
    abi: deployedContractData.abi as Abi,
    functionName: "permit",
    args: [],
    onSuccess(data) {
      console.log("call permit succress: " + connectedAddress, data);
      // call contractnonces
      console.log("set new connectedAddress nonces", contractnonces.data);
      setNonces(contractnonces.data as string | bigint);
    },
  });

  if (!deployedContractData) {
    return null;
  }

  const handleClick = async () => {
    console.log("EIP721 permit test..................");
    console.log("amount", amount);
    console.log("deadLine", deadLine);
    console.log("spenderAddress", spenderAddress);
    const typedData = {
      types: {
        EIP712Domain: [
          { name: "name", type: "string" },
          { name: "version", type: "string" },
          { name: "chainId", type: "uint256" },
          { name: "verifyingContract", type: "address" },
        ],
        Permit: [
          { name: "owner", type: "address" },
          { name: "spender", type: "address" },
          { name: "value", type: "uint256" },
          { name: "nonce", type: "uint256" },
          { name: "deadline", type: "uint256" },
        ],
      },
      primaryType: "Permit",
      domain: {
        name: "Tony",
        version: "1",
        chainId: ConnectedChain?.id,
        verifyingContract: deployedContractData.address,
      },
      message: {
        owner: connectedAddress,
        spender: spenderAddress,
        value: amount.toString(),
        nonce: nonces.toString(),
        deadline: deadLine,
      },
    };
    console.log("chainId", ConnectedChain?.id);
    console.log("verifyingContract", deployedContractData.address);

    // todo blew function can optimize
    // Create a new provider using window.ethereum. this format provider can show EIP721 info
    const provider = new ethers.providers.Web3Provider(window.ethereum as ethers.providers.ExternalProvider);
    console.log(connectedAddress);
    console.log(JSON.stringify(typedData));
    // seems eth_signTypedData_v3 no show Domain info
    const signature = await provider.send("eth_signTypedData_v4", [connectedAddress, JSON.stringify(typedData)]);
    console.log("signature");
    console.log(signature);
    const split = ethers.utils.splitSignature(signature);
    let v, r, s;
    (v = split.v), (r = split.r), (s = split.s);
    console.log("v: " + split.v);
    console.log("r: " + split.r);
    console.log("s: " + split.s);

    // Now you can use this provider to interact with the connected wallet
    write({
      args: [connectedAddress, spenderAddress, amount, deadLine, v, r, s],
    });
  };

  return (
    <div>
      <button className="btn btn-secondary btn-sm" onClick={handleClick}>
        SignData 💸
      </button>
      {/* // convert 1 to 10^18 for amount  */}
      <IntegerInput placeholder="amount" value={amount} onChange={value => setAmount(value)} />
      below time is 24 hours later
      <br />
      {(Math.floor(Date.now() / 1000) + 60 * 60 * 24).toString()}
      <IntegerInput name="deadLine" value={deadLine} onChange={value => setDeadline(value)} placeholder="deadline" />
      {/* <IntegerInput name="deadline" value={deadLine} onChange={value => setDeadline(value)} placeholder="deadline" /> */}
      <AddressInput
        value={spenderAddress ?? ""}
        onChange={value => setspenderAddress(value as AddressType)}
        placeholder="spender"
      />
    </div>
  );
};
