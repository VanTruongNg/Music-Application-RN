import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { memo } from 'react';
import { AnimatedList } from 'src/components/list';
import Layout from 'src/themes/Layout';
import { MediumText } from 'src/components/text';
import { dispatch, useAppSelector } from 'src/common/redux';
import Colors from 'src/themes/Colors';
import { fontScale, scale } from 'src/common/scale';
import Divider from 'src/components/divider';
import { searchActions } from 'src/store/action-slices';
import isEqual from 'react-fast-compare';

type Props = {
    selectedFilter: string;
}
const listTag = [
  {
    id: 1,
    key: 'track',
    name: 'Bài hát',
  },
  {
    id: 2,
    key: 'artist',
    name: 'Nghệ sĩ',
  },
]

const TagFilterComponent = ({ selectedFilter }: Props) => {
  const renderItem = (item: any) => {
    const onPressFilter = () => {
      if (selectedFilter === item.key) return;
      dispatch(searchActions.onSetFilter(item.key));
    };
    return (
      <TouchableOpacity
        style={[
          Layout.center,
          styles.wrap,
          {
            backgroundColor:
              selectedFilter === item.key ? Colors.green.default : '#2b2b2b',
          },
        ]}
        onPress={onPressFilter}>
        <MediumText textStyle={{ fontSize: fontScale(12) }}>
          {item.name}
        </MediumText>
      </TouchableOpacity>
    )
  }

  return (
    <AnimatedList
      data={listTag}
      horizontal
      keyExtractor={item => item.id}
      renderItem={({ item }: any) => renderItem(item)}
      ItemSeparatorComponent={() => <Divider width={scale(10)} />}
    />
  );
};

export const TagFilter = memo(TagFilterComponent, isEqual);

const styles = StyleSheet.create({
  wrap: {
    paddingVertical: scale(8),
    paddingHorizontal: scale(12),
    borderRadius: scale(22),
  },
});
