import React from 'react';
import { useSelector } from 'react-redux';

export const PostAuthor = ({ userId }) => {
    const author = useSelector(state => // read data from store
        state.users.find(user => user.id === userId)
    )

    return <span>by {author ? author.name : 'unknown author'}</span>
}