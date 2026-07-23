import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate, useLocation } from 'react-router-dom'

export default function Protected({ children, authentication = true }) {
    const navigate = useNavigate()
    const location = useLocation()
    const [loader, setLoader] = useState(true)
    const authStatus = useSelector((state) => state.auth.status)

    useEffect(() => {
        if (authStatus === undefined) {
            return
        }

        if (authentication && !authStatus) {
            navigate('/login', { replace: true, state: { from: location.pathname } })
            return
        }

        if (!authentication && authStatus) {
            navigate('/', { replace: true })
            return
        }

        setLoader(false)
    }, [authStatus, navigate, authentication, location.pathname])

    return loader ? <div className="py-8 text-center text-slate-200">Loading...</div> : <>{children}</>
}
