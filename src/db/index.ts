import Account from '@/model/Account'
import AccountAllocation from '@/model/AccountAllocation'
import Allocation from '@/model/Allocation'
import { Database } from '@nozbe/watermelondb'
import SQLiteAdapter from '@nozbe/watermelondb/adapters/sqlite'
import { Platform } from 'react-native'
import migrations from './migrations'
import schema from './schema'

// First, create the adapter to the underlying database:
const adapter = new SQLiteAdapter({
    schema,
    // (You might want to comment it out for development purposes -- see Migrations documentation)
    migrations,
    // (optional database name or file system path)
    // dbName: 'myapp',
    // (recommended option, should work flawlessly out of the box on iOS. On Android,
    // additional installation steps have to be taken - disable if you run into issues...)
    jsi: Platform.OS === 'ios', /* Platform.OS === 'ios' */
    // (optional, but you should implement this method)
    onSetUpError: error => {
        console.error('WatermelonDB setup error:', error);
    }
})

// Then, make a Watermelon database from it!
const database = new Database({
    adapter,
    modelClasses: [Account, Allocation, AccountAllocation],
})

export default database;

export const accountsCollection = database.get<Account>('accounts');
export const allocationsCollection = database.get<Allocation>('allocations');
export const accountAllocationCollection = database.get<AccountAllocation>(
    'account_allocations'
);
