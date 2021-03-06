import React, { useState, useCallback, useEffect } from "react";
import Player from "./Player";
import StationSelector from "./StationSelector";
import stations from "./stations.json";
import styles from "./IcecastApp.module.css";
import IcecastMetadataPlayer from "icecast-metadata-player";


const SELECT_STATION = "Select a mountpoint";
const SELECT_OR_PLAY = "Select a mountpoint or press play";
const LOADING = "Loading...";
const RECONNECTING = "Lost Connection. Reconnecting...";
const CONNECTED = "Waiting for metadata...";

const IcecastApp = () => {
  const [audioElement] = useState(new Audio());
  const [station, setStation] = useState();
  const [playing, setPlaying] = useState(false);

  const [metadata, setMetadata] = useState(SELECT_STATION);
  const [codecInfo, setCodecInfo] = useState();
  const [icecast, setIcecast] = useState();


  const [castSession, setCastSession] = useState();

  const namespace = "urn:x-cast:icecast-metadata-js-demo";
  const castAPIId = "E3C20492";

  const sendCastMessage = useCallback(
    (msg) => {
      castSession?.sendMessage(namespace, msg);
    },
    [castSession]
  );

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "//www.gstatic.com/cv/js/sender/v1/cast_sender.js";
    document.body.appendChild(script);

    window.__onGCastApiAvailable = (loaded) => {
      if (loaded) {
        const sessionRequest = new window.chrome.cast.SessionRequest(castAPIId);

        const apiConfig = new window.chrome.cast.ApiConfig(
          sessionRequest,
          (session) => {
            setCastSession(session);
          },
          () => {}
        );

        window.chrome.cast.initialize(apiConfig);
      }
    };
  }, []);

  const changeStation = useCallback(
    async (station) => {
      if (icecast) {
        await icecast.stop();
        sendCastMessage({ command: "stop" });
        icecast.detachAudioElement();
      }

      sendCastMessage({
        command: "change station",
        enableCodecUpdate: true,
        ...station,
      });

      const player = new IcecastMetadataPlayer(station.endpoint, {
        onMetadata: (meta) => {
          console.log(meta);
          setMetadata(meta);
        },
        onCodecUpdate: setCodecInfo,
        onPlay: () => {
          setPlaying(true);
        },
        onStop: () => {
          setPlaying(false);
          setMetadata(SELECT_OR_PLAY);
          setCodecInfo();
        },
        onLoad: () => {
          setPlaying(true);
          setMetadata(LOADING);
          setCodecInfo();
        },
        onError: (error) => {
          setMetadata(error?.message || error);
          setCodecInfo();
        },
        onRetry: () => {
          setMetadata(RECONNECTING);
        },
        onStreamStart: () => {
          setMetadata(station.metadataTypes.length ? CONNECTED : "");
        },
        icyDetectionTimeout: 5000,
        icyCharacterEncoding: station.icyCharacterEncoding,
        enableLogging: true,
        metadataTypes: station.metadataTypes,
        audioElement,
      });

      player.play();
      sendCastMessage({ command: "play" });

      setIcecast(player);
      setStation(station);
    },
    [icecast, audioElement, sendCastMessage]
  );

  const play = useCallback(() => {
    icecast.play();
    sendCastMessage({ command: "play" });
  }, [icecast, sendCastMessage]);

  const stop = useCallback(() => {
    icecast.stop();
    sendCastMessage({ command: "stop" });
  }, [icecast, sendCastMessage]);

  const toggle = useCallback(() => {
    playing ? stop() : play();
  }, [playing, stop, play]);

  return (

    
    <div className={styles.IcecastApp}>    
      	<Player
				className={styles.player}
				station={station}
				toggle={toggle}
				playing={playing}
				metadata={metadata}
				codecInfo={codecInfo}
			/>
        {/* <div onClick={() => alert('Mountpoints route')}>
          Mountpoints 1
        </div>

        <div onClick={() => alert('Mountpoints route')}>
          Mountpoints 2
        </div>

        <div onClick={() => alert('Mountpoints route')}>
          Mountpoints 3
        </div>

        <div onClick={() => alert('Mountpoints route')}>
          Mountpoints 4
        </div> */}
      <StationSelector
        stations={stations}
        changeStation={changeStation}
        selectedStation={station}
      />
      
      
    </div>
  );
};

export default IcecastApp;