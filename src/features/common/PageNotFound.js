import React from 'react';
import { Button, Jumbotron } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { useTranslation } from 'react-i18next';

export default function PageNotFound() {
  const { t } = useTranslation();
  return (
    <div className="common-page-not-found">
      <Jumbotron>
        <h1>{t('common:pageNotFound.title')}</h1>
        <p>{t('common:pageNotFound.message')}</p>
        <p>
          <LinkContainer to="/" exact>
            <Button variant="primary">{t('common:pageNotFound.button')}</Button>
          </LinkContainer>
        </p>
      </Jumbotron>
    </div>
  );
}
