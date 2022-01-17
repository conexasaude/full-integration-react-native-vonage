import React, {
  useState,
  useEffect,
  ReactNode,
  forwardRef,
  ForwardRefExoticComponent,
  useContext,
} from 'react';
import {
  Image,
  ImageSourcePropType,
  KeyboardType,
  TextInputProps,
  TouchableOpacity,
  View,
} from 'react-native';
import { ReactNativeStyle } from '@emotion/native';
import { FloatingLabelInput } from 'react-native-floating-label-input';

import useStyles from './styles';
import { Text } from 'react-native-elements';
import variables from '@root/variables';
import { ThemeContext } from '@root/theme';

const phoneMask = '(99) 99999-9999';
const creditCardMask = '9999 9999 9999 9999';
const cellphoneMask = '(99) 99999-9999';
const cpfMask = '999.999.999-99';
const dateMask = '99/99/9999';
const shortDateMask = '99/99';
const cepMask = '99999-999';
const cvvMask = '9999';

interface InputProps extends TextInputProps {
  label: string;
  placeholder?: string;
  initialValue: string;
  icon?: ImageSourcePropType;
  password?: boolean;
  maskType?:
    | 'phone'
    | 'date'
    | 'short-date'
    | 'cpf'
    | 'cep'
    | 'email'
    | 'cvv'
    | 'credit-card';
  isMultipleMask?: boolean;
  disabled?: boolean;
  isValid?: boolean | undefined;
  onChangeText: (value: string) => void;
  onInputFocus?: () => void;
  onInputBlur?: () => void;
  rightComponent?: ReactNode;
  required?: boolean;
  errorMessage?: string;
  style?: ReactNativeStyle;
  handlePress?: () => void;
  success?: boolean;
  value?: string;
}

