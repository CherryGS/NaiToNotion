import { ImgResponse, ImgUploadMsg, MessageType } from "../../message";
import { ImgPage } from "./func";
import { NotionPropGenType } from "./typed";

const multi_select_keys = new Set(["nsfw", "sfw", "photorealistic", "realistic", "year 2023"]);

const default_gen: NotionPropGenType = {
  Name: { t: "title", f: d => d._comment.signed_hash },
  Scale: { t: "number", f: d => d._comment.scale.toString() },
  Sampler: { t: "select", f: d => d._comment.sampler },
  Tags: {
    t: "multi_select",
    f: d => {
      return d._comment._prompt.prompt
        .map(u => u.replaceAll(new RegExp(`[\\{\\}\\[\\]]`, "g"), ""))
        .filter(t => multi_select_keys.has(t.toLowerCase()));
    },
  },
  Artists: {
    t: "multi_select",
    f: d => {
      return d._comment._prompt.prompt
        .map(u => u.replaceAll(new RegExp(`[\\{\\}\\[\\]]`, "g"), ""))
        .filter(t => t.startsWith("artist:"));
    },
  },
};

chrome.runtime.onMessage.addListener((msg: ImgUploadMsg, sender) => {
  if (msg.type != MessageType.ImgUploadingMsg) {
    return;
  }

  chrome.storage.local
    .get()
    .then((k: ChromeLocalStorage) => new ImgPage(msg.url, default_gen).prepare(k.app_key, k.db_id))
    .then(p => p.upload())
    .then(() => {
      const resp: ImgResponse<ImgUploadMsg> = {
        result: true,
        rawMsg: msg,
      };
      return chrome.tabs.sendMessage(sender.tab.id, resp);
    })
    .then()
    .catch((e: Error) => {
      const resp: ImgResponse<ImgUploadMsg> = {
        result: false,
        rawMsg: msg,
        rawErr: e.message,
      };
      console.error(e);
      return chrome.tabs.sendMessage(sender.tab.id, resp);
    })
    .catch(e => {
      console.error(e);
    });
});
