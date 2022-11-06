
import React, { useRef, useState} from "react";
import Hamburger from "./components/Hamburger";
import Legend from "./components/Legend";
import Map from "./components/Map";
import NavBar from "./components/NavBar";
import Query from "./components/Query";
import Title from "./components/Title";
import { AppContext } from "./context/AppContext"

export default function App() {
    // Kategori isimleri yıl ve sorgu tipini çerez olarak getirilirsss
    if(sessionStorage.getItem("category") === null) sessionStorage.setItem("category","hastanesayisi");
    if(sessionStorage.getItem("category2") === null) sessionStorage.setItem("category2","olum");
    if(sessionStorage.getItem("years") === null) sessionStorage.setItem("years","2002");
    if(sessionStorage.getItem("years2") === null) sessionStorage.setItem("years2","2003");
    if(sessionStorage.getItem("mode") === null) sessionStorage.setItem("mode","statistic");
    const [mode, setMode] = useState(null);
    const [intervals,setIntervals] = useState([]);
    const tableName = useRef({
        category:sessionStorage.getItem("category"),
        category2:sessionStorage.getItem("category2"),
        years: sessionStorage.getItem("years"),
        years2:sessionStorage.getItem("years2"),
        mode:sessionStorage.getItem("mode")
    })
    return(
        <React.StrictMode>
            <AppContext.Provider value={{mode,setMode,intervals,setIntervals,tableName}}>
                {tableName.current.mode !== 'cluster' && 
                <>
                    <Title/>
                    <Legend/>
                </>}
                <NavBar/>
                <Query/>
                <Hamburger/>
                <Map/>
            </AppContext.Provider>
        </React.StrictMode>
    )
}
