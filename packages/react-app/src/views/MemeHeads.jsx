import React from "react";
import { utils } from "ethers";
import { useContractReader } from "eth-hooks";
import { Card, Content } from "../components";


/**
 * web3 props can be passed from '../App.jsx' into your local view component for use
 * @param {*} yourLocalBalance balance on current network
 * @param {*} readContracts contracts from current chain already pre-loaded using ethers contract module. More here https://docs.ethers.io/v5/api/contract/contract/
 * @returns react component
 */
function MemeHeads({ yourLocalBalance, readContracts, writeContracts, userSigner, localChainId, tx }) {
  // you can also use hooks locally in your component of choice
  // in this case, let's keep track of 'purpose' variable from our contract



  return (
    <div>
      <input type="number" name="a" id="a" />
      <button onclick={
        useContractReader(readContracts, "GenFrens", "tokenIdToHash", document.getElementById('a'))
      }>Get Hash
      </button>
      <h1 className="title">GenFrens</h1>
      <h2 className="subtitle">We all need a fren that will never leave us.</h2>
      <Card className="content">
        <h2 className="btnline">How many frens you need, fren?</h2>
        <div className="btnline">

          <br />
        </div>
      </Card>
    </div >
  );
}

export default MemeHeads;