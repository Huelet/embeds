/** @jsx jsx */
import * as React from "react";
import { css, jsx } from "@emotion/react";
import { Card } from "@huelet/foundation-ui";
import { Player } from "./Player";

const IndexPage = () => {
  const url = new URL(location.href);
  const embed = Boolean(url.searchParams.get("embed"));
  const vuid = url.searchParams.get("vuid");

  React.useEffect(() => {
    if (embed) {
      document.body.classList.add("embed");
    }
  }, [embed]);
  return (
    <main>
      {embed ? (
        <Player />
      ) : (
        <Card full={true}>
          <div>hi</div>
        </Card>
      )}
    </main>
  );
};

export default IndexPage;
