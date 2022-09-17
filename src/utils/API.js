const axios = require('axios').default;

//assets endpoints
const endpointAssets = '/coins/list';
const endpointCurrentAsset = '/coins/';

const ASSETS_API = axios.create({
    baseURL: 'https://api.coingecko.com/api/v3/', //uncomment when deploy
    //baseURL: process.env.API,
    Headers:{
        'Content-Type': 'application/json;charset=utf-8',
        'Accept': 'application/json',
        'Accept-Encoding': 'deflate, gzip'
    },
    params:{
    }
});

async function getAssetData (asset) {
    const {data, status} = await ASSETS_API(`${asset ? endpointCurrentAsset + asset : endpointAssets}`);
    //const {data, status} = await ASSETS_API(`${asset ? process.env.ENDPOINT_CURRENT_ASSET + asset : process.env.ENDPOINT_ASSETS}`);

    if(status !== 200){
      console.log(`Algo ocurrió.\nEstado: ${status}, ${data.message}`)
    }

    return data
}

export {
    ASSETS_API,
    getAssetData
}