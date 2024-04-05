import {
  CreatePageParameters,
  CreatePageResponse,
  GetDatabaseResponse,
} from "@notionhq/client/build/src/api-endpoints";

export type propStr = string;
export type propVal = string;
export type NotionDbSchema = GetDatabaseResponse;

export type NotionCreatePageResp = CreatePageResponse;
export type NotionPropsType = Pick<CreatePageParameters, "properties">["properties"];

export type NotionPropGenType = Record<
  propStr,
  | {
      t: "title" | "number" | "select" | "rich_text";
      f: (d: NaiImgMetaData, b?: NotionDbSchema, prop?: propStr) => propVal;
    }
  | {
      t: "multi_select";
      f: (d: NaiImgMetaData, b?: NotionDbSchema, prop?: propStr) => propVal[];
    }
>;
