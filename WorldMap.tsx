'use client';
import {useMemo} from 'react';
import atlas from 'world-atlas/countries-110m.json';
import {feature} from 'topojson-client';
import {byCountry,Token} from '@/data/tokens';
import type {FeatureCollection,Geometry,Position} from 'geojson';
const geo = feature(atlas as never,(atlas as unknown as {objects:{countries:never}}).objects.countries) as unknown as FeatureCollection<Geometry>;
function point([lon,lat]:Position):[number,number]{return [(lon+180)*2.64+5,(90-lat)*2.64+5]}
function ring(points:Position[]):string{return points.map((p,i)=>`${i?'L':'M'}${point(p).map(x=>x.toFixed(1)).join(',')}`).join('')+'Z'}
function path(g:Geometry):string{if(g.type==='Polygon')return g.coordinates.map(ring).join('');if(g.type==='MultiPolygon')return g.coordinates.flatMap(p=>p.map(ring)).join('');return ''}
export default function WorldMap({selected,onSelect}:{selected:Token,onSelect:(t:Token)=>void}){
 const countries=useMemo(()=>geo.features.map(f=>({id:String(f.id).padStart(3,'0'),d:path(f.geometry)})).filter(x=>x.d),[]);
 return <div className="world-map"><div className="map-grid"/><svg viewBox="0 0 960 485" role="img" aria-label="Interactive world map of demo memecoin territories" preserveAspectRatio="xMidYMid meet"><defs><radialGradient id="mapglow"><stop stopColor="#123d41"/><stop offset="1" stopColor="#061418"/></radialGradient><filter id="glow"><feGaussianBlur stdDeviation="4" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter></defs><ellipse cx="480" cy="250" rx="490" ry="235" fill="url(#mapglow)"/><g transform="translate(0,-1)">{countries.map(({id,d})=>{const token=byCountry[id];return <path key={id} d={d} className={`country ${token?'territory':''} ${selected.countryId===id?'selected':''}`} fill={token?token.color:undefined} style={token?{'--territory':token.color} as React.CSSProperties:undefined} onClick={()=>token&&onSelect(token)} aria-label={token?`${token.country}: ${token.name} demo territory`:undefined}><title>{token?`${token.country} · ${token.name} (demo)`:id}</title></path>})}</g></svg><div className="map-vignette"/><div className="map-markers">{[{id:'124',x:21,y:34},{id:'840',x:18,y:46},{id:'076',x:34,y:70},{id:'826',x:49,y:35},{id:'643',x:70,y:30},{id:'356',x:71,y:55},{id:'156',x:80,y:44},{id:'036',x:85,y:78},{id:'710',x:54,y:78},{id:'392',x:89,y:44}].map(m=>{const t=byCountry[m.id];return <button className={`map-marker ${selected.symbol===t.symbol?'active':''}`} key={m.id} style={{left:`${m.x}%`,top:`${m.y}%`,'--territory':t.color} as React.CSSProperties} onClick={()=>onSelect(t)} title={`${t.country} · ${t.name}`}><span>{t.emoji}</span><strong>{t.name}</strong></button>})}</div><div className="map-caption">CLICK A TERRITORY TO EXPLORE <span>◈</span></div></div>
}
