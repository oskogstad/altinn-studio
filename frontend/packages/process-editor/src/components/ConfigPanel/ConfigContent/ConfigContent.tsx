import React from 'react';
import classes from './ConfigContent.module.css';
import { useTranslation } from 'react-i18next';
import { useBpmnContext } from '../../../contexts/BpmnContext';
import { EditTaskId } from './EditTaskId/EditTaskId';
import { StudioDisplayTile, StudioSectionHeader } from '@studio/components';
import { getConfigTitleKey, getConfigTitleHelpTextKey } from '../../../utils/configPanelUtils';
import { ConfigIcon } from './ConfigIcon';
import { EditDataType } from './EditDataType/EditDataType';
import { useBpmnApiContext } from '../../../contexts/BpmnApiContext';

export const ConfigContent = (): React.ReactElement => {
  const { t } = useTranslation();
  const { bpmnDetails } = useBpmnContext();
  const { layoutSets } = useBpmnApiContext();
  const configHeaderTexts: Record<'title' | 'helpText', string> = {
    title: bpmnDetails?.taskType && t(getConfigTitleKey(bpmnDetails.taskType)),
    helpText: bpmnDetails?.taskType && t(getConfigTitleHelpTextKey(bpmnDetails.taskType)),
  };

  const taskHasConnectedLayoutSet = layoutSets?.sets?.some((set) => set.tasks[0] == bpmnDetails.id);

  return (
    <>
      <StudioSectionHeader
        icon={<ConfigIcon taskType={bpmnDetails.taskType} />}
        heading={{
          text: configHeaderTexts.title,
          level: 2,
        }}
        helpText={{
          text: configHeaderTexts.helpText,
          title: t('process_editor.configuration_panel_header_help_text_title'),
        }}
      />

      <EditTaskId className={classes.editTaskId} />

      <StudioDisplayTile
        label={t('process_editor.configuration_panel_name_label')}
        value={bpmnDetails.name}
        className={classes.configContent}
      />
      {taskHasConnectedLayoutSet && <EditDataType />}
    </>
  );
};
