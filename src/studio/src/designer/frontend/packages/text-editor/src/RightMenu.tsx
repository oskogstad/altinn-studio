import classes from './RightMenu.module.css';
import { getLanguageName, languageOptions } from './utils';
import { Button, ButtonColor, ButtonVariant, FieldSet, RadioButton } from '@altinn/altinn-design-system';
import { LanguageSelector } from './LanguageSelector';
import React from 'react';
import type { Language } from './types';

export interface RightMenuProps {
  selectedLangCode: string;
  onSelectedLanguageChange: (v: Language) => void;
  availableLanguageCodes: string[];
  onAddLanguage: (v: Language) => void;
  onDeleteLanguage: (v: Language) => void;
}

export const RightMenu = ({
  selectedLangCode,
  onSelectedLanguageChange,
  availableLanguageCodes,
  onAddLanguage,
  onDeleteLanguage,
}: RightMenuProps) => {
  const addLanguageOptions = languageOptions.filter(
    (x) => !availableLanguageCodes.includes(x.value)
  );
  const canDeleteLanguage = availableLanguageCodes.length > 1;
  const handleSelectChange = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = target;
    onSelectedLanguageChange({ value });
  };
  // TODO: is fetching translations
  return (
    <aside className={classes.RightMenu__sidebar}>
      <div className={classes.RightMenu__verticalContent}>
        <header>
          <div className={classes['LanguageEditor__title-md']}>Språk</div>
        </header>
        <div>
          Vi anbefaler å legge til oversettelser for bokmål, nynorsk og engelsk. Ved behov kan du
          også legge til andre språk.
        </div>
      </div>
      <div className={classes.RightMenu__verticalContent}>
        <FieldSet legend="Aktive språk:">
          <div className={classes.RightMenu__radioGroup}>
            {availableLanguageCodes?.map((value) => {
              const handleDeleteLangClick = () => {
                onDeleteLanguage({ value });
              };
              const name = getLanguageName({ code: value });

              return (
                <div key={value} className={classes.RightMenu__radio}>
                  <RadioButton
                    value={value}
                    label={name}
                    name={'activeLanguages'}
                    onChange={handleSelectChange}
                    checked={value === selectedLangCode}
                  />
                  {canDeleteLanguage ? (
                    <Button
                      data-testid={`delete-${value}`}
                      color={ButtonColor.Danger}
                      onClick={handleDeleteLangClick}
                    >
                      Delete
                    </Button>
                  ) : (
                    <Button
                      data-testid={`delete-${value}`}
                      variant={ButtonVariant.Outline}
                      color={ButtonColor.Danger}
                      onClick={handleDeleteLangClick}
                      disabled={true}
                    >
                      Delete
                    </Button>
                  )}
                </div>
              );
            })}
          </div>
        </FieldSet>
      </div>
      <div className={classes.RightMenu__verticalContent}>
        <div className={classes['LanguageEditor__title-sm']}>Legg til språk:</div>
        <LanguageSelector onAddLanguage={onAddLanguage} options={addLanguageOptions} />
      </div>
    </aside>
  );
};