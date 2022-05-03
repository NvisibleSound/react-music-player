import React, { useState } from 'react'
import styles from './Mountpoints.module.css'
import { IcecastMetadataReader } from "icecast-metadata-js"
import { IcecastReadableStream } from "icecast-metadata-js";


//Objective -  create a component that will automatically show new icecast mountpoints.
// click mountpoint to play 




const noOp = () => {};

const STOPPED = "stopped";
const RUNNING = "running";
const FETCHING = "fetching";

const p = new WeakMap();

// variables
const icyController = Symbol();
const icyFetchStatus = Symbol();

const icestatsEndpoint = Symbol();
const icestatsController = Symbol();
const icestatsFetchStatus = Symbol();

const statsEndpoint = Symbol();
const statsController = Symbol();
const statsFetchStatus = Symbol();

const nextsongsEndpoint = Symbol();
const nextsongsController = Symbol();
const nextsongsFetchStatus = Symbol();

const streamEndpoint = Symbol();
const icyMetaInt = Symbol();
const icyCharacterEncoding = Symbol();
const icyDetectionTimeout = Symbol();
const sources = Symbol();
const interval = Symbol();
const onStats = Symbol();
const onStatsFetch = Symbol();

const state = Symbol();
const intervalId = Symbol();

// methods
const fetchStats = Symbol();
const getStreamMetadata = Symbol();

export default class IcecastMetadataStats {
  /**
   * @constructor
   * @param {URL} endpoint Stream endpoint
   * @param {object} [options] Options object
   *
   * @callback [options.onStats] Called when the automatic query completes
   * @callback [options.onStatsFetch] Called when the automatic query begins
   * @param {Array} [options.sources] List of sources to automatically query ["icy", "ogg", "icestats", "stats", "sevenhtml", "nextsongs"]
   * @param {number} [options.interval] Time in seconds to wait between automatically queries
   * @param {URL} [options.icestatsEndpoint] Endpoint for the `status-json.xsl` source
   * @param {URL} [options.statsEndpoint] Endpoint for the `stats` source
   * @param {URL} [options.nextsongsEndpoint] Endpoint for the `nextsongs` source
   * @param {URL} [options.sevenhtmlEndpoint] Endpoint for the `7.html` source
   * @param {number} [options.icyMetaInt] Manually sets the ICY metadata interval
   * @param {string} [options.icyCharacterEncoding] Character encoding to use for ICY metadata (defaults to "utf-8")
   * @param {number} [options.icyDetectionTimeout] Time in milliseconds to search for ICY metadata
   */
  constructor(endpoint, options = {}) {
    const serverPath = endpoint.split("/").slice(0, -1).join("/");

    // prettier-ignore
    p.set(this, {
      [streamEndpoint]: endpoint,
      [icestatsEndpoint]: options.icestatsEndpoint || `${serverPath}/status-json.xsl`,
      [statsEndpoint] : options.statsEndpoint || `${serverPath}/stats`,
      [nextsongsEndpoint] : options.nextsongsEndpoint || `${serverPath}/nextsongs`,
      
      [sources]: options.sources || [],
      [interval]: (options.interval || 30) * 1000,
      [onStats]: options.onStats || noOp,
      [onStatsFetch]: options.onStatsFetch || noOp,
      [icyMetaInt]: options.icyMetaInt,
      [icyCharacterEncoding]: options.icyCharacterEncoding,
      [icyDetectionTimeout]: options.icyDetectionTimeout,
      [icyController]: new AbortController(),
     
      [icestatsController]: new AbortController(),
      [statsController]: new AbortController(),
      [nextsongsController]: new AbortController(),
     
      [state]: STOPPED,
    });
  }

  static xml2Json(xml) {
    const deserialize = (xml) =>
      new DOMParser().parseFromString(xml, "application/xml");

    const serialize = (element) => {
      if (!element.children.length) {
        return Number.isNaN(Number(element.innerHTML))
          ? element.innerHTML
          : Number(element.innerHTML);
      }

      const json = {};

      for (const child of element.children) {
        if (child.nodeName in json) {
          if (Array.isArray(json[child.nodeName])) {
            json[child.nodeName].push(serialize(child));
          } else {
            json[child.nodeName] = [json[child.nodeName], serialize(child)];
          }
        } else {
          json[child.nodeName] = serialize(child);
        }
      }

      return json;
    };

    return serialize(deserialize(xml));
  }

  /**
   * @returns The current state ["stopped", "running", "fetching"]
   */
  get state() {
    return p.get(this)[state];
  }

