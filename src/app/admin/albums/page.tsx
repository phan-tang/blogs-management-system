'use client'

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import CustomTable from "@/app/components/customTable/customTable";
import Loading from "@/app/loading";
import CustomPagination from "@/app/components/customPagination/customPagination";
import { adminPageSize } from "@/app/lib/constants";
import { toastError } from "@/app/lib/toastify";
import { getAlbums } from "@/app/services/albumService";
import { AlbumItem } from "@/app/models/albumModel";
import styles from './albums.module.scss';

export default function AlbumsManagement() {
    const router = useRouter();
    const [albumsData, setAlbumsData] = useState<AlbumItem[]>([]);
    const [tableItems, setTableItems] = useState<AlbumItem[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    const handleChangePage = (pageIndex: number): void => {
        setLoading(true);
        setTableItems(albumsData.slice(adminPageSize * (pageIndex - 1), adminPageSize * pageIndex));
        setLoading(false);
        window.scrollTo(0, 0);
    }

    useEffect(() => {
        let user = sessionStorage.getItem('user');
        if (!user) {
            router.push('/auth/login');
        }
        getAlbums().then(
            (data) => {
                setAlbumsData(data);
                setTableItems(data.slice(0, adminPageSize));
                setLoading(false);
            }
        ).catch((err) => {
            toastError('Failed to load albums data');
        });
    }, []);

    return (
        <>
            {loading && <Loading />}
            {!loading && <div className="page">
                <div>
                    <div className={styles.albums}>
                        <h3>Albums Management</h3>
                        <CustomTable tableData={tableItems} tableName="albums" />
                    </div>
                    <CustomPagination numberOfPages={Math.ceil(albumsData.length / adminPageSize)} handleChangePage={handleChangePage} />
                </div>
            </div>}
        </>
    );
}