import React,{ useContext } from "react";
import { AppContext } from "../context/AppContext";
import "./Legend.css";

export default function Legend (){
    const {tableName,intervals} = useContext(AppContext);

    const colorList = [
        "#bd0026",
        "#f03b20",
        "#fd8d3c",
        "#fecc5c",
        "#ffffb2",
    ];
    return(
        <div className="map-legend">
            <div className="map-legend-header">
                <span>{tableName.current.category !== 'anne_yas' ? "Kişi Sayısı":"Yaş Oranı"}</span>
            </div>
            <div className="map-legend-body">
                {intervals.map((e,i)=>{
                    
                    return(
                        <div className="legend-item">
                            <div style={{backgroundColor:colorList[i]}}></div>
                            {i !== 4 ? <span>{intervals[i+1]} - {i !== 0 ? (e - 0.01).toFixed(2):e}</span>:
                            <span><>&lt;</> {(e-0.01).toFixed(2)}</span>}
                        </div>
                    )
                })}
            </div>
        </div>
    )
}