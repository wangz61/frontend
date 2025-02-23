import { useEffect } from "react"
import useUsers from "./useUsers"
import { UserState } from "../slices/users"
import { useNavigate } from "react-router"
import { useAppSelector } from "./useAppSelector"

const useInitialLoading = () => {

    const { setUserData } = useUsers()
    const user = useAppSelector(state => state.user.user)
    const navigate = useNavigate()

    useEffect(() => {
        const userStr = localStorage.getItem('user')
        if(userStr) {
            if(!user) {
                const userData: UserState = JSON.parse(userStr)
                setUserData(userData)
            }
        } else {
            if(!user) {
                navigate('/login')
            }
        }

    }, [user])
}

export default useInitialLoading