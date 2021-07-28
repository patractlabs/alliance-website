// Auto-generated , DO NOT EDIT
import {Entity} from "@subql/types";
import assert from 'assert';


export class Rule implements Entity {

    constructor(id: string) {
        this.id = id;
    }


    public id: string;

    public cid: string;

    public createTime: Date;

    public motionIndex: string;


    async save(): Promise<void>{
        let id = this.id;
        assert(id !== null, "Cannot save Rule entity without an ID");
        await store.set('Rule', id.toString(), this);
    }
    static async remove(id:string): Promise<void>{
        assert(id !== null, "Cannot remove Rule entity without an ID");
        await store.remove('Rule', id.toString());
    }

    static async get(id:string): Promise<Rule | undefined>{
        assert((id !== null && id !== undefined), "Cannot get Rule entity without an ID");
        const record = await store.get('Rule', id.toString());
        if (record){
            return Rule.create(record);
        }else{
            return;
        }
    }



    static create(record){
        let entity = new Rule(record.id);
        Object.assign(entity,record);
        return entity;
    }
}
