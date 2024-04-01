interface NaiImgData {
  ImageWidth: number;
  ImageHeight: number;
  BitDepth: number;
  ColorType: string;
  Compression: string;
  Filter: string;
  Interlace: string;
  Title: string;
  Description: string;
  Software: string;
  Source: string;
  "Generation time": string;
  Comment: string;

  _comment: NaiImgComment;
}
interface NaiImgComment {
  prompt: string;
  steps: number;
  height: number;
  width: number;
  scale: number;
  uncond_scale: number;
  cfg_rescale: number;
  seed: number;
  n_samples: number;
  hide_debug_overlay: boolean;
  noise_schedule: string;
  legacy_v3_extend: boolean;
  reference_information_extracted: number;
  reference_strength: number;
  sampler: string;
  controlnet_strength: number;
  controlnet_model: null;
  dynamic_thresholding: boolean;
  dynamic_thresholding_percentile: number;
  dynamic_thresholding_mimic_scale: number;
  sm: boolean;
  sm_dyn: boolean;
  skip_cfg_below_sigma: number;
  lora_unet_weights: null;
  lora_clip_weights: null;
  uc: string;
  request_type: string;
  signed_hash: string;
  _prompt: NaiImgPrompt;
}
interface NaiImgPrompt {
  prompt: Array<string>;
  uc: Array<string>;
}

// interface NotionDbSchema {
//   object: string;
//   id: string;
//   properties: NotionDbProps;
// }

// interface NotionDbProps {
//   [key: string]: NotionDbPropNumber | NotionDbPropSelect | NotionDbPropMulSelect | NotionDbPropTitle;
// }

// interface BaseNotionDbProp {
//   id: string;
//   name: string;
// }

// interface NotionDbPropNumber extends BaseNotionDbProp {
//   type: "number";
//   number: {
//     format: string;
//   };
// }
// interface NotionDbPropSelect extends BaseNotionDbProp {
//   type: "select";
//   select: {
//     options: [];
//   };
// }
// interface NotionDbPropMulSelect extends BaseNotionDbProp {
//   type: "multi_select";
//   multi_select: {
//     options: [];
//   };
// }
// interface NotionDbPropTitle extends BaseNotionDbProp {
//   type: "title";
//   title: object;
// }
