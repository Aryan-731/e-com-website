import {Routes,Route} from 'react-router-dom';
import Layout from './components/Layout';import Home from './pages/Home';import Products from './pages/Products';
import ProductDetail from './pages/ProductDetail';import Cart from './pages/Cart';import Checkout from './pages/Checkout';
import Contact from './pages/Contact';import {About,Offers,Login,Register,Profile,Orders,NotFound} from './pages/Simple';
export default function App(){return(<Routes><Route element={<Layout/>}>
<Route path="/" element={<Home/>}/><Route path="/products" element={<Products/>}/><Route path="/category/:slug" element={<Products/>}/>
<Route path="/product/:id" element={<ProductDetail/>}/><Route path="/cart" element={<Cart/>}/><Route path="/checkout" element={<Checkout/>}/>
<Route path="/login" element={<Login/>}/><Route path="/register" element={<Register/>}/><Route path="/profile" element={<Profile/>}/>
<Route path="/orders" element={<Orders/>}/><Route path="/contact" element={<Contact/>}/><Route path="/about" element={<About/>}/>
<Route path="/offers" element={<Offers/>}/><Route path="*" element={<NotFound/>}/></Route></Routes>);}
