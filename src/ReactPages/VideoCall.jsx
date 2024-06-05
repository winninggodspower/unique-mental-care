import "../css/videocall.css";
import { useEffect } from "react";
import { ZegoUIKitPrebuilt } from '@zegocloud/zego-uikit-prebuilt';

async function fetchToken(userID) {
  const response = await fetch('/api/videocall/generateToken', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      appId: appID,
      userId: userID,
      secret: secretServer,
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
  
  const roomID = requestId;

  let myMeeting = async (element) => {
    // generate Kit Token
    let appID = 1468224788;
    let serverSecret = "9856d7f49f27666bc2b3487868b6c43c";
    const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(appID, serverSecret, roomID, user.uid, user.displayName);

    // Create instance object from Kit Token.
    const zp = ZegoUIKitPrebuilt.create(kitToken);
    // start the call
    zp.joinRoom({
      container: element,
      sharedLinks: [
        {
          name: 'Personal link',
          url:
            window.location.protocol + '//' +
            window.location.host + window.location.pathname +
            '?roomID=' +
            roomID,
        },
      ],
      scenario: {
        mode: ZegoUIKitPrebuilt.GroupCall, // To implement 1-on-1 calls, modify the parameter here to [ZegoUIKitPrebuilt.OneONoneCall].
      },
    });


  };

  return (
    <div
      className="myCallContainer"
      ref={myMeeting}
      style={{ width: '100vw', height: '100vh' }}
    ></div>
  );
}

export default VideoCall;