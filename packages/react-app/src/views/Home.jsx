import React from "react";
import { utils } from "ethers";
import { useContractReader } from "eth-hooks";
import { Card, Content, Frame } from "../components";

const content = [
  { id: "e1", title: "GenFrens", para1: "GenFrens are a profile picture collection created entirely with code in p5.js.", para2: "Every Fren is unique and it's appearance is decided by a random hash on mint." },
  { id: "e2", title: "Circolors", para1: "GenFrens are part of the Circolors family, a shadowy supergroup of aspiring generative artists.", para2: "Check the Discord server for more information on projects coming SOON." },
];

/**
 * web3 props can be passed from '../App.jsx' into your local view component for use
 * @param {*} yourLocalBalance balance on current network
 * @param {*} readContracts contracts from current chain already pre-loaded using ethers contract module. More here https://docs.ethers.io/v5/api/contract/contract/
 * @returns react component
 */
function Home({ yourLocalBalance, readContracts, writeContracts, userSigner, localChainId, tx }) {
  // you can also use hooks locally in your component of choice
  // in this case, let's keep track of 'purpose' variable from our contract
  const minted = useContractReader(readContracts, "GenFrens", "totalSupply");
  console.log(Number(minted));
  const mintOne = async () => {
    try {
      await writeContracts.GenFrens.estimateGas.mintFren(1, { value: utils.parseEther('0.01') }).then(function (gasEstimate) {
        tx(writeContracts.GenFrens.mintFren(1, { value: utils.parseEther('0.01'), gasLimit: Math.floor(gasEstimate * 1.5) }));
      })
    } catch (error) {
      console.error('Transaction likely to fail. Address already minted?')
    }

  };

  const mintTwo = async () => {
    try {
      await writeContracts.GenFrens.estimateGas.mintFren(2, { value: utils.parseEther('0.02') }).then(function (gasEstimate) {
        tx(writeContracts.GenFrens.mintFren(2, { value: utils.parseEther('0.02'), gasLimit: Math.floor(gasEstimate * 1.5) }));
      })

    } catch (error) {
      console.error('Transaction likely to fail. Address already minted?')
    }

  };

  return (
    <div>
      <h1 className="title">GenFrens</h1>
      <h2 className="subtitle">We all need a fren that will never leave us.</h2>
      <Card className="content">
        <h2 className="btnline">How many frens you need, fren?</h2>
        <div className="btnline">
          <button className="mintbtn" onClick={mintOne}>
            Mint One Fren
          </button>
          <button className="mintbtn" onClick={mintTwo}>
            Mint Two Frens
          </button>
          <br />
          <span> {Number(minted)} / 444 minted</span>
        </div>

      </Card>
      <Frame className="frame" readContracts={readContracts} />
      <Content content={content} />

    </div>
  );
}

export default Home;
