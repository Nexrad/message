import { createFileRoute, Link } from '@tanstack/react-router';
import { MessageCirclePlus } from 'lucide-react';
import { ChevronRight, Header, metadata, PhoneShell } from '@/components/messages-ui';
export const Route=createFileRoute('/settings')({head:()=>metadata('Settings','Manage your demo messages.'),component:SettingsPage});
function SettingsPage(){return <PhoneShell><Header title="Settings"/><div className="app-content"><div className="settings-list"><Link to="/demo-messages" className="settings-link"><MessageCirclePlus/>Demo Messages<ChevronRight/></Link></div></div></PhoneShell>;}