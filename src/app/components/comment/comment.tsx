'use client'

import { usePathname } from 'next/navigation';
import { CommentItem } from '@/app/models/blogModel';
import { getSourceLink, getFixedIndex, upperFirstCharacter } from '@/app/lib/plugins';
import { userImages } from '@/app/lib/constants';
import styles from './comment.module.scss'

export default function Comment({ comment }: { comment: CommentItem }) {
    const pathName = usePathname();

    return (
        <li className={styles.comment}>
            <div className={styles.avatar}>
                <img width="50" height="50" src={getSourceLink(userImages[getFixedIndex(comment.id, userImages.length)], pathName)} alt="user-avatar" />
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