// Auto-generated , DO NOT EDIT
import {Entity} from "@subql/types";
import assert from 'assert';


export class Motion implements Entity {

    constructor(id: string) {
        this.id = id;
    }


    public id: string;

    public hash?: string;

    public type?: string;

    public extrinisc?: string;

    public proposerId?: string;

    public index?: bigint;

    public createTime?: Date;

    public closeTime?: Date;


    async save(): Promise<void>{
        let id = this.id;
        assert(id !== null, "Cannot save Motion entity without an ID");
        await store.set('Motion', id.toString(), this);
    }
    static async remove(id:string): Promise<void>{
        assert(id !== null, "Cannot remove Motion entity without an ID");
        await store.remove('Motion', id.toString());
    }

    static async get(id:string): Promise<Motion | undefined>{
        assert((id !== null && id !== undefined), "Cannot get Motion entity without an ID");
        const record = await store.get('Motion', id.toString());
        if (record){
            return Motion.create(record);
        }else{
            return;
        }
    }



    static create(record){
        let entity = new Motion(record.id);
        Object.assign(entity,record);
        return entity;
    }
}
