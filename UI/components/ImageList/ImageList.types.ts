import { ImageRequireSource } from 'react-native';

export interface IImageItem {
  name: string;
  imageUrl: string;
}

export interface IImageListProps {
  columnSpacing: number;
  data: IImageItem[];
  defaultImage: ImageRequireSource;
  rowSpacing: number;
  width: number;
}
