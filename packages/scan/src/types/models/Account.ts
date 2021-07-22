// Auto-generated , DO NOT EDIT
import {Entity} from "@subql/types";
import assert from 'assert';


export class Account implements Entity {

    constructor(id: string) {
        this.id = id;
    }


    public id: string;

    public address: string;

    public additional?: string;

    public display?: string;

    public legal?: string;

    public web?: string;

    public riot?: string;

    public email?: string;

    public pgpFingerprint?: string;

    public image?: string;

    public twitter?: string;


    async save(): Promise<void>{
        let id = this.id;
        assert(id !== null, "Cannot save Account entity without an ID");
        await store.set('Account', id.toString(), this);
    }
    static async remove(id:string): Promise<void>{
        assert(id !== null, "Cannot remove Account entity without an ID");
        await store.remove('Account', id.toString());
    }

    static async get(id:string): Promise<Account | undefined>{
        assert((id !== null && id !== undefined), "Cannot get Account entity without an ID");
        const record = await store.get('Account', id.toString());
        if (record){
            return Account.create(record);
        }else{
            return;
        }
    }


    static async getByAddress(address: string): Promise<Account | undefined>{
      
      const record = await store.getOneByField('Account', 'address', address);
      if (record){
          return Account.create(record);
      }else{
          return;
      }
      
    }


    static create(record){
        let entity = new Account(record.id);
        Object.assign(entity,record);
        return entity;
    }
}
