// --- WagyDog Swap Interface Functionality ---

document.addEventListener('DOMContentLoaded', () => {
    // --- UI ELEMENTS ---
    const fromAmountInput = document.getElementById('from-amount');
    const toAmountInput = document.getElementById('to-amount');
    const fromTokenSelect = document.getElementById('from-token-select');
    const toTokenSelect = document.getElementById('to-token-select');
    const swapDirectionBtn = document.getElementById('swap-direction-btn');
    const swapActionButton = document.getElementById('swap-action-btn');

    // --- STATE VARIABLES ---
    let fromToken = {
        name: 'BNB',
        logo: 'https://s2.coinmarketcap.com/static/img/coins/64x64/1839.png'
    };
    
    let toToken = {
        name: 'WAGY',
        logo: 'wagydog-logo.jpg'
    };

    // --- FUNCTIONS ---
    const updateTokenDisplay = (buttonElement, token) => {
        buttonElement.querySelector('.token-logo').src = token.logo;
        buttonElement.querySelector('.token-logo').alt = token.name;
        buttonElement.querySelector('.token-name').textContent = token.name;
    };

    const handleSwapDirection = () => {
        [fromToken, toToken] = [toToken, fromToken];
        [fromAmountInput.value, toAmountInput.value] = [toAmountInput.value, fromAmountInput.value];
        updateTokenDisplay(fromTokenSelect, fromToken);
        updateTokenDisplay(toTokenSelect, toToken);
        console.log(`Swapped direction. From: ${fromToken.name}, To: ${toToken.name}`);
    };

    const handleAmountChange = (e) => {
        const inputAmount = parseFloat(e.target.value);
        if (isNaN(inputAmount)) {
             toAmountInput.value = '';
             fromAmountInput.value = '';
             return;
        }

        if (e.target.id === 'from-amount') {
            toAmountInput.value = (inputAmount * 1500000).toString();
        } else {
            fromAmountInput.value = (inputAmount / 1500000).toString();
        }
    };
    
    // --- EVENT LISTENERS ---
    if (swapDirectionBtn) {
        swapDirectionBtn.addEventListener('click', handleSwapDirection);
    }
    
    if (fromAmountInput) {
        fromAmountInput.addEventListener('input', handleAmountChange);
    }

    if (toAmountInput) {
        toAmountInput.addEventListener('input', handleAmountChange);
    }

    if (swapActionButton) {
        // This button's text is changed by marketplace.js upon wallet connection
        swapActionButton.addEventListener('click', () => {
            if(swapActionButton.textContent === "Swap"){
                alert("Swap functionality is not yet implemented.");
                console.log("Perform swap action...");
            } else {
                // If wallet is not connected, this will trigger the connectWallet function in marketplace.js
                // by simulating a click on the header button.
                document.getElementById('header-connect-btn').click();
            }
        });
    }
});
