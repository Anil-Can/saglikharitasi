import React ,{useContext} from "react";
import { VscGitCompare,VscSearch,VscTypeHierarchySub } from "react-icons/vsc";
import { AppContext } from "../context/AppContext";
import "./NavBar.css"
export default function NavBar(){
    const {mode,setMode} = useContext(AppContext);
    const clear = target => {
        target.classList.remove('active');
        document.querySelector('.query-menu').classList.remove('active');
        setMode(null);
    }

    const click = e => {
        let target = e.target.localName === 'span' || e.target.localName === 'svg' ? e.target.parentNode : e.target.localName === 'path' ? e.target.parentNode.parentNode: e.target;
        let target2 = document.querySelector(".navbar").querySelector('li.active')
        if(target2 !== null ) clear(target2);
        if(target2 !== target){
            target.classList.toggle('active');
            document.querySelector('.query-menu').classList.toggle('active');
            sessionStorage.setItem('mode',target.id);
            setMode(target.id);
        }    
    }
    return(
        <nav className="navbar">
            <ul>
                <li id="statistic" onClick={e => click(e)}>
                    <VscSearch/>
                    <span>Sorgu</span>
                </li>
                <li id="compare" onClick={e => click(e)}>
                    <VscGitCompare/>
                    <span>Değişim Analizi</span>
                </li>
                <li id="cross" onClick={e => click(e)}>
                    <VscTypeHierarchySub/>
                    <span>Çapraz Sorgu</span>
                </li>
            </ul>
        </nav>
    )
}