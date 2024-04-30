import React from 'react';
import { render, screen } from '@testing-library/react';
import { textMock } from '../../../../../../../testing/mocks/i18nMock';
import userEvent from '@testing-library/user-event';
import type { BpmnApiContextProps } from '../../../../contexts/BpmnApiContext';
import { BpmnApiContext } from '../../../../contexts/BpmnApiContext';
import type { BpmnContextProps } from '../../../../contexts/BpmnContext';
import { BpmnContext } from '../../../../contexts/BpmnContext';
import type { BpmnDetails } from '../../../../types/BpmnDetails';
import { BpmnTypeEnum } from '../../../../enum/BpmnTypeEnum';
import type Modeler from 'bpmn-js/lib/Modeler';
import { EditDataType } from './EditDataType';
import { BpmnConfigPanelFormContextProvider } from '../../../../contexts/BpmnConfigPanelContext';

const mockTaskId: string = 'testId';
const mockName: string = 'testName';

const modelerRefMock = {
  current: {
    get: () => {},
  } as unknown as Modeler,
};

const mockBpmnDetails: BpmnDetails = {
  id: mockTaskId,
  name: mockName,
  taskType: 'data',
  type: BpmnTypeEnum.Task,
};

const mockBpmnApiContextValue: Partial<BpmnApiContextProps> = {
  layoutSets: {
    sets: [
      {
        id: 'layoutSetName',
        tasks: [mockTaskId],
      },
    ],
  },
  availableDataModelIds: [],
};

const mockBpmnContextValue: Partial<BpmnContextProps> = {
  bpmnDetails: mockBpmnDetails,
  modelerRef: modelerRefMock,
};

describe('EditDataType', () => {
  afterEach(jest.clearAllMocks);
  it('should display a button to add datamodel when task has no datamodel', () => {
    renderEditDataType();
    expect(
      screen.getByRole('button', {
        name: textMock('process_editor.configuration_panel_set_datamodel_link'),
      }),
    ).toBeInTheDocument();
  });

  it('should display a native select with default value when clicking "add datamodel"', async () => {
    const user = userEvent.setup();
    renderEditDataType();
    const addDataModelButton = screen.getByRole('button', {
      name: textMock('process_editor.configuration_panel_set_datamodel_link'),
    });
    await user.click(addDataModelButton);
    const nativeSelect = screen.getByRole('combobox', {
      name: textMock('process_editor.configuration_panel_set_datamodel'),
    });
    expect(nativeSelect).toHaveValue('noModelKey');
  });

  it('should display all available data types including existing and no-model-key as options for data type select', async () => {
    const user = userEvent.setup();
    const availableDataModelIds = ['dataModel1', 'dataModel2'];
    const existingDataType = 'dataModel0';
    renderEditDataType({
      layoutSets: {
        sets: [{ id: 'setWithDataType', dataType: existingDataType, tasks: [mockTaskId] }],
      },
      availableDataModelIds,
    });
    const updateDataTypeButton = screen.getByRole('button', {
      name: textMock('process_editor.configuration_panel_set_datamodel'),
    });
    await user.click(updateDataTypeButton);

    expect(
      screen.getByRole('option', {
        name: textMock('process_editor.configuration_panel_select_datamodel'),
      }),
    ).toBeInTheDocument();
    expect(screen.getByRole('option', { name: existingDataType })).toBeInTheDocument();

    availableDataModelIds.forEach((dataType) =>
      expect(screen.getByRole('option', { name: dataType })).toBeInTheDocument(),
    );
  });

  it('should display the existing data type in preview as a button to edit when task has connected data model', async () => {
    const user = userEvent.setup();
    const existingDataType = 'dataType';
    renderEditDataType({
      layoutSets: {
        sets: [{ id: 'setWithDataType', dataType: existingDataType, tasks: [mockTaskId] }],
      },
    });
    const updateDataTypeButton = screen.getByRole('button', {
      name: textMock('process_editor.configuration_panel_set_datamodel'),
    });
    expect(screen.getByText(existingDataType)).toBeInTheDocument();

    await user.click(updateDataTypeButton);
    const nativeSelect = screen.getByRole('combobox', {
      name: textMock('process_editor.configuration_panel_set_datamodel'),
    });
    expect(nativeSelect).toHaveValue(existingDataType);
  });

  it('should display the existing data type in preview when clicking the close button after edit mode and task has data type', async () => {
    const user = userEvent.setup();
    const existingDataType = 'dataType';
    renderEditDataType({
      layoutSets: {
        sets: [
          {
            id: 'setWithDataType',
            dataType: existingDataType,
            tasks: [mockTaskId],
          },
        ],
      },
    });
    const updateDataTypeButton = screen.getByRole('button', {
      name: textMock('process_editor.configuration_panel_set_datamodel'),
    });
    await user.click(updateDataTypeButton);
    const closeButton = screen.getByRole('button', { name: textMock('general.close') });
    await user.click(closeButton);
    expect(
      screen.getByRole('button', {
        name: textMock('process_editor.configuration_panel_set_datamodel'),
      }),
    ).toBeInTheDocument();
  });

  it('should display the button to add datamodel when clicking the close button after edit mode and task has no data type', async () => {
    const user = userEvent.setup();
    renderEditDataType();
    const addDataModelButton = screen.getByRole('button', {
      name: textMock('process_editor.configuration_panel_set_datamodel_link'),
    });
    await user.click(addDataModelButton);
    const closeButton = screen.getByRole('button', { name: textMock('general.close') });
    await user.click(closeButton);
    expect(
      screen.getByRole('button', {
        name: textMock('process_editor.configuration_panel_set_datamodel_link'),
      }),
    ).toBeInTheDocument();
  });
});

const renderEditDataType = (bpmnApiContextProps: Partial<BpmnApiContextProps> = {}) => {
  return render(
    <BpmnApiContext.Provider value={{ ...mockBpmnApiContextValue, ...bpmnApiContextProps }}>
      <BpmnContext.Provider value={{ ...mockBpmnContextValue }}>
        <BpmnConfigPanelFormContextProvider>
          <EditDataType />
        </BpmnConfigPanelFormContextProvider>
      </BpmnContext.Provider>
    </BpmnApiContext.Provider>,
  );
};
