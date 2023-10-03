import React from 'react';
import { IPageElementProps, PageElement } from './PageElement';
import { queriesMock, renderHookWithMockStore, renderWithMockStore } from '../../testing/mocks';
import { formDesignerMock } from '../../testing/stateMocks';
import { act, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useFormLayoutsQuery } from '../../hooks/queries/useFormLayoutsQuery';
import { useFormLayoutSettingsQuery } from '../../hooks/queries/useFormLayoutSettingsQuery';
import { textMock } from '../../../../../testing/mocks/i18nMock';

const user = userEvent.setup();

// Test data:
const org = 'org';
const app = 'app';
const selectedLayoutSet = 'test-layout-set';
const name = formDesignerMock.layout.selectedLayout;
const defaultProps: IPageElementProps = { name };

const mockSetSearchParams = jest.fn();
const searchParams = { 'layout': 'Side1' };
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: () => ({
    org: org,
    app: app,
  }),
  useSearchParams: () => {
    return [
      new URLSearchParams(searchParams),
      mockSetSearchParams
    ];
  }
}));

describe('PageElement', () => {
  it('should redirect to new page when deleting selected page', async () => {
    await render();

    const menuButton = screen.getByRole('button', { name: textMock('general.options') });
    await act(() => user.click(menuButton));

    const deleteButton = screen.getByText(textMock('left_menu.page_menu_delete'));
    await act(() => user.click(deleteButton));

    const confirmButton = screen.getByRole('button', { name: textMock('left_menu.page_delete_confirm') });
    await act(() => user.click(confirmButton));

    expect(queriesMock.deleteFormLayout).toBeCalledWith('org', 'app', 'Side1', 'test-layout-set');
    await waitFor(() => expect(screen.queryByRole('dialog')).not.toBeInTheDocument());

    expect(mockSetSearchParams).toHaveBeenCalledWith({ layout: 'Side2' });
  });

  it('Calls updateFormLayoutName with new name when name is changed by the user', async () => {
    await render();
    const newName = 'new-name';
    await act(() => user.click(screen.getByTitle(textMock('general.options'))));
    await act(() => user.click(screen.getByText(textMock('left_menu.page_menu_edit'))));
    const textbox = screen.getByRole('textbox');
    expect(textbox).toHaveValue(name);
    await act(() => user.clear(textbox));
    await act(() => user.type(textbox, newName));
    await act(() => user.tab());
    expect(queriesMock.updateFormLayoutName).toHaveBeenCalledTimes(1);
    expect(queriesMock.updateFormLayoutName).toHaveBeenCalledWith(org, app, name, newName, selectedLayoutSet);
  });

  describe('Delete confirmation dialog', () => {
    afterEach(jest.clearAllMocks);

    it('should open the confirmation dialog when clicking the delete button', async () => {
      await render();

      const menuButton = screen.getByRole('button', { name: textMock('general.options') });
      await act(() => user.click(menuButton));

      const deleteButton = screen.getByText(textMock('left_menu.page_menu_delete'));
      await act(() => user.click(deleteButton));

      const dialog = screen.getByRole('dialog');
      expect(dialog).toBeInTheDocument();

      const text = await screen.findByText(textMock('left_menu.page_delete_text'));
      expect(text).toBeInTheDocument();

      const information = await screen.findByText(textMock('left_menu.page_delete_information'));
      expect(information).toBeInTheDocument();

      const confirmButton = screen.getByRole('button', { name: textMock('left_menu.page_delete_confirm') });
      expect(confirmButton).toBeInTheDocument();

      const cancelButton = screen.getByRole('button', { name: textMock('general.cancel') });
      expect(cancelButton).toBeInTheDocument();
    });

    it('should confirm and close the dialog when clicking the confirm button', async () => {
      await render();

      const menuButton = screen.getByRole('button', { name: textMock('general.options') });
      await act(() => user.click(menuButton));

      const deleteButton = screen.getByText(textMock('left_menu.page_menu_delete'));
      await act(() => user.click(deleteButton));

      const confirmButton = screen.getByRole('button', { name: textMock('left_menu.page_delete_confirm') });
      await act(() => user.click(confirmButton));

      expect(queriesMock.deleteFormLayout).toBeCalledWith('org', 'app', 'Side1', 'test-layout-set');
      await waitFor(() => expect(screen.queryByRole('dialog')).not.toBeInTheDocument());
    });

    it('should close the confirmation dialog when clicking the cancel button', async () => {
      await render();

      const menuButton = screen.getByRole('button', { name: textMock('general.options') });
      await act(() => user.click(menuButton));

      const deleteButton = screen.getByText(textMock('left_menu.page_menu_delete'));
      await act(() => user.click(deleteButton));

      const cancelButton = screen.getByRole('button', { name: textMock('general.cancel') });
      await act(() => user.click(cancelButton));

      expect(queriesMock.deleteFormLayout).toBeCalledTimes(0);
      await waitFor(() => expect(screen.queryByRole('dialog')).not.toBeInTheDocument());
    });

    it('should close when clicking outside the popover', async () => {
      await render();

      const menuButton = screen.getByRole('button', { name: textMock('general.options') });
      await act(() => user.click(menuButton));

      const deleteButton = screen.getByText(textMock('left_menu.page_menu_delete'));
      await act(() => user.click(deleteButton));

      await act(() => user.click(document.body));

      expect(queriesMock.deleteFormLayout).toBeCalledTimes(0);
      await waitFor(() => expect(screen.queryByRole('dialog')).not.toBeInTheDocument());
    });
  });
});

const waitForData = async () => {
  const formLayoutsResult = renderHookWithMockStore()(() => useFormLayoutsQuery(org, app, selectedLayoutSet)).renderHookResult.result;
  const settingsResult = renderHookWithMockStore()(() => useFormLayoutSettingsQuery(org, app, selectedLayoutSet)).renderHookResult.result;
  await waitFor(() => expect(formLayoutsResult.current.isSuccess).toBe(true));
  await waitFor(() => expect(settingsResult.current.isSuccess).toBe(true));
};

const render = async (props: Partial<IPageElementProps> = {}) => {
  await waitForData();
  return renderWithMockStore()(<PageElement {...defaultProps} {...props} />);
};