import { ImgResponse, ImgUploadMsg, MessageType } from "@pages/message";
import { listen_element, print_message } from "@pages/utils/web";

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
    type: MessageType.ImgUploadingMsg,
    url: get_now_img_src(),
  };
  await chrome.runtime.sendMessage(msg);
});

listen_element(".//span[contains(text(), 'Copy to Seed')]/ancestor::button[1]/..", n => {
  n.insertBefore(btn, n.firstChild);
});

chrome.runtime.onMessage.addListener((msg: ImgResponse<ImgUploadMsg>) => {
  if (msg.rawMsg.type !== MessageType.ImgUploadingMsg) {
    return;
  }
  if (msg.result === true) {
    alert("OK");
  } else {
    alert(msg.rawErr ? msg.rawErr : "Unknown error");
  }
});

print_message();
