import { createSlice } from '@reduxjs/toolkit';
const initialState = {
    isUserInRoom: false,
    isUserRoomCreator: false,
    roomDetails: null,
    activeRooms: [],
    localStream: null,
    remoteStreams: [],
    audioOnly: false,
    screenSharingStream: null,
    isScreenSharingActive: false,
    isUserJoinedWithOnlyAudio: false,
  };

  const roomSlice = createSlice({
    name: 'room', 
    initialState, 
    reducers: { 
      setOpenRoom(state, action) {
        const { isUserRoomCreator, isUserInRoom } = action.payload;
        state.isUserInRoom = isUserInRoom;
        state.isUserRoomCreator = isUserRoomCreator;
      },
      setRoomDetails(state, action) {
        state.roomDetails = action.payload.roomDetails;
      },
      setActiveRooms(state, action) {
        state.activeRooms = action.payload.activeRooms;
      },
      
      setLocalStream(state, action) {
        state.localStream = action.payload.localStream;
      },
      setAudioOnly(state, action) {
        state.audioOnly = action.payload.audioOnly;
      },
      setRemoteStreams(state, action) {
        state.remoteStreams = action.payload.remoteStreams;
      },
      setScreenSharingStream(state, action) {
        state.screenSharingStream = action.payload.screenSharingStream || null;
        state.isScreenSharingActive = !!action.payload.screenSharingStream;
      },
      setIsUserJoinedOnlyWithAudio(state, action) {
        state.isUserJoinedWithOnlyAudio = action.payload.isUserJoinedWithOnlyAudio;
      },
    },
  });
  
  export default roomSlice.reducer;
  
  export const {
    setOpenRoom,
    setRoomDetails,
    setActiveRooms,
    setLocalStream,
    setAudioOnly,
    setRemoteStreams,
    setScreenSharingStream,
    setIsUserJoinedOnlyWithAudio,
  } = roomSlice.actions;