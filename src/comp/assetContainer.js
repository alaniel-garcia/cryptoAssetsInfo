import './assetContainer.scss';
import {getAssetData} from '../utils/API.js';
import {showAssetExistsMessage} from './search';

//Dom Elements
const assetContainer = document.createElement('div');

   //dom elements id/classes asignment
    assetContainer.id = 'asset-container';

async function generateCurrencyCard (asset) {
    const assetExists = !!document.getElementById(asset + '-card');
    if(!assetExists){
        const currentAsset = await getAssetData(asset);
        const currentAssetIconSrc = currentAsset.image.small;

        //current asset info
        const assetName = currentAsset.name;
        const assetPrice = currentAsset.market_data.current_price.usd;
        const assetSymbol = currentAsset.symbol;
        const assetRank = currentAsset.market_cap_rank;

        //elements creation
        const assetCardContainer = document.createElement('div');
        const assetCardVisual = document.createElement('div');
            const assetCardIcon = document.createElement('div');
            const assetCardName = document.createElement('div');
        const assetCardInfoContainer = document.createElement('div');
            const assetCardPrice = document.createElement('div');
            const assetCardSymbol = document.createElement('div');
            const assetCardRank = document.createElement('div');
        const removeButton = document.createElement('div');

        
        //id for card
        assetCardContainer.id = asset + '-card';
        //classes assignment
        assetCardContainer.className = 'asset-card-container';
        assetCardVisual.className = 'asset-card-visual';
        assetCardIcon.className = 'asset-card-icon';
        assetCardInfoContainer.className = 'asset-card-info-container';
        assetCardPrice.className = 'asset-card-price';
        assetCardName.className = 'asset-card-name';
        assetCardSymbol.className = 'asset-card-symbol';
        assetCardRank.className = 'asset-card-rank';
        removeButton.className = 'remove-button';

        //currency card's structure building
        assetContainer.insertBefore(assetCardContainer,assetContainer.firstChild); //every time a new asset card is added, it is placed at top
        assetCardContainer.append(assetCardVisual, assetCardInfoContainer);
        assetCardVisual.append(assetCardIcon, assetCardName);
        assetCardInfoContainer.append(
            assetCardPrice,
            assetCardSymbol,
            assetCardRank,
            removeButton
        );

        //content assignment
        assetCardIcon.style.backgroundImage = `url(${currentAssetIconSrc})`;
        assetCardName.innerHTML = `<b>${assetName}</b>`;
        assetCardPrice.innerHTML = `
            <b>Price</b>
            <div>$${assetPrice}<br>USD</div>
        `;
        assetCardSymbol.innerHTML = `
            <b>Symbol</b>
            <div>${assetSymbol.toUpperCase()}</div>
        `;
        assetCardRank.innerHTML = `
            <b>Rank</b>
            <div>${assetRank}</div>
        `;
        removeButton.innerHTML = `
            <span class="material-symbols-outlined">
                close
            </span>
        `;
        removeButton.addEventListener('click',(event) =>{
            removeAsset(asset)
        })
    }
    else {
        showAssetExistsMessage(asset); 
    }
}

function removeAsset (assetId) {
    const assetToRemove = document.getElementById(assetId + '-card')
    assetToRemove.remove()
}

export {
    assetContainer,
    generateCurrencyCard
}