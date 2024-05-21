import { StyleSheet, Text, TextInput, View } from 'react-native';
import React, {
  forwardRef,
  useState,
  useRef,
  useImperativeHandle,
} from 'react';
import { InputProps, InputRef } from './type';
import { useTheme } from '@react-navigation/native';
import Layout from 'src/themes/Layout';
import { scale } from 'src/common/scale';
import Colors from 'src/themes/Colors';
import isEqual from 'react-fast-compare';

const InputComponent = forwardRef<InputRef, InputProps>(
  (
    {
      onChangeTextValue,
      contentRight,
      contentLeft,
      editable = true,
      defaultValue,
      onFocus,
      onBlur,
      inputStyle,
      style,
      ...props
    },
    ref,
  ) => {
    const [value, setValue] = useState<string>(defaultValue);
    const [errorMessage, setErrorMessage] = useState<string>('');
    const [isFocusing, setFocusing] = useState<boolean>(false);
    const inputRef = useRef<TextInput>(null);
    const theme = useTheme();

    useImperativeHandle(ref, () => ({
      value,
      setValue: valueInput => setValue(valueInput),
      setError: textError => setErrorMessage(textError),
      clearError: () => setErrorMessage(''),
      clear: () => setValue(''),
    }));

    const onChangeText = (valueInput: string) => {
      if (errorMessage) setErrorMessage('');
      setValue(valueInput);
      onChangeTextValue?.(valueInput);
    };

    const _onClear = () => {
      onChangeText('');
      inputRef.current?.clear();
    };

    return (
      <View style={[{ paddingVertical: scale(8) }, Layout.rowVCenter, style]}>
        {contentLeft?.()}
        <TextInput
          style={[inputStyle, styles.inputStyle]}
          ref={inputRef}
          value={value}
          onChangeText={onChangeText}
          editable={editable}
          autoCorrect={false}
          autoComplete={'off'}
          onFocus={() => {
            setFocusing(true);
            onFocus?.();
          }}
          onBlur={() => {
            setFocusing(false);
            onBlur?.();
          }}
          {...props}
        />
        {contentRight?.()}
      </View>
    );
  },
);

export const Input = React.memo(InputComponent, isEqual);

const styles = StyleSheet.create({
  inputStyle: {
    color: Colors.black.default,
    marginLeft: scale(10),
    textAlignVertical: 'center',
    padding: 0,
    margin: 0,
    width: '85%',
  },
});
