// Auto-generated , DO NOT EDIT
import {Entity} from "@subql/types";
import assert from 'assert';


export class Member implements Entity {

    constructor(id: string) {
        this.id = id;
    }


    public id: string;

    public accountId: string;

    public locked?: bigint;

    public type: string;

    public status: string;

    public joinBlock?: bigint;

    public joinTime?: Date;

    public joinMotionIndex?: number;

    public elevatedBlock?: bigint;

    public elevatedTime?: Date;

    public elevatedMotionIndex?: number;

    public kickedBlock?: bigint;

    public kickedTime?: Date;

    public kickedMotionIndex?: number;

    public retiredBlock?: bigint;

    public retiredTime?: Date;

    public retiredMotionIndex?: number;


    async save(): Promise<void>{
        let id = this.id;
        assert(id !== null, "Cannot save Member entity without an ID");
        await store.set('Member', id.toString(), this);
    }
    static async remove(id:string): Promise<void>{
        assert(id !== null, "Cannot remove Member entity without an ID");
        await store.remove('Member', id.toString());
    }

    static async get(id:string): Promise<Member | undefined>{
        assert((id !== null && id !== undefined), "Cannot get Member entity without an ID");
        const record = await store.get('Member', id.toString());
        if (record){
            return Member.create(record);
        }else{
            return;
        }
    }



    static create(record){
        let entity = new Member(record.id);
        Object.assign(entity,record);
        return entity;
    }
}
