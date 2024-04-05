import exifr from "exifr";

import { Client } from "@notionhq/client";
import { CreatePageParameters } from "@notionhq/client/build/src/api-endpoints";

import { upload_by_buffer } from "../telegraph";
import * as err from "./err";
import { NotionCreatePageResp, NotionDbSchema, NotionPropGenType, NotionPropsType } from "./typed";

export async function parse_metadata(input: string) {
  const res: NaiImgMetaData = await exifr.parse(input, true);
  res._comment = JSON.parse(res.Comment);
  res._comment._prompt = {
    prompt: res._comment.prompt.split(",").map(str => {
      return str.trim();
    }),
    uc: res._comment.uc.split(",").map(str => {
      return str.trim();
    }),
  };
  return res;
}

export async function get_db_scheme(app_key: string, db_id: string): Promise<NotionDbSchema> {
  const notion = new Client({ auth: app_key });
  const res = await notion.databases.retrieve({ database_id: db_id });
  return res;
}

/**
 * 生成在数据库中插入 Notion 页面时所需的 props
 *
 * @param d
 * @param gen
 * @param b
 * @returns
 */
export async function generate_prop(d: NaiImgMetaData, b: NotionDbSchema, gen: NotionPropGenType) {
  const p: NotionPropsType = {};
  for (const i in b.properties) {
    const u = b.properties[i];
    if (u.name in gen) {
      const obj = gen[u.name];
      if (obj.t !== u.type) {
        throw new err.MismatchedPropTypeErr(`属性名为 ${u.name} 的元素期望的类型为 ${u.type} 但实际为 ${obj.t}`);
      }
      const val = obj.f(d, b, u.name);
      const type = u.type;
      switch (type) {
        case "title": {
          p[u.name] = {
            type: "title",
            title: [{ type: "text", text: { content: val as string } }],
          };
          break;
        }
        case "number": {
          p[u.name] = {
            type: "number",
            number: Number(val),
          };
          break;
        }
        case "select": {
          p[u.name] = {
            type: "select",
            select: {
              name: val as string,
            },
          };
          break;
        }
        case "multi_select": {
          p[u.name] = {
            type: "multi_select",
            multi_select: (val as string[]).map(str => ({ name: str })),
          };
          break;
        }
        default: {
          throw new err.NotImplementPropErr(`类型 ${u.type} 暂未实现`);
        }
      }
    }
  }
  return p;
}
export class ImgPage {
  input: string;
  app_key: string;
  db_id: string;
  gen: NotionPropGenType;
  metadata: NaiImgMetaData;
  schema: NotionDbSchema;
  props: NotionPropsType;
  response: NotionCreatePageResp;
  constructor(input: string, gen: NotionPropGenType) {
    this.input = input;
    this.gen = gen;
  }
  async prepare(app_key: string, db_id: string) {
    this.app_key = app_key;
    this.db_id = db_id;
    this.metadata = await parse_metadata(this.input);
    this.schema = await get_db_scheme(app_key, db_id);
    this.props = await generate_prop(this.metadata, this.schema, this.gen);
    return this;
  }

  async upload() {
    await this.prepare(this.app_key, this.db_id);
    const metadata: NaiImgMetaData = JSON.parse(JSON.stringify(this.metadata));
    const url = (await upload_by_buffer(await (await fetch(this.input)).blob())).link;

    const notion = new Client({ auth: this.app_key });

    const prompt = metadata._comment.prompt;
    const uc = metadata._comment.uc;

    metadata.Comment = undefined;
    metadata._comment._prompt = undefined;
    metadata._comment.prompt = undefined;
    metadata._comment.uc = undefined;
    metadata.Description = undefined;
    const page: CreatePageParameters = {
      parent: {
        database_id: this.db_id,
      },
      properties: this.props,
      children: [
        {
          object: "block",
          type: "code",
          code: {
            language: "plain text",
            caption: [{ type: "text", text: { content: "Prompts" } }],
            rich_text: [{ type: "text", text: { content: prompt } }],
          },
        },
        {
          object: "block",
          type: "code",
          code: {
            language: "plain text",
            caption: [{ type: "text", text: { content: "Uc" } }],
            rich_text: [{ type: "text", text: { content: uc } }],
          },
        },
        {
          object: "block",
          type: "image",
          image: {
            type: "external",
            external: {
              url: url,
            },
          },
        },
        {
          object: "block",
          type: "code",
          code: {
            language: "json",
            caption: [{ type: "text", text: { content: "Metadata" } }],
            rich_text: [{ type: "text", text: { content: JSON.stringify(metadata, null, 2) } }],
          },
        },
      ],
    };
    this.response = await notion.pages.create(page);
    return this;
  }
}
