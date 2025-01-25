import Attachment from '@mui/icons-material/Attachment';
import { AlertColor } from '@mui/material';
import { JSX } from 'react';

export type FetcherParams<T = undefined> = [T] extends [undefined]
	? { signal: AbortSignal }
	: { signal: AbortSignal; params: T };

export type Maybe<T> = T | null | undefined;
export interface ToastEvent {
	message: string;
	type: AlertColor;
}

export interface MenuItem {
	name: string;
	icon: JSX.Element;
	path: string;
	elements: {
		name: string;
		path: string;
	}[];
}

export type Fn = () => void;

export interface Attachment {
	file: File;
}

export interface ApiAttachment {
	file: { id: string; name: string };
}
