// --- WagyDog Swap Interface Functionality ---
document.addEventListener('DOMContentLoaded', () => {
    // --- UI ELEMENTS ---
    const fromAmountInput = document.getElementById('from-amount');
    const toAmountInput = document.getElementById('to-amount');
    const fromTokenSelect = document.getElementById('from-token-select');
    const toTokenSelect = document.getElementById('to-token-select');
    const swapDirectionBtn = document.getElementById('swap-direction-btn');
    const swapActionButton = document.getElementById('swap-action-btn');

    // --- STATE & CONFIG ---
    let fromToken = { name: 'BNB', logo: 'https://s2.coinmarketcap.com/static/img/coins/64x64/1839.png', address: '0x0000000000000000000000000000000000000000' }; // Using zero address for native BNB
    let toToken = { name: 'WAGY', logo: 'wagydog-logo.jpg', address: 'YOUR_WAGY_TOKEN_CONTRACT_ADDRESS' }; // IMPORTANT: Replace with your WAGY token address
    
    // NOTE: In a real dApp, this rate would be fetched from a DEX router contract (e.g., PancakeSwap)
    const BNB_TO_WAGY_RATE = 1500000;

    // --- CORE SWAP LOGIC ---

    const performSwap = async () => {
        // 1. Get wallet connection state from our global script.js
        const { signer, address } = window.wagyDog.getWalletState();

        if (!signer) {
            alert('Please connect your wallet to perform a swap.');
            return;
        }

        const fromAmount = fromAmountInput.value;
        if (!fromAmount || parseFloat(fromAmount) <= 0) {
            alert('Please enter a valid amount to swap.');
            return;
        }

        // 2. This is where you would interact with a DEX Router contract
        alert("This is a simulation. The actual swap transaction is not yet implemented.");
        console.log(`--- SWAP SIMULATION ---`);
        console.log(`User: ${address}`);
        console.log(`Swapping: ${fromAmount} ${fromToken.name} for ${toAmountInput.value} ${toToken.name}`);
        console.log(`-----------------------`);

        /*
        // EXAMPLE of what a real transaction might look like using a DEX Router
        
        const routerAddress = '0x10ED43C718714eb63d5aA57B78B54704E256024E'; // PancakeSwap Router v2
        const routerAbi = [ ... ABI for swapExactETHForTokens ... ];
        const routerContract = new ethers.Contract(routerAddress, routerAbi, signer);

        try {
            const amountIn = ethers.utils.parseEther(fromAmount);
            const tx = await routerContract.swapExactETHForTokens(
                0, // amountOutMin: for demonstration, in reality calculate slippage
                [fromToken.address, toToken.address], // Path: BNB -> WAGY
                address, // Recipient
                Date.now() + 1000 * 60 * 10 // Deadline
                { value: amountIn }
            );
            
            console.log('Swap transaction sent:', tx.hash);
            await tx.wait();
            alert('Swap successful!');

        } catch (error) {
            console.error("Swap failed:", error);
            alert("Swap failed. Check the console for details.");
        }
        */
    };


    // --- UI FUNCTIONS ---
    const updateTokenDisplay = (buttonElement, token) => {
        if (!buttonElement) return;
        buttonElement.querySelector('.token-logo').src = token.logo;
        buttonElement.querySelector('.token-logo').alt = token.name;
        buttonElement.querySelector('.token-name').textContent = token.name;
    };

    const handleSwapDirection = () => {
        [fromToken, toToken] = [toToken, fromToken];
        [fromAmountInput.value, toAmountInput.value] = [toAmountInput.value, fromAmountInput.value];
        updateTokenDisplay(fromTokenSelect, fromToken);
        updateTokenDisplay(toTokenSelect, toToken);
    };

    const handleAmountChange = (e) => {
        const inputAmount = parseFloat(e.target.value);
        if (isNaN(inputAmount) || inputAmount <= 0) {
            toAmountInput.value = '';
            if (e.target.id === 'to-amount') fromAmountInput.value = '';
            return;
        }

        // Determine which direction we are calculating
        const isFromInput = e.target.id === 'from-amount';
        const rate = (fromToken.name === 'BNB') ? BNB_TO_WAGY_RATE : 1 / BNB_TO_WAGY_RATE;

        if (isFromInput) {
            toAmountInput.value = (inputAmount * rate).toString();
        } else {
            fromAmountInput.value = (inputAmount / rate).toString();
        }
    };

    // --- EVENT LISTENERS ---
    if (swapDirectionBtn) swapDirectionBtn.addEventListener('click', handleSwapDirection);
    if (fromAmountInput) fromAmountInput.addEventListener('input', handleAmountChange);
    if (toAmountInput) toAmountInput.addEventListener('input', handleAmountChange);

    if (swapActionButton) {
        swapActionButton.addEventListener('click', () => {
            // The global script.js handles the click if it says "Connect Wallet".
            // We only need to handle the "Swap" action here.
            if (swapActionButton.textContent.trim() === "Swap") {
                performSwap();
            }
        });
    }

    // Initialize token displays on page load
    updateTokenDisplay(fromTokenSelect, fromToken);
    updateTokenDisplay(toTokenSelect, toToken);
});
