import {iller} from "../data"
export default function updateGeoJSON(current){
    let updatedGeoJSON = {
        "type": "FeatureCollection", 
        "features": []
    }
    switch(current.mode)
    {
        case 'statistic':
            updatedGeoJSON.features = iller.features.map( e => {
                let index = queryResult.findIndex( j => j.il === e.properties.name_en)
                let properties = {...queryResult[index]};
                delete properties.il;
                e.properties = {...e.properties,...properties};
                return e;
            })
            switch(current.category)
            {
                case 'hastanesayisi':
                    updatedGeoJSON.features = updatedGeoJSON.features.map(e => {
                        e.properties.compute = parseFloat((parseInt(e.properties.nufus)/parseInt(e.properties.toplam)).toFixed(2));
                        return e;
                    })
                    break;
                case 'hastane_yatak_sayisi':
                    updatedGeoJSON.features = updatedGeoJSON.features.map(e => {
                        e.properties.compute = parseFloat((parseInt(e.properties.nufus)/parseInt(e.properties.toplam)).toFixed(2));
                        return e;
                    })
                    break;
                case 'saglik_personel':
                    updatedGeoJSON.features = updatedGeoJSON.features.map(e => {
                        e.properties.compute = parseFloat((parseInt(e.properties.nufus)/parseInt(e.properties.hekim)).toFixed(2));
                        return e;
                    })
                    break;
                case 'anne_yas':
                    updatedGeoJSON.features = updatedGeoJSON.features.map(e => {
                        e.properties.compute = parseFloat(e.properties.yas);
                        return e;
                    })
                    break;
            }
            break;
        case 'compare':
            switch(current.category)
            {
                case 'hastanesayisi':
                    break;
                case 'hastane_yatak_sayisi':
                    break;
                case 'saglik_personel':
                    break;
                case 'anne_yas':
                    break;
            }
            break;
        case 'cross':
            break;
    }
    return updatedGeoJSON;
}