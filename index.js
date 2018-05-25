var bitcoin = require('bitcoinjs-lib');

function GetKeyPair() {
	var litecoincash = {
                messagePrefix: '\x19Litecoin Signed Message:\n',
                bech32: 'lcc',
                bip32: {
                        public: 0x019da462,
                        private: 0x019d9cfe
                },
                pubKeyHash: 28,
                scriptHash: 50,	// 50 for correct p2sh, 5 for correct scripthash (bitcoinJS doesn't support SCRIPT_ADDRESS2)
                wif: 176
        };

	var keyPair = bitcoin.ECPair.makeRandom({network:litecoincash});
	var address = keyPair.getAddress();	
	var pubKey = keyPair.getPublicKeyBuffer();
	
	var publicKeyHash = bitcoin.crypto.hash160(pubKey);
	
	document.writeln("<strong>privKey: " + keyPair.toWIF() + "</strong><br><br>");
	document.writeln("pubKeyHash: " + publicKeyHash.toString('hex') + "<br>");
	document.writeln("Legacy address: " + address + "<br><br>");	
	
	var redeemScript = bitcoin.script.witnessPubKeyHash.output.encode(bitcoin.crypto.hash160(pubKey));
	var scriptPubKey = bitcoin.script.scriptHash.output.encode(bitcoin.crypto.hash160(redeemScript));
	
	address = bitcoin.address.fromOutputScript(scriptPubKey, litecoincash);
	document.writeln("P2SH address: " + address + "<br>");
	
	var address = bitcoin.address.fromOutputScript(redeemScript, litecoincash)
	document.writeln("Bech32 address: " + address + "<br>");
}

module.exports = {
	GetKeyPair
}
