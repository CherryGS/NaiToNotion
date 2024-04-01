import { BaseResponse, ImgUrl, MessageType } from "../../message";

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
// btn.className = "test-inject-btn";
btn.addEventListener("click", async () => {
  const msg: ImgUrl = {
    type: MessageType.ImgUrl,
    url: get_now_img_src()
  };
  const response: BaseResponse = await chrome.runtime.sendMessage(msg);
  if (response.status == true) {
    alert("Success.");
  } else {
    alert("Unknown error.");
  }
});

function inject(xpath: string) {
  console.log("开始监听按钮面板...");

  const observer = new MutationObserver(() => {
    const panel = document.evaluate(xpath, document.body).iterateNext();

    if (panel) {
      panel.insertBefore(btn, panel.firstChild);
      observer.disconnect();
      console.log("按钮注入完成...");
    }
  });

  observer.observe(document.body, { childList: true, subtree: true });
}
const panel = ".//span[contains(text(), 'Copy to Seed')]/ancestor::button[1]/..";
inject(panel);
