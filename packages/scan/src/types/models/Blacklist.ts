// Auto-generated , DO NOT EDIT
import {Entity} from "@subql/types";
import assert from 'assert';


export class Blacklist implements Entity {

    constructor(id: string) {
        this.id = id;
    }


    public id: string;

    public accountId?: string;

    public website?: string;

    public isAccount?: boolean;

    public addTime?: Date;

    public addBlock?: bigint;

    public removeTime?: Date;

    public removeBlock?: bigint;

    public addMotionIndex?: number;

    public removeMotionIndex?: number;


    async save(): Promise<void>{
        let id = this.id;
        assert(id !== null, "Cannot save Blacklist entity without an ID");
        await store.set('Blacklist', id.toString(), this);
    }
    static async remove(id:string): Promise<void>{
        assert(id !== null, "Cannot remove Blacklist entity without an ID");
        await store.remove('Blacklist', id.toString());
    }

    static async get(id:string): Promise<Blacklist | undefined>{
        assert((id !== null && id !== undefined), "Cannot get Blacklist entity without an ID");
        const record = await store.get('Blacklist', id.toString());
        if (record){
            return Blacklist.create(record);
        }else{
            return;
        }
    }



    static create(record){
        let entity = new Blacklist(record.id);
        Object.assign(entity,record);
        return entity;
    }
}
