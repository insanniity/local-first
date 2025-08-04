import { Model } from '@nozbe/watermelondb';
import {
    children,
    date,
    field,
    nochange,
    readonly,
} from '@nozbe/watermelondb/decorators';

export default class Allocation extends Model {
    static table = 'allocations';
    static associations = {
        account_allocations: { type: 'has_many' as const, foreignKey: 'allocation_id' },
    };

    @field('income') income?: number;
    @readonly @date('created_at') createdAt?: Date;
    @readonly @date('updated_at') updatedAt?: Date;
    @nochange @field('user_id') userId?: string;

    @children('account_allocations') accountAllocations: any;
}
