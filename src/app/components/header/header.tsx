'use client'

import Link from 'next/link';
import Navbar from '../navbar/navbar';
import styles from './header.module.scss';
import CustomOffcanvas from '../customOffcanvas/customOffcanvas';

export default function Header() {
    return (
        <header className={styles.header}>
            <div className={styles.headerContent}>
                <div className={styles.logo}>
                    <Link href="/">Author</Link>
                </div>
                <Navbar />
                <CustomOffcanvas />
            </div>
        </header>
    );
}