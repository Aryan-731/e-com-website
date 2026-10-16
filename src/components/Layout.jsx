import {useState} from 'react';import {Link,NavLink,Outlet,useNavigate,useLocation} from 'react-router-dom';
import {Search,Heart,ShoppingCart,User,Menu,X,Zap,MapPin,Phone,Home} from 'lucide-react';
import {useStore} from '../store/useStore';import {STORE} from '../config';import {CATEGORIES} from '../data/products';
const Badge=({n})=>n>0?<span className="absolute -right-1.5 -top-1.5 grid h-5 min-w-5 place-items-center rounded-full bg-volt px-1 text-[10px] font-bold text-navy">{n}</span>:null;
export default function Layout(){const [open,setOpen]=useState(false);const [q,setQ]=useState('');const nav=useNavigate();const {pathname}=useLocation();
const {cart,wishlist}=useStore();const count=cart.reduce((s,i)=>s+i.qty,0);
const go=e=>{e.preventDefault();nav(`/products?q=${encodeURIComponent(q)}`);setOpen(false);};
const lk=({isActive})=>`whitespace-nowrap py-3 text-[13px] font-semibold transition border-b-2 ${isActive?'border-electric text-electric':'border-transparent text-slate-600 hover:text-electric'}`;
return(<div className="flex min-h-screen flex-col">
<div className="hidden bg-navy-950 text-xs text-slate-300 md:block"><div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-2">
<span className="flex items-center gap-1.5"><MapPin size={13} className="text-volt"/>Rajason Chowk, Mahanar Road, Hajipur</span>
<span className="flex items-center gap-4"><span className="flex items-center gap-1.5"><Phone size={13} className="text-volt"/>{STORE.phone}</span><Link to="/offers" className="font-semibold text-volt">Offers (demo)</Link></span></div></div>
<header className="sticky top-0 z-30 border-b border-slate-200/70 bg-white/85 backdrop-blur-xl">
<div className="mx-auto flex max-w-7xl items-center gap-3 px-4 py-3 md:gap-6">
<button className="md:hidden" aria-label="Menu" onClick={()=>setOpen(!open)}>{open?<X/>:<Menu/>}</button>
<Link to="/" className="flex items-center gap-2.5"><span className="grid h-10 w-10 place-items-center rounded-xl bg-navy text-volt shadow-soft"><Zap size={20} fill="currentColor"/></span>
<span className="hidden leading-tight sm:block"><b className="font-display text-[15px]">Nirbhay</b><span className="block text-[11px] font-medium text-slate-500">Electric & Electronic</span></span></Link>
<form onSubmit={go} role="search" className="relative mx-auto flex-1 md:max-w-xl"><Search size={17} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"/>
<input value={q} onChange={e=>setQ(e.target.value)} aria-label="Search products" placeholder="Search bulbs, fans, MCBs, brands..." className="inp !rounded-full !bg-slate-100 !py-2.5 !pl-11 !border-transparent"/></form>
<div className="flex items-center gap-1">
<Link to="/profile" aria-label="Account" className="grid h-10 w-10 place-items-center rounded-full hover:bg-slate-100"><User size={20}/></Link>
<Link to="/products" aria-label="Wishlist" className="relative grid h-10 w-10 place-items-center rounded-full hover:bg-slate-100"><Heart size={20}/><Badge n={wishlist.length}/></Link>
<Link to="/cart" aria-label="Cart" className="relative grid h-10 w-10 place-items-center rounded-full bg-navy text-white hover:bg-electric"><ShoppingCart size={18}/><Badge n={count}/></Link></div></div>
<nav aria-label="Categories" className={`${open?'block':'hidden'} border-t border-slate-100 md:block`}><div className="mx-auto flex max-w-7xl flex-col gap-x-6 overflow-x-auto px-4 md:flex-row">
<NavLink to="/products" end className={lk} onClick={()=>setOpen(false)}>All Products</NavLink>
{CATEGORIES.map(c=><NavLink key={c.slug} to={`/category/${c.slug}`} className={lk} onClick={()=>setOpen(false)}>{c.name}</NavLink>)}</div></nav></header>
<main className="flex-1">{pathname!=='/'&&<div className="mx-auto max-w-7xl px-4 pt-4"><Link to="/" className="inline-flex items-center gap-2 rounded-full bg-navy px-4 py-2 text-sm font-semibold text-white shadow-soft transition hover:bg-electric"><Home size={16}/>Go to Home</Link></div>}<Outlet/></main>
<footer className="mt-16 bg-navy-950 text-slate-400"><div className="mx-auto grid max-w-7xl gap-8 px-4 py-12 text-sm md:grid-cols-4">
<div className="md:col-span-2"><div className="flex items-center gap-2 font-display text-lg font-bold text-white"><Zap className="text-volt" fill="currentColor"/>{STORE.name}</div>
<p className="mt-2 max-w-sm">{STORE.tagline}</p><p className="mt-3 flex gap-2"><MapPin size={16} className="mt-0.5 shrink-0 text-volt"/>{STORE.address}</p></div>
<div><h4 className="mb-2 font-semibold text-white">Contact</h4><p>{STORE.phone}</p><p>{STORE.email}</p><p>{STORE.hours}</p></div>
<div><h4 className="mb-2 font-semibold text-white">Explore</h4><ul className="space-y-1"><li><Link to="/about" className="hover:text-white">About</Link></li><li><Link to="/contact" className="hover:text-white">Contact</Link></li><li><Link to="/offers" className="hover:text-white">Offers</Link></li><li><Link to="/orders" className="hover:text-white">Orders (demo)</Link></li></ul></div></div>
<p className="border-t border-white/10 py-4 text-center text-xs">Demo storefront. Products, prices and reviews are sample data.</p></footer></div>);}

