import { FormGroup } from "@angular/forms";
import { FilterSearch } from "./filter-search";
import { Reporter } from "./reporter";
import { HeaderReport } from "./header-report";
import { TableColumn } from "./table-column";

export class ReporterBuilder{
    _reporter:Reporter;

    constructor(){
        this._reporter = new Reporter();
        this._reporter.title = 'Relatório';
        this._reporter.orientation = 'p';
    }

    header(header:HeaderReport):ReporterBuilder{
        this._reporter.header = header;
        return this;
    }

    title(title:string):ReporterBuilder{
        this._reporter.title = title;
        return this;
    }

    formGroupFilters(formGroup:FormGroup):ReporterBuilder{
        this._reporter.valuesFilter = formGroup.value;
        return this;
    }

    listFilterSearch(listFilterSearch:FilterSearch[]):ReporterBuilder{
        this._reporter.listFilterSearch = listFilterSearch;
        return this;
    }

    columns(columns:TableColumn[]):ReporterBuilder{
        this._reporter.columns = columns;
        return this;
    }

    registers(registers:any[]):ReporterBuilder{
        this._reporter.registers = registers;
        return this;
    }

    footer(footer:string):ReporterBuilder{
        this._reporter.footer = footer;
        return this;
    }

    landscape():ReporterBuilder{
        this._reporter.orientation = 'l';
        return this;
    }

    build():Reporter{
        return this._reporter;
    }
}