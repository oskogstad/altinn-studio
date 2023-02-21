import React from 'react';
import {
  Button,
  ButtonColor,
  ButtonVariant,
  TextArea,
  TextField
} from '@digdir/design-system-react';
import { AltinnPopper } from 'app-shared/components/AltinnPopper';
import InformationPaper from 'app-shared/components/AltinnInformationPaper';
import classes from './MainContent.module.css';
import { useTranslation } from 'react-i18next';

interface IMainContentProps {
  repositoryName: string;
  appDescription: string;
  appId: string;
  appName: string;
  editAppName: boolean;
  onAppDescriptionBlur: () => void;
  onAppDescriptionChange: (event: any) => void;
  onAppIdBlur: () => void;
  onAppIdChange: (event: any) => void;
  onAppNameBlur: () => void;
  onAppNameChange: (event: any) => void;
  onEditAppNameClick: () => void;
  appNameAnchorEl: any;
}

export const MainContent = (props: IMainContentProps): JSX.Element => {
  const urlParams = new URLSearchParams(`?${window.location.hash.split('?')[1]}`);
  const copiedApp = Boolean(urlParams.get('copiedApp'));
  const { t } = useTranslation();
  return (
    <div className={classes.mainContentContainer}>
      {copiedApp && (
        <InformationPaper>
          <h2>{t('administration.copied_app_header')}</h2>
          <p>{t('administration.copied_app_information')}</p>
        </InformationPaper>
      )}
      <h2>{t('general.service_name')}</h2>
      <p>{t('administration.service_name_administration_description')}</p>
      <div className={classes.sideBySide}>
        <TextField
          id='administrationInputAppName_textField'
          onChange={props.onAppNameChange}
          value={props.appName}
          onBlur={props.onAppNameBlur}
          disabled={!props.editAppName}
        />
        <Button
          data-testid={'administrationInputAppName_ChangeButton'}
          color={ButtonColor.Secondary}
          onClick={props.onEditAppNameClick}
          variant={ButtonVariant.Outline}
        >
          {t('general.edit')}
        </Button>
      </div>
      <AltinnPopper
        anchorEl={props.appNameAnchorEl}
        message={t('administration.service_name_empty_message')}
      />
      <h2>{t('administration.service_id')}</h2>
      <p>{t('administration.service_id_description')}</p>
      <TextField
        id='administrationInputAppId_textField'
        onChange={props.onAppIdChange}
        value={props.appId}
        onBlur={props.onAppIdBlur}
      />
      <h2>{t('general.service_saved_name')}</h2>
      <p>{t('administration.service_saved_name_administration_description')}</p>
      <TextField id='administrationInputReponame' value={props.repositoryName} disabled={true} />
      <h2>{t('administration.service_comment')}</h2>
      <p>{t('administration.service_comment_description')}</p>
      <TextArea
        id='administrationInputDescription_textField'
        onChange={props.onAppDescriptionChange}
        rows={7}
        value={props.appDescription}
        onBlur={props.onAppDescriptionBlur}
      />
    </div>
  );
};
