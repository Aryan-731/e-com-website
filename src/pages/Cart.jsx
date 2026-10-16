import {Link} from 'react-router-dom';import {Trash2} from 'lucide-react';import {useStore,cartLines} from '../store/useStore';import {inr,useTitle} from '../utils';import {ProductImage} from '../components/ProductCard';
export default function Cart(){useTitle('Cart');const {cart,setQty,remove}=useStore();const lines=cartLines(cart);
const sub=lines.reduce((s,l)=>s+l.price*l.qty,0);const save=lines.reduce((s,l)=>s+(l.originalPrice?(l.originalPrice-l.price)*l.qty:0),0);
if(!lines.length)return<div className="p-16 text-center"><p>Your cart is empty.</p><Link to="/products" className="btn-p mt-4">Continue Shopping</Link></div>;
return(<div className="mx-auto grid max-w-7xl gap-6 px-4 py-6 md:grid-cols-3"><div className="space-y-3 md:col-span-2"><h1 className="text-2xl font-bold">Cart</h1>
{lines.map(l=><div key={l.id} className="flex items-center gap-3 rounded-2xl bg-white p-3 shadow-sm"><ProductImage p={l} className="h-16 w-16 rounded-lg"/>
<div className="flex-1"><Link to={`/product/${l.id}`} className="font-semibold">{l.name}</Link><p className="text-sm">{inr(l.price)}</p></div>
<button className="btn-o !px-3" aria-label="Decrease" onClick={()=>setQty(l.id,l.qty-1)}>−</button><span>{l.qty}</span>
<button className="btn-o !px-3" aria-label="Increase" disabled={l.qty>=l.stock} onClick={()=>setQty(l.id,l.qty+1)}>+</button>
<button aria-label="Remove" onClick={()=>remove(l.id)}><Trash2 size={18}/></button></div>)}</div>
<aside className="h-fit rounded-2xl bg-white p-5 shadow-sm"><p className="flex justify-between">Subtotal<b>{inr(sub)}</b></p>
{save>0&&<p className="flex justify-between text-sm text-green-600">Sample discount<span>−{inr(save)} vs. list</span></p>}
<p className="mt-2 flex justify-between text-lg font-bold">Total<span>{inr(sub)}</span></p>
<Link to="/checkout" className="btn-y mt-4 w-full">Proceed to Checkout</Link><Link to="/products" className="btn-o mt-2 w-full">Continue Shopping</Link></aside></div>);}
