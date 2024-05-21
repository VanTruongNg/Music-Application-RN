import firestore, {FirebaseFirestoreTypes} from '@react-native-firebase/firestore';
import { AddTrackToPlayListFields, ReadDataProps, WriteDataProps} from './type';
import { Collection } from './constants';
import { useEffect, useRef } from 'react';
  
const UserId = 'user1';
export const PlayListDocRef = firestore()
    .collection(Collection.PlayList)
    .doc(UserId)
  
const PlayListCollectionRef = firestore().doc(PlayListDocRef.path)
    .collection(Collection.PlayList_List)
  
export const getTrackInfo = async ({
    doc,
}: ReadDataProps): Promise<
    FirebaseFirestoreTypes.DocumentSnapshot<FirebaseFirestoreTypes.DocumentData>> => {
        return await firestore().collection(Collection.TrackList).doc(doc).get();
}
  
export const setTrackInfo = async ({ doc, data }: WriteDataProps) => {
    await firestore()
    .collection(Collection.TrackList)
    .doc(doc)
    .set(data)
    .then(() => {
        console.log('Track added')
    })
}
  
export const getRapidApiKey = async ({
    collection = Collection.RapidApi,
    doc = 'RapidKey',
}) => {
       return await firestore().collection(collection).doc(doc).get();
 }
  
export const getPlaylist = async () => {
    return await PlayListCollectionRef.get().then(data =>
        data.docs.map(t => t.data()),
    )
}
  
export const getTrackFromPlayList = async (
    playlistId: string,
    setData?: (data: any) => void,
) => {
    useEffect(() => {
    const subscriber = PlayListDocRef.collection(playlistId).onSnapshot(
        documentSnapshot => {
            let data: FirebaseFirestoreTypes.DocumentData[] = []
            documentSnapshot.docs.map(t => data.push(t.data()))
            const totalItems = documentSnapshot.size
        
            setData?.({ data, totalItems })
        },
        )
        // Stop listening for updates when no longer required
        return () => subscriber();
        }, [])
}
  
const checkExistsDoc = async ({ docRef, colRef }: any) => {
    if (docRef) {
        const docSnapshot = await firestore().doc(docRef).get()
        return !!docSnapshot.exists ?? false
    }
}
  
export const checkLoveTrack = async (
    dataId: string,
    setData?: (data: any) => void,
) => {
    if (typeof setData === 'function') {
    const subscriptionRef = useRef<any>(null)
    
    useEffect(() => {
        if (subscriptionRef?.current) {
            subscriptionRef?.current(); //hủy lắng nghe sự kiện trước đó
        }
    
        const newSubscription = firestore()
            .doc(`PlayLists/${UserId}/LoveList/${dataId}`)
            .onSnapshot(documentSnapshot => {
                setData?.(documentSnapshot.exists)
            })
    
            // Lưu trữ subscriber mới vào ref
            subscriptionRef.current = newSubscription
    
            return () => {
                if (subscriptionRef.current) {
                    subscriptionRef.current()
                }
                }
        }, [dataId])
        return false
        } else
            return (
                (await checkExistsDoc({
                    docRef: `PlayLists/${UserId}/LoveList/${dataId}`,
                })) ?? false
            )
    }
  
export const addTrackToPlaylist = ({
    data,
    ref = `PlayLists/${UserId}/LoveList`, // mặc định add vào love list
    callback = () => {},
}: AddTrackToPlayListFields) => {
    const playlistId = ref.split('/')[2]
    const docRef = firestore().collection(ref).doc(data.id)
    
    checkExistsDoc(docRef.path).then(bool => {
    if (!bool) {
        docRef.set(data).then(() => {
        console.log('Add track to playlist')
        callback()
        //tăng 1 total khi add track vào playlist
        PlayListCollectionRef.doc(playlistId)
            .update({total: firestore.FieldValue.increment(1),})
            .then(() => {
                console.log('update total');
            })
        })
        } else {
            console.log('Document already exists');
        }
        })
}
  
export const removeTrackFromPlaylist = ({
    data,
    ref = `PlayLists/${UserId}/LoveList`, // mặc định love list
    callback = () => {},
}: AddTrackToPlayListFields) => {
    const playlistId = ref.split('/')[2]
    const docRef = firestore().collection(ref).doc(data.id);
    
    docRef
        .delete()
        .then(() => {
            callback()
            PlayListCollectionRef.doc(playlistId)
            .update({
                total: firestore.FieldValue.increment(-1), //giảm 1 total sau khi xóa
            })
            .then(() => {
                console.log('update total')
            })
        })
        .catch(e => {
            console.log('lỗi khi xóa track')
            console.log(e);
        })
}
  
    