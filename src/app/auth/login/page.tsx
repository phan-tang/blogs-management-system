'use client'

import { useRouter } from "next/navigation";
import CustomForm from "@/app/components/customForm/customForm";
import { loginFields, userImages } from "@/app/lib/constants";
import { toastError, toastSuccess } from "@/app/lib/toastify";
import styles from "./login.module.scss";
import { getRandomIndex } from "@/app/lib/plugins";

export default function Login() {
    const router = useRouter();
    const handleLogin = (formData: any): void => {
        if (formData.email === "admin" && formData.password === "123") {
            sessionStorage.setItem('user', JSON.stringify({ ...formData, image: userImages[getRandomIndex(userImages.length)] }));
            toastSuccess("Login successfully");
            router.push('/admin/users');
        }
        else {
            toastError('Incorrect email or password!');
        }
    }
    return (
        <section className="page">
            <div className={styles.login}>
                <h3>Login</h3>
                <CustomForm formItem={loginFields} handleSubmitForm={handleLogin} />
            </div>
        </section>
    );
}