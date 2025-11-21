// Comprehensive test simulating the full mint flow
import { VersionedTransaction, Keypair } from '@solana/web3.js';
import { createUmi } from '@metaplex-foundation/umi-bundle-defaults';
import { keypairIdentity, signerIdentity } from '@metaplex-foundation/umi';
import { fromWeb3JsKeypair, toWeb3JsTransaction } from '@metaplex-foundation/umi-web3js-adapters';

const testFullMintFlow = async () => {
    const API_URL = 'https://localhost:3000/mint';

    // Create a test keypair (simulating user's wallet)
    const userKeypair = Keypair.generate();
    console.log('🔑 Test user wallet:', userKeypair.publicKey.toString());

    const testData = {
        uri: 'https://arweave.net/test-metadata-uri',
        name: 'Test NFT',
        owner: userKeypair.publicKey.toString()
    };

    console.log('\n🧪 Step 1: Calling backend to build transaction...');

    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(testData),
        });

        if (!response.ok) {
            const errorText = await response.text();
            console.error('❌ Backend error:', errorText);
            return;
        }

        const data = await response.json();
        console.log('✅ Backend returned transaction');
        console.log('   Mint address:', data.mint);

        // Deserialize using web3.js
        console.log('\n🧪 Step 2: Deserializing transaction...');
        const txBuffer = Buffer.from(data.transaction, 'base64');
        const tx = VersionedTransaction.deserialize(new Uint8Array(txBuffer));

        console.log('   Signatures before user signs:', tx.signatures.length);
        tx.signatures.forEach((sig, i) => {
            const isEmpty = sig.every(byte => byte === 0);
            console.log(`   - Sig ${i}:`, isEmpty ? 'EMPTY' : 'SIGNED');
        });

        // Sign with user's wallet using web3.js
        console.log('\n🧪 Step 3: Signing with user wallet (web3.js)...');
        tx.sign([userKeypair]);

        console.log('   Signatures after user signs:', tx.signatures.length);
        tx.signatures.forEach((sig, i) => {
            const isEmpty = sig.every(byte => byte === 0);
            console.log(`   - Sig ${i}:`, isEmpty ? 'EMPTY' : 'SIGNED');
        });

        const allSigned = tx.signatures.every(sig => !sig.every(byte => byte === 0));

        if (allSigned) {
            console.log('\n✅ SUCCESS! All signatures present.');
            console.log('   Transaction is ready to be sent to the network.');
            console.log('\n💡 Solution: Use @solana/web3.js for signing partially-signed transactions');
        } else {
            console.log('\n❌ FAILED! Some signatures still missing.');
        }

    } catch (error) {
        console.error('\n❌ Test failed:', error.message);
        console.error(error.stack);
    }
};

testFullMintFlow();
