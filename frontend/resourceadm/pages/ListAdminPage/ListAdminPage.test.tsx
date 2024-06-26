import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import { textMock } from '../../../testing/mocks/i18nMock';
import { queriesMock } from 'app-shared/mocks/queriesMock';
import { ListAdminPage } from './ListAdminPage';
import { ServicesContextProps, ServicesContextProvider } from 'app-shared/contexts/ServicesContext';
import { createQueryClientMock } from 'app-shared/mocks/queryClientMock';

const accessListResults = [
  { env: 'tt02', identifier: 'listid', name: 'Test-list', description: 'Test-list description' },
];

const mockedNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedNavigate,
  useParams: () => {
    return {
      selectedContext: 'ttd',
      env: 'tt02',
    };
  },
}));

describe('ListAdminPage', () => {
  afterEach(jest.clearAllMocks);

  it('should show lists after environment is selected', async () => {
    renderListAdminPage();

    expect(await screen.findByText('Test-list')).toBeInTheDocument();
  });

  it('should change environment on toggle button click', async () => {
    const user = userEvent.setup();
    renderListAdminPage();

    const prodEnvButton = screen.getByText(textMock('resourceadm.deploy_prod_env'));
    await act(() => user.click(prodEnvButton));

    expect(mockedNavigate).toHaveBeenCalled();
  });

  it('should show create dialog when create new button is clicked', async () => {
    const user = userEvent.setup();
    renderListAdminPage();

    const createNewButton = screen.getByText(textMock('resourceadm.listadmin_create_list'));
    await act(() => user.click(createNewButton));

    expect(
      screen.getByText(textMock('resourceadm.listadmin_create_list_header', { env: 'TT02' })),
    ).toBeInTheDocument();
  });
});

const renderListAdminPage = () => {
  const allQueries: ServicesContextProps = {
    ...queriesMock,
    getAccessLists: jest.fn().mockImplementation(() => Promise.resolve(accessListResults)),
  };

  return render(
    <MemoryRouter>
      <ServicesContextProvider {...allQueries} client={createQueryClientMock()}>
        <ListAdminPage />
      </ServicesContextProvider>
    </MemoryRouter>,
  );
};
