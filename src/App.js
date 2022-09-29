import React, { useRef, useState} from "react";
import Hambuerger from "./components/Hamburger";
import Map from "./components/Map";
import NavBar from "./components/NavBar";
import Query from "./components/Query";
import { AppContext } from "./context/AppContext";

export default function App() {
    // Kategori isimleri yıl ve sorgu tipini çerez olarak getirilir
    if(sessionStorage.getItem("category") === null) sessionStorage.setItem("category","hastanesayisi");
    if(sessionStorage.getItem("years") === null) sessionStorage.setItem("years","2002");
    if(sessionStorage.getItem("years2") === null) sessionStorage.setItem("years2","2003");
    if(sessionStorage.getItem("mode") === null) sessionStorage.setItem("mode","statistic");
    const [mode, setMode] = useState(null)
    const tableName = useRef({
        category:sessionStorage.getItem("category"),
        years: sessionStorage.getItem("years"),
        years2:sessionStorage.getItem("years2"),
        mode:sessionStorage.getItem("mode")
    })
    return(
        <React.StrictMode>
            <AppContext.Provider value={{mode,setMode,tableName}}>
                <NavBar/>
                <Query/>
                <Hambuerger/>
                <Map/>
            </AppContext.Provider>
        </React.StrictMode>
    )
}