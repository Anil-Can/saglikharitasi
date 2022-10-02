import React,{ useContext } from "react";
import { AppContext } from "../context/AppContext";
import "./Title.css";

export default function Title () {
    const {tableName} = useContext(AppContext);
    const getTitle = () => {
        let text;
        switch(tableName.current.mode)
        {
            case 'statistic':
                text = tableName.current.category === 'hastanesayisi' ? 
                `${tableName.current.years} Yılına Ait Hastane Başına Düşen Kişi Sayısı`: 
                tableName.current.category === 'saglik_personel' ? `${tableName.current.years} Yılına Ait Hekim Başına Düşen Kişi Sayısı`:
                text = tableName.current.category === 'hastane_yatak_sayisi' ? `${tableName.current.years} Yılına Ait Hastane Yatak Başına Düşen Kişi Sayısı`:
                `${tableName.current.years} Yılına Ait Anne Olma Yaş Oranı`
                break;
            case 'compare':
                text = tableName.current.category === 'hastanesayisi' ? 
                `${tableName.current.years} - ${tableName.current.years2 } Yılları Arasındaki Ait Hastane Başına Düşen Kişi Sayısının Değşimi`: 
                tableName.current.category === 'saglik_personel' ? `${tableName.current.years} - ${tableName.current.years2 } Yılları Arasındaki Ait Hekim Başına Düşen Kişi Sayısının Değşimi`:
                `${tableName.current.years} - ${tableName.current.years2 } Yılları Arasındaki Ait Hastane Yatak Başına Düşen Kişi Sayısının Değşimi`
                break;
            case 'cross':
        }
        return text;
    }
    const title = getTitle();
    return (
        <div className="map-title">
            <h3>{title}</h3>
        </div>
    )
} 