import { digit, maxLength, minLength, required } from '@rxweb/reactive-forms';
import { ICodeForm } from './codeForm.types';

export class CodeForm implements ICodeForm {
    @required()
    @digit()
    @minLength({ value: 4 })
    @maxLength({ value: 4 })
    code!: string;
}
