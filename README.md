# Introducing CORE

CORE is a *non-inflationary* *cryptocurrency* that is designed to execute profit-generating strategies autonomously with a completely decentralized approach. In existing autonomous strategy-executing platforms a team or single developer is solely responsible for determining how locked funds are used to generate ROI. This is hazardous to the health of the fund as it grows, as it creates flawed incentives, and invites mistakes to be made. CORE does away with this dynamic and instead opts for one with decentralized governance.

CORE tokens holders will be able to provide strategy contracts and vote on what goes live and when, in order to decentralize autonomous strategy execution. 5% of all profits generated from these strategies are used to auto market-buy the CORE token.

## Live Contracts

CORE Contracts:
 - [CORE Token - 0x62359ed7505efc61ff1d56fef82158ccaffa23d7](https://etherscan.io/address/0x62359ed7505efc61ff1d56fef82158ccaffa23d7)
 - [CoreVault (Proxied) - 0xc5cacb708425961594b63ec171f4df27a9c0d8c9](https://etherscan.io/address/0xc5cacb708425961594b63ec171f4df27a9c0d8c9)
 
 Governance Contracts:
 - [CoreVault Original Implementation - 0xd0ea2a4771e7ce09f2cc02d69ebf9d41a85cf161](https://etherscan.io/address/0xd0ea2a4771e7ce09f2cc02d69ebf9d41a85cf161)
 - [Fee Approver - 0x1d0db0a5f9f8cf5b69f804d556176c6bc9186587](https://etherscan.io/address/0x1d0db0a5f9f8cf5b69f804d556176c6bc9186587)
 - [Team Proxy Admin - 0x9cb1eeccd165090a4a091209e8c3a353954b1f0f](https://etherscan.io/address/0x9cb1eeccd165090a4a091209e8c3a353954b1f0f)

Ecosystem Contracts:
 - [Uniswap CORE/WETH UNI-V2 LP Token Contract](https://etherscan.io/address/0x32ce7e48debdccbfe0cd037cc89526e4382cb81b)


# Initial Distribution

The CORE team is kickstarting the initial distribution with a liquidity event. Contribute ETH to the CORE Fair Launch smart contract to receive tokens, and the contributed ETH will be matched and added to the Uniswap liquidity pool. Note that once added, liquidity tokens can not be removed from the CORE Uniswap LP pools. This is by design. Read on to learn about why..

# **Deflationary Farming**

Farming tokens have a problem for their owners. To keep users farming, they have to mint more ever more coins. This completely destroys the value of the underlying token, due to excessive inflation. It's easy to find examples of this across the DeFi ecosystem. 

Our solution is called deflationary farming, and it is quite simple in only two steps:

1. Charge a fee on token transfers
2. Users can earn the fee by farming

This simple process means that those holding tokens are able to farm without infinite inflation.

# Keeping **Liquidity Liquid**

All transfers have to be approved by the CORE Transfers smart contract, which will block all
liquidity withdrawals from Uniswap. This will guarantee a stable market, giving holders and farmers skin in the game.

# **Real Governance**

CORE is designed for great community governance. The communtiy decides everything, from developer fees, to deciding on the fee approver contract, adding new pools, rebalancing, and even disabling pools in the CORE Transfer contract.

If the holders decide COREVault should have a YFI pool, we can set
the ratio of fees it will be able to distribute, as well as when people should be
able to withdraw YFI tokens from it.

This creates an incentive to hold even more CORE by the holders of YFI tokens. Let the governance begin.

# **10000 CORE Forever**

Theres absolutely no way to create new CORE tokens. This means the
circulating supply can only ever go down, period.


## Testing 

To run the tests run
``` npx buidler test ```


## My Notes
FeeGenerator.sol, GovernorAlpha.sol, WETH9.sol are not in flattened contracts. Are they used?

Looks like Encore deployed GovernorAlpha.sol and WETH9.sol, but CORE did not.

