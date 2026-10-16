import {Link} from 'react-router-dom';import {useTitle} from '../utils';import {STORE} from '../config';
const Box=({t,children})=>{useTitle(t);return<div className="mx-auto max-w-lg space-y-3 px-4 py-10"><h1 className="text-2xl font-bold">{t}</h1>{children}</div>;};
const Demo=()=><p className="rounded-lg bg-yellow-100 p-3 text-sm">DEMO only. Not real authentication. Passwords are never stored.</p>;
const AuthForm=({t,fields})=><Box t={t}><Demo/><form onSubmit={e=>{e.preventDefault();alert('Demo only: nothing was saved.');}} className="space-y-3">
{fields.map(([l,ty])=><label key={l} className="block text-sm">{l}<input required type={ty} className="inp mt-1"/></label>)}<button className="btn-p w-full">{t}</button></form></Box>;
export const Login=()=><AuthForm t="Login" fields={[['Email','email'],['Password','password']]}/>;
export const Register=()=><AuthForm t="Register" fields={[['Name','text'],['Email','email'],['Password','password']]}/>;
export const Profile=()=><Box t="Profile"><Demo/><p>No signed-in user. <Link to="/login" className="text-electric">Login (demo)</Link></p></Box>;
export const Orders=()=><Box t="Orders"><Demo/><p>No orders yet. Real order history needs a backend.</p></Box>;
export const About=()=><Box t="About"><p>{STORE.name} serves customers at {STORE.address}. {STORE.tagline}</p></Box>;
export const Offers=()=><Box t="Offers"><p>Sample offers only. Add real, verified offers here.</p><Link to="/products" className="btn-p">Shop discounted items</Link></Box>;
export const NotFound=()=><Box t="Page not found"><p>That page doesn't exist.</p><Link to="/" className="btn-p">Go Home</Link></Box>;
