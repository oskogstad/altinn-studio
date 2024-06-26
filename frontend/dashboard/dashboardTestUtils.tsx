import { QueryClient } from '@tanstack/react-query';
import React, { ReactNode } from 'react';
import { MemoryRouter } from 'react-router-dom';
import {
  ServicesContextProps,
  ServicesContextProvider,
  ServicesContextProviderProps,
} from 'app-shared/contexts/ServicesContext';
import { queriesMock } from 'app-shared/mocks/queriesMock';
import { queryClientConfigMock, createQueryClientMock } from 'app-shared/mocks/queryClientMock';

export type MockServicesContextWrapperProps = {
  children: ReactNode;
  customServices?: Partial<ServicesContextProps>;
  client?: QueryClient;
};

export const MockServicesContextWrapper = ({
  children,
  customServices,
  client = createQueryClientMock(),
}: MockServicesContextWrapperProps) => {
  const queries: ServicesContextProviderProps = {
    ...queriesMock,
    ...customServices,
    client,
    clientConfig: queryClientConfigMock,
  };

  return (
    <MemoryRouter>
      <ServicesContextProvider {...queries}>{children}</ServicesContextProvider>
    </MemoryRouter>
  );
};
