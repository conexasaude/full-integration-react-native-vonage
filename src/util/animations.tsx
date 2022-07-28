import { Animated, Easing } from 'react-native';

const spinAnim = new Animated.Value(0);
const Spinner = spinAnim.interpolate({
  inputRange: [0, 1],
  outputRange: ['0deg', '360deg'],
});

function run(): void {
  spinAnim.setValue(0);
  Animated.loop(
    Animated.timing(spinAnim, {
      toValue: 1,
      duration: 1000,
      easing: Easing.linear,
      useNativeDriver: true,
    })
  ).start(() => run());
}

export { Spinner, run };
