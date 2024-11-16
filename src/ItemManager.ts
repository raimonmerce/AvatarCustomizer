
export enum ModelName {
  //Main
  Head = 'Head',
  Body = 'Body',
  //Accessories
  Mask = 'Mask',
  Glasses = 'Glasses',
  Headphone = 'Headphone',
  Headwear = 'Headwear',
  //Bottom
  PantsCargo = 'PantsCargo',
  PantsFormal = 'PantsFormal',
  PantsShorts = 'PantsShorts',
  SkirtMini = 'SkirtMini',
  //Hairstly
  Hair04 = 'Hair04',
  Hair08 = 'Hair08',
  Hair12 = 'Hair12',
  Hair14 = 'Hair14',
  Poly08 = 'Poly08',
  Poly12 = 'Poly12',
  Poly16 = 'Poly16',
  Poly18 = 'Poly18',
  //Shoe
  Sandals = 'Sandals',
  SneakerAir = 'SneakerAir',
  SneakerCon = 'SneakerCon',
  SneakerYee = 'SneakerYee',
  //Top
  BlazerHitman = 'BlazerHitman',
  HoodieKangaroo = 'HoodieKangaroo',
  PufferBasic = 'PufferBasic',
  ShirtBasic = 'ShirtBasic',
}

export enum ModelType {
  Head = 'head',
  Body = 'body',
  Garments = 'garments',
}

export enum ModelSubtype {
  Accessory = 'accessory',
  Bottom = 'bottom',
  Hairstly = 'hairstly',
  Shoe = 'shoe',
  Top = 'top',
}


export enum BodyType {
  Male = 'male',
  Female = 'female',
}

export interface ModelInfo {
  type: ModelType;
  subType?: ModelSubtype;
  name: ModelName;
  urlM: string;
  urlMJson?: string;
  urlF?: string;
  urlFJson?: string;
}

