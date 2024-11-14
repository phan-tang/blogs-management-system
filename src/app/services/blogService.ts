import { BlogItem, Post, CommentItem } from "../models/blogModel";
import { getFixedIndex, upperFirstCharacter } from "../lib/plugins";
import { images, categories } from "../lib/constants";

const blogUrl = '/api/blogs';
const commentUrl = '/api/comments';

export async function getBlogs(searchParam?: string | null): Promise<BlogItem[]> {
    const response = await fetch(blogUrl);
    let responseData: { data: Post[] } = await response.json();
    let filteredData = searchParam ? responseData.data.filter(item => item.title.includes(searchParam.toLowerCase())) : responseData.data
    return filteredData.map((element => {
        return transformBlogData(element);
    }));
}

export async function getBlogItem(id: string): Promise<BlogItem> {
    const response = await fetch(`${blogUrl}/${id}`);
    let responseData: { data: Post } = await response.json();
    return transformBlogData(responseData.data);
}

export async function getComments(): Promise<CommentItem[]> {
    const response = await fetch(commentUrl);
    let responseData: { data: CommentItem[] } = await response.json();
    return responseData.data;
}

function transformBlogData(element: Post): BlogItem {
    let selectedImage = images[getFixedIndex(element.id, images.length)];
    let selectedCategoryIndex = getFixedIndex(element.id, categories.length);
    return {
        id: element.id,
        title: upperFirstCharacter(element.title),
        description: upperFirstCharacter(element.body),
        sourceLink: selectedImage.sourceLink,
        catLinks: [categories[selectedCategoryIndex], categories[selectedCategoryIndex === categories.length - 1 ? 0 : selectedCategoryIndex + 1]],
        audioLink: selectedImage.audioLink ? selectedImage.audioLink : null,
    };
}