const Inputfield: ForwardRefExoticComponent<InputProps> = forwardRef(
  (
    {
      label,
      placeholder,
      initialValue = '',
      icon,
      handlePress,
      password = false,
      maskType = undefined,
      isMultipleMask,
      onChangeText,
      required,
      isValid = true,
      errorMessage,
      style,
      disabled,
      rightComponent,
      value,
      onInputFocus,
      onInputBlur,
      success,
      ...rest
    },
    ref
  ) => {
    const { theme } = useContext(ThemeContext);
    const { colors } = theme;
    const { RootStyles } = useStyles();
    const {
      container,
      inputStyles,
      labelStyles,
      iconContainer,
      iconStyles,
      textError,
    } = RootStyles;

    const [focused, setFocused] = useState(false);
    const [valueState, setValueState] = useState(
      maskInitialValue(initialValue)
    );
    const [errorEmpty, setErrorEmpty] = useState(false);
    const [color, setColor] = useState(colors.neutral[100]);
    const [mask, setMask] = useState<string | undefined>();
    const [keyboardType, setKeyboardType] = useState<KeyboardType>('default');

    useEffect(() => {
      setValueState(maskInitialValue(initialValue));
    }, [initialValue]);

    useEffect(() => {
      if (disabled) setColor(variables.backgroundDisabled);
    }, [initialValue]);

    useEffect(() => {
      switch (maskType) {
        case 'phone':
          setMask(phoneMask);
          setKeyboardType('numeric');
          break;
        case 'date':
          setMask(dateMask);
          setKeyboardType('numeric');
          break;
        case 'short-date':
          setMask(shortDateMask);
          setKeyboardType('numeric');
          break;
        case 'cpf':
          setMask(cpfMask);
          setKeyboardType('numeric');
          break;
        case 'cep':
          setMask(cepMask);
          setKeyboardType('numeric');
          break;
        case 'email':
          setKeyboardType('email-address');
          break;
        case 'credit-card':
          setMask(creditCardMask);
          setKeyboardType('numeric');
          break;
        case 'cvv':
          setMask(cvvMask);
          setKeyboardType('numeric');
          break;
        default:
          break;
      }
    }, [maskType]);

    useEffect(() => {
      if (success) {
        setColor(colors.success[600]);
      } else if (isValid === false || errorEmpty === true) {
        setColor(colors.danger[500]);
      } else if (focused) {
        setColor(colors.primary[500]);
      } else if (rest.editable === false) {
        setColor(colors.neutral[400]);
      } else if (valueState) {
        setColor(colors.neutral[800]);
      } else {
        setColor(colors.neutral[500]);
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isValid, focused, success]);

    useEffect(() => {
      if (maskType === 'cpf') {
        let v = valueState;
        v = v?.replace(/\D/g, '');

        v = v
          ?.replace(/(\d{3})(\d)/, '$1.$2')
          .replace(/(\d{3})(\d)/, '$1.$2')
          .replace(/(\d{3})(\d)/, '$1-$2');

        setValueState(v);
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [maskType]);

    const changingText = (v) => {
      // eslint-disable-next-line no-unused-expressions
      onChangeText && onChangeText(v);

      if (isMultipleMask) {
        if (
          v.length >= 9 &&
          // eslint-disable-next-line no-restricted-globals
          !isNaN(v.replace(/[^\w\s]/gi, '')) &&
          valueState.length < v.length
        ) {
          setMask(cpfMask);
          setValueState(v);
        } else {
          setMask(undefined);
          setValueState(v);
        }
      }

      if (maskType === 'phone') {
        if (
          v.length >= 14 &&
          // eslint-disable-next-line no-restricted-globals
          !isNaN(v.replace(/[^\w]/gi, '')) &&
          valueState.length < v.length
        ) {
          setMask(cellphoneMask);
          setValueState(v);
        } else {
          setMask(phoneMask);
          setValueState(v);
        }
      } else {
        setValueState(v);
      }
    };

    const checkErrorEmpty = () => {
      if (required && valueState === '') {
        setErrorEmpty(true);
      } else {
        setErrorEmpty(false);
      }
    };

    function maskInitialValue(val: string) {
      let unmasked = val?.replace(/[^0-9A-Za-z]/g, '');
      if (
        maskType !== undefined &&
        val !== undefined &&
        unmasked !== undefined
      ) {
        let mask1 = '';
        switch (maskType) {
          case 'phone':
            mask1 = phoneMask;

            break;
          case 'date':
            mask1 = dateMask;

            break;
          case 'short-date':
            mask1 = shortDateMask;

            break;
          case 'cpf':
            mask1 = cpfMask;

            break;
          case 'cep':
            mask1 = cepMask;

            break;
          case 'email':
            mask1 = 'email';
            break;
          case 'credit-card':
            mask1 = creditCardMask;

            break;
          case 'cvv':
            mask1 = cvvMask;

            break;
          default:
            break;
        }

        if (maskType === 'email') {
          return initialValue;
        }

        let newValue = '';
        // pegar as posições dos caracteres especiais.
        let positions: number[] = [];
        for (let i = 0; i < mask1?.length; i++) {
          if (mask1[i].match(/[^0-9A-Za-z]/)) {
            positions.push(i);
          }
        }

        let offset = 0;
        for (let j = 0; j < unmasked?.length; j++) {
          // adicionar caracteres especiais
          while (mask1[j + offset]?.match(/[^0-9A-Za-z]/)) {
            newValue += mask1[j + offset];
            offset++;
          }
          newValue += unmasked[j];
        }

        return newValue;
      }
      return initialValue;
    }

    return (
      <View style={[container, style]}>
        <FloatingLabelInput
          editable={!disabled}
          {...rest}
          ref={ref}
          onFocus={() => {
            setFocused(true);
            setErrorEmpty(false);
            if (onInputFocus) onInputFocus();
          }}
          onBlur={() => {
            setFocused(false);
            checkErrorEmpty();
            if (onInputBlur) onInputBlur();
          }}
          isFocused={focused ?? valueState}
          label={label}
          staticLabel
          mask={mask}
          value={maskType ? valueState : value}
          onChangeText={(v) => {
            changingText(v);
          }}
          hintTextColor={colors.neutral[400]}
          hint={placeholder}
          autoCapitalize={
            maskType === 'email' || password ? 'none' : 'sentences'
          }
          keyboardType={keyboardType}
          containerStyles={{
            borderWidth: 1,
            paddingHorizontal: 10,
            backgroundColor: variables.defaultWhite,
            borderColor: color,
            borderRadius: 8,
          }}
          customLabelStyles={{
            colorBlurred: color,
            fontSizeFocused: 14,
          }}
          labelStyles={labelStyles}
          inputStyles={inputStyles}
          rightComponent={
            rightComponent ||
            (!password && icon ? (
              <View style={iconContainer}>
                <TouchableOpacity onPress={handlePress}>
                  <Image style={iconStyles} source={icon} />
                </TouchableOpacity>
              </View>
            ) : undefined)
          }
          isPassword={password}
          darkTheme={password}
          customShowPasswordComponent={
            password ? (
              <Image
                style={{ marginRight: 10 }}
                source={require('@assets/icons/eye_off.png')}
              />
            ) : undefined
          }
          customHidePasswordComponent={
            password ? (
              <Image
                style={{ marginRight: 10 }}
                source={require('@assets/icons/eye_on.png')}
              />
            ) : undefined
          }
        />

        {(!isValid || errorEmpty) && (
          <Text style={textError}>
            {errorEmpty ? 'Este campo é obrigatório' : errorMessage}
          </Text>
        )}
      </View>
    );
  }
);

export { Inputfield };
