/**
 * 如果有多个，会取第一个
 * @param xpath
 * @param callback
 */
export function listen_element(xpath: string, callback: (n: Node) => void) {
  const observer = new MutationObserver(() => {
    const target = document.evaluate(xpath, document.body).iterateNext();

    if (target) {
      callback(target);

      observer.disconnect();
    }
  });

  observer.observe(document.body, { childList: true, subtree: true });
}

export const print_message = () => {
  chrome.runtime.onMessage.addListener((msg, sender) => {
    console.log("--- Message ---");
    console.log(msg);
    console.log("--- Sender ----");
    console.log(sender);
    console.log("---------------");
  });
};
