import { ComponentFilterSearch } from "../component-filter-search";

export class FilterSearch{
    field:any; 
    header:string; 
    labelFunction?:Function; 
    fieldObject?:string;
    componentFilterSearch?:ComponentFilterSearch;

    static getFormControls(listFilterSearch:FilterSearch[], register:any):any{
        let controls:any = {};
        listFilterSearch.forEach(criterio => {
            controls[criterio.field] = [(register && register[criterio.field]) || null];
        });
        return controls;
    }
}