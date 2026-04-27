import React from 'react';
import renderer from 'react-test-renderer';
import Form from '../form'

const mockData = {
    "description": "development team's project end celebration",
    "vendor": "Seaside Steakhouse",
    "date": "27 April 2022",
    "costCentre": "DEV632",
    "paymentMethod": "personal card",
    "total": 35000,
    "price": 29750,
    "gst": 5250
}

it('renders either nothing initially', () => {
  const component = renderer.create(
    <Form />,
  );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();

});

it('renders form filled with data', () => {
  const component = renderer.create(
    <Form data={mockData}/>,
  );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();

});