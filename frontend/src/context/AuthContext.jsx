import { createContext, useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { API } from '../constants'
import { getToken } from './../helpers/index';


export const AuthContext = createContext()


// eslint-disable-next-line react-refresh/only-export-components
export const useAuthContext = () => {
    return useContext(AuthContext)
}

// eslint-disable-next-line react/prop-types
export const AuthProvider = ({ children }) => {

    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [user, setUser] = useState(null)

    let token = getToken()

    const navigate = useNavigate()

    /* useEffect(() => {

        if (token) {
            fetch(`${API}/auth/me`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
                .then(res => res.json())
                .then(data => {
                    if (data.success) {
                        setUser(data.user)
                    } else {
                        setError(data.message)
                    }
                    setLoading(false)
                })
                .catch(err => {
                    setError(err.message)
                    setLoading(false)
                })
        } else {
            setLoading(false)
        }
    }, [token]) */

    const login = async (username, password) => {
        setLoading(true)

        try {
            await fetch(`${API}/auth`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username, password })
            })
                .then(res => res.json())
                .then(data => {
                    //console.log('data', data)
                    if (data.token) {
                        localStorage.setItem('authToken', data.token)
                        setUser(data.user)
                        navigate('/home', { replace: true })
                    } else {
                        setError(data.message)
                    }
                })
                .catch(err => setError(err.message))
        } catch (err) {
            setError(err.message)
        } finally {
            setLoading(false)
        }

    }

    const logout = () => {
        localStorage.removeItem('authToken')
        setUser(null)
        navigate('/home', { replace: true })
    }

    const register = async (username, email, password, confirm) => {
        setLoading(true)
        try {
            await fetch(`${API}/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username, email, password, confirm })
            })
                .then(res => res.json())
                .then(data => {
                    //console.log('data', data)
                    if (data.token) {
                        
                        setUser(data.player)
                        navigate('/home', { replace: true })
                    } else {
                        setError(data.message)
                    }
                })
                .catch(err => setError(err.message))
        } catch (err) {
            setError(err.message)
        } finally {
            setLoading(false)
        }
    }

    const value = {
        user,
        token,
        loading,
        error,
        login,
        logout,
        register
    }

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )

}

