# GenFrens Codebase

Includes:
1. The p5.js script which creates GenFrens.
2. The GenFrens.sol ERC721 smart contract.
3. GenFrens.xyz frontend
4. Some extra scripts to play with your GenFren (head only image, 2 fren banner sized image)

Currently Missing (but will add to the repo in the future):
1. Heroku app which on OpenSea 'refresh metadata' gets the token's tokenId & hash and puts them into the p5.js script (on IPFS) and converts the <canvas> element to a PNG file. It then pins the png file to IPFS and then points OpenSea to that location to show it on the GenFrens collection page (OpenSea doesn't like <canvas> elements on the collection page).


## Built with 🏗 Scaffold-ETH

> everything you need to build on Ethereum! 🚀

🧪 Quickly experiment with Solidity using a frontend that adapts to your smart contract:

![image](https://user-images.githubusercontent.com/2653167/124158108-c14ca380-da56-11eb-967e-69cde37ca8eb.png)


## 🏄‍♂️ Quick Start

Prerequisites: [Node](https://nodejs.org/en/download/) plus [Yarn](https://classic.yarnpkg.com/en/docs/install/) and [Git](https://git-scm.com/downloads)

> clone/fork 🏗 scaffold-eth:

```bash
git clone https://github.com/scaffold-eth/scaffold-eth.git
```

> install and start your 👷‍ Hardhat chain:

```bash
cd scaffold-eth
yarn install
yarn chain
```

> in a second terminal window, start your 📱 frontend:

```bash
cd scaffold-eth
yarn start
```

> in a third terminal window, 🛰 deploy your contract:

```bash
cd scaffold-eth
yarn deploy
```
