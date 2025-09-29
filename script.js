// --- General Website Functionality ---
document.addEventListener('DOMContentLoaded', () => {
    // ... (all the previous UI and animation code from the last step is here) ...
    // ... (mobile menu, scroll-in, starfield functions are unchanged) ...

    // ---  Wallet Connection Logic ---

    // 1. Web3Modal Configuration
    const web3Modal = new window.Web3Modal.Standalone({
        projectId: 'F177ccc83d51024d30957d2135be7ac0', // Using the Project ID from your marketplace file
        walletConnectVersion: 2,
        chains: [97], // Using BSC Testnet chainId: 97
    });

    // Share state with other scripts
    window.wagyDog = { // NEW: Create a global object for our app
        provider: null,
        signer: null,
        address: null,
        getWalletState: function() {
            return {
                provider: this.provider,
                signer: this.signer,
                address: this.address
            };
        }
    };

    // 2. Function to Update UI based on connection state
    function updateUi(address) {
        const allConnectButtons = document.querySelectorAll('#header-connect-btn, #mobile-connect-btn, #dashboard-connect-btn, #swap-action-btn');
        const connectedInfo = document.getElementById('wallet-connected-info');
        const walletAddressSpan = document.getElementById('wallet-address');
        const disconnectBtn = document.getElementById('disconnect-btn');
        const mintBtn = document.getElementById('mint-nft-btn');
        const connectionPrompt = document.getElementById('wallet-connection-info');
        const swapActionButton = document.getElementById('swap-action-btn');

        if (address) {
            // Connected State
            const shortAddress = `${address.substring(0, 6)}...${address.substring(address.length - 4)}`;
            allConnectButtons.forEach(btn => btn.textContent = shortAddress);
            if (swapActionButton) swapActionButton.textContent = 'Swap';
            if (walletAddressSpan) walletAddressSpan.textContent = shortAddress;
            if (connectedInfo) connectedInfo.classList.remove('hidden');
            if (disconnectBtn) disconnectBtn.classList.remove('hidden');
            if (connectionPrompt) connectionPrompt.classList.add('hidden');
            if (mintBtn) mintBtn.disabled = false;
        } else {
            // Disconnected State
            allConnectButtons.forEach(btn => btn.textContent = 'Connect Wallet');
            if (swapActionButton) swapActionButton.textContent = 'Connect Wallet';
            if (connectedInfo) connectedInfo.classList.add('hidden');
            if (disconnectBtn) disconnectBtn.classList.add('hidden');
            if (connectionPrompt) connectionPrompt.classList.remove('hidden');
            if (mintBtn) mintBtn.disabled = true;
        }
    }


    // 3. Main Connect Function
    async function connectWallet() {
        try {
            const provider = await web3Modal.connect();
            window.wagyDog.provider = new ethers.providers.Web3Provider(provider); // UPDATED
            window.wagyDog.signer = window.wagyDog.provider.getSigner(); // UPDATED
            window.wagyDog.address = await window.wagyDog.signer.getAddress(); // UPDATED

            console.log("Wallet connected:", window.wagyDog.address);
            updateUi(window.wagyDog.address);

            // Event listeners for changes
            provider.on("accountsChanged", (accounts) => {
                if (accounts.length > 0) {
                    connectWallet();
                } else {
                    disconnectWallet();
                }
            });
            provider.on("chainChanged", () => window.location.reload());

        } catch (error) {
            console.error("Could not connect to wallet:", error);
            disconnectWallet(); // Ensure UI is reset on connection failure/rejection
        }
    }

    // 4. Disconnect Function
    function disconnectWallet() {
        // Disconnect logic is handled by Web3Modal, we just clear our state
        window.wagyDog.provider = null; // UPDATED
        window.wagyDog.signer = null; // UPDATED
        window.wagyDog.address = null; // UPDATED
        console.log("Wallet disconnected.");
        updateUi(null);
    }

    // 5. Add Event Listeners to ALL connect/disconnect buttons
    document.querySelectorAll('#header-connect-btn, #mobile-connect-btn, #dashboard-connect-btn, #swap-action-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            if (btn.textContent.includes('Connect Wallet')) {
                connectWallet();
            }
        });
    });

    const disconnectBtn = document.getElementById('disconnect-btn');
    if (disconnectBtn) {
        disconnectBtn.addEventListener('click', disconnectWallet);
    }
});
