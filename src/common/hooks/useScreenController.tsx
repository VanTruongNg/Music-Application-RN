import { useTranslation } from "react-i18next"
import { useAppDispatch } from "../redux"
import { RouteProp, useRoute } from "@react-navigation/native"
import { navigation } from "../navigation"

export const useScreenController = () => {
    const {t} = useTranslation()
    const translate = t
    const dispatch = useAppDispatch()
    const route = useRoute<RouteProp<any>>()

    return {translate, dispatch, route, navigation}
}