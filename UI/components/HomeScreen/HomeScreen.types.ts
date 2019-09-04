import { NavigationScreenProp, NavigationState, NavigationParams } from 'react-navigation';
import { IImageItem } from '../ImageList/ImageList.types';

export interface IHomeScreenProps {
  navigation: NavigationScreenProp<NavigationState, NavigationParams>;
}

export interface IHomeScreenState {
  spellistas: IImageItem[];
}

export interface IDictionary<TValue> {
  [key: string]: TValue;
}
