import { configureStore } from '@reduxjs/toolkit';

// eslint-disable-next-line import/default
import userReduser from './userSlice';

export default configureStore({
    reducer: {
        user: userReduser,
    },
});