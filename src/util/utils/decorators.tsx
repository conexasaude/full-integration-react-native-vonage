import React, { FunctionComponent, ReactNode } from 'react'
import { View } from 'react-native'

interface BufferViewProps {
  children: ReactNode
}
export const BufferView: FunctionComponent<BufferViewProps> = ({
  children,
}) => (
  <View
    style={{
      flex: 1,
      paddingVertical: 40,
      paddingHorizontal: 20,
      backgroundColor: '#fff',
    }}
  >
    <View>{children}</View>
  </View>
)
