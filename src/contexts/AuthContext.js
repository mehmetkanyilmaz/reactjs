import { useState, createContext, useEffect, useContext } from "react"
import { fetchMe } from "../api";
import { Flex, Spinner } from '@chakra-ui/react'

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loggedIn, setLoggedIn] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        (async () => {
            try {
                const me = await fetchMe()

                if(me == null || me.accessToken == null) {
                    setLoggedIn(false)
                    setUser(null)
                }
                else {
                    setLoggedIn(true)
                    setUser(me)
                }

                setLoading(false)
            }
            catch(e) {
                setLoading(false)
            }
        })()
    }, [])

    const login = (data) => {
        setLoggedIn(true)
        setUser(data)

        localStorage.setItem('access-token', data.accessToken)
        // localStorage.setItem('refresh-token', data.refreshToken)
    }

    const logout = async (callback) =>  {
        setLoggedIn(false)
        setUser(null)

        localStorage.removeItem('access-token')
        localStorage.removeItem('refresh-token')

        callback()
    }

    const values = {
        loggedIn,
        user,
        login,
        logout
    }

    if(loading) {
        return (
            <Flex justifyContent="center" alignItems="center" height="100vh">
                <Spinner thickness="4px" speed="0.65s" emptyColor="gray.200" size="xl" color="red.500" />
            </Flex>
        )
    }

    return <AuthContext.Provider value={values}>{ children }</AuthContext.Provider>
}

const useAuth = () => useContext(AuthContext);

export {
    AuthProvider, useAuth
}