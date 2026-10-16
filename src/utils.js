import {useEffect} from 'react';
export const inr=n=>'₹'+Number(n).toLocaleString('en-IN');
export const useTitle=(t,d)=>useEffect(()=>{document.title=t+' | Nirbhay Electric & Electronic';
let m=document.querySelector('meta[name=description]');if(m&&d)m.content=d;},[t,d]);
