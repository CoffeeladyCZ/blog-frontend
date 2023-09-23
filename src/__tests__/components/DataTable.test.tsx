import { render, screen } from '@testing-library/react';
import { I18nextProvider } from 'react-i18next';
import i18next from '../../i18n/config';

import { articleList } from '../../TestObjects';

import DataTable from '../../components/DataTable';

describe('DataTable', () => {
  const columns = [
    { field: 'title', headerName: 'Article title', flex: 1 },
    { field: 'perex', headerName: 'Perex', flex: 2 },
    { field: 'author', headerName: 'Author', flex: 1 },
    {
      field: 'actions',
      headerName: 'Actions',
      flex: 1,
      renderCell: () => <></>
    }
  ];

  beforeEach(async () => {
    render(
      <I18nextProvider i18n={i18next}>
        <DataTable headerColumns={columns} articles={articleList} loading={false} />
      </I18nextProvider>
    );
  });

  test('should snapshot with data', () => {
    const { asFragment } = render(
      <I18nextProvider i18n={i18next}>
        <DataTable headerColumns={columns} articles={articleList} loading={false} />
      </I18nextProvider>
    );
    expect(asFragment).toMatchSnapshot();
  });

  test('component is succesfully render', async () => {
    const dataTableElement = await screen.getByTestId('dataTable');

    expect(dataTableElement).toBeInTheDocument();
    expect(screen.getByText('Article title')).toBeInTheDocument();
    expect(screen.getByText('Perex')).toBeInTheDocument();
    expect(screen.getByText('Test title')).toBeInTheDocument();
  });
});
