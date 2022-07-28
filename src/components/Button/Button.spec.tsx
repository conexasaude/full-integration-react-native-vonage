import React from 'react';
import { fireEvent, render } from '@testing-library/react-native';

import { Button } from '.';

describe('Button', () => {
  const onPressMock = jest.fn();

  afterEach(() => {
    onPressMock.mockClear();
  });

  test('should render', async () => {
    const { findByTestId, toJSON } = render(
      <Button title="Button" onPress={() => {}} />
    );

    expect(await findByTestId('hero-button')).toBeTruthy();
    expect(toJSON()).toMatchSnapshot();
  });

  test('should display the provided text', async () => {
    const testTitle = 'Button title';
    const { findByText } = render(
      <Button title={testTitle} onPress={() => {}} />
    );

    expect(await findByText(testTitle)).toBeTruthy();
  });

  test('should be a button element', async () => {
    const { findByRole } = render(<Button title="Button" onPress={() => {}} />);
    expect(await findByRole('button')).toBeTruthy();
  });

  test('should trigger button press event', async () => {
    const { findByTestId } = render(
      <Button title="Press me" onPress={onPressMock} />
    );

    fireEvent.press(await findByTestId('touchable-area'));
    expect(onPressMock).toHaveBeenCalledTimes(1);
  });

  test('should be on disabled state when the `disabled` prop is provided as `true`', async () => {
    const button = <Button title="Button" disabled onPress={onPressMock} />;

    expect(button.props.disabled).toBe(true);

    const { findByTestId, toJSON } = render(button);

    fireEvent.press(await findByTestId('touchable-area'));
    expect(onPressMock).toBeCalledTimes(0);
    expect(toJSON).toMatchSnapshot();
  });

  test('should be on busy state when the `busy` prop is provided as `true`', async () => {
    const { findByTestId, toJSON } = render(
      <Button title="Busy Button" busy onPress={onPressMock} />
    );

    fireEvent.press(await findByTestId('touchable-area'));
    expect(onPressMock).toBeCalledTimes(0);
    expect(toJSON).toMatchSnapshot();
  });

  test('should to match Outlined Button when `outline` prop is provided as `true`', async () => {
    const { toJSON } = render(
      <Button title="Outlined Button" outline onPress={onPressMock} />
    );

    expect(toJSON).toMatchSnapshot();
  });

  test('should match a Disabled, Busy and Outlined Button when both props are provided with their respective values at same time', async () => {
    const { toJSON } = render(
      <Button title="Button" onPress={onPressMock} outline disabled busy />
    );

    expect(toJSON).toMatchSnapshot();
  });
});
