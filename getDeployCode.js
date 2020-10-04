const { ethers, Wallet, ContractFactory } = require("ethers");
const fs = require('fs');
//Load sercrets.json to read mnumonic private key from JSON key-value pair
var rawdata = fs.readFileSync('secrets.json');
var secrets = JSON.parse(rawdata);

const unpackArtifact = (artifactPath) => {
    let contractData = JSON.parse(fs.readFileSync(artifactPath));
    const contractBytecode = contractData['bytecode'];
    const contractABI = contractData['abi'];
    const constructorArgs = contractABI.filter((itm) => {
        return itm.type == 'constructor';
    });
    let constructorStr;
    if(constructorArgs.length < 1) {
        constructorStr = "    -- No constructor arguments -- ";
    }
    else {
        constructorJSON = constructorArgs[0].inputs;
        constructorStr = JSON.stringify(constructorJSON.map((c) => {
            return {
                name: c.name,
                type: c.type
            };
        }));
    }
    return {
        abi: contractABI,
        bytecode: contractBytecode,
        description:`  ${contractData.contractName}\n    ${constructorStr}`
    };
};

const deployTokenFromSigner = (contractABI, contractBytecode, args = []) => {
    const factory = new ContractFactory(contractABI, contractBytecode);
    let deployTx = factory.getDeployTransaction(...args);
    console.log(deployTx);
};

const deployContract = async (contractABI, contractBytecode, wallet, provider, args = []) => {
    const factory = new ContractFactory(contractABI, contractBytecode, wallet.connect(provider));
    return await factory.deploy(...args);
};

const deployCOREToken = async (mnemonic = secrets.mnemonic, mainnet = false) => {
    // Get the build metadata for our contracts
    let tokenUnpacked = unpackArtifact("./artifacts/CORE.json");
    console.log(tokenUnpacked.description);
    let feeApproverUnpacked = unpackArtifact("./artifacts/FeeApprover.json");

    let provider;
    let wethAddress;
    const uniswapFactoryAddress = "0x5C69bEe701ef814a2B6a3EDD4B1652CB9cc5aA6f";
    const uniswapRouterAddress = "0x7a250d5630b4cf539739df2c5dacb4c659f2488d";
    if(mainnet) {
        provider = ethers.getDefaultProvider("homestead");
        wethAddress = "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2";
    }
    else {
        provider = ethers.getDefaultProvider("kovan");
        wethAddress = "0xd0a1e359811322d97991e03f863a0c30c2cf029c";
    }

    // Do the deployments
    // Create a wallet and connect it to a network
    // First, the token
    // constructor(address router, address factory)
    const tokenArgs = [
        uniswapRouterAddress,
        uniswapFactoryAddress
    ]
    var wallet;
    var connectedWallet;
    if(mnemonic != "") {
        wallet = Wallet.fromMnemonic(mnemonic);
        connectedWallet = wallet.connect(provider);
    } else {
        deployTokenFromSigner(tokenUnpacked.abi, tokenUnpacked.bytecode, provider, tokenArgs);
    }

    // using soft mnemonic
    const token = await deployContract(tokenUnpacked.abi, tokenUnpacked.bytecode, wallet, provider, tokenArgs);
    console.log(`⌛ Deploying token...`);
    await connectedWallet.provider.waitForTransaction(token.deployTransaction.hash);
    console.log(`✅ Deployed token to ${token.address}`); //Deployed token to 0xD7FD748ba4762db93F3766c3be7f798313822a71, 0xdc5Abf2AAD85427E71C291bded7423931d342162
    
    //Uniswap paid already created in token constructor?
    //console.log(`⌛ calling createUniswapPairMainnet...`);
    //let tx = await token.createUniswapPairMainnet(); 
    //console.log(`⌛ createUniswapPairMainnet...`);
    //await connectedWallet.provider.waitForTransaction(tx.hash);
    //console.log(`✅ Called createUniswapPairMainnet() on token at ${token.address}`);

    const feeApproverArgs = [
        token.address,
        wethAddress,
        uniswapFactoryAddress
    ];

    // Now, the fee approver contract //no constructor, uses initialize (oz initiliazer) for feeApproverArgs
    const feeApprover = await deployContract(feeApproverUnpacked.abi, feeApproverUnpacked.bytecode, wallet, provider, feeApproverArgs);
    console.log(`⌛ Deploying feeApprover...`);
    await connectedWallet.provider.waitForTransaction(feeApprover.deployTransaction.hash);
    console.log(`✅ Deployed feeApprover.`);
    // Now update the token to refer to the fee approver
    let setTransferCheckerResult = await token.setShouldTransferChecker(feeApprover.address);
    console.log(`⌛ setShouldTransferChecker...`);
    await connectedWallet.provider.waitForTransaction(setTransferCheckerResult.hash);
    console.log(`✅ Called setShouldTransferChecker(${feeApprover.address} on token at ${token.address}`);
    let setFeeBearerResult = await token.setFeeBearer(wallet.address);
    console.log(`⌛ setFeeBearer...`);
    await connectedWallet.provider.waitForTransaction(setFeeBearerResult.hash);
    console.log(`✅ Called setFeeBearer(${wallet.address} on token at ${token.address})`);

    console.log(setTransferCheckerResult);
    console.log(setFeeBearerResult);
    console.log("All done!");
};

function deployCoreVault(){
    let coreVaultUnpacked = unpackArtifact("./artifacts/FeeApprover.json");
    console.log("coreVaultUnpacked: " + coreVaultUnpacked);
}

deployCOREToken();
//deployCoreVault();



//My spam
/* const abi = unpackArtifact("./artifacts/CORE.json").abi;
const address = "0xD7FD748ba4762db93F3766c3be7f798313822a71";
const provider = ethers.getDefaultProvider("kovan");

wallet = Wallet.fromMnemonic(secrets.mnemonic);
connectedWallet = wallet.connect(provider);

const token = new ethers.Contract(address, abi, connectedWallet);
token.name().then(console.log);


const feeApproverArgs = [
    token.address,
    wethAddress,
    uniswapFactoryAddress
];

const feeApprover = deployContract(feeApproverUnpacked.abi, feeApproverUnpacked.bytecode, wallet, provider, feeApproverArgs); */
/* 
const getContractDeployTx = (contractABI, contractBytecode, wallet, provider, args = []) => {
    const factory = new ContractFactory(contractABI, contractBytecode, wallet.connect(provider))
    let txRequest = factory.getDeployTransaction(...args)
    return txRequest
}

 */
