import baseAPI from "./api";

class ShortenerService {
    constructor(props){
        this.api = baseAPI("http://localhost:3001/");
    }

    // Services funcions
    async getLink(code){
        const result = await this.api.get(`links/${code}`);
        return result.data;
    }

    async getStats(code){
        const result = await this.api.get(`links/${code}/stats`);
        return result.data;
    } 
    
    async generate(model){
        const result = await this.api.post(`links`,model);
        return result.data;
    }     

}

export default ShortenerService;