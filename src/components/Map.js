import React,{useState,useEffect,useRef, useContext} from "react";
import ReactDOM from "react-dom";
import maplibregl from 'maplibre-gl';
import {provinces_name,komsular,denizler,goller,country_name} from "../data"
import { AppContext } from "../context/AppContext";
import updateGeoJSON from "../functions/updateGeoJSON";
import classify from "../functions/classify";
import setLayerPorperty from "../functions/setLayerProperty";
import Popup from "./Popup";

export default function Map() {
    const {tableName,setIntervals} = useContext(AppContext);
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
    const popupRef = useRef(new maplibregl.Popup({closeButton:false,closeOnClick:false}));
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
            style:tableName.current.mode === 'cluster' ? mapStyle:currentStyle,
            center: center,
            zoom: zoom,
            ...(tableName.current.mode !== 'cluster' && {maxBounds: bounds}),
            dragRotate: false,
            doubleClickZoom: false,
            touchPitch: false,
        });
        var hoveredStateId = null;
        map.current.on('load', ()=> {
            if(tableName.current.mode !== 'cluster')
            {
                let provinceGeoJSON = updateGeoJSON(tableName.current);
                const [intervalsLocal,maxValue] = classify(provinceGeoJSON,tableName.current);
                setIntervals([maxValue,...intervalsLocal]);
                let colors = setLayerPorperty(intervalsLocal);
                

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
                    'id': 'il_layer',
                    'type': 'fill',
                    'source': 'il',
                    'layout': {},
                    'paint': { 
                        'fill-color': colors,
                        'fill-opacity': [
                            'case',
                            ['boolean', ['feature-state', 'hover'], false],
                            1.0,
                            0.8
                        ]
                    }
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
                        'fill-color': '#0085bb',
                    }
                });
                map.current.addLayer({
                    'id': 'komsu_layer',
                    'type': 'fill',
                    'source': 'komsu',
                    'layout': {},
                    'paint': { 
                        'fill-color': '#91cf60',
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
                    'id': 'gol_layer',
                    'type': 'fill',
                    'source': 'gol',
                    'layout': {},
                    'paint': { 
                        'fill-color': '#4BB6EF',
                    }
                });
                map.current.addLayer({
                    'id': 'country_name_layer',
                    'type': 'symbol',
                    'source': 'country_names',
                    'layout': {
                        'text-field': ['get', 'name'],
                        'text-overlap': 'always',
                        'text-font': ['Roboto Medium'],
                        'text-size': 14
                    },
                    'paint': {
                        'text-halo-color': 'white',
                        'text-halo-width': 1.5
                    }
                });
                map.current.addLayer({
                    'id': 'name_layer',
                    'type': 'symbol',
                    'source': 'provinces_name',
                    'layout': {
                        'text-field': ['get', 'name'],
                        'text-overlap': 'always',
                        'text-font': ['Roboto Medium'],
                        'text-size': 14
                    },
                    'paint': {
                        'text-halo-color': 'white',
                        'text-halo-width': 1.5
                    }
                });
            }
            
        });
        map.current.on('click', 'il_layer', e => {
            if(e.features.length > 0)
            {
                let popupHeader = document.querySelector('.map-popup-header');
                if( popupHeader !== null) popupHeader.querySelector('button').click();
                let properties = e.features[0].properties;
                const popupNode = document.createElement("div");
                popupRef.current
                .setLngLat(e.lngLat)
                .setDOMContent(popupNode)
                .addTo(map.current)
                ReactDOM.render(
                    <Popup properties={properties} tableName={tableName.current} popup={popupRef.current}/>,
                    popupNode
                );
                
            }
        })
        map.current.on('mousemove', 'il_layer', function (e) {
            if (e.features.length > 0) {
                if (hoveredStateId) {
                    map.current.setFeatureState(
                        { source: 'il', id: hoveredStateId },
                        { hover: false }
                    );
                }
                hoveredStateId = e.features[0].id;
                map.current.setFeatureState(
                    { source: 'il', id: hoveredStateId },
                    { hover: true }
                );
            }
        });
        map.current.on('mouseenter', 'il_layer', function () {
            map.current.getCanvas().style.cursor = 'pointer';
        });
            
        map.current.on('mouseleave', 'il_layer', function () {
            map.current.getCanvas().style.cursor = 'default';
        });
    
    });
    return (
        <>
          <div ref={mapContainer} className="map" />
        </>
      );
}