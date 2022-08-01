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
  });

  React.useEffect(() => {
    const getVideoData = async () => {
      console.log(`https://api.huelet.net/videos/lookup/${vuid}`);

      const resp = await fetch(`https://api.huelet.net/videos/lookup/${vuid}`);
      const data = await resp.json();
      data.data.url_webm
        ? setVideoUrl(data.data.url_webm)
        : setVideoUrl(data.data.url);
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
            ? { hd: { play_url: videoUrl } }
            : { hd: { play_url: videoUrl } }
        }
      />
    </div>
  );
};

export default Player;
