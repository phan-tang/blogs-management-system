'use client'

import CustomForm from '../customForm/customForm';
import { footerFields } from '@/app/lib/constants';
import styles from './footer.module.scss';

export default function Footer() {
    const handleClick = (formData: any): void => {
        console.log(formData);
        window.scrollTo(0, 0);
    }
    return (
        <footer className={styles.footer}>
            <div className={'container ' + styles.footerMain}>
                <div className="row">
                    <div className={"col-lg-3 col-md-12 col-sm-12 col-xs-12 " + styles.footerInfo}>
                        <h4>About Our Site</h4>
                        <p>
                            Lorem ipsum Ut velit dolor Ut labore id fugiat in ut fugiat nostrud qui in dolore commodo eu magna Duis cillum dolor officia esse mollit proident Excepteur exercitation nulla. Lorem ipsum In reprehenderit commodo aliqua irure labore.
                        </p>
                    </div>
                    <div className={"col-lg-3 col-md-6 col-sm-6 col-xs-6 " + styles.siteLinks}>
                        <h4>Site Links</h4>
                        <ul>
                            <li><a href="#">About Us</a></li>
                            <li><a href="#">Blog</a></li>
                            <li><a href="#">FAQ</a></li>
                            <li><a href="#">Terms</a></li>
                            <li><a href="#">Privacy Policy</a></li>
                        </ul>
                    </div>
                    <div className={"col-lg-3 col-md-6 col-sm-6 col-xs-6 " + styles.socialLinks}>
                        <h4>Social</h4>
                        <ul>
                            <li><a href="#">Twitter</a></li>
                            <li><a href="#">Facebook</a></li>
                            <li><a href="#">Dribbble</a></li>
                            <li><a href="#">Google+</a></li>
                            <li><a href="#">Instagram</a></li>
                        </ul>
                    </div>
                    <div className={"col-lg-3 col-md-12 col-sm-12 col-xs-12 " + styles.footerSubscribe}>
                        <h4>Subscribe</h4>
                        <p>Keep yourself updated. Subscribe to our newsletter.</p>
                    </div>
                </div>
            </div>
            <div className={styles.footerBottom}>
                <div className="row">
                    <div>
                        <div className={styles.copyright}>
                            <span>© Copyright Abstract 2016</span>
                            <span>Design by <a href="http://www.styleshout.com/">styleshout</a></span>
                        </div>
                        <div className={styles.footerForm}>
                            <CustomForm formItem={footerFields} handleSubmitForm={handleClick} />
                        </div>
                    </div>
                </div>
            </div>

        </footer>
    );
}