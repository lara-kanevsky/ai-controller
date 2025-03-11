export class Ai {
    id: number;
    url: string;
    model: string;
    ownerId:number
    key:string

    constructor(key:string,ownerId:number,id: number,url:string,model:string) {
        this.id = id;
        this.url = url;
        this.model=model;
        this.ownerId=ownerId
        this.key = key
    }
}
