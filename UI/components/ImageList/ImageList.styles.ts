import { StyleSheet, StyleProp, ImageStyle } from 'react-native';

export const imageListStyles = StyleSheet.create({
  itemText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 10
  }
});

export function imageListContainer(rowSpacing: number): StyleProp<ImageStyle> {
  return { marginTop: rowSpacing };
}

export function imageListItem(
  columnSpacing: number,
  rowSpacing: number,
  rowWidth: number,
  isLeft: boolean
): StyleProp<ImageStyle> {
  const width = (rowWidth - 3 * columnSpacing) / 2;
  return isLeft
    ? {
        marginLeft: columnSpacing,
        marginRight: columnSpacing / 2,
        marginBottom: rowSpacing,
        width: width
      }
    : {
        marginLeft: columnSpacing / 2,
        marginRight: columnSpacing,
        marginBottom: rowSpacing,
        width: width
      };
}

export function imageListImage(columnSpacing: number, width: number): StyleProp<ImageStyle> {
  const height = (width - 3 * columnSpacing) / 2;
  return { borderRadius: 10, height: height, width: '100%' };
}
