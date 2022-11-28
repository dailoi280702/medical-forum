import { createContext } from 'react';
import { SavedPost } from '.';

const SavedPostsContext = createContext<Map<string, SavedPost>>(new Map([]));

export default SavedPostsContext;
