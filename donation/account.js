async function main() {
	// Generate ECDSA key pair
	console.log("- Generating a new key pair... \n");
	const newPrivateKey = PrivateKey.generateECDSA();
	const newPublicKey = newPrivateKey.publicKey;
	const newAliasAccountId = newPublicKey.toAccountId(0, 0);

	console.log(`- New account alias: ${newAliasAccountId} \n`);
	console.log(`- New private key (Hedera): ${newPrivateKey} \n`);
	console.log(`- New public key (Hedera): ${newPublicKey} \n`);
	console.log(`- New private key (RAW EVM): 0x${newPrivateKey.toStringRaw()} \n`);
	console.log(`- New public key (RAW): 0x${newPublicKey.toStringRaw()} \n`);
	console.log(`- New public key (EVM): 0x${newPublicKey.toEthereumAddress()} \n\n`);

	// Transfer HBAR to newAliasAccountId to auto-create the new account
	// Get account information from a transaction record query
	const [txReceipt, txRecQuery] = await autoCreateAccountFcn(operatorId, newAliasAccountId, 100);
	console.log(`- HBAR Transfer to new account: ${txReceipt.status} \n\n`);
	console.log(`- Parent transaction ID: ${txRecQuery.transactionId} \n`);
	console.log(`- Child transaction ID: ${txRecQuery.children[0].transactionId.toString()} \n`);
	console.log(
		`- New account ID (from RECORD query): ${txRecQuery.children[0].receipt.accountId.toString()} \n`
	);

	// Get account information from a mirror node query
	const mirrorQueryResult = await mirrorQueryFcn(newPublicKey);
	console.log(
		`- New account ID (from MIRROR query): ${mirrorQueryResult.data?.accounts[0].account} \n`
	);
}