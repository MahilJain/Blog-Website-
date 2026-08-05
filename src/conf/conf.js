function cleanEnv(value) {
    if (value === undefined || value === null) return '';
    let v = String(value).trim();
    if (v === 'undefined') return '';
    if ((v.startsWith('"') && v.endsWith('"')) || (v.startsWith("'") && v.endsWith("'"))) {
        v = v.slice(1, -1).trim();
    }
    return v;
}

const conf = {
    appwriteUrl: cleanEnv(import.meta.env.VITE_APPWRITE_URL),
    appwriteProjectId: cleanEnv(import.meta.env.VITE_APPWRITE_PROJECT_ID),
    appwriteDatabaseId: cleanEnv(import.meta.env.VITE_APPWRITE_DATABASE_ID),
    appwriteCollectionId: cleanEnv(import.meta.env.VITE_APPWRITE_COLLECTION_ID),
    appwriteBucketId: cleanEnv(import.meta.env.VITE_APPWRITE_BUCKET_ID),
}

export default conf