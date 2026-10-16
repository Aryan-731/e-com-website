import {STORE,validWA} from '../config';import {useTitle} from '../utils';
export default function Contact(){useTitle('Contact');return(<div className="mx-auto max-w-3xl space-y-3 px-4 py-8"><h1 className="text-2xl font-bold">Contact Us</h1>
<p><b>Address:</b> {STORE.address}</p><p><b>Phone:</b> {STORE.phone}</p><p><b>Email:</b> {STORE.email}</p><p><b>Hours:</b> {STORE.hours}</p>
<p className="text-sm text-slate-500">Edit these details in src/config.js.</p>
{validWA&&<a className="btn-p" target="_blank" rel="noreferrer" href={`https://wa.me/${STORE.WHATSAPP_NUMBER}`}>Chat on WhatsApp</a>}</div>);}
