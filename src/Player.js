import * as React from "react";
import VideoPlayer from "griffith";
import config from "./config.json";

const Player = () => {
  const [vuid, setVuid] = React.useState("");
  const [videoUrl, setVideoUrl] = React.useState(null); // Start as null
  const [fetchedVideoUrl, setFetchedVideoUrl] = React.useState(null); // Store actual video URL
  const [thumbnailUrl, setThumbnailUrl] = React.useState(null);

  React.useEffect(() => {
    const url = new URL(
      typeof window === "undefined"
        ? "https://example.com/etc/etc"
        : window.location.href
    );
    setVuid(url.searchParams.get("vuid"));
  }, []);

  React.useEffect(() => {
    const getVideoData = async () => {
      if (!vuid) {
        console.error("vuid is not set");
        return;
      }
      console.log("vuid is set:", vuid);

      try {
        const resp = await fetch(`${config.cdnServiceUrl[config.environment]}/file/${vuid}`);
        if (!resp.ok) {
          throw new Error(`HTTP error! status: ${resp.status}`);
        }
        const data = await resp.json();
        console.log("Data fetched:", data);
        setVideoUrl(config.cdnServiceUrl[config.environment] + data.cdnURL); // Set videoUrl immediately
        setFetchedVideoUrl(config.cdnServiceUrl[config.environment] + data.cdnURL); // Store but don't set videoUrl immediately
        setThumbnailUrl(config.cdnServiceUrl[config.environment] + data.thumbnailURL);
      } catch (error) {
        console.error("Failed to fetch video data:", error);
      }
    };

    getVideoData();
  }, [vuid]);

  return (
    <div>
      {thumbnailUrl && !videoUrl ? (
        <img
          src={thumbnailUrl}
          alt="Video Thumbnail"
          width="320"
          onClick={() => setVideoUrl(fetchedVideoUrl)} // Load video on click
          style={{ cursor: "pointer", borderRadius: "10px" }}
        />
      ) : (
        videoUrl && (
          <VideoPlayer
          id={`player-${Math.round(
            Date.now() + Math.random() * Date.now()
          ).toString(36)}`}
          cover={thumbnailUrl}
          sources={{
            hd: { play_url: videoUrl }
          }}
        />
        )
      )}
    </div>
  );
};

export default Player;
