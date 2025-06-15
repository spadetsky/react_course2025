import { Client, Databases, ID, Query } from "appwrite";

const APPWRITE_ID = import.meta.env.VITE_APPWRITE_PROJECT_ID;
const APPWRITE_ENDPOINT = import.meta.env.VITE_APPWRITE_ENDPOINT;
const DB_ID = import.meta.env.VITE_APPWRITE_DB_ID;
const DB_COLECTION_METRICS = import.meta.env.VITE_APPWRITE_DB_COLLECTION_METRICS;
const IMG_POINT = import.meta.env.VITE_IMG_POINT;

const client = new Client()
    .setEndpoint(APPWRITE_ENDPOINT)
    .setProject(APPWRITE_ID);

const db = new Databases(client);

export const updateSearchCount = async (searchTerm, movie) => {
    try {
        const result = await db.listDocuments(DB_ID, DB_COLECTION_METRICS, [Query.equal('searchTerm', searchTerm)])
        if (result.documents.length > 0) {
            const doc = result.documents[0];
            await db.updateDocument(DB_ID, DB_COLECTION_METRICS, doc.$id, {
                count: doc.count + 1,
            })
        } else {
            await db.createDocument(DB_ID, DB_COLECTION_METRICS, ID.unique(), {
                searchTerm,
                count: 1,
                movie_id: movie.id,
                poster_url: `${IMG_POINT}${movie.poster_path}`,
            })
        }
    } catch (error) {
        console.log(error);
    }
}

export const getTrendingMovies = async () => {
    try {
        const result = await db.listDocuments(DB_ID, DB_COLECTION_METRICS, [Query.limit(5)], Query.orderDesc("count"))
        return result.documents;
    } catch (error) {
        console.log(error);
    }
}