import BaseService from './base.service';
import Beer from '../models/beers.model';

class BeerService extends BaseService {
  public constructor() {
    super('https://api.punkapi.com/v2');
  }

  public async getBeers(filter: string): Promise<Beer[]> {
    return await this.instance.get<Beer[]>(`/beers${filter}`).then((response) => {
      console.log(response);
      return response;
    });
  }

  public async getBeer(id: string): Promise<Beer> {
    return await this.instance.get<Beer>(`/beers/${id}`).then((response) => response.data);
  }
}

export default BeerService;
