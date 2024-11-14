'use client'

import { Suspense, useEffect, useState } from "react";
import Image from "next/image";
import { getBlogItem, getComments } from "@/app/services/blogService";
import { BlogItem, CommentItem } from "@/app/models/blogModel";
import { getFixedIndex } from "@/app/lib/plugins";
import { userImages, blogCommentFields } from "@/app/lib/constants";
import { toastError } from "@/app/lib/toastify";
import styles from './blog.module.scss';
import Loading from "@/app/loading";
import CustomForm from "@/app/components/customForm/customForm";
import Comment from "@/app/components/comment/comment";

export default function Blog({ params }: { params: { id: string } }) {
    const [blogItem, setBlogItem] = useState<BlogItem | null>(null);
    const [blogComments, setBlogComments] = useState<CommentItem[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    const id = params.id;

    const handleSubmitForm = (formData: any): void => {
        let newComment: CommentItem = {
            ...formData, id: Math.floor(Math.random() * 100) + 500,
            postId: parseInt(id)
        }
        let comments = [...blogComments, newComment];
        setBlogComments(comments);
    }

    const getBlogData = (): void => {
        getBlogItem(id).then(
            (data) => {
                setBlogItem(data);
            }
        ).catch((err) => {
            toastError('Failed to load blog data');
        });
    }

    const getBlogComments = (): void => {
        getComments().then(
            (data) => {
                setBlogComments(data.filter(item => item.postId === parseInt(id)));
            }
        ).catch((err) => {
            toastError('Failed to load blog comments data');
        });
    }

    useEffect(() => {
        getBlogData();
        getBlogComments();
        setLoading(false);
        window.scrollTo(0, 0);
    }, [loading]);

    return (
        <>
            {loading && <Loading />}
            {!loading && blogItem && <>
                <section className={styles.blog}>
                    <div className={styles.row}>
                        <article>
                            <div className={'row ' + styles.primaryContent}>
                                <div className='col-lg-4 col-md-4 col-sm-6 col-xs-6'>
                                    <Image src={`/${blogItem.sourceLink}`} alt={blogItem.title.replaceAll(' ', '-')} width={100} height={100} />
                                </div>
                                <div className='col-lg-8 col-md-8 col-sm-6 col-xs-6'>
                                    <div className={styles.blogInfo}>
                                        <h1 className={styles.pageTitle}>{blogItem.title}</h1>
                                        <ul className={styles.entryMeta}>
                                            <li className={styles.date}>September 06, 2016</li>
                                            <li className={styles.cat}>
                                                {blogItem.catLinks.map((catLink, catLinkIndex) => {
                                                    return (
                                                        <a href="#" key={`blog-${id}-cat-link-${catLinkIndex}`}>{catLink}</a>
                                                    );
                                                })}
                                            </li>
                                        </ul>
                                        <p className="lead">
                                            {blogItem.description}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </article>
                        <article>
                            <h2>Large Heading</h2>
                            <p>Harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus <a href="#">omnis voluptas assumenda est</a> id quod maxime placeat facere possimus, omnis dolor repellendus. Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et.</p>
                            <p><Image src={"/images/shutterbug.jpg"} alt="" width={1000} height={500} /></p>
                            <blockquote><p>This is a simple example of a styled blockquote. A blockquote tag typically specifies a section that is quoted from another source of some sort, or highlighting text in your post.</p></blockquote>
                            <p>Odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa. Aenean eu leo quam. Pellentesque ornare sem lacinia quam venenatis vestibulum. Nulla vitae elit libero, a pharetra augue laboris in sit minim cupidatat ut dolor voluptate enim veniam consequat occaecat fugiat in adipisicing in amet Ut nulla nisi non ut enim aliqua laborum mollit quis nostrud sed sed..</p>
                            <h3>Smaller Heading</h3>
                            <p>Quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus.</p>
                            <p>Quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus.</p>
                            <p>Odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa.</p>
                            <ul>
                                <li>Donec nulla non metus auctor fringilla.
                                    <ul>
                                        <li>Lorem ipsum dolor sit amet.</li>
                                        <li>Lorem ipsum dolor sit amet.</li>
                                        <li>Lorem ipsum dolor sit amet.</li>
                                    </ul>
                                </li>
                                <li>Donec nulla non metus auctor fringilla.</li>
                                <li>Donec nulla non metus auctor fringilla.</li>
                            </ul>
                            <p>Odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa. Aenean eu leo quam. Pellentesque ornare sem lacinia quam venenatis vestibulum. Nulla vitae elit libero, a pharetra augue laboris in sit minim cupidatat ut dolor voluptate enim veniam consequat occaecat fugiat in adipisicing in amet Ut nulla nisi non ut enim aliqua laborum mollit quis nostrud sed sed..</p>
                            <p className={styles.tags}>
                                <span>Tagged in :</span>
                                <a href="#">orci</a><a href="#">lectus</a><a href="#">varius</a><a href="#">turpis</a>
                            </p>
                            <div className={styles.authorProfile}>
                                <Image src={`/${userImages[getFixedIndex(blogItem.id, userImages.length)]}`} alt="author-avatar" width={100} height={100} />
                                <div className="about">
                                    <h4><a href="#">Jonathan Smith</a></h4>
                                    <p>Alias aperiam at debitis deserunt dignissimos dolorem doloribus, fuga fugiat impedit laudantium magni maxime nihil nisi quidem quisquam sed ullam voluptas voluptatum. Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                                    </p>
                                    <ul className={styles.authorSocial}>
                                        <li><a href="#">Facebook</a></li>
                                        <li><a href="#">Twitter</a></li>
                                        <li><a href="#">GooglePlus</a></li>
                                        <li><a href="#">Instagram</a></li>
                                    </ul>
                                </div>
                            </div>
                        </article>
                    </div>
                </section>
                <section className={styles.blogComments}>
                    <article>
                        <div className={styles.commentsWrap}>
                            <div className="row">
                                <div className="col-12">
                                    <h3>{blogComments.length} Comments</h3>
                                    <ol className={styles.commentsList}>
                                        {blogComments.map((comment, commentIndex) => {
                                            return (
                                                <Comment comment={comment} key={`blog-${blogItem.id}-comment-${commentIndex}`} />
                                            );
                                        })}
                                    </ol>
                                </div>
                            </div>
                        </div>
                        <div className={styles.respond}>
                            <h3>Leave a Comment</h3>
                            <CustomForm formItem={blogCommentFields} handleSubmitForm={handleSubmitForm} />
                        </div>
                    </article>
                </section>
            </>
            }
        </>
    );
}