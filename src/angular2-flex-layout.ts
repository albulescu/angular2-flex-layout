/// <reference path="../node_modules/typescript/lib/lib.es6.d.ts" />

import { FLEX_LAYOUT_DIRECTIVES } from './directives';
import { Media } from './providers/media';

export * from './providers/media';

export const FLEX_LAYOUT_PROVIDERS: any[] = [
    Media
];

export default {
    directives: [FLEX_LAYOUT_DIRECTIVES],
    providers: [FLEX_LAYOUT_PROVIDERS]
}