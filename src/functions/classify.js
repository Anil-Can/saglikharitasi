const intervals = (initial,interval,arr) => {
    let stop = false;
    let value = initial - interval;
    let count =0
    while(!stop)
    {
        let filterArr = arr.filter(e => e >= value && e <= initial);
        

        if(filterArr.length >= 16 ){
            stop= true;
            count = filterArr.length;
        }
        else value -= interval;
    }
    return [parseFloat(value.toFixed(2)), count];
} 

export default function classify(geojson){
    let computeFields = geojson.features.map(e => e.properties.compute);
    let maxValue = Math.max(...computeFields);
    let totalCount = 0;
    const [ value, count ] = intervals(maxValue,0.1,computeFields);
    totalCount += count;
    let values = [value];
    for( let i = 0; i < 3; i++)
    {
        let index = values.length -1
        const [ value2, count2] = intervals(values[index]-0.1,0.1,computeFields);
        totalCount += count2;
        values.push(value2);
    }
    return values;
}