  /**
   * @returns The generated `status-json.xsl` endpoint
   */
  get icestatsEndpoint() {
    return p.get(this)[icestatsEndpoint];
  }

  /**
   * @returns The generated `stats` endpoint
   */
  get statsEndpoint() {
    return p.get(this)[statsEndpoint];
  }

  /**
   * @returns The generated `nextsongs` endpoint
   */
  get nextsongsEndpoint() {
    return p.get(this)[nextsongsEndpoint];
  }




  start() {
    if (p.get(this)[state] === STOPPED) {
      p.get(this)[state] = RUNNING;

      this.fetch().then(p.get(this)[onStats]);

      p.get(this)[intervalId] = setInterval(() => {
        this.fetch().then(p.get(this)[onStats]);
      }, p.get(this)[interval]);
    }
  }


  // stop() {
  //   if (p.get(this)[state] !== STOPPED) {
  //     p.get(this)[state] = STOPPED;
  //     clearInterval(p.get(this)[intervalId]);
  //     p.get(this)[icyController].abort();
  //     p.get(this)[icestatsController].abort();
  //     p.get(this)[statsController].abort();
      
  //   }
  // }

  
  // async fetch() {
  //   if (p.get(this)[state] !== FETCHING) {
  //     const oldState = p.get(this)[state];

  //     p.get(this)[state] = FETCHING;
  //     p.get(this)[onStatsFetch](p.get(this)[sources]);

  //     const promises = [];
  //     if (p.get(this)[sources].includes("icestats"))
  //       promises.push(this.getIcestats());
  //     if (p.get(this)[sources].includes("sevenhtml"))
  //       promises.push(this.getSevenhtml());
  //     if (p.get(this)[sources].includes("stats"))
  //       promises.push(this.getStats());
  //     if (p.get(this)[sources].includes("nextsongs"))
  //       promises.push(this.getNextsongs());
  //     if (p.get(this)[sources].includes("icy"))
  //       promises.push(this.getIcyMetadata());
  //     if (p.get(this)[sources].includes("ogg"))
  //       promises.push(this.getOggMetadata());

  //     const stats = await Promise.all(promises).then((stats) =>
  //       stats.reduce((acc, stat) => ({ ...acc, ...stat }), {})
  //     );

  //     p.get(this)[state] =
  //       p.get(this)[state] !== FETCHING ? p.get(this)[state] : oldState;

  //     return stats;
  //   }
  // }


  async getIcestats() {
    return this[fetchStats]({
      status: icestatsFetchStatus,
      endpoint: icestatsEndpoint,
      controller: icestatsController,
      mapper: (res) => res.json(),
    }).then((stats) => ({ icestats: stats && stats.icestats }));
  }

  async getIcyMetadata() {
    return this[getStreamMetadata]({
      status: icyFetchStatus,
      endpoint: streamEndpoint,
      controller: icyController,
      metadataType: "icy",
      headers: { "Icy-MetaData": 1 },
    });
  }

  async [getStreamMetadata]({
    status,
    endpoint,
    controller,
    headers,
    metadataType,
  }) {
    return this[fetchStats]({
      status,
      endpoint,
      controller,
      headers,
      mapper: async (res) =>
        new Promise((resolve) => {
          new IcecastReadableStream(res, {
            onMetadata: ({ metadata }) => {
              p.get(this)[controller].abort();
              resolve(metadata);
            },
            onMetadataFailed: () => {
              p.get(this)[controller].abort();
              resolve();
            },
            metadataTypes: metadataType,
            icyMetaInt: p.get(this)[icyMetaInt],
            icyCharacterEncoding: p.get(this)[icyCharacterEncoding],
            icyDetectionTimeout: p.get(this)[icyDetectionTimeout],
          }).startReading();
        }),
    }).then((metadata) => ({ [metadataType]: metadata }));
  }

  async [fetchStats]({ status, endpoint, controller, mapper, headers = {} }) {
    if (!p.get(this)[status]) {
      p.get(this)[status] = true;
      return fetch(p.get(this)[endpoint], {
        method: "GET",
        headers,
        signal: p.get(this)[controller].signal,
      })
        .then((res) => {
          if (!res.ok) throw new Error(`HTTP Error ${res.status}`);
          return res;
        })
        .then(mapper)
        .catch((e) => {
          if (e.name !== "AbortError") {
            console.warn(`Failed to fetch ${p.get(this)[endpoint]}`, e);
          }
        })
        .finally(() => {
          p.get(this)[status] = false;
          p.get(this)[controller] = new AbortController();
        });
    }
  }
}


