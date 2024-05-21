import { useEffect, useRef } from "react"
import { FlatList, View, StyleSheet } from "react-native"
import Animated from "react-native-reanimated"
import { CATEGORY_ID } from "src/common/API"
import { dispatch, useAppSelector } from "src/common/redux"
import { getFeaturedPlaylist, getHomePlaylist } from "src/store/action-thunk/HomeThunk"
import { Container } from "src/components/container"
import { scale } from "src/common/scale"
import { HomeData } from "./components/HomeData"
import { PERMISSIONS, RESULTS, check, request } from 'react-native-permissions'
import { HomeItem } from "./components/HomeItem"
import { navigation } from "src/common/navigation"

interface Props{}
const AnimatedList = Animated.createAnimatedComponent(FlatList)

const HomeScreen = (props: Props) => {
    const scrollRef = useRef<any>(null)
    const { access_token } = useAppSelector (state => state.auth)
    const {currentTrack} = useAppSelector(state => state.player)

    const onGetHomeData = async (): Promise<void> => {
        Promise.all([
            dispatch(getHomePlaylist({category_id: CATEGORY_ID.VietNamMusic})),
            dispatch(getFeaturedPlaylist())
        ]).then(()=> {
            
        }).finally(() => {})
    }

    useEffect(() =>{
        if (access_token) onGetHomeData()
    },[]);

    const checkPermission = async () => {
        try {
          const result = await check(PERMISSIONS.ANDROID.READ_MEDIA_AUDIO);
    
          switch (result) {
            case RESULTS.UNAVAILABLE:
              break;
            case RESULTS.DENIED:
              requestPermission();
              break;
            case RESULTS.GRANTED:
              break;
            case RESULTS.BLOCKED:
              break;
          }
        } catch (error) {
          console.error('Lỗi kiểm tra quyền:', error);
        }
      };
      const requestPermission = async () => {
        try {
          const result = await request(PERMISSIONS.ANDROID.READ_MEDIA_AUDIO);
    
          if (result !== RESULTS.GRANTED) {
            checkPermission();
          }
        } catch (error) {
          console.error('Lỗi yêu cầu quyền:', error);
        }
      };

    const onGoPlaylist = (item: {id: string}) => {
        navigation.push({
            name: 'PlaylistScreen',
            params: {
                item
            }
        })
    }

    return (
        <Container>
            <AnimatedList 
                ref={scrollRef}
                bounces={false}
                scrollEventThrottle={16}
                style={{flex: 1, marginBottom: currentTrack ? scale(60) : 0}}
                data={[1]}
                showsVerticalScrollIndicator={false}
                renderItem={()=> (
                    <View
                        style={styles.wrapper}>
                        <FlatList
                            data={HomeData} 
                            renderItem={({item})=> (
                                <HomeItem item={item} onGoPlaylist={onGoPlaylist} />
                            )}
                    />

                </View>
            )}
            />
        </Container>
    )
}
export default HomeScreen

const styles = StyleSheet.create({
    wrapper: {
      height: '100%',
      width: '100%',
      flexGrow: 1,
      borderTopRightRadius: 32,
      borderTopLeftRadius: 32,
      paddingTop: scale(32),
      marginBottom: scale(45),
    },
  });

