import { rowGrap, rowHeight } from "./constants";

const getRandomIndex = (arrayLength: number): number => {
    return Math.floor(Math.random() * arrayLength);
}

const getFixedIndex = (id: number, arrayLength: number): number => {
    return (id - 1) % arrayLength;
}

const resizeGridRow = (id: string): void => {
    let element = document.getElementById(id);
    let elementHeight = element && element.querySelector('.content')?.getBoundingClientRect().height;

    if (element && elementHeight) {
        let rowSpan = Math.ceil((elementHeight + rowGrap) / (rowHeight + rowGrap));
        element.style.gridRowEnd = `span ${rowSpan}`;
    }
}

const upperFirstCharacter = (text: string): string => {
    return text[0].toUpperCase() + text.substring(1);
}

const getSourceLink = (link: string, pathName: string): string => {
    let sourceLink: string = link;
    pathName.split('/').slice(2).forEach(item => {
        sourceLink = '../' + sourceLink;
    });
    return sourceLink;
}

export {
    getRandomIndex,
    resizeGridRow,
    getFixedIndex,
    upperFirstCharacter,
    getSourceLink
}