export type AuthStackParams = {
  Login: undefined;
  Register: undefined;
};

export type HomeTabStackParams = {
  Home: undefined;
  Profile: undefined;
};

export type AppStackParams = {
  HomeTab: undefined;
  EventDetail: {
    id: string;
  };
  Search: undefined;
  Favorites: undefined;
  LanguageSetting: undefined;
};

export type RootStackParams = AuthStackParams &
  HomeTabStackParams &
  AppStackParams;
