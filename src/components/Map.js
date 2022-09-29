import React,{useState,useEffect,useRef, useContext} from "react";
import maplibregl from 'maplibre-gl';
import {provinces_name,komsular,denizler,goller,country_name} from "../data"
import { AppContext } from "../context/AppContext";
import updateGeoJSON from "../functions/updateGeoJSON";
import classify from "../functions/classify";

export default function Map() {
    const {tableName} = useContext(AppContext);
    const mapStyle = {
        id: "O_SM",
        version: 8,
        name: "OSM Street",
        glyphs: "https://orangemug.github.io/font-glyphs/glyphs/{fontstack}/{range}.pbf",
        sources: {
            "oda-street": {
                minzoom: 0,
                maxzoom: 18,
                type: "raster",
                tiles: ["https://tile.openstreetmap.org/{z}/{x}/{y}.png"],
                tileSize: 256,
            },
        },
        layers: [
            {
                id: "O_SM",
                source: "oda-street",
                type: "raster",
                layout: {
                    visibility: "visible",
                }
            }
        ]
        
    }
    const mapContainer = useRef(null);
    const map = useRef(null);
    const bounds = [
        [ 22.84991,  33.921258], // Southwest coordinates
        [ 46.48194,  47.046743] // Northeast coordinates
    ];
    const [currentStyle] = useState({version: 8, glyphs: "https://orangemug.github.io/font-glyphs/glyphs/{fontstack}/{range}.pbf",sources: {},layers: []});
    const [center] = useState([34.375,39]);
    const [zoom] = useState(5);

    useEffect(() => {
        if(map.current) return;
        map.current = new maplibregl.Map({
            container: mapContainer.current,
            style:currentStyle,
            center: center,
            zoom: zoom,
            maxBounds: bounds,
            dragRotate: false,
            doubleClickZoom: false,
            touchPitch: false,
        });

        map.current.on('load', ()=> {
            let provinceGeoJSON = updateGeoJSON(tableName.current);
            console.log(classify(provinceGeoJSON));
            map.current.addSource('provinces_name', {
                'type': 'geojson',
                'data': provinces_name
            });
            map.current.addSource('country_names', {
                'type': 'geojson',
                'data': country_name
            });
            map.current.addSource('gol', {
                'type': 'geojson',
                'data': goller
            });
            map.current.addSource('deniz', {
                'type': 'geojson',
                'data': denizler
            });
    
            map.current.addSource('komsu', {
                'type': 'geojson',
                'data': komsular
            });
            map.current.addSource('il', {
                'type': 'geojson',
                'data': provinceGeoJSON
            });
            map.current.addLayer({
                'id': 'il_sinir_layer',
                'type': 'line',
                'source': 'il',
                'layout': {},
                'paint': 
                {
                    'line-color': 'rgba(0,0,0,1.0)',
                    'line-width': 1
                }
            });
            map.current.addLayer({
                'id': 'deniz_layer',
                'type': 'fill',
                'source': 'deniz',
                'layout': {},
                'paint': { 
                    'fill-color': 'rgba(5, 93, 235,0.5)',
                }
            });
            map.current.addLayer({
                'id': 'komsu_layer',
                'type': 'fill',
                'source': 'komsu',
                'layout': {},
                'paint': { 
                    'fill-color': 'rgba(184, 144, 35,0.8)',
                }
            });
            map.current.addLayer({
                'id': 'komsu_sinir_layer',
                'type': 'line',
                'source': 'komsu',
                'layout': {},
                'paint': 
                {
                    'line-color': 'rgb(0,0,0)',
                    'line-width': 1
                }
            });
            map.current.addLayer({
                'id': 'name_layer',
                'type': 'symbol',
                'source': 'provinces_name',
                'layout': {
                    'text-field': ['get', 'name'],
                    'text-font': ['Roboto Medium'],
                    'text-size': 10
                }
            });
            map.current.addLayer({
                'id': 'country_name_layer',
                'type': 'symbol',
                'source': 'country_names',
                'layout': {
                    'text-field': ['get', 'name'],
                    'text-font': ['Roboto Medium'],
                    'text-size': 12
                }
            });
            
            map.current.addLayer({
                'id': 'gol_layer',
                'type': 'fill',
                'source': 'gol',
                'layout': {},
                'paint': { 
                    'fill-color': 'rgba(23, 234, 245,1.0)',
                }
            });
        })
    
    });
    return (
        <>
          <div ref={mapContainer} className="map" />
        </>
      );
}