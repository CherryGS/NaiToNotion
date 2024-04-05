import { ImgUploadMsg, MessageType } from "@pages/message";
import { listen_element } from "@pages/utils/web";

function get_now_img_src() {
  const imgs = document.getElementsByTagName("img");
  const img = imgs[0];
  console.assert(imgs.length === 1);
  console.log(`img : ${img.src}`);
  return img.src;
}

const btn = document.createElement("button");
btn.innerText = "N";
btn.className = "inject-btn";
btn.addEventListener("click", async () => {
  const msg: ImgUploadMsg = {
    type: MessageType.ImgUrl,
    url: get_now_img_src(),
  };
  await chrome.runtime.sendMessage(msg);
});

const panel = ".//span[contains(text(), 'Copy to Seed')]/ancestor::button[1]/..";
listen_element(panel, n => {
  n.insertBefore(btn, n.firstChild);
});
