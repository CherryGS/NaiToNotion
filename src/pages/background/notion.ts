import exifr from "exifr";

import { Client } from "@notionhq/client";

import { ImgUrl, MessageType } from "../message";
import { uploadByBuffer } from "./telegraph";

let app_key;
let db_id;

const default_mapping_database = {
  Name: ["_comment", "signed_hash"],
  Scale: ["_comment", "scale"],
  Sampler: ["_comment", "sampler"]
};

const init = async () => {
  const res = await chrome.storage.local.get(["app_key", "db_id"]);
  app_key = res.app_key;
  db_id = res.db_id;
};

init().then(() => {
  chrome.storage.onChanged.addListener(async () => {
    await init();
  });

  chrome.runtime.onMessage.addListener((msg: ImgUrl, sender, resp) => {
    if (msg.type != MessageType.ImgUrl) {
      return;
    }
    console.log(`Received message from ${sender.url}`);
    console.log(msg);
    parse_data(msg.url)
      .then(res => {
        console.log(res);
        create_page_in_db(msg.url, default_mapping_database);
        resp({ status: true });
      })
      .catch(() => {
        resp({ status: false });
      });
    return true;
  });
  console.log("Notion init.");
});

async function parse_data(img: string) {
  const res: NaiImgData = await exifr.parse(img, true);
  res._comment = JSON.parse(res.Comment);
  res._comment._prompt = {
    prompt: res._comment.prompt.split(",").map(str => {
      return str.trim();
    }),
    uc: res._comment.uc.split(",").map(str => {
      return str.trim();
    })
  };
  return res;
}

export async function get_db_scheme() {
  const notion = new Client({ auth: app_key });
  const res = await notion.databases.retrieve({ database_id: db_id });
  return res;
}

function chain(f: NaiImgData, r: string[]) {
  console.log("---chain---");
  console.log(f);
  console.log(r);
  for (const j of r) {
    f = f[j];
  }
  return f;
}

async function generate_prop(d: NaiImgData, mapping: Record<string, string[]>) {
  const r = await get_db_scheme();
  const p = {};
  for (const i in r.properties) {
    const u = r.properties[i];
    if (u.name in mapping) {
      const l = mapping[u.name];
      const v = chain(d, l);
      let o;
      switch (u.type) {
        case "title":
          break;
        case "number": {
          o = {
            type: "number",
            number: v
          };
          break;
        }
        case "select": {
          o = {
            type: "select",
            select: {
              name: v
            }
          };
          break;
        }
        case "multi_select": {
          o = {
            type: "multi_select",
            multi_select: []
          };
          for (const i in v) {
            o.multi_select.push(i);
          }
        }
      }
      p[u.name] = o;
    }
  }
  return p;
}

async function create_page_in_db(img_url: string, mapping: Record<string, string[]>) {
  const d = await parse_data(img_url);
  const s = await fetch(img_url);
  const b = await s.blob();
  const r = await uploadByBuffer(b);
  const remote_url = r.link;
  const notion = new Client({ auth: app_key });
  const response = await notion.pages.create({
    parent: {
      database_id: db_id
    },
    properties: await generate_prop(d, mapping),
    children: [
      {
        object: "block",
        type: "code",
        code: {
          language: "plain text",
          caption: [{ type: "text", text: { content: "Prompts" } }],
          rich_text: [{ type: "text", text: { content: d._comment.prompt } }]
        }
      },
      {
        object: "block",
        type: "code",
        code: {
          language: "plain text",
          caption: [{ type: "text", text: { content: "Uc" } }],
          rich_text: [{ type: "text", text: { content: d._comment.uc } }]
        }
      },
      {
        object: "block",
        type: "image",
        image: {
          type: "external",
          external: {
            url: remote_url
          }
        }
      }
    ]
  });
  console.log(response);
}

// test1();
// test2();
// test3();
// test4();
// test5();

// function test5() {
//   const img = "D:\\Downloads\\Browser\\1.png";
//   create_page_in_db(img, db_id, default_mapping_database).then(res => {
//     console.log(res);
//   });
// }

// function test4() {
//   const img = "D:\\Downloads\\Browser\\1.png";
//   create_page_in_db(img, db_idx, default_mapping_database).then(res => {
//     console.log(res);
//   });
// }

// function test3() {
//   const img = "D:\\Downloads\\Browser\\1.png";
//   generate_prop(img, db_idx, default_mapping_database).then(res => {
//     console.log(res);
//   });
// }
// function test1() {
//   const test_url = "D:\\Downloads\\Browser\\1.png";
//   parse_data(test_url).then(res => {
//     console.log(res);
//   });
// }

// function test2() {
//   notion.databases
//     .retrieve({ database_id: db_idx })
//     .then(res => {
//       console.log(res);
//     })
//     .catch(e => {
//       console.error(e);
//     });
// }
