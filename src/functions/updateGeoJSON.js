import {iller} from "../data"
export default function updateGeoJSON(current){
    let year1 = parseInt(current.years);
    let year2 = parseInt(current.years2);
    let updatedGeoJSON = {
        "type": "FeatureCollection", 
        "features": []
    }
    updatedGeoJSON.features = iller.features.map( e => {
        let index = queryResult.findIndex( j => j.il === e.properties.name_en)
        let properties = {...queryResult[index]};
        delete properties.il;
        e.properties = {...e.properties,...properties};
        return e;
    })
    switch(current.mode)
    {
        case 'statistic':
            
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
                    updatedGeoJSON.features = updatedGeoJSON.features.map(e => {
                        e.properties.compute = parseFloat((parseInt(e.properties[`nufus_${year2}`])/parseInt(e.properties[`toplam_${year2}`])-(parseInt(e.properties[`nufus_${year1}`])/parseInt(e.properties[`toplam_${year1}`]))).toFixed(2));
                        return e;
                    })
                    break;
                case 'hastane_yatak_sayisi':
                    updatedGeoJSON.features = updatedGeoJSON.features.map(e => {
                        e.properties.compute = parseFloat((parseInt(e.properties[`nufus_${year2}`])/parseInt(e.properties[`toplam_${year2}`])-(parseInt(e.properties[`nufus_${year1}`])/parseInt(e.properties[`toplam_${year1}`]))).toFixed(2));
                        return e;
                    })
                    break;
                case 'saglik_personel':
                    updatedGeoJSON.features = updatedGeoJSON.features.map(e => {
                        e.properties.compute = parseFloat((parseInt(e.properties[`nufus_${year2}`])/parseInt(e.properties[`hekim_${year2}`])-(parseInt(e.properties[`nufus_${year1}`])/parseInt(e.properties[`hekim_${year1}`]))).toFixed(2));
                        return e;
                    })
                    break;
                case 'anne_yas':
                    updatedGeoJSON.features = updatedGeoJSON.features.map(e => {
                        e.properties.compute = parseFloat((e.properties[`yas_${year2}`]-e.properties[`yas_${year1}`]).toFixed(2));
                        return e;
                    })
                    break;
            }
            break;
        case 'cross':
            break;
    }
    return updatedGeoJSON;
}