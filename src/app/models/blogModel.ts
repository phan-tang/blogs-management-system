export interface BlogItem {
    id: number;
    title: string;
    description: string;
    sourceLink: string;
    catLinks: string[];
    audioLink: string | null;
    comments?: CommentItem[];
}

export interface Post {
    userId: number;
    id: number;
    title: string;
    body: string;
}

export interface CommentItem {
    postId: number;
    id: number;
    name: string;
    email: string;
    body: string;
}