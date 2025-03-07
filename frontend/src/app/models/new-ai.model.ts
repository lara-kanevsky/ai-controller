export class NewAi {
    url: string;
    model: string;
    ownerId:number
    key:string
    constructor(key:string,ownerId:number,url:string,model:string) {
        this.url = url;
        this.model=model;
        this.ownerId = ownerId;
        this.key = key
    }
}
