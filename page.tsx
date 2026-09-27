import Dashboard from '@/components/Dashboard';
import {getTerritories} from '@/providers/data';
export default async function Page(){return <Dashboard tokens={await getTerritories()}/>}
