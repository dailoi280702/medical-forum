import { Timestamp } from 'firebase/firestore';
import SavePostsProvider from './components/SavedPostsProvider';
import SavePostslist from './components/SavedPostsList';
import SavedPostsContext from './savedPostsContext';
import useSavePost from './useSavePost';

export type SavedPost = {
  postId?: string;
  savedAt?: Timestamp;
};

export { SavedPostsContext, SavePostslist, useSavePost };
export default SavePostsProvider;
