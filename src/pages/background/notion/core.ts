import { ImgResponse, ImgUploadMsg, MessageType } from "../../message";
import { ImgPage } from "./func";
import { NotionPropGenType } from "./typed";

const default_gen: NotionPropGenType = {
  Name: { t: "title", f: d => d._comment.signed_hash },
  Scale: { t: "number", f: d => d._comment.scale.toString() },
  Sampler: { t: "select", f: d => d._comment.sampler },
  Tags: {
    t: "multi_select",
    f: d => {
      return d._comment._prompt.prompt.filter(t => t.startsWith("artist:") || t.toLowerCase() in ["nsfw"]);
    },
  },
};

chrome.runtime.onMessage.addListener((msg: ImgUploadMsg, sender) => {
  if (msg.type != MessageType.ImgUrl) {
    return;
  }
  chrome.storage.local
    .get()
    .then((k: ChromeLocalStorage) => {
      const p = new ImgPage(msg.url, default_gen);
      p.prepare(k.app_key, k.db_id)
        .then(() => p.upload(k.app_key, k.db_id))
        .then();
    })
    .catch(() => {
      const resp: ImgResponse<ImgUploadMsg> = {
        result: false,
        rawMsg: msg,
      };
      chrome.tabs.sendMessage(sender.tab.id, resp).then();
    });
});
