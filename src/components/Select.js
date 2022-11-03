import React,{ useEffect, useState } from "react";
import "./Select.css"
import { VscTriangleLeft } from "react-icons/vsc";
export default function Select({options, name, id, width, selectChange,logicChanged}){
    
    useEffect(()=>{
        if(logicChanged !== undefined) {
            let target = document.querySelector('div[data-value=">"]');
            target.click();
            target.click();
        }
    },[]);
    const [selection,setSelection] = useState(options[0]);
    const toggle = e => {
        let target = e.target.localName !== 'div' ? e.target.parentNode:e.target;
        target.children[1].classList.toggle('open');
        target.nextElementSibling.classList.toggle('active');
    }
    const optionChanged = e => {
        let target = e.target.localName !== 'span' ? e.target: e.target.parentNode;
        let beforeElement = target.parentNode.previousElementSibling;
        beforeElement.children[1].classList.toggle('open');
        beforeElement.nextElementSibling.classList.toggle('active');
        if(selectChange !== undefined) selectChange(parseInt(target.dataset.value));
        if(logicChanged !== undefined) logicChanged(target.dataset.value);
        setSelection({name:target.children[0].textContent, value:target.dataset.value})
    }
    return (
        <div>
            <div className="form-selection" onClick={ e=> toggle(e)} style={{width:width}}>
                <span>{selection.name}</span>
                <VscTriangleLeft/>
            </div>
            <div className="form-selection-list">
                {options.map(e => {
                    return (
                        <div data-value={e.value} onClick={e => optionChanged(e)} style={{width:width}}>
                            <span>{e.name}</span>
                        </div>
                    )
                })}
            </div>
            <input name={name} id={id} style={{display:"none"}} value={selection.value}/>
        </div>
    )
}