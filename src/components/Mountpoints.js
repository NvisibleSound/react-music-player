import React, { useState, useRef, useContext } from 'react'

import styles from './Mountpoints.module.css'
import { IcecastReadableStream } from "icecast-metadata-js";
import IcecastApp from './icecast-metadata/IcecastApp'

const VISIT_STATION = "Visit this station at ";
const ICECAST_METADATA_JS_DEMO = "Icecast Metadata JS Demo";
const SELECT_STATION = "Select a station";
const SELECT_OR_PLAY = "Select a station or press play";
const LOADING = "Loading...";
const RECONNECTING = "Lost Connection. Reconnecting...";
const CONNECTED = "Waiting for metadata...";


const CodecInfo = React.memo(({ codecInfo }) => {
  if (codecInfo) {
    const title = Object.entries(codecInfo).reduce(
      (acc, [k, v]) => acc + `${k}: ${v}\x0A`,
      ""
    );

    return (
      <div title={title} className={styles.codecInfo}>
        <div className={styles.codecItem}>{`${codecInfo.bitrate} kb/s`}</div>
        <div className={styles.codecItem}>{`${codecInfo.sampleRate} Hz`}</div>
      </div>
    );
  }

  return null;
});

const metadataInfo = ({ station, playing, toggle, metadata, codecInfo }) => {
  // update metadata in title
  const title = metadata.StreamTitle || metadata.TITLE;
  document.title = title
    ? `${title} | ${ICECAST_METADATA_JS_DEMO}`
    : ICECAST_METADATA_JS_DEMO;

  return (
    <div className={styles.player}>
			<button disabled={!station} className={styles.button} onClick={toggle}>
        {playing ? (
          <svg className={styles.playPause} viewBox="0 0 450 525">
            <path
              fill="#999"
              d="M144 479H48c-26.5 0-48-21.5-48-48V79c0-26.5 21.5-48 48-48h96c26.5 0 48 21.5 48 48v352c0 26.5-21.5 48-48 48zm304-48V79c0-26.5-21.5-48-48-48h-96c-26.5 0-48 21.5-48 48v352c0 26.5 21.5 48 48 48h96c26.5 0 48-21.5 48-48z"
            />
          </svg>
        ) : (
          <svg className={styles.playPause} viewBox="0 0 450 525">
            <path
              fill="#999"
              d="M424.4 214.7L72.4 6.6C43.8-10.3 0 6.1 0 47.9V464c0 37.5 40.7 60.1 72.4 41.3l352-208c31.4-18.5 31.5-64.1 0-82.6z"
            />
          </svg>
        )}
      </button>
      <div className={styles.playerText}>
        <div className={styles.metadata}>
          {typeof metadata === "object"
            ? metadata.StreamTitle ||
              (metadata.ARTIST
                ? `${metadata.ARTIST} - ${metadata.TITLE}`
                : metadata.TITLE) ||
              metadata.VENDOR_STRING
            : metadata}
        </div>
        <div className={styles.stationInfoContainer}>
          {station?.link && (
            <div className={styles.visitStation}>
              {VISIT_STATION}
              <a
                className={styles.link}
                href={station.link}
                target="_blank"
                rel="noopener noreferrer"
              >
                {station.name}
              </a>
            </div>
          )}
          <CodecInfo codecInfo={codecInfo} />
        </div>
      </div>
    </div>
  );
};

const Mountpoints = () => {

	const [audioElement] = useState(new Audio());
  const [station, setStation] = useState();
  const [playing, setPlaying] = useState(false);

  const [metadata, setMetadata] = useState(SELECT_STATION);
  const [codecInfo, setCodecInfo] = useState();
  const [icecast, setIcecast] = useState();

  return (
    <>
			<IcecastApp />		
    </>
  
   
  )
}



export default React.memo(Mountpoints);