import { apiSlice } from './apiSlice';
const FRIENDS_URL = '/api/friend-invitaion';

export const friendApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        invite: builder.mutation({
          query: (data) => ({
            url: `${FRIENDS_URL}/invite`,
            method: 'POST',
            body: data,
          }),
        }),
        accept: builder.mutation({
          query: (data) => ({
            url: `${FRIENDS_URL}/accept`,
            method: 'POST',
            body: data,
          }),
        }),
        reject: builder.mutation({
          query: (data) => ({
            url: `${FRIENDS_URL}/reject`,
            method: 'POST',
            body: data,
          }),
        }),
    }),
    });

    export const { useInviteMutation, useAcceptMutation, useRejectMutation } = friendApiSlice;