import React from 'react';
import { shallow } from 'enzyme';
import { LanguageButton } from '../../../src/features/common';

it('renders node with correct class name', () => {
  const renderedComponent = shallow(<LanguageButton />);
  expect(renderedComponent.find('.common-language-button').length).toBe(1);
});
