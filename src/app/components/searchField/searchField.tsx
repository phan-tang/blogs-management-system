'use client'

import { Form } from "react-bootstrap";
import { useState } from "react";
import styles from './searchField.module.scss';

export default function SearchField({ handleSearch }: { handleSearch: Function }) {
    const [searchValue, setSearchValue] = useState<string>('');

    const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (event.key === 'Enter' || event.key === 'NumpadEnter') {
            handleSearch(searchValue);
        }
    }

    return (
        <div className={styles.searchField}>
            <Form.Control
                as={"input"}
                type={"text"}
                placeholder={"Search"}
                onChange={(event) => { setSearchValue(event.target.value) }}
                onKeyDown={handleKeyDown} />
        </div>
    )
}