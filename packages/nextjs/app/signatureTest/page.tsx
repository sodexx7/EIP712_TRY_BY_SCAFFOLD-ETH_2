import { EIP721Contract } from "./_components/EIP721Contract";
import type { NextPage } from "next";
import { getMetadata } from "~~/utils/scaffold-eth/getMetadata";

export const metadata = getMetadata({
  title: "Signature Test",
  description: "Test signature",
});

const SignatureTest: NextPage = () => {
  return (
    <>
      <EIP721Contract />
      <div className="text-center mt-8 bg-secondary p-10">
        <h1 className="text-4xl my-0">Signature Test</h1>
        <p className="text-neutral">
          You can sign message and verify signature here.
          <br /> Check{" "}
          <code className="italic bg-base-300 text-base font-bold [word-spacing:-0.5rem] px-1">
            packages / nextjs / app / signatureTest / page.tsx
          </code>{" "}
        </p>
      </div>
    </>
  );
};

export default SignatureTest;
