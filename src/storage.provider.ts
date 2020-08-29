import { Injectable } from "@angular/core";
import { FormGroup } from "@angular/forms";

@Injectable()
export class StorageProvider{

    private _stack:Array<any>;

    constructor(){
        this._stack = [];
    }

    public push(_component:string):void{
        this._stack.push({'component': _component});
    }

    public pop():void{
        this._stack.pop();
    }

    public hasStack(_component:string):boolean{
        
        for(let index in this._stack){
            if(this._stack[index]['component'] == _component){
                return true;
            }
        }

        return false;
        
    }

    public isTopStack(_component:string):boolean{

        if(this._stack.length == 0){
            return false;
        }

        if(this._stack[this._stack.length-1]['component'] == _component){
            return true;
        }

        return false;
    }

    public add(name:string, value:any):void{
        this._stack[this._stack.length-1][name] = value;
    }

    public remove(name:string):void{
        this._stack[this._stack.length-1][name] = null;
    }

    public get(name:string):any{
        return this._stack[this._stack.length-1][name];
    }

    public clear():void{
        this._stack[this._stack.length-1] = {};
    }

    public verifyStorage(component:string){
        if(!this.isTopStack(component)){
          this.push(component);
        }
    }

    public onChanges(formGroup:any){
        formGroup.valueChanges.subscribe((val:any) => {
            this.add('register', val);
        });
    }

}