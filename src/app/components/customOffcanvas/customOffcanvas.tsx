'use client'

import { useEffect, useState } from 'react';
import { Button, Offcanvas } from "react-bootstrap";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { NavItem } from "@/app/models/navItemModel";
import { offcanvasItems, userUnknownImage } from "@/app/lib/constants";
import './customOffcanvas.scss';

export default function CustomOffcanvas() {
    const [user, setUser] = useState<string | null>(null);

    const pathName = usePathname();
    const currentUser: {
        email: string;
        password: string;
        image: string
    } = user ? JSON.parse(user) : null;

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const toggleShow = () => setShow((s) => !s);

    const getNavItemClassName = (navItem: NavItem): string => {
        let hasChildren = navItem.children.length > 0 ? 'has-children' : 'no-children';
        let current = navItem.href.split('/')[1] === pathName.split('/')[1] ? 'current' : 'not-current';
        return [hasChildren, current].join(' ');
    }

    const getElementDisplay = (navItem: NavItem) => {
        if (!user && navItem.title.toLowerCase() === "admin") {
            return 'none';
        }
        return 'block';
    }

    useEffect(() => {
        setUser(sessionStorage.getItem('user'));
    }, [])

    return (
        <div className="offcanvas-wrapper">
            <div className="offcanvas-button">
                <Button variant="outline-dark" onClick={toggleShow}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                        <path d="M0 96C0 78.3 14.3 64 32 64l384 0c17.7 0 32 14.3 32 32s-14.3 32-32 32L32 128C14.3 128 0 113.7 0 96zM0 256c0-17.7 14.3-32 32-32l384 0c17.7 0 32 14.3 32 32s-14.3 32-32 32L32 288c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32L32 448c-17.7 0-32-14.3-32-32s14.3-32 32-32l384 0c17.7 0 32 14.3 32 32z" />
                    </svg>
                </Button>
            </div>
            <Offcanvas show={show} placement="end" onHide={handleClose}>
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>
                        <div className="row">
                            <div className="col-4">
                                <Image width={50} height={50} src={currentUser ? `/${currentUser.image}` : `/${userUnknownImage}`} alt="user-avatar" />
                            </div>
                            <div className="col-8 title-action">
                                {currentUser ?
                                    <Link href={`/auth/logout`} title="Logout" onClick={handleClose}>Logout</Link> :
                                    <Link href={`/auth/login`} title="Login" onClick={handleClose}>Login</Link>
                                }
                            </div>
                        </div>
                    </Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    <ul className="navbar">
                        <>
                            {offcanvasItems?.map((navItem) => {
                                return (
                                    <li className={getNavItemClassName(navItem)} key={`offcanvas-item-${navItem.title.toLowerCase()}`} style={{ display: getElementDisplay(navItem) }}>
                                        <Link href={navItem.href} title={navItem.title} onClick={handleClose}>{navItem.title}</Link>
                                        {navItem.children.length > 0 &&
                                            <ul className='sub-menu'>
                                                <>
                                                    {navItem.children.map((child) => {
                                                        return (
                                                            <li key={`offcanvas-item-${navItem.title.toLowerCase()}-${child.toLowerCase()}`}>
                                                                <Link href={`${navItem.href}/${child.toLowerCase()}`} title={child} onClick={handleClose}>{child}</Link>
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
                    </ul>
                </Offcanvas.Body>
            </Offcanvas>
        </div>
    );
}