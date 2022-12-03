var contractAddress = '0x17f91ddeb4a2085a0a4fa576c962731a129555c6'
var ABI = ""


async function loadContract() {
    return await new window.web3.eth.Contract(ABI, contractAddress);
}

async function publishArticle(cid, creator) {
    const contract = await loadContract();
    const account = await getCurrentAccount();
    const res = await contract.methods.publishArticle(cid, creator).send({from : account});
    console.log("res ", res);
}

async function addValidation(articleId, validate) {
    const contract = await loadContract();
    const account = await getCurrentAccount();
    const res = await contract.methods.addValidation(articleId, validate).send({ from: account });
    console.log("res ", res);
}

async function getData(articleId) {
    
}
