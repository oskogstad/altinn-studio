import React, { useEffect } from 'react';
import classes from './deployPage.module.css';
import { AltinnContentLoader } from 'app-shared/components/molecules/AltinnContentLoader';
import { ConfigurationActions } from '../../../sharedResources/configuration/configurationSlice';
import { DeployContainerComponent } from '../containers/deployContainer';
import { InfoCard } from './InfoCard';
import { ReleaseContainer } from '../containers/releaseContainer';
import { fetchDeployPermissions } from '../../../sharedResources/user/userSlice';
import { useAppDispatch, useAppSelector } from '../../../common/hooks';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export function DeployPage() {
  const { t } = useTranslation();
  const { org } = useParams();
  const dispatch = useAppDispatch();
  const orgs: any = useAppSelector((state) => state.configuration.orgs);

  useEffect(() => {
    dispatch(ConfigurationActions.getOrgs());
    dispatch(fetchDeployPermissions());
  }, [dispatch]);

  const isLoading = (): boolean => {
    return !orgs.allOrgs;
  };

  if (isLoading()) {
    return (
      <div style={{ height: 'calc(100% - 111px)' }}>
        <AltinnContentLoader width={1200} height={600}>
          <rect x='862' y='3' rx='0' ry='0' width='300' height='600' />
          <rect x='1' y='1' rx='0' ry='0' width='800' height='200' />
          <rect x='1' y='220' rx='0' ry='0' width='800' height='200' />
        </AltinnContentLoader>
      </div>
    );
  }

  // If org isn't listed, or doesn't have any environments
  if (
    !orgs.allOrgs[org] ||
    !orgs.allOrgs[org].environments ||
    !orgs.allOrgs[org].environments.length
  ) {
    return (
      <InfoCard headerText={t('app_publish.no_env_title')} shadow={true}>
        <div>{t('app_publish.no_env_1')}</div>
        <div style={{ paddingTop: '2.4rem' }}>{t('app_publish.no_env_2')}</div>
      </InfoCard>
    );
  }

  return (
    <div className={classes.container} style={{ height: 'calc(100% - 111px)' }}>
      <div>
        <DeployContainerComponent />
      </div>
      <div>
        <ReleaseContainer />
      </div>
    </div>
  );
}
