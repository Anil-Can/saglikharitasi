import React from "react";
import "./Popup.css";
const getContent = (properties,tableName) => {
    switch(tableName.mode)
    {
        case 'statistic':
            switch(tableName.category)
            {
                case 'hastanesayisi':
                case 'hastane_yatak_sayisi':{
                    const {toplam,saglik_bakanligi,universite,ozel,diger,nufus} = properties;
                    return(
                        <>
                            <div className="map-popup-attribute">
                                <span>Nüfus</span>
                                <span>{nufus}</span>
                            </div>
                            <div className="map-popup-attribute">
                                <span>Toplam</span>
                                <span>{toplam}</span>
                            </div>
                            <div className="map-popup-attribute">
                                <span>Sağlık Bakanlığı</span>
                                <span>{saglik_bakanligi}</span>
                            </div>
                            <div className="map-popup-attribute">
                                <span>Üniversite</span>
                                <span>{universite}</span>
                            </div>
                            <div className="map-popup-attribute">
                                <span>Özel</span>
                                <span>{ozel}</span>
                            </div>
                            <div className="map-popup-attribute">
                                <span>Diğer</span>
                                <span>{diger}</span>
                            </div>
                        </>
                    )
                }
                case 'saglik_personel':{
                    const {hekim,dishekim,hemsire,ebe,eczaci,diger,nufus} = properties;
                    return(
                        <>
                            <div className="map-popup-attribute">
                                <span>Nüfus</span>
                                <span>{nufus}</span>
                            </div>
                            <div className="map-popup-attribute">
                                <span>Hekim</span>
                                <span>{hekim}</span>
                            </div>
                            <div className="map-popup-attribute">
                                <span>Diş Hekimi</span>
                                <span>{dishekim}</span>
                            </div>
                            <div className="map-popup-attribute">
                                <span>Hemşire</span>
                                <span>{hemsire}</span>
                            </div>
                            <div className="map-popup-attribute">
                                <span>Ebe</span>
                                <span>{ebe}</span>
                            </div>
                            <div className="map-popup-attribute">
                                <span>Eczacı</span>
                                <span>{eczaci}</span>
                            </div>
                            <div className="map-popup-attribute">
                                <span>Diğer</span>
                                <span>{diger}</span>
                            </div>
                        </>
                    )
                }
                case 'anne_yas':
                    const {yas,nufus} = properties;
                    return (
                        <>
                            <div className="map-popup-attribute">
                                <span>Nüfus</span>
                                <span>{nufus}</span>
                            </div>
                            <div className="map-popup-attribute">
                                <span>Yaş</span>
                                <span>{yas}</span>
                            </div>
                        </>
                    )
            }
            break;
        case 'compare':
            const {years, years2} = tableName;
            switch(tableName.category)
            {
                case 'hastanesayisi':
                case 'hastane_yatak_sayisi':
                    return(
                        <>
                            <div className="map-popup-attribute">
                                <span style={{fontWeight:"800",backgroundColor:"rgb(243 143 5 / 70%)"}}>Öznitelik </span>
                                <span style={{fontWeight:"800",backgroundColor:"rgb(243 143 5 / 70%)"}}>{years}</span>
                                <span style={{fontWeight:"800",backgroundColor:"rgb(243 143 5 / 70%)"}}>{years2}</span>
                            </div>
                            <div className="map-popup-attribute">
                                <span>Nüfus</span>
                                <span>{properties[`nufus_${years}`]}</span>
                                <span>{properties[`nufus_${years2}`]}</span>
                            </div>
                            <div className="map-popup-attribute">
                                <span>Toplam</span>
                                <span>{properties[`toplam_${years}`]}</span>
                                <span>{properties[`toplam_${years2}`]}</span>
                            </div>
                            <div className="map-popup-attribute">
                                <span>Sağlık Bakanlığı</span>
                                <span>{properties[`saglik_bakanligi_${years}`]}</span>
                                <span>{properties[`saglik_bakanligi_${years2}`]}</span>
                            </div>
                            <div className="map-popup-attribute">
                                <span>Üniversite</span>
                                <span>{properties[`universite_${years}`]}</span>
                                <span>{properties[`universite_${years2}`]}</span>
                            </div>
                            <div className="map-popup-attribute">
                                <span>Özel</span>
                                <span>{properties[`ozel_${years}`]}</span>
                                <span>{properties[`ozel_${years2}`]}</span>
                            </div>
                            <div className="map-popup-attribute">
                                <span>Diğer</span>
                                <span>{properties[`diger_${years}`]}</span>
                                <span>{properties[`diger_${years2}`]}</span>
                            </div>
                        </>
                    )
                case 'saglik_personel':
                    return(
                        <>
                            <div className="map-popup-attribute">
                                <span style={{fontWeight:"800",backgroundColor:"rgb(243 143 5 / 70%)"}}>Öznitelik </span>
                                <span style={{fontWeight:"800",backgroundColor:"rgb(243 143 5 / 70%)"}}>{years}</span>
                                <span style={{fontWeight:"800",backgroundColor:"rgb(243 143 5 / 70%)"}}>{years2}</span>
                            </div>
                            <div className="map-popup-attribute">
                                <span>Nüfus</span>
                                <span>{properties[`nufus_${years}`]}</span>
                                <span>{properties[`nufus_${years2}`]}</span>
                            </div>
                            <div className="map-popup-attribute">
                                <span>Hekim</span>
                                <span>{properties[`hekim_${years}`]}</span>
                                <span>{properties[`hekim_${years2}`]}</span>
                            </div>
                            <div className="map-popup-attribute">
                                <span>Diş Hekimi</span>
                                <span>{properties[`dishekim_${years}`]}</span>
                                <span>{properties[`dishekim_${years2}`]}</span>
                            </div>
                            <div className="map-popup-attribute">
                                <span>Hemşire</span>
                                <span>{properties[`hemsire_${years}`]}</span>
                                <span>{properties[`hemsire_${years2}`]}</span>
                            </div>
                            <div className="map-popup-attribute">
                                <span>Ebe</span>
                                <span>{properties[`ebe_${years}`]}</span>
                                <span>{properties[`ebe_${years2}`]}</span>
                            </div>
                            <div className="map-popup-attribute">
                                <span>Eczacı</span>
                                <span>{properties[`eczaci_${years}`]}</span>
                                <span>{properties[`eczaci_${years2}`]}</span>
                            </div>
                            <div className="map-popup-attribute">
                                <span>Diğer</span>
                                <span>{properties[`diger_${years}`]}</span>
                                <span>{properties[`diger_${years2}`]}</span>
                            </div>
                        </>
                    )
            }
            break;
        case 'cross':
            const {compute,nufus} = properties;
            return (
                <>
                    <div className="map-popup-attribute">
                        <span>Nüfus</span>
                        <span>{nufus}</span>
                    </div>
                    <div className="map-popup-attribute">
                        <span>Oran</span>
                        <span>{compute}</span>
                    </div>
                </>
            )
        case 'cluster':
            const {KATEGORI_U,KATEGORI_A,USTKATEGOR} = properties;
            return(
                <>
                    <div className="map-popup-attribute">
                        <span>KATEGORI_U</span>
                        <span>{KATEGORI_U}</span>
                    </div>
                    <div className="map-popup-attribute">
                        <span>KATEGORI_A</span>
                        <span>{KATEGORI_A}</span>
                    </div>
                    <div className="map-popup-attribute">
                        <span>USTKATEGOR</span>
                        <span>{USTKATEGOR}</span>
                    </div>
                </>
            )
    }
}
export default function Popup({properties,tableName,popup})
{
    const close = () => {
        popup.remove();
    }
    return (
        <div className="map-popup">
            <div className="map-popup-header">
                <span>{tableName.mode !== 'cluster' ? `${properties.IL_Adi}`:`${properties.ADI}`}</span>
                <button onClick={close}>X</button>
            </div>
            <div className="map-popup-body">
                {getContent(properties,tableName)}
            </div>
        </div>
    )
}