import React from 'react'
import { Container, Logo, LogoutBtn } from '../index'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

function Header() {
    const authStatus = useSelector((state) => state.auth.status)
    const navigate = useNavigate()

    const navItems = [
        { name: 'Home', slug: '/', active: true },
        { name: 'Login', slug: '/login', active: !authStatus },
        { name: 'Signup', slug: '/signup', active: !authStatus },
        { name: 'All Posts', slug: '/all-posts', active: authStatus },
        { name: 'Add Post', slug: '/add-post', active: authStatus },
    ]

    return (
        <header className="sticky top-0 z-40 border-b border-slate-800 bg-slate-950/90 backdrop-blur">
            <Container>
                <nav className="flex items-center gap-4 py-3">
                    <div className="mr-2">
                        <Link to="/">
                            <Logo width="70px" />
                        </Link>
                    </div>
                    <ul className="ml-auto flex flex-wrap items-center gap-2">
                        {navItems.map((item) =>
                            item.active ? (
                                <li key={item.name}>
                                    <button
                                        onClick={() => navigate(item.slug)}
                                        className="rounded-full px-4 py-2 text-sm font-medium text-slate-200 transition-colors duration-200 hover:bg-slate-800 hover:text-white"
                                    >
                                        {item.name}
                                    </button>
                                </li>
                            ) : null
                        )}
                        {authStatus && (
                            <li>
                                <LogoutBtn />
                            </li>
                        )}
                    </ul>
                </nav>
            </Container>
        </header>
    )
}

export default Header