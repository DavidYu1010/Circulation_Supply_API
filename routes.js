const Web3 = require('web3');
var web3 = new Web3(new Web3.providers.HttpProvider('https://mainnet.infura.io/v3/b8a10907bdda41c6ac713b5efc0257ee'));
const token_ABI = [{"inputs":[{"internalType":"address","name":"_owner","type":"address"}],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"_owner","type":"address"},{"indexed":true,"internalType":"address","name":"_spender","type":"address"},{"indexed":false,"internalType":"uint256","name":"_value","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"_from","type":"address"},{"indexed":true,"internalType":"address","name":"_to","type":"address"},{"indexed":false,"internalType":"uint256","name":"_value","type":"uint256"}],"name":"Transfer","type":"event"},{"inputs":[],"name":"acceptOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_owner","type":"address"},{"internalType":"address","name":"_spender","type":"address"}],"name":"allowance","outputs":[{"internalType":"uint256","name":"remaining","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_spender","type":"address"},{"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"approve","outputs":[{"internalType":"bool","name":"success","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_owner","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"balance","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address payable","name":"_newOwner","type":"address"}],"name":"changeOwner","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"decimals","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"maxSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_to","type":"address"},{"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"transfer","outputs":[{"internalType":"bool","name":"success","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_from","type":"address"},{"internalType":"address","name":"_to","type":"address"},{"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"transferFrom","outputs":[{"internalType":"bool","name":"success","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"stateMutability":"payable","type":"receive"}];
const token_address = '0x9ea1ae46c15a4164b74463bc26f8aa3b0eea2e6e';
const tokenContract = new web3.eth.Contract(token_ABI, token_address);

let total_wallet_supply = 0;

const express = require("express");
const route = express.Router();
module.exports = route.get("/getCirculatingSupply", async (req, res) => {
    const totalSupply = await tokenContract.methods.totalSupply().call();

    var wallet_address_list = [
        '0x4C19A81E353010283d080abafcca681a548652CB',// 1-Masternodes/Staking
        '0x108DE579b936b70D76E1283A7c90eC6813846338',// 2-Treasury
        '0xFf5a9d60698F1c9C088B5B1c66011497ee39A961',// 3-Team/Advisors/Contractors
        '0x88C0E4b2F66ADbeF5Ea2AFBF47907D268D587540',// 4-Treasury
        // '0xa2ffe0168b2772c5c399be346ef6601d83869af2',// 5-Liquidity provisioning
        // '0x009e31576f9bc3ff0adc7449b0f57b35d8f768cc',// 6-Team/Advisors/Contractors
        '0x466e269CBD49D41c5e8d7DF0Fccb7c8c2E1a44FB',// 7-Airdrops/Bounty
        '0xD9F3ABb0E6b8dEf69C1CCdb11D87A07d24E58460',// 8-Treasury
        '0x2284bF48ED48ee52839E96CD5f211003AA26B769',// 9-Treasury
        '0xcf9177e7bbd56b990ff644bf49eb758b75485b37',// 10-Public/ICO investor
        '0xd965952823153e5cbc611be87e8322cfc329f056',// 11-Public/ICO investor
        '0x74809682c8aeaf56ebb6384e86a5a6fc972e72df',// 12-Public/ICO investor
        '0x97b4a2ec50036453d8a00424feb4613e8bc46775',// 13-Public/ICO investor
        '0x8a12d19d19c5031a65af4612455803367eb463c9',// 14-Private Sale investor
        '0xab728155a78b640108db19a8998f6d3d5dd2c3ba',// 15-Public/ICO investor
        '0xcda52838ef354ac7166bec9a7f631bcea34d1001',// 16-Public/ICO investor
        '0x94fbcea275cafda22404d188e501a0cf28a450dc',// 17-Public/ICO investor
        '0x5240a94ea9c219e2a6fe62733559c76e8c24f498',// 18-Private Sale investor
        '0xa9adda56845662af63a16a02afe2512e0babe4f0',// 19-Public/ICO investor
        '0x8e2e08164017092da0670d700be2eb8e712229d7' // 20-Private Sale investor
    ];
    
    for (let address_index = 0; address_index < wallet_address_list.length; address_index++) {
        const address_item = wallet_address_list[address_index];
        let walletSupply = 0
        try {
            walletSupply = await tokenContract.methods.balanceOf(address_item).call();
        } catch (error) {
            walletSupply = 0;
        }
        total_wallet_supply += Number(walletSupply);
    }
    const circulatingSupply = Number(totalSupply) - total_wallet_supply
    const result = circulatingSupply/Math.pow(10, 18)
    res.send(result.toString())
})
