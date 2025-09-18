// --- WagyDog Swap Interface Functionality ---

document.addEventListener('DOMContentLoaded', () => {
    
    // --- UI ELEMENTS ---
    const fromAmountInput   = document.getElementById('from-amount');
    const toAmountInput     = document.getElementById('to-amount');
    const fromTokenSelect   = document.getElementById('from-token-select');
    const toTokenSelect     = document.getElementById('to-token-select');
    const swapDirectionBtn  = document.getElementById('swap-direction-btn');
    const swapActionButton  = document.getElementById('swap-action-btn');

    
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
        if (!buttonElement) return;

        buttonElement.querySelector('.token-logo').src  = token.logo;
        buttonElement.querySelector('.token-logo').alt  = token.name;
        buttonElement.querySelector('.token-name').textContent = token.name;
    };


    const handleSwapDirection = () => {
        [fromToken, toToken] = [toToken, fromToken];

        if (fromAmountInput && toAmountInput) {
            [fromAmountInput.value, toAmountInput.value] = [
                toAmountInput.value, 
                fromAmountInput.value
            ];
        }

        updateTokenDisplay(fromTokenSelect, fromToken);
        updateTokenDisplay(toTokenSelect, toToken);
    };


    const handleAmountChange = (e) => {
        const inputAmount = parseFloat(e.target.value);

        if (isNaN(inputAmount) || inputAmount <= 0) {
            if (toAmountInput) toAmountInput.value = '';

            if (e.target.id === 'to-amount' && fromAmountInput) {
                fromAmountInput.value = '';
            }

            return;
        }

        if (e.target.id === 'from-amount') {
            if (toAmountInput) {
                toAmountInput.value = (inputAmount * 1500000).toString();
            }
        } else {
            if (fromAmountInput) {
                fromAmountInput.value = (inputAmount / 1500000).toString();
            }
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
        swapActionButton.addEventListener('click', () => {
            if (swapActionButton.textContent.trim() === "Swap") {
                alert("Swap functionality will be implemented soon!");
            } else {
                const mainConnectButton = document.getElementById('header-connect-btn');
                if (mainConnectButton) mainConnectButton.click();
            }
        });
    }

});
