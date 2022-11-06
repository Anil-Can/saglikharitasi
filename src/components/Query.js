import React,{ useContext, useState,useEffect } from "react";
import { AppContext } from "../context/AppContext";
import { VscChromeClose } from "react-icons/vsc";
import "./Query.css"
import Select from "./Select";
export default function Query(){
    const isMobile = document.body.offsetWidth > 600 ? false : true;
    const { mode, setMode, intervals,tableName } = useContext(AppContext);
    
    const category = [
        {
            name: "Hastane Sayıısı",
            value: "hastanesayisi"
        },
        {
            name: "Anne Yaş",
            value: "anne_yas"
        },
        {
            name: "Sağlık Personeli Sayısı",
            value: "saglik_personel"
        },
        {
            name: "Hastane Yatak Sayisi",
            value: "hastane_yatak_sayisi"
        },

    ]
    const category2 = [
        {
            name: "Kaba Ölüm",
            value: "olum"
        },
        /*
        {
            name: "Net Göç",
            value: "goc"
        },*/
        {
            name: "Gayrisafi Yurtiçi Hasıla",
            value: "gshy"
        },
        {
            name: "Kişi Başı GSHY",
            value: "kisi_gshy"
        },
        {
            name: "Ortalama Hane Halkı Büyüklüğü",
            value: "hane"
        },

    ]
    const selectIntervals = intervals.map(e => {
        return {
            name: e,
            value: e.toString()
        }
    });
    const selectChange = value => {
        setFilterYears(years2.filter(e => e.name > value));
        
    }
    const years = [
        {name:2002,value:"2002"},{name:2003,value:"2003"},{name:2004,value:"2004"},{name:2005,value:"2005"},
        {name:2006,value:"2006"},{name:2007,value:"2007"},{name:2008,value:"2008"},{name:2009,value:"2009"},{name:2010,value:"2010"},
        {name:2011,value:"2011"},{name:2012,value:"2012"},{name:2013,value:"2013"},{name:2014,value:"2014"},{name:2015,value:"2015"},
        {name:2016,value:"2016"},{name:2017,value:"2017"},{name:2018,value:"2018"},{name:2019,value:"2019"},
    ]
    const years2 = [
        {name:2003,value:"2003"},{name:2004,value:"2004"},{name:2005,value:"2005"},{name:2006,value:"2006"},{name:2007,value:"2007"},{name:2008,value:"2008"},
        {name:2009,value:"2009"},{name:2010,value:"2010"},{name:2011,value:"2011"},{name:2012,value:"2012"},{name:2013,value:"2013"},{name:2014,value:"2014"},
        {name:2015,value:"2015"},{name:2016,value:"2016"},{name:2017,value:"2017"},{name:2018,value:"2018"},{name:2019,value:"2019"},
    ]
    const logic = [
        {
            "name": ">",
            "value": ">",
        },
        {
            "name": "<",
            "value": "<",
        }
    ]
    if(mode === 'compare'){
        category.splice(1,1);
        years.pop();
    }
    
    const [filterYears ,setFilterYears] = useState(years2);
    const [filterIntervals,setFilterIntervals] = useState(selectIntervals)
    const logicChanged = value => {
        if(value === ">"){
            let copyselectIntervals = [...selectIntervals];
            copyselectIntervals.shift();
            setFilterIntervals(copyselectIntervals);
            let inputInterval = document.querySelector('#interval');
            if(inputInterval !== null)
            {
                let intervalValue = inputInterval.previousElementSibling.previousElementSibling.textContent;
                let index = copyselectIntervals.findIndex( e => e.value === intervalValue);
                if(index === -1)
                {
                    let target = document.querySelector(`div[data-value="${copyselectIntervals[0].value}"]`);
                    target.click();
                    target.click();
                }
            }
        }
        else
        {
            let copyselectIntervals = [...selectIntervals];
            setFilterIntervals(copyselectIntervals);
        }
    }
    useEffect( ()=> {
        let yearsInput = document.querySelector('#years');
        let years2Input = document.querySelector('#years2');
        if(years2Input !== null && yearsInput !== null)
        {
            let value = parseInt(yearsInput.value);
            let value2 = parseInt(years2Input.value);
            if( value >= value2)
            {
                let trigger = document.querySelector('#years2').previousElementSibling.children[0];
                trigger.click();
                trigger.click();
            }
        }
        
    })
    const close = () => {
        setMode(null);
        document.querySelector('.query-menu').classList.remove('active');
        document.querySelector('.navbar').querySelector('li.active').classList.remove('active');
    }
    const submit = () => {
        let categoryInput = document.querySelector('#category')
        let categoryInput2 = document.querySelector('#category2')
        let yearsInput = document.querySelector('#years');
        let years2Input = document.querySelector('#years2');
        sessionStorage.setItem("mode",mode);
        if(categoryInput2 !== null)
        {
            sessionStorage.setItem("category2",categoryInput2.value);
        }
        else if( years2Input !== null)
        {
            sessionStorage.setItem("years2",years2Input.value);
            sessionStorage.setItem("years",yearsInput.value);
            sessionStorage.setItem("category",categoryInput.value);
        }
        else
        {
            sessionStorage.setItem("years",yearsInput.value);
            sessionStorage.setItem("category",categoryInput.value);
        }
    }
    return(
        <div className="query-menu">
            {mode === 'statistic' &&
                <>
                    <div className="query-menu-header">
                        <span>İstatistik Sorgusu</span>
                        <VscChromeClose onClick={close}/>
                    </div>
                    <div className="query-menu-info">
                        <p>
                            Bu menüde istediğiniz yıla ait belirttiğiniz kategoriye ait tematik harita oluşturabilirsiniz.Çapraz sorgu oluşturmak için öncelikle bir normal sorgu yapmanız gerekir.
                        </p>
                    </div>
                    <form className="query-menu-form" method="post">
                        <div className="query-selection">
                            <span>Kategori :</span>
                            <Select options={category} name={"category"} id={"category"} width={ isMobile ? "7.5rem":"11rem"}/>
                        </div>
                        <div className="query-selection">
                            <span>Yıl :</span>
                            <Select options={years} name={"years"} id={"years"} width={isMobile ? "4rem":"5rem"}/>
                        </div>

                        <div className="query-submit">
                            <input type="submit" value="Haritayı Aç" onClick={submit}/>
                        </div>
                        
                    </form>
                </>
            }
            {mode === 'compare' &&
                <>
                    <div className="query-menu-header">
                        <span>Değişim Analizi</span>
                        <VscChromeClose onClick={close}/>
                    </div>
                    <div className="query-menu-info">
                        <p>
                            Bu sorguda belirlenen yıl aralığındaki değişimi gösteren bir tematik harita oluşturabilirsiniz.
                        </p>
                    </div>
                    <form className="query-menu-form" method="post">
                        <div className="query-selection">
                            <span>Kategori :</span>
                            <Select options={category} name={"category"} id={"category"} width={isMobile ? "7.5rem":"11rem"}/>
                        </div>
                        <div className="query-selection">
                            <span>Aralık :</span>
                            <Select options={years} name={"years"} id={"years"} width={isMobile ? "4rem":"5rem"} selectChange={selectChange}/>
                            <Select options={filterYears} name={"years2"} id={"years2"} width={isMobile ? "4rem":"5rem"}/>
                        </div>
                        

                        <div className="query-submit">
                            <input type="submit" value="Haritayı Aç" onClick={submit}/>
                        </div>
                        
                    </form>
                </>
            }
            {mode === 'cross' && 
                <>
                    <div className="query-menu-header">
                        <span>Çapraz Sorgu</span>
                        <VscChromeClose onClick={close}/>
                        </div>
                    <div className="query-menu-info">
                        <p>Bu sorguda normal sorgudan gelen verideki belirlediğiniz aralık ile buradan seçtiğiniz kategori ile bir çapraz sorgu yapmanızı sağlar.Çapraz sorgudaki veriler 2013-2019 yılları arasındadır</p>
                    </div>
                    {tableName.current.mode === 'statistic' && parseInt(tableName.current.years) > 2012 &&
                        <form className="query-menu-form" method="post">
                            <div className="query-selection">
                                <span>Kategori :</span>
                                <Select options={category2} name={"category2"} id={"category2"} width={ isMobile ? "7.5rem":"11rem"}/>
                            </div>
                            <div className="query-selection">
                                <span>Aralık :</span>
                                <Select options={logic} name={"logic"} id={"logic"} width={ isMobile ? "1rem":"2rem"} logicChanged={logicChanged}/>
                                {filterIntervals.length > 0 && 
                                    <Select options={filterIntervals} name={"interval"} id={"interval"} width={ isMobile ? "3.5rem":"5.5rem"}/>
                                }
                            </div>
                            <input style={{display:"none"}} name="category" value={`${tableName.current.category}-${tableName.current.years}`}/>
                            <div className="query-submit">
                                <input type="submit" value="Haritayı Aç" onClick={submit}/>
                            </div>
                            
                        </form>
                    }
                </>
            }
        </div>
    )
} 