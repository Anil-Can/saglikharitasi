
import React, { useRef, useState} from "react";
import Hambuerger from "./components/Hamburger";
import Legend from "./components/Legend";
import Map from "./components/Map";
import NavBar from "./components/NavBar";
import Query from "./components/Query";
import Title from "./components/Title";
import { AppContext } from "./context/AppContext";

export default function App() {
    // Kategori isimleri yıl ve sorgu tipini çerez olarak getirilir
    if(sessionStorage.getItem("category") === null) sessionStorage.setItem("category","hastanesayisi");
    if(sessionStorage.getItem("years") === null) sessionStorage.setItem("years","2002");
    if(sessionStorage.getItem("years2") === null) sessionStorage.setItem("years2","2003");
    if(sessionStorage.getItem("mode") === null) sessionStorage.setItem("mode","statistic");
    const [mode, setMode] = useState(null);
    const [intervals,setIntervals] = useState([]);
    const tableName = useRef({
        category:sessionStorage.getItem("category"),
        years: sessionStorage.getItem("years"),
        years2:sessionStorage.getItem("years2"),
        mode:sessionStorage.getItem("mode")
    })
    return(
        <React.StrictMode>
            <AppContext.Provider value={{mode,setMode,intervals,setIntervals,tableName}}>
                <Title/>
                <Legend/>
                <NavBar/>
                <Query/>
                <Hambuerger/>
                <Map/>
            </AppContext.Provider>
        </React.StrictMode>
    )
}