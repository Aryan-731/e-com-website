import {create} from 'zustand';import {persist} from 'zustand/middleware';import {getProduct} from '../data/products';
export const useStore=create(persist((set,get)=>({
cart:[],wishlist:[],
add:(id,qty=1)=>{const p=getProduct(id);if(!p||!p.inStock)return;const c=get().cart;const e=c.find(i=>i.id===id);
const q=Math.min(p.stock,(e?.qty||0)+qty);set({cart:e?c.map(i=>i.id===id?{...i,qty:q}:i):[...c,{id,qty:q}]});},
setQty:(id,qty)=>{const p=getProduct(id);const q=Math.min(p?.stock||1,qty);set({cart:get().cart.map(i=>i.id===id?{...i,qty:q}:i).filter(i=>i.qty>0)});},
remove:id=>set({cart:get().cart.filter(i=>i.id!==id)}),clear:()=>set({cart:[]}),
toggleWish:id=>{const w=get().wishlist;set({wishlist:w.includes(id)?w.filter(x=>x!==id):[...w,id]});}}),
{name:'nirbhay-store'}));
// Prices are always looked up from product data, never stored in the cart.
export const cartLines=cart=>cart.map(i=>({...getProduct(i.id),qty:i.qty})).filter(l=>l.id);
