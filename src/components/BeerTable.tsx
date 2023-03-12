import { Grid, GridColumn as Column, GridPageChangeEvent } from '@progress/kendo-react-grid';
import { useEffect, useState } from 'react';
import { Switch, SwitchChangeEvent } from '@progress/kendo-react-inputs';
import Beer from '../models/beers.model';
import BeerService from '../services/beers.service';

const imgCell = (props: { dataItem: { image_url: string | undefined } }) => {
  return (
    <td style={{ textAlign: 'center' }}>
      <img src={props.dataItem.image_url} style={{ width: 40, height: 120 }} />
    </td>
  );
};

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

  useEffect(() => {
    const getBeers = async () => {
      const getBeers = await beerService.getBeers(filter);
      setBeers(getBeers);
    };
    getBeers();
  }, [filter]);

  const pageChange = (event: GridPageChangeEvent) => {
    setPage(event.page);
  };

  const handleChange = (event: SwitchChangeEvent) => {
    setChecked(event.target.value);

    checked ? setFilter('?abv_gt=8') : setFilter('');
  };

  const buttonCell = () => {
    return (
      <Switch
        onChange={handleChange}
        defaultChecked={checked}
        className='switch'
        onLabel={'< 8'}
        offLabel={'ABV'}
      />
    );
  };

  return (
    <>
      {beers && (
        <div className='tableBeers'>
          <h1 className='grades'>Our Beer Grades</h1>
          <Grid
            style={{ height: '500px' }}
            data={beers.slice(page.skip, page.take + page.skip)}
            skip={page.skip}
            take={page.take}
            total={beers.length}
            pageable={true}
            onPageChange={pageChange}>
            <Column field='name' title='Name'></Column>
            <Column field='tagline' title='Line'></Column>
            <Column field='description' title='Description'></Column>
            <Column field='image_url' cell={imgCell} title='Image'></Column>
            <Column field='abv' title='ABV' headerCell={buttonCell}></Column>
          </Grid>
        </div>
      )}
    </>
  );
};

export default BeerTable;
