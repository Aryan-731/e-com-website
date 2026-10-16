import {useState,useMemo} from 'react';import {useParams,useSearchParams,Link} from 'react-router-dom';
import ProductCard from '../components/ProductCard';import {CATEGORIES,PRODUCTS} from '../data/products';import {useTitle} from '../utils';
export default function Products(){const {slug}=useParams();const [sp,setSp]=useSearchParams();const q=sp.get('q')||'';
const [cat,setCat]=useState('');const [max,setMax]=useState(5000);const [stock,setStock]=useState(false);const [sort,setSort]=useState('popular');
const c=slug||cat;const known=!slug||CATEGORIES.some(x=>x.slug===slug);const title=CATEGORIES.find(x=>x.slug===slug)?.name||'All Products';useTitle(title);
const list=useMemo(()=>{let l=PRODUCTS.filter(p=>(!c||p.category===c)&&p.price<=max&&(!stock||p.inStock)&&(`${p.name} ${p.brand}`.toLowerCase().includes(q.toLowerCase())));
const s={low:(a,b)=>a.price-b.price,high:(a,b)=>b.price-a.price,popular:(a,b)=>b.rating-a.rating,newest:(a,b)=>b.createdAt-a.createdAt}[sort];return l.sort(s);},[c,max,stock,sort,q]);
const clear=()=>{setCat('');setMax(5000);setStock(false);setSort('popular');setSp({});};
if(!known)return<p className="p-10 text-center">Category not found. <Link to="/products" className="text-electric">Browse all</Link></p>;
return(<div className="mx-auto max-w-7xl px-4 py-6"><h1 className="mb-4 text-2xl font-bold">{title}{q&&` — "${q}"`}</h1>
<div className="mb-5 grid gap-3 rounded-2xl bg-white p-4 shadow-sm md:grid-cols-5">
<input className="inp" aria-label="Search" placeholder="Search" value={q} onChange={e=>setSp(e.target.value?{q:e.target.value}:{})}/>
{!slug&&<select className="inp" aria-label="Category" value={cat} onChange={e=>setCat(e.target.value)}><option value="">All categories</option>{CATEGORIES.map(x=><option key={x.slug} value={x.slug}>{x.name}</option>)}</select>}
<label className="text-sm">Max price ₹{max}<input type="range" min="100" max="5000" step="100" value={max} onChange={e=>setMax(+e.target.value)} className="w-full"/></label>
<label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={stock} onChange={e=>setStock(e.target.checked)}/>In stock only</label>
<select className="inp" aria-label="Sort" value={sort} onChange={e=>setSort(e.target.value)}><option value="popular">Popularity</option><option value="newest">Newest</option><option value="low">Price: Low to High</option><option value="high">Price: High to Low</option></select>
<button onClick={clear} className="btn-o">Clear all filters</button></div>
{list.length?<div className="grid grid-cols-2 gap-4 md:grid-cols-4">{list.map(p=><ProductCard key={p.id} p={p}/>)}</div>:
<div className="rounded-2xl bg-white p-10 text-center"><p>No products match your search.</p><button onClick={clear} className="btn-p mt-3">Clear filters</button></div>}</div>);}
