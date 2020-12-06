export enum CityId {
  CHERKASY = 'cherkasy',
  CHERNIHIV = 'chernihiv',
  CHERNIVTSI = 'chernivtsi',
  DNIPRO = 'dnipro',
  DONETSK = 'donetsk',
  IVANO_FRANKIVSK = 'ivano-frankivsk',
  KHARKIV = 'kharkiv',
  KHERSON = 'kherson',
  KHMELNYTSKYI = 'khmelnytskyi',
  KROPYVNYTSKYI = 'kropyvnytskyi',
  KYIV = 'kyiv',
  LUHANSK = 'luhansk',
  LUTSK = 'lutsk',
  LVIV = 'lviv',
  MYKOLAIV = 'mykolaiv',
  ODESSA = 'odessa',
  POLTAVA = 'poltava',
  RIVNE = 'rivne',
  SUMY = 'sumy',
  TERNOPIL = 'ternopil',
  UZHHOROD = 'uzhhorod',
  VINNYTSIA = 'vinnytsia',
  ZAPORIZHZHIA = 'zaporizhzhia',
  ZHYTOMYR = 'zhytomyr',
  KRYVYI_RIH = 'kryvyi rih',
  MARIUPOL = 'mariupol',
  SEVASTOPOL = 'sevastopol',
  SIMFEROPOL = 'simferopol',
  MAKIIVKA = 'makiivka',
  KAMIANSKE = 'kamianske',
  KREMENCHUK = 'kremenchuk',
  BILA_TSERKVA = 'bila tserkva',
  UMAN = 'uman'
}

export interface ICity {
  id: CityId;
  en: string;
  ru: string;
  ua: string;
}
