// ALL DATA BELOW IS SAMPLE DATA: prices, discounts, stock and ratings are NOT verified business facts.
export const CATEGORIES=[
{slug:'led-lighting',name:'LED & Decorative Lighting'},{slug:'tube-emergency',name:'Tube & Emergency Lights'},
{slug:'switches-sockets',name:'Switches, Sockets & Boards'},{slug:'wires-cables',name:'Wires, Cables & Plugs'},
{slug:'fans',name:'Fans & Exhaust Fans'},{slug:'mcb-safety',name:'MCBs & Safety'},
{slug:'audio',name:'Home Theatres & Speakers'},{slug:'chargers-batteries',name:'Chargers, Adapters & Batteries'},
{slug:'appliances',name:'Home Appliances'}];
const P=(id,name,category,brand,price,originalPrice,stock,rating,specs,n)=>({id:String(id),name,category,brand,price,originalPrice,stock,
inStock:stock>0,rating,specs,image:null,createdAt:n,sample:true,description:`${name} by ${brand}. Sample description for demo purposes.`});
export const PRODUCTS=[
P(1,'9W LED Bulb Pack of 4','led-lighting','BrightCo',299,399,50,4.3,{Power:'9W',Base:'B22',Colour:'Cool white'},18),
P(2,'LED String Fairy Lights 10m','led-lighting','GlowMax',249,null,30,4.0,{Length:'10 m',Mode:'8 modes'},17),
P(3,'20W LED Batten Tube','tube-emergency','BrightCo',349,449,40,4.4,{Power:'20W',Length:'4 ft'},16),
P(4,'Rechargeable Emergency Light','tube-emergency','LumiSafe',599,799,12,4.1,{Backup:'4-6 hrs',Type:'LED'},15),
P(5,'6-Socket Extension Board 3m','switches-sockets','PowerLink',449,549,25,4.2,{Sockets:'6',Cord:'3 m',Surge:'Yes'},14),
P(6,'Modular 6A Switch','switches-sockets','Modula',55,null,200,4.5,{Rating:'6A',Type:'1-way'},13),
P(7,'1.5 sq mm Copper Wire 90m','wires-cables','CableKing',1850,2100,15,4.6,{Size:'1.5 sq mm',Length:'90 m',Core:'Copper'},12),
P(8,'3-Pin Plug Top 16A','wires-cables','PowerLink',60,null,0,3.9,{Rating:'16A'},11),
P(9,'1200mm Ceiling Fan','fans','AirWave',1999,2499,10,4.3,{Sweep:'1200 mm',Speed:'380 RPM'},10),
P(10,'6-inch Exhaust Fan','fans','AirWave',899,null,18,4.0,{Size:'6 inch'},9),
P(11,'32A Double Pole MCB','mcb-safety','SafeGuard',420,500,22,4.5,{Rating:'32A',Poles:'2'},8),
P(12,'Digital Voltage Stabilizer','mcb-safety','SafeGuard',1299,1599,8,4.2,{Range:'140-280V'},7),
P(13,'2.1 Home Theatre System','audio','SoundPro',2799,3499,9,4.1,{Output:'40W RMS',BT:'Yes'},6),
P(14,'Bluetooth Speaker','audio','SoundPro',999,1299,0,4.0,{Battery:'8 hrs'},5),
P(15,'20W Fast Charger','chargers-batteries','ChargeIt',699,899,60,4.4,{Output:'20W',Port:'USB-C'},4),
P(16,'AA Rechargeable Batteries (4)','chargers-batteries','ChargeIt',349,null,35,4.2,{Capacity:'2000 mAh'},3),
P(17,'Mixer Grinder 500W','appliances','HomeEase',2199,2799,11,4.3,{Power:'500W',Jars:'3'},2),
P(18,'Electric Kettle 1.5L','appliances','HomeEase',799,999,20,4.1,{Capacity:'1.5 L'},1)];

// ---- AUTO PRODUCT IMAGES ----
// Image ko src/assets/products/ folder me product ke id ke naam se rakho: 1.jpg, 2.png, 9.webp ...
// Koi path likhne ki zarurat nahi. Jis product ki image nahi hogi, uska icon dikhega.
const _imgs=import.meta.glob('/src/assets/products/*.{jpg,jpeg,png,webp,avif,JPG,JPEG,PNG,WEBP}',{eager:true,query:'?url',import:'default'});
const _byId={};
Object.entries(_imgs).forEach(([path,url])=>{const id=path.split('/').pop().replace(/\.[^.]+$/,'');_byId[id]=url;});
PRODUCTS.forEach(p=>{if(_byId[p.id])p.image=_byId[p.id];});
export const BRANDS=[...new Set(PRODUCTS.map(p=>p.brand))];
export const getProduct=id=>PRODUCTS.find(p=>p.id===id);
export const discount=p=>p.originalPrice&&p.originalPrice>p.price?Math.round(100-p.price/p.originalPrice*100):0;
