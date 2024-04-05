declare module "virtual:reload-on-update-in-background-script" {
  export const reloadOnUpdate: (watchPath: string) => void;
  export default reloadOnUpdate;
}

declare module "virtual:reload-on-update-in-view" {
  const refreshOnUpdate: (watchPath: string) => void;
  export default refreshOnUpdate;
}

declare module "*.svg" {
  import React = require("react");
  export const ReactComponent: React.SFC<React.SVGProps<SVGSVGElement>>;
  const src: string;
  export default src;
}

declare module "*.jpg" {
  const content: string;
  export default content;
}

declare module "*.png" {
  const content: string;
  export default content;
}

declare module "*.json" {
  const content: string;
  export default content;
}

type NaiImgMetaData = {
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
};
type NaiImgComment = {
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
};
type NaiImgPrompt = {
  prompt: Array<string>;
  uc: Array<string>;
};
