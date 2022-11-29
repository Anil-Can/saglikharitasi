export default function setLayerPorperty(intervals,mode){
    let fillColor = ['case'];
    let colorList = [
        "#bd0026",
        "#f03b20",
        "#fd8d3c",
        "#fecc5c",
        "#ffffb2",
    ];
    intervals.forEach((e,j) => {
        fillColor.push(['>',['get','compute'], e]);
        fillColor.push(colorList[j])
    })
    fillColor.push(colorList[4]);
    return fillColor;
}