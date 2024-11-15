'use client'

import { usePathname } from 'next/navigation';
import Image from 'next/image';
import styles from './card.module.scss';
import { BlogItem } from '@/app/models/blogModel';
import { getSourceLink } from '@/app/lib/plugins';
export default function Card({ cardItem, id }: { cardItem: BlogItem, id: string }) {
    const pathName = usePathname();

    return (
        <article className={styles.card} id={id}>
            <div className='content'>
                <div className={styles.entryThumb}>
                    <a href={`/blog/${cardItem.id}`} className={styles.thumbLink}>
                        <Image src={`/${cardItem.sourceLink}`} alt={cardItem.title.replaceAll(' ', '-')} width={400} height={400} />
                    </a>
                    {cardItem.audioLink && <div className={styles.audioWrap}>
                        <audio id="player" src={getSourceLink(cardItem.audioLink, pathName)} controls></audio>
                    </div>}
                </div>
                <div className={styles.entryText}>
                    <div className={styles.entryHeader}>
                        <div className={styles.entryMeta}>
                            <span className={styles.catLinks}>
                                <>{cardItem.catLinks.map((catLink, catLinkIndex) => {
                                    return (
                                        <a href={`/categories/${catLink.toLowerCase()}`} key={`card-${cardItem.title}-cat-link-${catLinkIndex}`}>{catLink}</a>
                                    );
                                })}</>
                            </span>
                        </div>
                        <h1 className={styles.entryTitle}><a href={`/blog/${cardItem.id}`}>{cardItem.title}</a></h1>
                    </div>
                    <div className={styles.entryExcerpt}>{cardItem.description}</div>
                </div>
            </div>
        </article>
    );
}