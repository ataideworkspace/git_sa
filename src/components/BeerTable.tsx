import { Grid, GridColumn, GridPageChangeEvent } from '@progress/kendo-react-grid';
import { useEffect, useState } from 'react';
import Beer from '../models/beers.model';
import BeerService from '../services/beers.service';

const BeerTable = () => {
  const beerService = new BeerService();
  interface PageState {
    skip: number;
    take: number;
  }

  const initialDataState: PageState = { skip: 0, take: 5 };
  const [page, setPage] = useState<PageState>(initialDataState);
  const [beers, setBeers] = useState<Beer[]>([]);
  const [filter, setFilter] = useState('');

  const pageChange = (event: GridPageChangeEvent) => {
    setPage(event.page);
  };

  useEffect(() => {
    const getBeers = async () => {
      const getBeers = await beerService.getBeers('');
      setBeers(getBeers);
    };
    getBeers();
  }, [filter]);

  const handleFilterButton = () => {
    setFilter('?abv_gt=8.5');
  };

  return (
    <>
      {beers && (
        <Grid
          style={{ height: '600' }}
          data={beers.slice(page.skip, page.take + page.skip)}
          skip={page.skip}
          take={page.take}
          total={beers.length}
          pageable={true}
          onPageChange={pageChange}>
          <GridColumn field='name' title='Name'></GridColumn>
          <GridColumn field='tagline' title='Line'></GridColumn>
          <GridColumn field='description' title='Description'></GridColumn>
          <GridColumn field='abv' title='ABV'></GridColumn>
        </Grid>
      )}
    </>
  );
};

export default BeerTable;
