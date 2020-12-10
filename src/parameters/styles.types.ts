export enum StyleId {
  BLACKWORK = 'blackwork',
  CHICANO = 'chicano',
  JAPAN = 'japan',
  NEOTRADITIONAL = 'neotraditional',
  NEWSCHOOL = 'newschool',
  REALISM = 'realism',
  TRADITIONAL = 'traditional',
  TRIBAL = 'tribal',
  WATERCOLOR = 'watercolor',
  GRAPHICS = 'graphics',
  DOTWORK = 'dotwork',
  LINEWORK = 'linework',
  BLACK_GREY = 'black grey',
  TRASH_POLKA = 'trash polka',
  COLOR = 'color',
}

export interface IStyle {
  id: StyleId;
  en: string;
  ru?: string;
  ua?: string;
}
