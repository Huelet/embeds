import * as React from "react";
import VideoPlayer from "griffith";

const Player = () => {
  const [vuid, setVuid] = React.useState("");
  const [videoUrl, setVideoUrl] = React.useState({});
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
      setVideoUrl('')
      if (!vuid) {
        console.error("vuid is not set");
        return;
      } else {

        console.log("vuid is set:", vuid);
      }
      // try {
      //   const resp = await fetch(`http://localhost:5002/v1/cdn/file/${vuid}`);
      //   if (!resp.ok) {
      //     throw new Error(`HTTP error! status: ${resp.status}`);
      //   }
      //   const data = await resp.json();
      //   if (data.data) {
      //     setVideoUrl(data.cdnURL);
      //     console.log("Video data fetched:", data);
      //   } else {
      //     console.error("No video data found");
      //   }
      //   console.log(data)
      // } catch (error) {
      //   console.error("Failed to fetch video data:", error);
      // }
      // console.log("Video data fetched:", videoUrl);
    };
    getVideoData();
  }, [vuid]);

  return (
    <div>
      <VideoPlayer
        id={`player-${Math.round(
          Date.now() + Math.random() * Date.now()
        ).toString(36)}`}
        sources={
          videoUrl
            ? { hd: { play_url: "http://localhost:5005/v1/" + videoUrl } }
            : { hd: { play_url: "http://localhost:5005/v1/static/" + vuid  } }
        }
      />
    </div>
  );
};

export default Player;
