'use client'

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import CustomTable from "@/app/components/customTable/customTable";
import Loading from "@/app/loading";
import CustomPagination from "@/app/components/customPagination/customPagination";
import { adminPageSize } from "@/app/lib/constants";
import { toastError } from "@/app/lib/toastify";
import { getBlogs } from "@/app/services/blogService";
import { BlogItem } from "@/app/models/blogModel";
import styles from './blogs.module.scss';


export default function AlbumsManagement() {
    const router = useRouter();
    const [blogsData, setBlogsData] = useState<BlogItem[]>([]);
    const [tableItems, setTableItems] = useState<BlogItem[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    const handleChangePage = (pageIndex: number): void => {
        setLoading(true);
        setTableItems(blogsData.slice(adminPageSize * (pageIndex - 1), adminPageSize * pageIndex));
        setLoading(false);
        window.scrollTo(0, 0);
    }

    useEffect(() => {
        const user = sessionStorage.getItem('user');
        if (!user) {
            router.push('/auth/login');
        }
        getBlogs().then(
            (data) => {
                setBlogsData(data);
                setTableItems(data.slice(0, adminPageSize));
                setLoading(false);
            }
        ).catch((err) => {
            toastError('Failed to load blogs data');
        });
        window.scrollTo(0, 0);
    }, []);

    return (
        <>
            {loading && <Loading />}
            {!loading && <div className="page">
                <div className="page-content">
                    <div className={styles.blogs}>
                        <h3>Blogs Management</h3>
                        <CustomTable tableData={tableItems} tableName="blogs" />
                    </div>
                    <CustomPagination numberOfPages={Math.ceil(blogsData.length / adminPageSize)} handleChangePage={handleChangePage} />
                </div>
            </div>}
        </>
    );
}