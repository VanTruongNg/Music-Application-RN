import RNFS from 'react-native-fs'
import { TrackDataFields } from "src/models/Track";
import { isFirebaseUrl } from '../helper';

const musicAppFolderPath = `${RNFS.DownloadDirectoryPath}`

const createDirectoryIfNotExists = async (directoryPath: string) => {
    try{
        const isExists = await RNFS.exists(directoryPath)
        if (!isExists) {
            await RNFS.mkdir(directoryPath)
            console.log (`Create directory ${directoryPath}`)
        }
    }catch(err) {
        console.log (`Error creating directory: `, err)
    }
}

export const downloadTrack = async (data: TrackDataFields) => {
    const localFilePath = `${musicAppFolderPath}/LoveList/${data.id}.mp3`

    const fileExists = await RNFS.exists(localFilePath)

    if (fileExists) {
        return `file://${localFilePath}`
    }

    await createDirectoryIfNotExists(`${musicAppFolderPath}/LoveList`)
    await linkFileMp3 (data, localFilePath)
}

const linkFileMp3 = async (data: TrackDataFields, localFilePath: string) => {
    try {
        if (!data.url || isFirebaseUrl(data.url) || data.url === '') return '';

        const response: any = await RNFS.downloadFile ({
            fromUrl: data.url,
            toFile: localFilePath,
            progress: res => {
                console.log('Đang tải' + data.id)
            }
        }).promise

        if (response.statusCode === 202) {
            setTimeout(() => {
                linkFileMp3(data, localFilePath)
            }, 500)
            return
        }

        if (response.statusCode === 200) {
            console.log('Tải và lưu tệp thành công')
            return localFilePath
        }else {
            console.log('Lỗi khi tải tập tin')
            return ''
        }
    }catch (e) {
        console.error('Lỗi khi tải tập tin', e)
        return ''
    }
}