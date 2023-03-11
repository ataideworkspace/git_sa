import { Grid, GridColumn, GridPageChangeEvent } from '@progress/kendo-react-grid';
import { useEffect, useState } from 'react';
import Beer from '../models/beers.model';
import BeerService from '../services/beers.service';
import { Switch, SwitchChangeEvent } from '@progress/kendo-react-inputs';

const BeerTable = () => {
  const beerService = new BeerService();
  interface PageState {
    skip: number;
    take: number;
  }

  const initialDataState: PageState = { skip: 0, take: 5 };
  const [page, setPage] = useState<PageState>(initialDataState);
  const [beers, setBeers] = useState<Beer[]>([]);
  const [filter, setFilter] = useState<string>('');
  const [checked, setChecked] = useState<boolean>(true);

  const pageChange = (event: GridPageChangeEvent) => {
    setPage(event.page);
  };

  useEffect(() => {
    const getBeers = async () => {
      const getBeers = await beerService.getBeers(filter);
      setBeers(getBeers);
    };
    getBeers();
  }, [filter]);

  const handleChange = (event: SwitchChangeEvent) => {
    const checked = event.target.value;
    checked ? setFilter('?abv_gt=8') : setFilter('');
  };

  return (
    <>
      {beers && (
        <>
          <Switch onChange={handleChange} defaultChecked={checked} />
          <Grid
            style={{ height: '500px' }}
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
        </>
      )}
    </>
  );
};

export default BeerTable;
