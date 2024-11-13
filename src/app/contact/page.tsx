import styles from './contact.module.scss';

export default function Contact() {
    return (
        <section className={styles.contact}>
            <div className={styles.contentSection}>
                <div className={"row " + styles.normal}>
                    <div className="col-12">
                        <section>
                            {/* <div className="content-media">
                                <div id="map-wrap">
                                    <div id="map-container"></div>
                                    <div id="map-zoom-in"></div>
                                    <div id="map-zoom-out"></div>
                                </div>
                            </div> */}
                            <div className={styles.primaryContent}>
                                <h1 className="entry-title add-bottom">Get In Touch With Us.</h1>
                                <p className="lead">Lorem ipsum Deserunt est dolore Ut Excepteur nulla occaecat magna occaecat Excepteur nisi esse veniam dolor consectetur minim qui nisi esse deserunt commodo ea enim ullamco non voluptate consectetur minim aliquip Ut incididunt amet ut cupidatat.</p>
                                <p>Duis ex ad cupidatat tempor Excepteur cillum cupidatat fugiat nostrud cupidatat dolor sunt sint sit nisi est eu exercitation incididunt adipisicing veniam velit id fugiat enim mollit amet anim veniam dolor dolor irure velit commodo cillum sit nulla ullamco magna amet magna cupidatat qui labore cillum sit in tempor veniam consequat non laborum adipisicing aliqua ea nisi sint ut quis proident ullamco ut dolore culpa occaecat ut laboris in sit minim cupidatat ut dolor voluptate enim veniam consequat occaecat fugiat in adipisicing in amet Ut nulla nisi non ut enim aliqua laborum mollit quis nostrud sed sed.</p>
                                <div className="row">
                                    <div className="col-6">
                                        <h4>Where to Find Us</h4>
                                        <p>
                                            1600 Amphitheatre Parkway<br />
                                            Mountain View, CA<br />
                                            94043 US
                                        </p>
                                    </div>
                                    <div className="col-6">
                                        <h4>Contact Info</h4>
                                        <p>someone@abstractwebsite.com<br />
                                            info@abstractwebsite.com <br />
                                            Phone: (+63) 555 1212
                                        </p>
                                    </div>
                                </div>
                                {/* <form name="cForm" id="cForm" method="post" action="">
                                <fieldset>
                                    <div className="form-field">
                                        <input name="cName" type="text" id="cName" className="full-width" placeholder="Your Name" value="" />
                                    </div>
                                    <div className="form-field">
                                        <input name="cEmail" type="text" id="cEmail" className="full-width" placeholder="Your Email" value="" />
                                    </div>
                                    <div className="form-field">
                                        <input name="cWebsite" type="text" id="cWebsite" className="full-width" placeholder="Website" value="" />
                                    </div>
                                    <div className="message form-field">
                                        <textarea name="cMessage" id="cMessage" className="full-width" placeholder="Your Message" ></textarea>
                                    </div>
                                    <button type="submit" className="submit button-primary full-width-on-mobile">Submit</button>
                                </fieldset>
                            </form> */}
                            </div>
                        </section>
                    </div>
                </div>
            </div>
        </section>
    );
}