const itemsMap: Record<ModelName, ModelInfo> = {
  // Main
  [ModelName.Head]: {
    type: ModelType.Head,
    name: ModelName.Head,
    urlM: '/frontend_test_assets/head/v3_0_head_male.glb',
    urlF: '/frontend_test_assets/head/v3_0_head_female.glb',
  },
  [ModelName.Body]: {
    type: ModelType.Body,
    name: ModelName.Body,
    urlM: '/frontend_test_assets/body/v4_phr_male_UA_base.glb',
    urlF: '/frontend_test_assets/body/v4_phr_female_UA_base.glb',
  },
  // Accessories
  [ModelName.Mask]: {
    type: ModelType.Garments,
    name: ModelName.Mask,
    subType: ModelSubtype.Accessory,
    urlM: '/frontend_test_assets/garments/accessories/v4_phr_male_F3DF_accessories_mask_02.glb',
    urlF: '/frontend_test_assets/garments/accessories/v4_phr_female_F3DF_accessories_mask_02.glb',
  },
  [ModelName.Glasses]: {
    type: ModelType.Garments,
    name: ModelName.Glasses,
    subType: ModelSubtype.Accessory,
    urlM: '/frontend_test_assets/garments/accessories/v4_phr_male_UA_accessories_glasses_hipster_black.glb',
    urlF: '/frontend_test_assets/garments/accessories/v4_phr_female_UA_accessories_glasses_hipster_black.glb',
  },
  [ModelName.Headphone]: {
    type: ModelType.Garments,
    name: ModelName.Headphone,
    subType: ModelSubtype.Accessory,
    urlM: '/frontend_test_assets/garments/accessories/v4_phr_male_UA_accessories_headphones_pioneer_black.glb',
    urlF: '/frontend_test_assets/garments/accessories/v4_phr_female_UA_accessories_headphones_pioneer_black.glb',
  },
  [ModelName.Headwear]: {
    type: ModelType.Garments,
    name: ModelName.Headwear,
    subType: ModelSubtype.Accessory,
    urlM: '/frontend_test_assets/garments/accessories/v4_phr_male_UA_accessories_headwear_bunny_ears.glb',
    urlF: '/frontend_test_assets/garments/accessories/v4_phr_female_UA_accessories_headwear_bunny_ears.glb',
  },
  // Bottom
  [ModelName.PantsCargo]: {
    type: ModelType.Garments,
    name: ModelName.PantsCargo,
    subType: ModelSubtype.Bottom,
    urlM: '/frontend_test_assets/garments/bottom/v3_phr_male_UA_bottom_pants_cargo_ll_of_darkgreen.glb',
    urlMJson: '/frontend_test_assets/garments/bottom/v3_phr_male_UA_bottom_pants_cargo_ll_of_darkgreen.json',
    urlF: '/frontend_test_assets/garments/bottom/v3_phr_female_UA_bottom_pants_cargo_ll_of_darkgreen.glb',
    urlFJson: '/frontend_test_assets/garments/bottom/v3_phr_female_UA_bottom_pants_cargo_ll_of_darkgreen.json',
  },
  [ModelName.PantsFormal]: {
    type: ModelType.Garments,
    name: ModelName.PantsFormal,
    subType: ModelSubtype.Bottom,
    urlM: '/frontend_test_assets/garments/bottom/v3_phr_male_UA_bottom_pants_formal_black.glb',
    urlMJson: '/frontend_test_assets/garments/bottom/v3_phr_male_UA_bottom_pants_formal_black.json',
    urlF: '/frontend_test_assets/garments/bottom/v3_phr_female_UA_bottom_pants_formal_black.glb',
    urlFJson: '/frontend_test_assets/garments/bottom/v3_phr_female_UA_bottom_pants_formal_black.json',
  },
  [ModelName.PantsShorts]: {
    type: ModelType.Garments,
    name: ModelName.PantsShorts,
    subType: ModelSubtype.Bottom,
    urlM: '/frontend_test_assets/garments/bottom/v3_phr_male_UA_bottom_pants_shorts_sl_black.glb',
    urlMJson: '/frontend_test_assets/garments/bottom/v3_phr_male_UA_bottom_pants_shorts_sl_black.json',
    urlF: '/frontend_test_assets/garments/bottom/v3_phr_female_UA_bottom_pants_shorts_sl_black.glb',
    urlFJson: '/frontend_test_assets/garments/bottom/v3_phr_female_UA_bottom_pants_shorts_sl_black.json',
  },
  [ModelName.SkirtMini]: {
    type: ModelType.Garments,
    name: ModelName.SkirtMini,
    subType: ModelSubtype.Bottom,
    urlM: '/frontend_test_assets/garments/bottom/v4_phr_male_UA_bottom_skirt_mini_sl_sf_sky.glb',
    urlMJson: '/frontend_test_assets/garments/bottom/v4_phr_male_UA_bottom_skirt_mini_sl_sf_sky.json',
    urlF: '/frontend_test_assets/garments/bottom/v4_phr_female_UA_bottom_skirt_mini_sl_sf_sky.glb',
    urlFJson: '/frontend_test_assets/garments/bottom/v4_phr_female_UA_bottom_skirt_mini_sl_sf_sky.json',
  },
  // Hairstyle
  [ModelName.Hair04]: {
    type: ModelType.Garments,
    name: ModelName.Hair04,
    subType: ModelSubtype.Hairstly,
    urlM: '/frontend_test_assets/garments/hairstly/v4_phr_UA_haircards_04.glb',
  },
  [ModelName.Hair08]: {
    type: ModelType.Garments,
    name: ModelName.Hair08,
    subType: ModelSubtype.Hairstly,
    urlM: '/frontend_test_assets/garments/hairstly/v4_phr_UA_haircards_08.glb',
  },
  [ModelName.Hair12]: {
    type: ModelType.Garments,
    name: ModelName.Hair12,
    subType: ModelSubtype.Hairstly,
    urlM: '/frontend_test_assets/garments/hairstly/v4_phr_UA_haircards_12.glb',
  },
  [ModelName.Hair14]: {
    type: ModelType.Garments,
    name: ModelName.Hair14,
    subType: ModelSubtype.Hairstly,
    urlM: '/frontend_test_assets/garments/hairstly/v4_phr_UA_haircards_14.glb',
  },
  [ModelName.Poly08]: {
    type: ModelType.Garments,
    name: ModelName.Poly08,
    subType: ModelSubtype.Hairstly,
    urlM: '/frontend_test_assets/garments/hairstly/v4_phr_UA_polygonal_08.glb',
  },
  [ModelName.Poly12]: {
    type: ModelType.Garments,
    name: ModelName.Poly12,
    subType: ModelSubtype.Hairstly,
    urlM: '/frontend_test_assets/garments/hairstly/v4_phr_UA_polygonal_12.glb',
  },
  [ModelName.Poly16]: {
    type: ModelType.Garments,
    name: ModelName.Poly16,
    subType: ModelSubtype.Hairstly,
    urlM: '/frontend_test_assets/garments/hairstly/v4_phr_UA_polygonal_16.glb',
  },
  [ModelName.Poly18]: {
    type: ModelType.Garments,
    name: ModelName.Poly18,
    subType: ModelSubtype.Hairstly,
    urlM: '/frontend_test_assets/garments/hairstly/v4_phr_UA_polygonal_18.glb',
  },
  // Shoes
  [ModelName.Sandals]: {
    type: ModelType.Garments,
    name: ModelName.Sandals,
    subType: ModelSubtype.Shoe,
    urlM: '/frontend_test_assets/garments/shoes/v3_phr_male_UA_shoes_sandals_birkenstock_black.glb',
    urlMJson: '/frontend_test_assets/garments/shoes/v3_phr_male_UA_shoes_sandals_birkenstock_black.json',
    urlF: '/frontend_test_assets/garments/shoes/v3_phr_female_UA_shoes_sandals_birkenstock_black.glb',
    urlFJson: '/frontend_test_assets/garments/shoes/v3_phr_female_UA_shoes_sandals_birkenstock_black.json',
  },
  [ModelName.SneakerAir]: {
    type: ModelType.Garments,
    name: ModelName.SneakerAir,
    subType: ModelSubtype.Shoe,
    urlM: '/frontend_test_assets/garments/shoes/v3_phr_male_UA_shoes_sneakers_airForce_white.glb',
    urlMJson: '/frontend_test_assets/garments/shoes/v3_phr_male_UA_shoes_sneakers_airForce_white.json',
    urlF: '/frontend_test_assets/garments/shoes/v3_phr_female_UA_shoes_sneakers_airForce_white.glb',
    urlFJson: '/frontend_test_assets/garments/shoes/v3_phr_female_UA_shoes_sneakers_airForce_white.json',
  },
  [ModelName.SneakerCon]: {
    type: ModelType.Garments,
    name: ModelName.SneakerCon,
    subType: ModelSubtype.Shoe,
    urlM: '/frontend_test_assets/garments/shoes/v3_phr_male_UA_shoes_sneakers_converse_black.glb',
    urlMJson: '/frontend_test_assets/garments/shoes/v3_phr_male_UA_shoes_sneakers_converse_black.json',
    urlF: '/frontend_test_assets/garments/shoes/v3_phr_female_UA_shoes_sneakers_converse_black.glb',
    urlFJson: '/frontend_test_assets/garments/shoes/v3_phr_female_UA_shoes_sneakers_converse_black.json',
  },
  [ModelName.SneakerYee]: {
    type: ModelType.Garments,
    name: ModelName.SneakerYee,
    subType: ModelSubtype.Shoe,
    urlM: '/frontend_test_assets/garments/shoes/v3_phr_male_UA_shoes_sneakers_yeezy_darkgrey.glb',
    urlMJson: '/frontend_test_assets/garments/shoes/v3_phr_male_UA_shoes_sneakers_yeezy_darkgrey.json',
    urlF: '/frontend_test_assets/garments/shoes/v3_phr_female_UA_shoes_sneakers_yeezy_darkgrey.glb',
    urlFJson: '/frontend_test_assets/garments/shoes/v3_phr_female_UA_shoes_sneakers_yeezy_darkgrey.json',
  },
    // Top
  [ModelName.BlazerHitman]: {
    type: ModelType.Garments,
    name: ModelName.BlazerHitman,
    subType: ModelSubtype.Top,
    urlM: '/frontend_test_assets/garments/top/v3_phr_male_UA_top_blazer_hitman_basic_blue.glb',
    urlMJson: '/frontend_test_assets/garments/top/v3_phr_male_UA_top_blazer_hitman_basic_blue.json',
    urlF: '/frontend_test_assets/garments/top/v3_phr_female_UA_top_blazer_hitman_basic_blue.glb',
    urlFJson: '/frontend_test_assets/garments/top/v3_phr_female_UA_top_blazer_hitman_basic_blue.json',
  },

  [ModelName.HoodieKangaroo]: {
    type: ModelType.Garments,
    name: ModelName.HoodieKangaroo,
    subType: ModelSubtype.Top,
    urlM: '/frontend_test_assets/garments/top/v3_phr_male_UA_top_hoodie_kangaroo_ls_UA.glb',
    urlMJson: '/frontend_test_assets/garments/top/v3_phr_male_UA_top_hoodie_kangaroo_ls_UA.json',
    urlF: '/frontend_test_assets/garments/top/v3_phr_female_UA_top_hoodie_kangaroo_ls_UA.glb',
    urlFJson: '/frontend_test_assets/garments/top/v3_phr_female_UA_top_hoodie_kangaroo_ls_UA.json',
  },

  [ModelName.PufferBasic]: {
    type: ModelType.Garments,
    name: ModelName.PufferBasic,
    subType: ModelSubtype.Top,
    urlM: '/frontend_test_assets/garments/top/v3_phr_male_UA_top_puffer_basic_hn_ls_of_blue.glb',
    urlMJson: '/frontend_test_assets/garments/top/v3_phr_male_UA_top_puffer_basic_hn_ls_of_blue.json',
    urlF: '/frontend_test_assets/garments/top/v3_phr_female_UA_top_puffer_basic_hn_ls_of_blue.glb',
    urlFJson: '/frontend_test_assets/garments/top/v3_phr_female_UA_top_puffer_basic_hn_ls_of_blue.json',
  },

  [ModelName.ShirtBasic]: {
    type: ModelType.Garments,
    name: ModelName.ShirtBasic,
    subType: ModelSubtype.Top,
    urlM: '/frontend_test_assets/garments/top/v3_phr_male_UA_top_shirt_basic_ss_white.glb',
    urlMJson: '/frontend_test_assets/garments/top/v3_phr_male_UA_top_shirt_basic_ss_white.json',
    urlF: '/frontend_test_assets/garments/top/v3_phr_female_UA_top_shirt_basic_ss_white.glb',
    urlFJson: '/frontend_test_assets/garments/top/v3_phr_female_UA_top_shirt_basic_ss_white.json',
  },
};

export class ItemManager {
  private items: Record<ModelName, ModelInfo>;

  constructor() {
    this.items = itemsMap;
  }

  findItemByName(name: ModelName): ModelInfo {
    return this.items[name];
  }

  findItemByType(type: ModelType): ModelInfo[] {
    return Object.values(this.items).filter(item => item.type === type);
  }

  findItemBySubtype(subType: ModelSubtype): ModelInfo[] {
    return Object.values(this.items).filter(item => item.subType === subType);
  }
}