import React from 'react';
import { useSelector } from 'react-redux';
import { Button } from '@digdir/design-system-react';
import { PageElement } from './PageElement';
import { deepCopy } from 'app-shared/pure';
import { useSearchParams } from 'react-router-dom';
import classes from './ReceiptPageElement.module.css';
import { useAddLayoutMutation } from '../../hooks/mutations/useAddLayoutMutation';
import { useFormLayoutSettingsQuery } from '../../hooks/queries/useFormLayoutSettingsQuery';
import { useTranslation } from 'react-i18next';
import { selectedLayoutSetSelector } from '../../selectors/formLayoutSelectors';
import { useStudioUrlParams } from 'app-shared/hooks/useStudioUrlParams';

export function ReceiptPageElement() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { org, app } = useStudioUrlParams();
  const { t } = useTranslation();
  const selectedLayoutSet = useSelector(selectedLayoutSetSelector);
  const addLayoutMutation = useAddLayoutMutation(org, app, selectedLayoutSet);
  const formLayoutSettingsQuery = useFormLayoutSettingsQuery(org, app, selectedLayoutSet);
  const receiptName = formLayoutSettingsQuery.data.receiptLayoutName;
  const handleAddPage = () => {
    addLayoutMutation.mutate({ layoutName: 'Kvittering', isReceiptPage: true });
    setSearchParams({ ...deepCopy(searchParams), layout: 'Kvittering' });
  };
  return receiptName ? (
    <PageElement name={receiptName} />
  ) : (
    <div className={classes.buttonWrapper}>
      <Button variant='quiet' onClick={handleAddPage} className={classes.button} size='small'>
        {t('receipt.create')}
      </Button>
    </div>
  );
}