usePlugin("@nomiclabs/buidler-truffle5");
usePlugin('buidler-log-remover');

module.exports = {
  solc: {
    version: "0.6.8",
  },
  networks: {
    buidlerevm: {
      allowUnlimitedContractSize: true,
      settings: {
        optimizer: {
          enabled: true,
          runs: 200
        },
        evmVersion: "istanbul" //byzantium, constantinople
       }
    },
  }
};
