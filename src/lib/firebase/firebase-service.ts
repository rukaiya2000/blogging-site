import { Timestamp, collection, deleteDoc, doc, getDoc, getDocs, limit, orderBy, query, setDoc, startAfter, updateDoc, where } from "firebase/firestore";
import { firestore } from "./firebase";
import { format } from "date-fns";
import { formatDateFromFirebase } from "./common-utils";

export const saveUserDetails = async (data: any) => {
    const newUserRef = doc(collection(firestore, 'users'));
    await setDoc(newUserRef, data);
}

export const fetchParticularDocuments = async (paramType: string, paramValue: string[], collectionName: string) => {
    const q = query(collection(firestore, collectionName), where(paramType, 'in', paramValue));
    const querySnapshot = await getDocs(q);
    const docs = querySnapshot.docs.map((doc) => Object.assign({}, { docId: doc.id }, doc.data()))

    return docs;
}

export const fetchQuery = async (paramType: string, paramValue: string | boolean, collectionName: string = "users") => {

    const q = query(collection(firestore, collectionName), where(paramType, '==', paramValue));
    const querySnapshot = await getDocs(q);
    const docs = querySnapshot.docs.map((doc) => Object.assign({}, { docId: doc.id }, doc.data()))

    return docs.map((doc: any) => Object.assign(doc, {published_date: doc.published_date ? formatDateFromFirebase(doc.published_date) : null}));
}

export const fetchAllDocuments = async (collectionName: string) => {

    const querySnapshot = await getDocs(collection(firestore, collectionName));
    const documents = querySnapshot.docs.map((doc) => Object.assign({}, { docId: doc.id }, doc.data()))
    return documents.map((doc: any) => Object.assign(doc, {published_date: doc.published_date ? formatDateFromFirebase(doc.published_date) : null}));
}

export const fetchMostLikedBlog = async (userUid: string) => {
    const q = query(collection(firestore, "blogs"), where("user_id", "==", userUid), orderBy("likedBy", 'desc'), limit(1));
    const querySnapshot = await getDocs(q);
    const docs = querySnapshot.docs.map((doc) => Object.assign({}, { docId: doc.id }, doc.data()))

    return docs.map((blog: any) => Object.assign(blog, {published_date: formatDateFromFirebase(blog.published_date)}));;
}

export const fetchMostViewedBlog = async (userUid: string) => {
    const q = query(collection(firestore, "blogs"), where("user_id", "==", userUid), orderBy("views", 'desc'), limit(1));
    const querySnapshot = await getDocs(q);
    const docs = querySnapshot.docs.map((doc) => Object.assign({}, { docId: doc.id }, doc.data()))

    return docs.map((blog: any) => Object.assign(blog, {published_date: formatDateFromFirebase(blog.published_date)}));;
}

export const fetchFirstSetOfBlogs = async (limitNumber: number = 1) => {

    const q = query(collection(firestore, "blogs"), where("draft", '==', false), orderBy("published_date", 'desc'), limit(limitNumber));
    const querySnapshot = await getDocs(q);

    const lastVisible = querySnapshot.docs[querySnapshot.docs.length-1];
    const blogs = querySnapshot.docs.map((doc) => Object.assign({}, { docId: doc.id }, doc.data()));

    return {firstBlogSet: blogs.map((blog: any) => Object.assign(blog, {published_date: formatDateFromFirebase(blog.published_date)})), lastVisible};
}

export const fetchNextSetOfBlogs = async(limitNumber: number, prevLastVisible: any) => {
    const q = query(collection(firestore, "blogs"), where("draft", '==', false), orderBy("published_date", 'desc'), startAfter(prevLastVisible), limit(limitNumber));
    const querySnapshot = await getDocs(q);

    const lastVisible = querySnapshot.docs[querySnapshot.docs.length-1];
    const blogs = querySnapshot.docs.map((doc) => Object.assign({}, { docId: doc.id }, doc.data()));

    return {nextSetOfBlogs: blogs.map((blog: any) => Object.assign(blog, {published_date: formatDateFromFirebase(blog.published_date)})), lastVisible};
}

export const updateData = async (docId: string, data: any, collectionName: string) => {
    const docRef = doc(firestore, collectionName, docId);
    await updateDoc(docRef, data);
}

export const fetchDocumentUsingDocumentId = async (paramValue: string, collectionName: string) => {

    const docRef = doc(firestore, collectionName, paramValue);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
        return Object.assign({}, docSnap.data(), {published_date: formatDateFromFirebase(docSnap.data().published_date)});
    } else {
        return null;
    }
}

export const getBlogsUsingUserUserUid = async (userUid: string) => {
    const [user] = await fetchQuery("userId", userUid);

    if (user) {
        const q = query(collection(firestore, "blogs"), where("user_id", '==', user.userId), where("draft", '==', false), orderBy("published_date", 'desc'));
        const querySnapshot = await getDocs(q);
        const docs = querySnapshot.docs.map((doc) => Object.assign({}, { docId: doc.id }, doc.data()))
        return docs.map((blog: any) => Object.assign(blog, {published_date: formatDateFromFirebase(blog.published_date)}));;
    }

    return [];
}

export const saveBlogDetails = async (title: string, quotes: string, imageBase64: any, article: string, userId: string | null, draft: boolean, category: string) => {
    try {
        if (userId) {
            const [user] = await fetchQuery("userId", userId);
            const newBlogRef = doc(collection(firestore, 'blogs'));
            await setDoc(newBlogRef, {
                user_id: userId,
                author: user.fullName,
                title,
                quotes,
                image_base64: imageBase64,
                article,
                published_date: Timestamp.fromDate(new Date()),
                draft,
                category,
                likedBy: []
            });

            const commentData = {
                blog_doc_id: newBlogRef.id,
                comments: []
            }

            await saveCommentDetails(commentData);
            return newBlogRef.id;

            
        }
    } catch (error: any) {
        console.log("error: ", JSON.stringify(error));
    }
}

export const deleteBlogUsingDocumentId = async (docId: string) => {
    await deleteDoc(doc(firestore, "blogs", docId));
}

export const saveCommentDetails = async(data: any) => {
    const newUserRef = doc(collection(firestore, 'comments'));
    await setDoc(newUserRef, data);
}