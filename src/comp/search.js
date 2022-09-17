import './search.scss';
import {getAssetData} from '../utils/API.js';
import {generateCurrencyCard} from './assetContainer';

let assetsList;

//Local storage (for handle a more opimized asset search)
const storage = window.localStorage;

//Dom Elements
const assetSearch = document.createElement('div');
const dropdownMenu = document.createElement('ul');
const searchInputText = document.createElement('input')
const assetExistsMessage = document.createElement('div');

   //dom elements id/classes asignment
    assetSearch.id = 'asset-search';
    dropdownMenu.id = 'asset-search-list';
    dropdownMenu.className = 'dropdown-menu';
    assetExistsMessage.id = 'asset-exists-message';


    //dom elements structure asignments
    assetSearch.append(searchInputText, assetExistsMessage);

    //dom elements other
    searchInputText.type = 'text';
    searchInputText.addEventListener('input', handleSearchChange);
    searchInputText.addEventListener('click', handleSearchChange);
    searchInputText.placeholder = 'Search';


function showAssetExistsMessage (asset) {
    assetExistsMessage.innerText = `added previously.`;
    assetExistsMessage.style = 'display: flex', 'align-items: center';
    assetExistsMessage.style.left = `${assetSearch.offsetWidth + 16}px`
    assetExistsMessage.style.top = `0`
    assetExistsMessage.className = 'unhide-asset-exists-message';
    setTimeout(() => {
        assetExistsMessage.style.display = 'none';
    }, 2500);
}

function generateDropdownMenu (assetOptions) {
    if(searchInputText === document.activeElement && searchInputText.value.length > 0){
        document.addEventListener('click',handleOutsideClkSearchEl)

        const dropdownFragment = document.createDocumentFragment();
        dropdownMenu.style.display = 'block';
        dropdownMenu.innerHTML = '';

        for(let asset of assetOptions){
            const assetOption = document.createElement('li');
            assetOption.id = asset.id;
            assetOption.className = 'asset-option';
            assetOption.textContent = asset.id;
            assetOption.addEventListener('click', () => {
                generateCurrencyCard(asset.id)
                dropdownMenu.style.display = 'none';
                searchInputText.value = '';
                dropdownMenu.innerHTML = '';
                resetStoragedSearchAssets();
                document.removeEventListener('click',handleOutsideClkSearchEl)
            });
            dropdownMenu.append(assetOption)
        }

        dropdownFragment.appendChild(dropdownMenu);
        assetSearch.appendChild(dropdownFragment)
    }
    else {
        dropdownMenu.innerHTML = '';
        document.removeEventListener('click',handleOutsideClkSearchEl)
    }
}


function filterSearchResults(value, valueLength, assetsToFilter = []){

    const searchResults = assetsToFilter.filter( asset => {
        const assetFirstNCharacters = asset.id.slice(0, valueLength)
        return value === assetFirstNCharacters
    })

    return searchResults
}

function storageNewSearchAssets(index, newSearchAssets = []) {
    const storageCurrentSearchAssets = JSON.parse(storage.getItem('searchAssets'));
    let searchAssetsToStorage = [...storageCurrentSearchAssets];
    searchAssetsToStorage[index] = newSearchAssets

    storage.setItem('searchAssets', JSON.stringify(searchAssetsToStorage));
}

function resetStoragedSearchAssets() {
    storage.setItem('searchAssets', JSON.stringify([[...assetsList]]));
}

function handleSearchChange (event,) {
    const searchValue = event.target.value.toLowerCase();
    const searchValueLength = event.target.value.length;
    //const currentSearchResultStoraged = JSON.parse(storage.getItem('searchAssets'))[searchValueLength];
    let searchResultStoraged = JSON.parse(storage.getItem('searchAssets'));
    //console.log(searchValueLength,searchValue,isACurrentSearchResultStorage)
    let searchResult;

    if(searchValueLength === 0){
        resetStoragedSearchAssets();
        generateDropdownMenu();
    }
    else if(searchValueLength > 0){
        /* code removed 'cause it didn't manage to generate new search results if you change the input ongoing
        if(currentSearchResultStoraged){
            searchResult = filterSearchResults(searchValue, searchValueLength, currentSearchResultStoraged);
            storageNewSearchAssets(searchValueLength,searchResult);
            generateDropdownMenu(searchResult);
        }
        */
            if(searchValueLength > 1){
                searchResultStoraged[0] = '';
            }
            searchResult = filterSearchResults(searchValue, searchValueLength, searchResultStoraged[searchValueLength - 1] );
            storageNewSearchAssets(searchValueLength,searchResult);
            generateDropdownMenu(searchResult);
    }
}

function handleOutsideClkSearchEl (event) {
  if(searchInputText !== document.activeElement){
    dropdownMenu.innerHTML = '';
    document.removeEventListener('click',handleOutsideClkSearchEl);
  }
}

(async function () {
    assetsList =  await getAssetData();
    resetStoragedSearchAssets();
})()

export {
    showAssetExistsMessage,
    assetSearch,
    resetStoragedSearchAssets,
}