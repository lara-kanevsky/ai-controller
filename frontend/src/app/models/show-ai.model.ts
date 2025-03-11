export class ShowAi {
    id: number;
    url: string;
    model: string;
    ownerId:number
    key:string
    isActive:boolean;
    errorMessage:string;
    

    constructor(key:string,ownerId:number,id: number,url:string,model:string,isActive:boolean,errorMessage:string) {
        this.id = id;
        this.url = url;
        this.model=model;
        this.ownerId=ownerId
        this.key = key
        this.isActive=isActive
        this.errorMessage=errorMessage
    }
}
