import { StyleSheet,TouchableOpacity, View } from "react-native";
import  React from "react";
import { BottomTabBarProps, createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { fontScale, scale } from 'src/common/scale/index';
import { BoldText } from "src/components/text";
import { HomeScreen } from "src/Screens";
import Octicons from 'react-native-vector-icons/Octicons';
import { LibraryIcon } from "src/components/svg";
import { TAB_HEIGHT } from "src/common/constants";
import { translate } from "src/common/language/translate";
import Colors from "src/themes/Colors";
import { SearchStack, LibraryStack } from "../stacks";
import { useAppSelector } from "src/common/redux";
import { Portal } from "react-native-portalize";
import { SelectedTrackModal } from "src/components/modal";
import { Miniplayer } from "src/components/mini-player";

interface Props {
    size: number;
    color: string;
    name?: string;
  }

const HomeIcon = (props: Props) => {
    const {size, color, name} = props;
    return (
      <View
          style={{flex: 1, justifyContent: 'center', alignContent: 'center'}} >
              <View>{renderIcon(props)}</View>
      </View>
    )
}

const renderIcon = (props: Props) => {
    const { size, color, name } = props;
    switch (name) {
      case 'Home': {
        return <Octicons name="home" size={size} color={color} />;
      }
      case 'SearchStack': {
        return <Octicons name="search" size={size} color={color} />;
      }
      case 'LibraryStack': {
        return (
          <LibraryIcon
            color={color}
            height={size}
            width={size}
            viewBox={`5 0 ${size} ${size}`}
          />
        );
      }
    }
  };

export const TabBar = (props: BottomTabBarProps) => {
    const { state, descriptors, navigation } = props;
    return (
      <View style={[styles.container]}>
        <View style={{ flexDirection: 'row' }}>
          {state.routes.map((route, index) => {
            const { options } = descriptors[route.key]
            const label =
              options.tabBarLabel !== undefined
                ? options.tabBarLabel
                : options.title !== undefined
                ? options.title
                : translate(`home:${route.name.toLocaleLowerCase()}`)
  
            const isFocused = state.index === index;
  
            const onPress = () => {
              const event = navigation.emit({
                type: 'tabPress',
                target: route.key,
                canPreventDefault: true,
              })
              if (!isFocused && !event.defaultPrevented) {
                navigation.navigate(route.name);
              }
            }
  
            const onLongPress = () => {
              navigation.emit({
                type: 'tabLongPress',
                target: route.key,
              })
            }
            return (
              <TouchableOpacity
                key={label.toString()}
                onPress={onPress}
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                  height: TAB_HEIGHT,
                }}>
                <HomeIcon
                  color={isFocused ? Colors.white.default : Colors.unActive}
                  size={scale(25)}
                  name={route.name}
                />
                <BoldText
                  textStyle={{
                    fontSize: fontScale(scale(9)),
                    color: isFocused ? Colors.white.default : Colors.unActive,
                  }}>
                  {label.toString()}
                </BoldText>
              </TouchableOpacity>
            );
          })}
        </View>
        <View style={styles.overlay} />
      </View>
    );
  };


export type HomeTabParamList = {
    Home: undefined,
    SearchStack: undefined,
    LibraryStack: undefined,
}

const Tab = createBottomTabNavigator<HomeTabParamList>()

const HomeTab = () => {
  const { currentTrack } = useAppSelector(state => state.player)
  return (
    <View style={{ flex: 1, position: 'relative' }}>
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarShowLabel: false,
        }}
        tabBar={props => (
          <Portal>
            {currentTrack.id && <Miniplayer />}
            <TabBar {...props}/>
            <SelectedTrackModal />
          </Portal>
        )}
        >
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen
          name="SearchStack"
          component={SearchStack}
          options={{ title: translate('home:search') }}
        />
        <Tab.Screen
          name="LibraryStack"
          component={LibraryStack}
          options={{ title: translate('home:library') }}
        />
      </Tab.Navigator>
    </View>
  )
}

const styles = StyleSheet.create ({
    container: {
        height: TAB_HEIGHT,
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 1,
        borderTopWidth: 0,
        shadowOpacity: 1,
      },
      overlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'black',
        opacity: 0.8,
        zIndex: -1,
      },
      floatingPlayer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 9999,
        width: '100%',
        backgroundColor: 'white',
      },
})
export default HomeTab