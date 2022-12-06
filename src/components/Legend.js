import React,{ useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import "./Legend.css";

export default function Legend (){
    const {tableName,intervals} = useContext(AppContext);
    const [legendTitle,setLegendTitle] = useState("")
    const colorList = [
        "#bd0026",
        "#f03b20",
        "#fd8d3c",
        "#fecc5c",
        "#ffffb2",
    ];
    useEffect(()=>{
        if(tableName.current.mode === 'cross')
        {
            switch(tableName.current.category2)
            {
                case 'olum':
                    setLegendTitle('Kaba Ölüm Oranı');
                    break;
                case 'gshy':
                    setLegendTitle('Gayrisafi Yurtiçi Hasıla');
                    break;
                case 'kisi_gshy':
                    setLegendTitle('Kişi Başı GSHY');
                    break;
                case 'hane':
                    setLegendTitle('Ortalama Hane Halkı Büyüklüğü');
                    break;
            }
        }
        else
        {
            setLegendTitle(tableName.current.category !== 'anne_yas' ? "Kişi Sayısı":"Yaş Oranı");
        }
    },[intervals])
    return(
        <div className="map-legend">
            <div className="map-legend-header">
                <span>{legendTitle}</span>
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
            {tableName.current.interval.length > 1 &&
                <div className="legend-extra-info">
                    <div>
                        <div></div>
                        <span>{tableName.current.interval.split("|")[0]}</span>
                    </div>
                    <span>{tableName.current.interval.split("|")[1]}</span>
                </div>
            } 
        </div>
    )
}