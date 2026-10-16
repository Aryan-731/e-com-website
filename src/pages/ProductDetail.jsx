import {useState} from 'react';import {useParams,useNavigate,Link} from 'react-router-dom';import {Heart,MessageCircle} from 'lucide-react';
import {getProduct,discount,PRODUCTS} from '../data/products';import {useStore} from '../store/useStore';import ProductCard,{ProductImage} from '../components/ProductCard';
import {inr,useTitle} from '../utils';import {STORE,validWA} from '../config';
export default function ProductDetail(){const {id}=useParams();const p=getProduct(id);const nav=useNavigate();const [qty,setQty]=useState(1);
const {add,toggleWish,wishlist}=useStore();useTitle(p?p.name:'Not found',p?.description);
if(!p)return<p className="p-10 text-center">Product not found. <Link to="/products" className="text-electric">Browse products</Link></p>;
const d=discount(p);const rel=PRODUCTS.filter(x=>x.category===p.category&&x.id!==p.id).slice(0,4);
const wa=`https://wa.me/${STORE.WHATSAPP_NUMBER}?text=${encodeURIComponent(`Hi, I want to order: ${p.name} x${qty} (shown price ${inr(p.price)})`)}`;
return(<div className="mx-auto max-w-7xl px-4 py-6"><div className="grid gap-8 md:grid-cols-2">
<ProductImage p={p} className="aspect-square w-full rounded-2xl"/>
<div><p className="text-sm text-slate-500">{p.brand}</p><h1 className="text-2xl font-bold">{p.name}</h1>
<div className="mt-2 flex items-baseline gap-3"><span className="text-3xl font-extrabold">{inr(p.price)}</span>{d>0&&<><span className="text-slate-400 line-through">{inr(p.originalPrice)}</span><span className="font-semibold text-green-600">{d}% off</span></>}</div>
<p className="text-xs text-slate-400">Sample price and discount, not verified.</p>
<p className={`mt-2 font-semibold ${p.inStock?'text-green-600':'text-red-600'}`}>{p.inStock?`In stock (sample: ${p.stock})`:'Out of stock'}</p>
<p className="mt-3">{p.description}</p>
<table className="mt-4 w-full text-sm"><tbody>{Object.entries(p.specs).map(([k,v])=><tr key={k} className="border-b"><th className="py-1 text-left font-medium">{k}</th><td>{v}</td></tr>)}</tbody></table>
<div className="mt-5 flex items-center gap-3"><button className="btn-o" aria-label="Decrease" onClick={()=>setQty(Math.max(1,qty-1))}>−</button><span>{qty}</span>
<button className="btn-o" aria-label="Increase" onClick={()=>setQty(Math.min(p.stock||1,qty+1))}>+</button></div>
<div className="mt-4 flex flex-wrap gap-3"><button disabled={!p.inStock} className="btn-p" onClick={()=>add(p.id,qty)}>Add to Cart</button>
<button disabled={!p.inStock} className="btn-y" onClick={()=>{add(p.id,qty);nav('/checkout');}}>Buy Now</button>
<button className="btn-o" onClick={()=>toggleWish(p.id)}><Heart size={16} className={wishlist.includes(p.id)?'fill-red-500 text-red-500':''}/>Wishlist</button>
{validWA&&<a className="btn-o" href={wa} target="_blank" rel="noreferrer"><MessageCircle size={16}/>Order on WhatsApp</a>}</div>
<p className="mt-4 rounded-lg bg-slate-100 p-3 text-sm">Delivery information: [placeholder, add delivery areas and timelines]</p></div></div>
{rel.length>0&&<><h2 className="mb-3 mt-10 text-xl font-bold">Related Products</h2><div className="grid grid-cols-2 gap-4 md:grid-cols-4">{rel.map(r=><ProductCard key={r.id} p={r}/>)}</div></>}</div>);}
