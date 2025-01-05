import { useEffect, useState } from 'react';
import ReactPlayer from 'react-player';
import axios from '../api/axios';

const VideoPlayer = ({ videoUrl, title, description, videoId }) => {

  return (
    <div className="video-player-container">
      <ReactPlayer url={videoUrl} controls={true} className="rounded-lg w-full" />
      <h2 className="mt-4 font-bold text-xl">{title}</h2>
      <p className="text-gray-700">{description}</p>
    </div>
  );
};

export default VideoPlayer;