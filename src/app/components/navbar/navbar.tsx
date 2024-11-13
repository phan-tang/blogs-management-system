'use client'

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { navItems } from '@/app/lib/constants';
import { getSourceLink } from '@/app/lib/plugins';
import { NavItem } from '@/app/models/navIModel';
import styles from './navbar.module.scss';

export default function Navbar() {
    const pathName = usePathname();
    let user = sessionStorage ? sessionStorage.getItem('user') : null;
    const currentUser: {
        email: string;
        password: string;
        image: string
    } = user ? JSON.parse(user) : null;

    const getNavItemClassName = (navItem: NavItem): string => {
        let hasChildren = navItem.children.length > 0 ? styles.hasChildren : 'no-children';
        let current = navItem.href.split('/')[1] === pathName.split('/')[1] ? styles.current : 'not-current';
        return [hasChildren, current].join(' ');
    }

    const getElementDisplay = (navItem: NavItem) => {
        if (user && navItem.title.toLowerCase() === "login") {
            return 'none';
        }
        return 'inline-block';
    }

    return (
        <nav className={styles.navbarWrap}>
            <ul className={styles.navbar}>
                <>
                    {navItems?.map((navItem) => {
                        return (
                            <li className={getNavItemClassName(navItem)} key={`nav-item-${navItem.title.toLowerCase()}`} style={{ display: getElementDisplay(navItem) }}>
                                <Link href={navItem.href} title={navItem.title}>{navItem.title}</Link>
                                {navItem.children.length > 0 &&
                                    <ul className={styles.subMenu}>
                                        <>
                                            {navItem.children.map((child) => {
                                                return (
                                                    <li key={`nav-item-${navItem.title.toLowerCase()}-${child.toLowerCase()}`}>
                                                        <Link href={`${navItem.href}/${child.toLowerCase()}`} title={child}>{child}</Link>
                                                    </li>
                                                );
                                            })}
                                        </>
                                    </ul>
                                }
                            </li>
                        );
                    })}
                </>
                {currentUser && <li>
                    <div>
                        <img width="50" height="50" src={getSourceLink(currentUser.image, pathName)} alt="user-avatar" />
                        <ul className={styles.subMenu}>
                            <li>
                                <Link href="/admin/users" title="Admin">Admin</Link>
                            </li>
                            <li>
                                <Link href="/auth/logout" title="Logout">Logout</Link>
                            </li>
                        </ul>
                    </div>
                </li>}
            </ul>
        </nav>
    );
}