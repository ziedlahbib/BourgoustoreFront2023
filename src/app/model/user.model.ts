import { Commande } from "./commande.model";
import { FileDB } from "./file-db.model";
import { Role } from "./role.model";

export class User {
    userId:Number;
    userName:String;
    active:Boolean;
    role:Role;
    tel:String;
    email:String;
    password:String;
    files:FileDB;
    cmd:Commande
}
