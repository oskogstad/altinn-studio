import React, { forwardRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Paragraph, Modal } from '@digdir/design-system-react';
import { ResourceNameAndId } from '../ResourceNameAndId';
import { useCreateResourceMutation } from '../../hooks/mutations';
import type { NewResource } from 'app-shared/types/ResourceAdm';
import { getResourcePageURL } from '../../utils/urlUtils';
import { useTranslation } from 'react-i18next';
import { ServerCodes } from 'app-shared/enums/ServerCodes';
import { useUrlParams } from '../../hooks/useSelectedContext';
import { StudioButton } from '@studio/components';

export type NewResourceModalProps = {
  onClose: () => void;
};

/**
 * @component
 *    Displays the modal telling the user that there is a merge conflict
 *
 * @property {function}[onClose] - Function to handle close
 *
 * @returns {React.JSX.Element} - The rendered component
 */
export const NewResourceModal = forwardRef<HTMLDialogElement, NewResourceModalProps>(
  ({ onClose }, ref): React.JSX.Element => {
    const { t } = useTranslation();

    const navigate = useNavigate();

    const { selectedContext, repo } = useUrlParams();

    const [id, setId] = useState('');
    const [title, setTitle] = useState('');
    const [resourceIdExists, setResourceIdExists] = useState(false);

    // Mutation function to create new resource
    const { mutate: createNewResource } = useCreateResourceMutation(selectedContext);

    /**
     * Creates a new resource in backend, and navigates if success
     */
    const handleCreateNewResource = () => {
      const idAndTitle: NewResource = {
        identifier: id,
        title: {
          nb: title,
          nn: '',
          en: '',
        },
      };

      createNewResource(idAndTitle, {
        onSuccess: () =>
          navigate(getResourcePageURL(selectedContext, repo, idAndTitle.identifier, 'about')),
        onError: (error: any) => {
          if (error.response.status === ServerCodes.Conflict) {
            setResourceIdExists(true);
          }
        },
      });
    };

    /**
     * Closes the modal and resets the fields
     */
    const handleClose = () => {
      onClose();
      setId('');
      setTitle('');
      setResourceIdExists(false);
    };

    return (
      <Modal ref={ref} onClose={handleClose}>
        <Modal.Header>{t('resourceadm.dashboard_create_modal_title')}</Modal.Header>
        <Modal.Content>
          <Paragraph size='small'>
            {t('resourceadm.dashboard_create_modal_resource_name_and_id_text')}
          </Paragraph>
          <ResourceNameAndId
            idLabel={t('resourceadm.dashboard_resource_name_and_id_resource_id')}
            titleLabel={t('resourceadm.dashboard_resource_name_and_id_resource_name')}
            id={id}
            title={title}
            onIdChange={(newId: string) => {
              setResourceIdExists(false);
              setId(newId);
            }}
            onTitleChange={(newTitle: string) => setTitle(newTitle)}
            conflictErrorMessage={
              resourceIdExists ? t('resourceadm.dashboard_resource_name_and_id_error') : ''
            }
          />
        </Modal.Content>
        <Modal.Footer>
          <StudioButton
            onClick={() =>
              !(id.length === 0 || title.length === 0) ? handleCreateNewResource() : undefined
            }
            color='first'
            aria-disabled={id.length === 0 || title.length === 0}
            size='small'
          >
            {t('resourceadm.dashboard_create_modal_create_button')}
          </StudioButton>
          <StudioButton onClick={handleClose} color='first' variant='tertiary' size='small'>
            {t('general.cancel')}
          </StudioButton>
        </Modal.Footer>
      </Modal>
    );
  },
);

NewResourceModal.displayName = 'NewResourceModal';
