// Auto-generated , DO NOT EDIT
import {Entity} from "@subql/types";
import assert from 'assert';


export class MotionAction implements Entity {

    constructor(id: string) {
        this.id = id;
    }


    public id: string;

    public motionIndex: number;

    public accountId: string;

    public approve?: boolean;

    public block?: bigint;


    async save(): Promise<void>{
        let id = this.id;
        assert(id !== null, "Cannot save MotionAction entity without an ID");
        await store.set('MotionAction', id.toString(), this);
    }
    static async remove(id:string): Promise<void>{
        assert(id !== null, "Cannot remove MotionAction entity without an ID");
        await store.remove('MotionAction', id.toString());
    }

    static async get(id:string): Promise<MotionAction | undefined>{
        assert((id !== null && id !== undefined), "Cannot get MotionAction entity without an ID");
        const record = await store.get('MotionAction', id.toString());
        if (record){
            return MotionAction.create(record);
        }else{
            return;
        }
    }



    static create(record){
        let entity = new MotionAction(record.id);
        Object.assign(entity,record);
        return entity;
    }
}
