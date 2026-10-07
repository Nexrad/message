import { describe, expect, it } from 'vitest';
import { getConversations, phoneKey, type DemoMessage } from '@/lib/messages';
const message=(id:string,phone:string,time:string):DemoMessage=>({id,phone,time,sender:'Abebe',content:id,date:'2026-10-07',unread:true});
describe('Local demo conversations',()=>{
 it('groups formatted phone numbers and orders messages chronologically',()=>{const groups=getConversations([message('late','0912 345 678','09:20'),message('early','0912345678','09:00')]);expect(groups).toHaveLength(1);expect(groups[0]?.messages.map(m=>m.id)).toEqual(['early','late']);expect(groups[0]?.latest.id).toBe('late');expect(groups[0]?.unread).toBe(2);});
 it('sorts conversations by their latest message',()=>{const groups=getConversations([message('a','994','08:00'),message('b','127','09:00')]);expect(groups.map(g=>g.phone)).toEqual(['127','994']);});
 it('removes empty conversations without removing sibling messages',()=>{const messages=[message('a','127','08:00'),message('b','127','09:00')];expect(getConversations(messages.filter(m=>m.id!=='a'))[0]?.messages).toHaveLength(1);expect(getConversations([])).toEqual([]);});
 it('normalizes only formatting, not distinct phone identities',()=>{expect(phoneKey('(0912) 345-678')).toBe('0912345678');expect(phoneKey('+251912345678')).not.toBe(phoneKey('0912345678'));});
});