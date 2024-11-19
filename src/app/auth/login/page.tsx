'use client'

import { useRouter, redirect } from "next/navigation";
import { useEffect, useState } from "react";
import CustomForm from "@/app/components/customForm/customForm";
import { loginFields, userImages } from "@/app/lib/constants";
import { toastError, toastSuccess } from "@/app/lib/toastify";
import styles from "./login.module.scss";
import { getRandomIndex } from "@/app/lib/plugins";
import Loading from "@/app/loading";

export default function Login() {
    const [loading, setLoading] = useState<boolean>(true);

    const router = useRouter();
    const handleLogin = (formData: any): void => {
        if (formData.email === "admin@gmail.com" && formData.password === "123") {
            sessionStorage.setItem('user', JSON.stringify({ ...formData, image: userImages[getRandomIndex(userImages.length)] }));
            toastSuccess("Login successfully");
            router.push('/admin/users');
        }
        else {
            toastError('Incorrect email or password!');
        }
    }

    useEffect(() => {
        const user = sessionStorage.getItem('user')
        if (user) {
            router.push('/admin/users');
        }
        setLoading(false)
    })

    return (
        <section className="page">
            {loading && <Loading />}
            {!loading && <div className={styles.login}>
                <h3>Login</h3>
                <CustomForm formItem={loginFields} handleSubmitForm={handleLogin} />
            </div>}
        </section>
    );
}