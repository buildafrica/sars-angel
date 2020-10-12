export interface IStatemen {
	name: string;
	email: string;
	state: string;
	phone: string;
	id?: string;
	twitter?: string | undefined;
	whatsapp?: string | undefined;
}

export type THashTags = Array<'#EndSARs' | 'EndSARsNow' | '#ReformPoliceNG' | string>;
export type THandles = Array<'@FOX17Erik' | '@cnnbrk' | '@AlJazeera' | string>;

export enum CHANNEL {
	VOICE = 'voice',
	SMS = 'sms',
	WHATSAPP = 'whatsapp',
	EMAIL = 'email',
	TWITTER = 'twitter'
}
export enum STATUS {
	FAILED = 'voice',
	DELIVERED = 'sms'
}
