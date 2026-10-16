import {useState} from 'react';import {Link} from 'react-router-dom';import {useStore,cartLines} from '../store/useStore';import {inr,useTitle} from '../utils';
// Payment is isolated here so a backend can later: create Razorpay order, verify signature, record order.
const paymentService={async placeOrder(){return{demo:true};}};
export default function Checkout(){useTitle('Checkout');const {cart}=useStore();const lines=cartLines(cart);const total=lines.reduce((s,l)=>s+l.price*l.qty,0);
const [f,setF]=useState({name:'',phone:'',address:'',city:'',state:'',pin:'',pay:'cod'});const [err,setErr]=useState({});const [done,setDone]=useState(false);
const set=k=>e=>setF({...f,[k]:e.target.value});
const submit=async e=>{e.preventDefault();const x={};if(f.name.trim().length<2)x.name='Enter your name';if(!/^[6-9]\d{9}$/.test(f.phone))x.phone='Enter a valid 10-digit mobile number';
if(f.address.trim().length<5)x.address='Enter your address';if(!f.city.trim())x.city='Required';if(!f.state.trim())x.state='Required';if(!/^\d{6}$/.test(f.pin))x.pin='6-digit PIN';
setErr(x);if(Object.keys(x).length)return;await paymentService.placeOrder(f,lines);setDone(true);};
if(done)return<div className="mx-auto max-w-lg p-10 text-center"><h1 className="text-2xl font-bold">Demo order preview</h1>
<p className="mt-3 rounded-lg bg-yellow-100 p-4 text-sm">DEMO: No real order or payment was created. Real payments and order placement require a secure backend.</p><Link to="/" className="btn-p mt-4">Back to Home</Link></div>;
if(!lines.length)return<div className="p-16 text-center">Your cart is empty. <Link to="/products" className="text-electric">Shop</Link></div>;
const fld=(k,l,t='text')=><label className="block text-sm">{l}<input type={t} className="inp mt-1" value={f[k]} onChange={set(k)} aria-invalid={!!err[k]}/>{err[k]&&<span className="text-red-600">{err[k]}</span>}</label>;
return(<form onSubmit={submit} noValidate className="mx-auto grid max-w-7xl gap-6 px-4 py-6 md:grid-cols-3"><div className="space-y-3 md:col-span-2">
<h1 className="text-2xl font-bold">Checkout <span className="rounded bg-yellow-200 px-2 text-xs">DEMO</span></h1>
<p className="rounded-lg bg-yellow-100 p-3 text-sm">Demo only. Real payments and orders need a secure backend. Do not enter card details anywhere.</p>
{fld('name','Full name')}{fld('phone','Phone','tel')}{fld('address','Delivery address')}<div className="grid grid-cols-3 gap-3">{fld('city','City')}{fld('state','State')}{fld('pin','PIN code')}</div>
<fieldset className="space-y-2"><legend className="font-semibold">Payment</legend>
{[['cod','Cash on Delivery'],['razorpay','Razorpay online payment (backend required)']].map(([v,l])=><label key={v} className="flex gap-2"><input type="radio" name="pay" checked={f.pay===v} onChange={()=>setF({...f,pay:v})}/>{l}</label>)}</fieldset></div>
<aside className="h-fit rounded-2xl bg-white p-5 shadow-sm"><h2 className="font-bold">Summary</h2>{lines.map(l=><p key={l.id} className="flex justify-between text-sm"><span>{l.name} ×{l.qty}</span>{inr(l.price*l.qty)}</p>)}
<p className="mt-2 flex justify-between font-bold">Total<span>{inr(total)}</span></p><button className="btn-y mt-4 w-full">Place Demo Order</button></aside></form>);}
