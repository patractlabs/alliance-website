// Auto-generated , DO NOT EDIT
import {Entity} from "@subql/types";
import assert from 'assert';


export class Candidate implements Entity {

    constructor(id: string) {
        this.id = id;
    }


    public id: string;

    public accountId: string;

    public locked?: bigint;

    public nominatorId?: string;

    public applyTime?: Date;

    public applyBlock?: bigint;

    public applyExtrinsic?: number;


    async save(): Promise<void>{
        let id = this.id;
        assert(id !== null, "Cannot save Candidate entity without an ID");
        await store.set('Candidate', id.toString(), this);
    }
    static async remove(id:string): Promise<void>{
        assert(id !== null, "Cannot remove Candidate entity without an ID");
        await store.remove('Candidate', id.toString());
    }

    static async get(id:string): Promise<Candidate | undefined>{
        assert((id !== null && id !== undefined), "Cannot get Candidate entity without an ID");
        const record = await store.get('Candidate', id.toString());
        if (record){
            return Candidate.create(record);
        }else{
            return;
        }
    }



    static create(record){
        let entity = new Candidate(record.id);
        Object.assign(entity,record);
        return entity;
    }
}
