export class FilterSearch{
    field:any; 
    header:string; 
    labelFunction?:Function; 
    fieldObject?:string;
    list?:any[];

    static getFormControls(listFilterSearch:FilterSearch[], register:any):any{
        let controls:any = {};
        listFilterSearch.forEach(criterio => {
            controls[criterio.field] = [(register && register[criterio.field]) || null];
        });
        return controls;
    }
}