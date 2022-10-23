import React,{ useContext, useState,useEffect } from "react";
import { AppContext } from "../context/AppContext";
import { VscChromeClose } from "react-icons/vsc";
import "./Query.css"
import Select from "./Select";
export default function Query(){
    const isMobile = document.body.offsetWidth > 600 ? false : true;
    const { mode, setMode } = useContext(AppContext);
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
    if(mode === 'compare'){
        category.splice(1,1);
        years.pop();
    } 
    const [filterYears ,setFilterYears] = useState(years2);
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
        console.log("Test");
        let categoryInput = document.querySelector('#category')
        let yearsInput = document.querySelector('#years');
        let years2Input = document.querySelector('#years2');
        sessionStorage.setItem("mode",mode);
        if( years2Input !== null)
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
                        <p>Çapraz sorgu 2 farklı katgeoriye baz olarak bir tematik harita oluşturabilirsiniz.Çapraz sorgu yapmanız için normal sorgu yapmak zorundasınız</p>
                    </div>
                </>
            }
        </div>
    )
} 