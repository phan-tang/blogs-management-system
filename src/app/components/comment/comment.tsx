'use client'

import Image from 'next/image';
import { CommentItem } from '@/app/models/blogModel';
import { getFixedIndex, upperFirstCharacter } from '@/app/lib/plugins';
import { userImages } from '@/app/lib/constants';
import styles from './comment.module.scss'

export default function Comment({ comment }: { comment: CommentItem }) {
    return (
        <li className={styles.comment}>
            <div className={styles.avatar}>
                <Image width={400} height={400} src={`/${userImages[getFixedIndex(comment.id, userImages.length)]}`} alt="user-avatar" />
            </div>
            <div>
                <div className={styles.commentInfo}>
                    <cite>{comment.name}</cite>
                    <div className={styles.commentMeta}>
                        <p>{comment.email}</p>
                    </div>
                </div>
                <div className={styles.commentText}>
                    <p>{upperFirstCharacter(comment.body)}</p>
                </div>
            </div>
        </li>
    );
}