export class Ai {
    id: number;
    url: string;
    model: string;

    constructor(id: number,url:string,model:string) {
        this.id = id;
        this.url = url;
        this.model=model;
    }
}
