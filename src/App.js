/** @jsxImportSource @emotion/react */
import * as React from "react";
import { Button, Card } from "@huelet/foundation-ui";
import Player from "./Player";
import { Copy } from "@fdn-ui/icons-react";

const IndexPage = () => {
  const [embed, setEmbed] = React.useState(false);
  const [videoUrl, setVideoUrl] = React.useState("");
  const [embedResp, setEmbedResponse] = React.useState("");
  React.useEffect(() => {
    const url = new URL(
      typeof window === "undefined"
        ? "https://example.com/etc/etc"
        : window.location.href
    );
    setEmbed(Boolean(url.searchParams.get("embed")));
  }, [videoUrl]);
  React.useEffect(() => {
    if (embed) {
      document.body.classList.add("embed");
    }
  }, [embed]);
  const fetchCode = async () => {
    const code = `
      <iframe
        src="https://publish.huelet.net/?embed=true&vuid=${
          new URL(videoUrl).pathname.split(
            "/"
          )[2]
        }"
        width="100%"
        height="100%"
        frameborder="0"
        allow="accelerometer; autoplay; encrypted-media; picture-in-picture"
        allowfullscreen
      ></iframe>
    `;
    setEmbedResponse(code);
  };
  return (
    <main>
      {embed ? (
        <Player />
      ) : (
        <Card full={true} title="Embed a video">
          <div
            css={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              height: "100%",
              padding: "1rem",
            }}
          >
            <form>
              <input
                type="text"
                placeholder="Paste a video URL"
                name="vuid"
                value={videoUrl}
                onChange={(e) => {
                  e.preventDefault();
                  setVideoUrl(e.target.value);
                }}
                css={{
                  width: "100%",
                  padding: "0.5rem",
                  background: "transparent",
                  border: "2px solid #7600ff",
                  color: "#ffffff",

                  "&::-webkit-input-placeholder": {
                    color: "#ffffff",
                  },
                }}
              />

              <Button>
                <span
                  onClick={() => fetchCode()}
                  css={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: "100%",
                    height: "100%",
                  }}
                >
                  Embed
                </span>
              </Button>
            </form>

            <div>
              {embedResp ? (
                <div>
                  <Button>
                    <span
                      onClick={() => {
                        navigator.clipboard.writeText(embedResp);
                        setEmbedResponse("Copied!");
                      }}
                      css={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        width: "100%",
                        height: "100%",
                      }}
                    >
                      <Copy fill="white" />
                      Copy to Clipboard
                    </span>
                  </Button>
                  <pre>
                    <code>{embedResp}</code>
                  </pre>
                </div>
              ) : null}
            </div>
          </div>
        </Card>
      )}
    </main>
  );
};

export default IndexPage;
