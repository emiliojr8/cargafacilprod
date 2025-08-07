// src/types/navigation.d.ts
import { RootDrawerParamList } from '../navigation/AppNavigator';

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootDrawerParamList {}
  }
}