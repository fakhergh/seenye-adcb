import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useTheme } from '@shopify/restyle';
import { useTranslation } from 'react-i18next';

import { Box } from '@/components/ui/Box/Box';
import { Icon, IconFilledName } from '@/components/ui/Icon/Icon';
import { IconAppLogo } from '@/components/ui/Icon/icons/various/IconAppLogo';
import { Typography } from '@/components/ui/Typography/Typography';
import { HomeScreen } from '@/screens/app/HomeScreen/HomeScreen';
import { ProfileScreen } from '@/screens/app/ProfileScreen/ProfileScreen';
import { Theme } from '@/styles';
import { AppStackParams, HomeTabStackParams } from '@/types/navigation';
import { uncapitalize } from '@/utils/formatter';
import { responsiveValue } from '@/utils/resizer';

const Tab = createBottomTabNavigator<HomeTabStackParams>();

type IconConfigProps = Record<keyof HomeTabStackParams, IconFilledName>;

const IconConfig: IconConfigProps = {
  Home: 'home-filled',
  Profile: 'user-circular-filled',
};

interface HomeTabProps
  extends NativeStackScreenProps<AppStackParams, 'HomeTab'> {}

export function HomeTab({}: HomeTabProps) {
  const { colors } = useTheme<Theme>();

  const { t } = useTranslation('HomeTab');

  return (
    <Tab.Navigator
      screenOptions={({ route: { name } }) => ({
        title: t(`routes.${uncapitalize(name)}.title`),
        sceneStyle: { backgroundColor: colors.backgroundLight },
        headerTitle: () => (
          <Box flexDirection="row" alignItems="center" g="xs" mb="sm">
            <IconAppLogo width={40} height={40} color={colors.iconPrimary} />
            <Typography variant="h4">Seenye</Typography>
          </Box>
        ),
        //headerTitleAlign: 'left',
        headerShadowVisible: false,
        tabBarActiveTintColor: colors.activeTabBarIcon,
        tabBarInactiveTintColor: colors.inactiveTabBarIcon,
        headerStyle: {
          backgroundColor: colors.backgroundLight,
        },
        tabBarStyle: {
          backgroundColor: colors.backgroundLight,
          borderTopColor: colors.tabBarBorder,
        },
        tabBarIcon: ({ color }) => {
          const iconName = IconConfig[name];

          return (
            <Icon
              name={iconName}
              width={responsiveValue(24)}
              height={responsiveValue(24)}
              color={color}
            />
          );
        },
      })}>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}
