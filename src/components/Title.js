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
                `Hastane Başına Düşen Kişi Sayısı (${tableName.current.years})`: 
                tableName.current.category === 'saglik_personel' ? `Hekim Başına Düşen Kişi Sayısı (${tableName.current.years})`:
                text = tableName.current.category === 'hastane_yatak_sayisi' ? `Hastane Yatak Başına Düşen Kişi Sayısı (${tableName.current.years})`:
                `Anne Olma Yaş Oranı (${tableName.current.years})`
                break;
            case 'compare':
                text = tableName.current.category === 'hastanesayisi' ? 
                `Yılları Arasındaki Ait Hastane Başına Düşen Kişi Sayısının Değşimi (${tableName.current.years} - ${tableName.current.years2 })`: 
                tableName.current.category === 'saglik_personel' ? `Yılları Arasındaki Ait Hekim Başına Düşen Kişi Sayısının Değşimi (${tableName.current.years} - ${tableName.current.years2 })`:
                `Yılları Arasındaki Ait Hastane Yatak Başına Düşen Kişi Sayısının Değşimi (${tableName.current.years} - ${tableName.current.years2 })`
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