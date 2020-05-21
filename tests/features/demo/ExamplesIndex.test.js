import React from 'react';
import { shallow } from 'enzyme';
import { ExamplesIndex } from '../../../src/features/demo/ExamplesIndex';

describe('demo/ExamplesIndex', () => {
  it('renders node with correct class name', () => {
    const props = {
      demo: {},
      actions: {},
    };
    const renderedComponent = shallow(
      <ExamplesIndex {...props} />
    );

    expect(
      renderedComponent.find('.demo-examples-index').length
    ).toBe(1);
  });
});
