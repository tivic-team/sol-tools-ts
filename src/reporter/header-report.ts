export class HeaderReport{
    base64Img:string;
    headerTitle1:string;
    headerTitle2:string;
    headerTitle3:string;

    constructor(data: {base64Img?:string, headerTitle1?:string, headerTitle2?:string, headerTitle3?:string}){
        this.base64Img = data && data.base64Img;
        this.headerTitle1 = data && data.headerTitle1;
        this.headerTitle2 = data && data.headerTitle2;
        this.headerTitle3 = data && data.headerTitle3;
    }
}