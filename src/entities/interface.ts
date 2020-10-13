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
	FAILED = 'failed',
	DELIVERED = 'delivered'
}

export interface CreateRecordOptionProps {
	recipients: string;
	channel: CHANNEL;
	message: string;
	time: Date | string;
}
