import React, { memo, useCallback, useRef, useState } from 'react';
import { ConnectDragSource } from 'react-dnd';
import cn from 'classnames';
import '../styles/index.css';
import { Button, ButtonColor, ButtonVariant, Popover, PopoverVariant } from '@digdir/design-system-react';
import classes from './FormContainerHeader.module.css';
import { ChevronUpIcon, TrashIcon, ChevronDownIcon } from '@navikt/aksel-icons';
import { DragHandle } from '../components/dragAndDrop/DragHandle';
import { useTranslation } from 'react-i18next';
import { useClickOutside } from '../../../ux-editor/src/components/FormComponent';

export interface IFormContainerHeaderProps {
  id: string;
  expanded: boolean;
  isEditMode: boolean;
  handleExpanded: React.Dispatch<React.SetStateAction<boolean>>;
  handleDelete: (event: React.MouseEvent<HTMLButtonElement>) => void;
  dragHandleRef: ConnectDragSource
}

export const FormContainerHeader = memo(function FormContainerHeader({
  id,
  expanded,
  isEditMode,
  handleExpanded,
  handleDelete,
  dragHandleRef,
} : IFormContainerHeaderProps) {
  const { t } = useTranslation();
  const [isConfirmDeleteGroupOpen, setIsConfirmDeleteGroupOpen] = useState(false);
  const toggleConfirmDeletePopover = () => setIsConfirmDeleteGroupOpen((prev) => !prev);
  const handleClosePopover = useCallback(() => { setIsConfirmDeleteGroupOpen(false); }, []);
  const popoverRef = useRef(null);
  useClickOutside(popoverRef, handleClosePopover);

  return (
    <div className={cn(isEditMode && classes.editMode, classes.formGroup)} data-testid='form-group'>
      <div ref={dragHandleRef} className={classes.dragHandle}>
        <DragHandle />
      </div>
      <div className={classes.formGroupBar}>
        <Button
          color={ButtonColor.Secondary}
          icon={expanded ? <ChevronUpIcon /> : <ChevronDownIcon />}
          onClick={() => handleExpanded((previous) => !previous)}
          variant={ButtonVariant.Quiet}
        />
        {t('ux_editor.component_group_header', { id })}
      </div>
      <div className={classes.formGroupButtons}>
        <div ref={popoverRef}>
        <Popover
          variant={PopoverVariant.Warning}
          placement={'left'}
          open={isConfirmDeleteGroupOpen}
          trigger={
            <Button
            className={classes.deleteGroupComponent}
              icon={<TrashIcon />}
              title={t('general.delete')}
              onClick={toggleConfirmDeletePopover}
              variant={ButtonVariant.Quiet}
            />
          }
        >
          {isConfirmDeleteGroupOpen && (
            <div>
              <p className={classes.deletGroupMessage}>
                {t('ux_editor.component_popover_confirm_delete')}
              </p>
              <Button onClick={handleDelete} color={ButtonColor.Danger} >
                {t('ux_editor.component_confirm_delete_component')}
              </Button>
              <Button
                variant={ButtonVariant.Quiet}
                onClick={toggleConfirmDeletePopover}
                color={ButtonColor.Secondary}
              >
                {t('schema_editor.textRow-cancel-popover')}
              </Button>
            </div>
          )}
        </Popover>
      </div>
      </div>
    </div>
  );
});
