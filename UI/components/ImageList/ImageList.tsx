import React from 'react';
import { FlatList, Image, Text, View, TouchableOpacity } from 'react-native';
import {
  imageListImage,
  imageListStyles,
  imageListItem,
  imageListContainer
} from './ImageList.styles';
import { IImageListProps } from './ImageList.types';

class ImageList extends React.Component<IImageListProps, any> {
  constructor(props: IImageListProps) {
    super(props);

    this._onRender = this._onRender.bind(this);
  }

  // TODO: Change key extractor by providing a unique key (in general it is not good to use the
  // index as the key in React).
  render(): JSX.Element {
    const { data, rowSpacing } = this.props;
    return (
      <FlatList
        data={data}
        keyExtractor={(item, index) => index.toString()}
        numColumns={2}
        renderItem={this._onRender}
        style={imageListContainer(rowSpacing)}
      />
    );
  }

  _onRender({ item, index }): JSX.Element {
    const { columnSpacing, defaultImage, rowSpacing, width } = this.props;
    const { itemText } = imageListStyles;
    const isLeft = index % 2 == 0;
    const imageSrc = item.imageUrl ? { uri: item.imageUrl } : defaultImage;

    return (
      <View style={imageListItem(columnSpacing, rowSpacing, width, isLeft)}>
        <TouchableOpacity activeOpacity={0.75} onPress={() => {}}>
          <Image
            resizeMethod="resize"
            source={imageSrc}
            style={imageListImage(columnSpacing, width)}
          />
        </TouchableOpacity>
        <Text numberOfLines={2} style={itemText}>
          {item.name}
        </Text>
      </View>
    );
  }
}

export { ImageList };
