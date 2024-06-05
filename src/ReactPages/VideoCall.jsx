import "../css/videocall.css";
import { useEffect } from "react";

let appID = 1468224788;
let server = "9856d7f49f27666bc2b3487868b6c43c";

async function fetchToken(userID) {
  const response = await fetch('/api/videocall/generateToken', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      appId: appID,
      userId: userID,
      secret: server,
      effectiveTimeInSeconds: 3600,
      payload: {}
    })
  });

  if (!response.ok) {
    throw new Error('Failed to fetch token');
  }

  const data = await response.json();
  return data.token;
}

function VideoCall({ user, requestId }) {

    useEffect(() => {
        // const zg = new ZegoExpressEngine(appID, server); 
        const initZego = async () => {
          try {
            const { ZegoExpressEngine } = await import('zego-express-engine-webrtc');

            const token = await fetchToken(user.uid);

            const zg = new ZegoExpressEngine(appID, server);

            await zg.loginRoom(
              "zego-room",
              token,
              { userID: user.uid, userName: user.displayName},
              { userUpdate: true }
            );

            const localStream = await zg.createStream({
              camera: {
                audio: true,
                video: true,
              },
            });
            // Get the audio tag.
            const localAudio = document.getElementById("local-video");
            const videoElement = document.createElement("video");
            videoElement.id = "local-video";
            videoElement.className = "h-28 w-32";
            videoElement.autoplay = true;
            videoElement.muted = false;
            videoElement.playsInline = true;
            localAudio.appendChild(videoElement);
            const td = document.getElementById("audio-local");
            td.srcObject = localStream;

            const streamID = "123" + Date.now();
            zg.startPublishingStream(streamID, localStream);
          } catch (error) {
            console.error("Error initializing ZegoExpressEngine:", error);
          }
        };

        initZego();

    }, [user])

    return (
        <>
            <h1>Zego RTC Video Call</h1>
            <h4>Local video</h4>
            <div id="local-video"></div>
            <h4>Remote video</h4>
            <div id="remote-video"></div>
        </>
    )
}

export default VideoCall;