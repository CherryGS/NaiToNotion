export const upload_by_buffer = (buffer: Blob) => {
  const form = new FormData();

  form.append("photo", buffer);

  return fetch("https://telegra.ph/upload", {
    method: "POST",
    body: form,
  })
    .then(result => result.json())
    .then(result => {
      if (result.error) {
        throw result.error;
      }

      if (result[0] && result[0].src) {
        return {
          link: "https://telegra.ph" + result[0].src,
          path: result[0].src,
        };
      }
      throw new Error("Unknown error");
    });
};
