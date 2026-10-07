import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';

export type DemoMessage = { id: string; sender: string; phone: string; content: string; date: string; time: string; unread: boolean };
const STORAGE_KEY = 'samsung-demo-messages-v1';
const receipt = (amount: string, pack: string, date: string, time: string, transaction: string, balance: string) => `Dear nesredn\nYou have paid ETB ${amount} for package ${pack} purchase made for 929422660 on ${date} ${time}. Your transaction number is ${transaction}. Your current balance is ETB ${balance}.To download your payment information please click this link: https://transactioninfo.ethiotelecom.et/receipt/${transaction}\nThank you for using telebirr\nEthio telecom`;
const seed: DemoMessage[] = [
 {id:'994-1',sender:'994',phone:'994',content:'Dear Customer As per your request the new service offer Daily Internet Package has been activated. Thank you for choosing Ethio telecom.',date:'2026-10-07',time:'08:26',unread:true},
 {id:'127-1',sender:'127',phone:'127',content:receipt('25.00','Daily Internet Package 720 MB','06/10/2026','21:12:00','PJ6IIOJ9JL','2,145.23'),date:'2026-10-06',time:'21:12',unread:false},
 {id:'127-2',sender:'127',phone:'127',content:receipt('25.00','Daily Internet Package 720 MB','06/10/2026','22:37:17','PJ6ZI3H2CC','2,120.23'),date:'2026-10-06',time:'22:37',unread:false},
 {id:'127-3',sender:'127',phone:'127',content:receipt('37.00','Internet Daily Package 1.2GB','07/10/2026','08:25:20','PJ75IBC9QJ','2,083.23'),date:'2026-10-07',time:'08:25',unread:true},
 {id:'251994-1',sender:'251994',phone:'251994',content:'Dear customer, You have finished internet plan of your Daily Internet package. You can purchase another package whenever you need.',date:'2026-10-07',time:'08:23',unread:true},
 {id:'beep-1',sender:'BeepCall710',phone:'710',content:'Dear Customer, you have received beep call request from 098794939. Please call back.',date:'2026-10-07',time:'07:51',unread:true},
 {id:'820-1',sender:'820',phone:'820',content:'Dear customer, thank you for using our services.',date:'2026-10-07',time:'06:46',unread:false},
];
export const phoneKey = (phone: string) => phone.replace(/[\s()-]/g, '');
export const messageOrder = (a: DemoMessage, b: DemoMessage) => `${a.date}T${a.time}`.localeCompare(`${b.date}T${b.time}`);
export function getConversations(messages: DemoMessage[]) {
 const groups = new Map<string, DemoMessage[]>();
 for (const m of messages) { const key = phoneKey(m.phone); groups.set(key, [...(groups.get(key) ?? []),m]); }
 return [...groups.entries()].map(([phone,items]) => { const sorted = [...items].sort(messageOrder); return {phone, messages:sorted, latest:sorted[sorted.length-1], unread:items.filter(m=>m.unread).length}; }).filter((g): g is typeof g & {latest:DemoMessage} => Boolean(g.latest)).sort((a,b)=>messageOrder(b.latest,a.latest));
}
type Store = { messages: DemoMessage[]; ready: boolean; error: string; save: (m: DemoMessage)=>boolean; remove: (id:string)=>void; markRead: (phone:string)=>void };
const Context = createContext<Store | null>(null);
export function MessagesProvider({children}:{children:ReactNode}) {
 const [messages,setMessages] = useState<DemoMessage[]>([]);
 const [ready,setReady] = useState(false);
 const [error,setError] = useState('');
 useEffect(()=>{try {const stored=localStorage.getItem(STORAGE_KEY); const data=stored ? JSON.parse(stored) : seed; if(!Array.isArray(data) || !data.every(m=>typeof m.id==='string' && typeof m.phone==='string' && typeof m.sender==='string' && typeof m.content==='string' && typeof m.date==='string' && typeof m.time==='string')) throw new Error('Invalid saved messages'); setMessages(data); if(!stored) localStorage.setItem(STORAGE_KEY,JSON.stringify(data));} catch {setError('Saved messages could not be loaded. Your browser must allow local storage.');} setReady(true);},[]);
 const update = (next:DemoMessage[]) => {try {localStorage.setItem(STORAGE_KEY,JSON.stringify(next)); setMessages(next); setError(''); return true;}catch {setError('Messages could not be saved. Your browser storage may be full or unavailable.');return false;}};
 return <Context.Provider value={{messages,ready,error,save:m=>update([...messages.filter(x=>x.id!==m.id),m]),remove:id=>{update(messages.filter(m=>m.id!==id));},markRead:phone=>{if(messages.some(m=>phoneKey(m.phone)===phone && m.unread)) update(messages.map(m=>phoneKey(m.phone)===phone?{...m,unread:false}:m));}}}>{children}</Context.Provider>;
}
export function useMessages() {const store=useContext(Context); if(!store) throw new Error('MessagesProvider is required'); return store;}