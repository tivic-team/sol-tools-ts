export class LocalStorage{
    static localStorage:Storage = window.localStorage;
    constructor(){}
    put(name:string, value:any):void {
        /* console.log('value 1 = ', value)
        console.log('teste = ', Utils.isJSON(value))
        console.log('JSON.stringify(value) = ', JSON.stringify(value))
        value = Utils.isJSON(value) ? JSON.stringify(value) : value;
        console.log('value 2 = ', value) */
        LocalStorage.localStorage.setItem(name, JSON.stringify(value));
    }

    get(name:any):any {
        let s = LocalStorage.localStorage.getItem(name);
        /* console.log('s = ', s) */
        return JSON.parse(s);
    }

    getAsInstance(name:string, instance:Function):object {
        return ObjectUtils.getInstanceByString(JSON.stringify(this.get(name)), instance);
    }

    remove(name:any):void {
        LocalStorage.localStorage.removeItem(name);
    }

    removeAll():any {
        /* console.log('chegou'); */
        LocalStorage.localStorage.clear();
        /* console.log('this.localStorage = ', LocalStorage.localStorage) */
    }

}