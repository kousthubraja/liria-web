import Web3Modal from 'web3modal';
import WalletConnectProvider from "@walletconnect/web3-provider";
import { ethers } from 'ethers';

const abi = [	{ "inputs": [], "stateMutability": "nonpayable", "type": "constructor"	},	{ "inputs": [ 	{  "internalType": "uint256",  "name": "_articleId",  "type": "uint256" 	}, 	{  "internalType": "bool",  "name": "validate",  "type": "bool" 	} ], "name": "addValidation", "outputs": [], "stateMutability": "nonpayable", "type": "function"	},	{ "inputs": [], "name": "artclCount", "outputs": [ 	{  "internalType": "uint256",  "name": "",  "type": "uint256" 	} ], "stateMutability": "view", "type": "function"	},	{ "inputs": [ 	{  "internalType": "uint256",  "name": "",  "type": "uint256" 	} ], "name": "articles", "outputs": [ 	{  "internalType": "string",  "name": "cid",  "type": "string" 	}, 	{  "internalType": "address",  "name": "author",  "type": "address" 	}, 	{  "internalType": "uint256",  "name": "validityScore",  "type": "uint256" 	} ], "stateMutability": "view", "type": "function"	},	{ "inputs": [ 	{  "internalType": "address",  "name": "",  "type": "address" 	} ], "name": "authors", "outputs": [ 	{  "internalType": "address",  "name": "creater",  "type": "address" 	}, 	{  "internalType": "uint256",  "name": "validityScore",  "type": "uint256" 	} ], "stateMutability": "view", "type": "function"	},	{ "inputs": [], "name": "getArticles", "outputs": [ 	{  "components": [  	{   "internalType": "string",   "name": "cid",   "type": "string"  	},  	{   "internalType": "address",   "name": "author",   "type": "address"  	},  	{   "internalType": "uint256",   "name": "validityScore",   "type": "uint256"  	}  ],  "internalType": "struct Article.ArticleMeta[]",  "name": "",  "type": "tuple[]" 	} ], "stateMutability": "view", "type": "function"	},	{ "inputs": [ 	{  "internalType": "string",  "name": "_cid",  "type": "string" 	}, 	{  "internalType": "address",  "name": "_creater",  "type": "address" 	} ], "name": "publishArticle", "outputs": [], "stateMutability": "nonpayable", "type": "function"	}];

const ARTICLE_CONTRAC_ADDRESS = "0x2436C98D51eB4EDF1881BBd98B2406B106eB6001";

export async function createPost(text: any, price: string="0") {
    console.log('creating pst', text)
    
    const web3Modal = new Web3Modal({
        cacheProvider: true,
        providerOptions: {
            walletconnect: {
                package: WalletConnectProvider,
            }
          },
    });
    const instance = await web3Modal.connect();
    const provider = new ethers.providers.Web3Provider(instance);
    const signer = provider.getSigner();
    const smartContract = new ethers.Contract(ARTICLE_CONTRAC_ADDRESS, abi, provider);
    const contractWithSigner = smartContract.connect(signer);
    let accounts = await provider.send("eth_requestAccounts", []);
    let account = accounts[0];
    console.log('account', account)
    const tx = await contractWithSigner.publishArticle(text, account);
    await tx.wait();
    alert('Publishing successful')
}

export async function getPosts() {
    const web3Modal = new Web3Modal({
        cacheProvider: true,
        providerOptions: {
            walletconnect: {
                package: WalletConnectProvider,
            }
          },
    });
    const instance = await web3Modal.connect();
    const provider = new ethers.providers.Web3Provider(instance);
    const smartContract = new ethers.Contract(ARTICLE_CONTRAC_ADDRESS, abi, provider);
    return await smartContract.getArticles();
}

export async function scorePost(articleId: any, vote: boolean) {
    const web3Modal = new Web3Modal({
        cacheProvider: true,
        providerOptions: {
            walletconnect: {
                package: WalletConnectProvider,
            }
          },
    });
    const instance = await web3Modal.connect();
    const provider = new ethers.providers.Web3Provider(instance);
    const signer = provider.getSigner();
    const smartContract = new ethers.Contract(ARTICLE_CONTRAC_ADDRESS, abi, provider);
    const contractWithSigner = smartContract.connect(signer);
    console.log(contractWithSigner)
    const tx = await contractWithSigner.addValidation(articleId + 1, vote);
    await tx.wait();
    alert('Voting successful')
}