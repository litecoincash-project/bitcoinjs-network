var bitcoin = require('bitcoinjs-lib');

function GetKeyPair() {
	var litecoincash = {
                messagePrefix: '\x19Litecoin Signed Message:\n',
                bip32: {
                        public: 0x019da462,
                        private: 0x019d9cfe
                },
                pubKeyHash: 28,
                scriptHash: 5,
                wif: 176
        };

	var keyPair = bitcoin.ECPair.makeRandom({network:litecoincash});
	var address = keyPair.getAddress();	
	var publicKeyHash = bitcoin.crypto.hash160(keyPair.getPublicKeyBuffer());
	document.writeln("<strong>pubKeyHash: " + publicKeyHash.toString('hex') + "</strong><br>");
	document.writeln("privKey: " + keyPair.toWIF() + "<br>");
	document.writeln("address: " + address + "<br>");
}

module.exports = {
	GetKeyPair
}
