import { render, screen } from '@testing-library/react';

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

  test('should snapshot with data', () => {
    const container = render(
      <DataTable headerColumns={columns} articles={articleList} loading={false} />
    );
    expect(container).toMatchSnapshot();
  });

  test('component is succesfully render', async () => {
    render(<DataTable headerColumns={columns} articles={articleList} loading={false} />);
    const dataTableElement = await screen.getByTestId('dataTable');

    expect(dataTableElement).toBeInTheDocument();
    expect(screen.getByText('Article title')).toBeInTheDocument();
    expect(screen.getByText('Perex')).toBeInTheDocument();
    expect(screen.getByText('Test title')).toBeInTheDocument();
  });
});
