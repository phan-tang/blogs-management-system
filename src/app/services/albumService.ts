import { AlbumItem } from "../models/albumModel";

const url = '/api/admin/albums';

export async function getAlbums(): Promise<AlbumItem[]> {
    const response = await fetch(url);
    let responseData: { data: AlbumItem[] } = await response.json();
    return responseData.data;
}
