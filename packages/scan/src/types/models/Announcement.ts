// Auto-generated , DO NOT EDIT
import {Entity} from "@subql/types";
import assert from 'assert';


export class Announcement implements Entity {

    constructor(id: string) {
        this.id = id;
    }


    public id: string;

    public cid: string;

    public createTime: Date;

    public createBlock: bigint;

    public motionHash: string;


    async save(): Promise<void>{
        let id = this.id;
        assert(id !== null, "Cannot save Announcement entity without an ID");
        await store.set('Announcement', id.toString(), this);
    }
    static async remove(id:string): Promise<void>{
        assert(id !== null, "Cannot remove Announcement entity without an ID");
        await store.remove('Announcement', id.toString());
    }

    static async get(id:string): Promise<Announcement | undefined>{
        assert((id !== null && id !== undefined), "Cannot get Announcement entity without an ID");
        const record = await store.get('Announcement', id.toString());
        if (record){
            return Announcement.create(record);
        }else{
            return;
        }
    }



    static create(record){
        let entity = new Announcement(record.id);
        Object.assign(entity,record);
        return entity;
    }
}
