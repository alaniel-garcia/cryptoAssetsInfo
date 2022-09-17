import './app.scss';
import {assetSearch} from './search';
import {assetContainer, generateCurrencyCard} from './assetContainer';



//Dom Elements
const app = document.getElementById('app-container');

    //dom elements structure asignments
    app.append(assetSearch, assetContainer);



generateCurrencyCard('ethereum')
generateCurrencyCard('bitcoin')