import {Link} from 'react-router-dom';import {Heart,Star,ShoppingCart,Zap} from 'lucide-react';
import {useStore} from '../store/useStore';import {inr} from '../utils';import {discount} from '../data/products';import {CAT_ICONS} from './icons';
export function ProductImage({p,className=''}){const Icon=CAT_ICONS[p.category]||Zap;
return p.image?<img src={p.image} alt={p.name} loading="lazy" className={className} onError={e=>{e.currentTarget.style.display='none'}}/>:
<div role="img" aria-label={p.name} className={`flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-amber-50 text-electric ${className}`}><Icon size={44} strokeWidth={1.5}/></div>;}
export default function ProductCard({p}){const {add,toggleWish,wishlist}=useStore();const w=wishlist.includes(p.id);const d=discount(p);
return(<article className="card group relative flex flex-col p-3 transition duration-300 hover:-translate-y-1 hover:shadow-lift">
{d>0&&<span className="absolute left-5 top-5 z-10 rounded-full bg-volt px-2.5 py-0.5 text-[11px] font-bold text-navy">{d}% OFF</span>}
<button aria-label="Toggle wishlist" onClick={()=>toggleWish(p.id)} className="absolute right-5 top-5 z-10 grid h-8 w-8 place-items-center rounded-full bg-white/90 shadow backdrop-blur transition hover:scale-110"><Heart size={15} className={w?'fill-red-500 text-red-500':'text-slate-500'}/></button>
<Link to={`/product/${p.id}`} className="block overflow-hidden rounded-xl"><ProductImage p={p} className="aspect-square w-full object-cover transition duration-500 group-hover:scale-105"/></Link>
<div className="flex flex-1 flex-col px-1 pt-3"><p className="text-[11px] font-semibold uppercase tracking-wider text-electric">{p.brand}</p>
<Link to={`/product/${p.id}`}><h3 className="mt-0.5 line-clamp-2 min-h-[2.5rem] font-sans text-sm font-semibold leading-snug">{p.name}</h3></Link>
{p.rating&&<p className="mt-1 flex items-center gap-1 text-xs text-slate-500"><Star size={12} className="fill-volt text-volt"/>{p.rating}<span className="text-slate-400">· sample</span></p>}
<div className="mt-auto flex items-end justify-between pt-3"><div><span className="text-lg font-extrabold">{inr(p.price)}</span>{d>0&&<span className="ml-1.5 text-xs text-slate-400 line-through">{inr(p.originalPrice)}</span>}</div>
<button disabled={!p.inStock} onClick={()=>add(p.id)} aria-label={`Add ${p.name} to cart`} className="grid h-10 w-10 place-items-center rounded-xl bg-navy text-white transition hover:bg-electric disabled:bg-slate-300"><ShoppingCart size={17}/></button></div>
{!p.inStock&&<p className="mt-1 text-xs font-semibold text-red-600">Out of stock</p>}</div></article>);}
