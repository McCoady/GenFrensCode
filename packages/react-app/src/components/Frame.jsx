import { useEffect, useState } from "react";
import { ethers } from "ethers";
import { useContractReader } from "eth-hooks";
import { useParams } from "react-router-dom";
import deployedContracts from "../contracts/hardhat_contracts.json";
import { Address, Card, ContentItem } from '../components';

const SnowCrashAddress = "0x4B671aDE2A853613E46c7c0A86D7DF547d098b83";

// let params = new URL(document.location).searchParams;
// let tokenId = parseInt(params.get("token"));

const Frame = ({ readContracts }) => {
    const [crashHtml, setCrashHtml] = useState(null);
    const owner = useContractReader(readContracts, "GenFrens", "ownerOf", [getTokenId()]);
    const tokenId = useContractReader(readContracts, "GenFrens", "totalSupply")
    const hrefLink = "https://opensea.io/assets/0x4b671ade2a853613e46c7c0a86d7df547d098b83/" + (tokenId - 1)


    async function getTokenId() {
        const { GenFrens } = readContracts;

        try {
            const tokenId = await GenFrens.totalSupply() - 1;
            // const value = await getHash.wait();
            //console.log("Id Retreived.", tokenId);
            return tokenId;
        } catch (error) {
            console.error("Error, tokenId not found.");
        }
    }



    async function getHash(tokenId) {
        const { GenFrens } = readContracts;

        try {
            let hash = await GenFrens._tokenIdToHash(Number(tokenId));
            // const value = await getHash.wait();
            //console.log("Hash Retreived.", hash);
            return hash;
        } catch (error) {
            console.error("Error, hash not found.");
        }
    }

    async function getHTML() {
        const { GenFrens } = readContracts;
        const tokenId = await getTokenId();

        const hash = await getHash(tokenId)
        //console.log(hash)

        // if (typeof window.ethereum !== "undefined") {
        // await requestAccount();
        // const provider = new ethers.providers.Web3Provider(window.ethereum);
        // const signer = provider.getSigner();
        // const contract = new ethers.Contract(genFrensContract, genFrens.abi, signer);
        //console.log("HTML Started", hash, tokenId);
        try {
            const HTML = await GenFrens.hashToHTML(hash, tokenId);
            //console.log("HTML Retreived.", HTML);
            setCrashHtml(HTML);
        } catch (error) {
            console.error("Error, hash not found.");
        }
    }

    useEffect(() => {
        if (readContracts && readContracts.GenFrens) getHTML();
    }, [readContracts]);

    const genFrensIframe = crashHtml ? (
        <iframe style={{ border: 0 }} width="550" height="550" src={crashHtml}></iframe>
    ) : (
        <h1>Image Loading</h1>
    );


    return (
        <Card className="content">
            <div className="content-item">
                <div>Last Token Minted by:</div>
                <Address address={owner} />
                <br />
                <a href={hrefLink}>View on OpenSea</a>
            </div>
            <div>{genFrensIframe}</div>
        </ Card >
    );
};

export default Frame;