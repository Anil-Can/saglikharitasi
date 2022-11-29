const intervals = (initial,interval,arr,total) => {
    let stop = false;
    let value = initial - interval;
    let count =0
    let loop = 0;
    while(!stop)
    {
        let filterArr = arr.filter(e => e >= value && e <= initial);
        loop++;

        if(filterArr.length >= total ){
            stop= true;
            count = filterArr.length;
        }
        else value -= interval;
    }

    return [parseFloat(value.toFixed(2)), count];
} 

export default function classify(geojson,current){
    
    let computeFields = geojson.features.map(e => e.properties.compute)
    let maxValue = Math.max(...computeFields);
    let totalCount = 0;
    let total = 16;
    const [ value, count ] = intervals(maxValue,0.1,computeFields,total);
    totalCount += count;
    let values = [value];
    let numberofClass = 3;
    for( let i = 0; i < numberofClass; i++)
    {
        let index = values.length -1
        const [ value2, count2] = intervals(values[index]-0.01,0.1,computeFields,total);
        totalCount += count2;
        values.push(value2);
    }
    return [values,maxValue];
}