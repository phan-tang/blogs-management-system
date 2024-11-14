'use client'

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import CustomTable from "@/app/components/customTable/customTable";
import Loading from "@/app/loading";
import CustomPagination from "@/app/components/customPagination/customPagination";
import { UserInformation } from "@/app/models/userModel";
import { adminPageSize } from "@/app/lib/constants";
import { getUsers } from "@/app/services/userService";
import { toastError } from "@/app/lib/toastify";
import styles from './users.module.scss';


export default function UsersManagement() {
    const router = useRouter();
    const [usersData, setUsersData] = useState<UserInformation[]>([]);
    const [tableItems, setTableItems] = useState<UserInformation[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    const handleChangePage = (pageIndex: number): void => {
        setLoading(true);
        setTableItems(usersData.slice(adminPageSize * (pageIndex - 1), adminPageSize * pageIndex));
        setLoading(false);
        window.scrollTo(0, 0);
    }

    useEffect(() => {
        const user = sessionStorage.getItem('user');
        if (!user) {
            router.push('/auth/login');
        }
        getUsers().then(
            (data) => {
                setUsersData(data);
                setTableItems(data.slice(0, adminPageSize));
                setLoading(false);
            }
        ).catch((err) => {
            toastError('Failed to load users data');
        });
        window.scrollTo(0, 0);
    }, []);

    return (
        <>
            {loading && <Loading />}
            {!loading && <div className="page">
                <div className="page-content">
                    <div className={styles.users}>
                        <h3>Users Management</h3>
                        <CustomTable tableData={tableItems} tableName="users" />
                    </div>
                    <CustomPagination numberOfPages={Math.ceil(usersData.length / adminPageSize)} handleChangePage={handleChangePage} />
                </div>
            </div>}
        </>
    );
}