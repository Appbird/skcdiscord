"use strict";
export default class CommnandModifier {
    /**
     * 二文字以上連続した空白文字を半角空白一文字に置き換える。
     */
    public makeSpaceShort(input:string):string{
        return input.replace(/ + /g," ");
    }
    /**
     * 空白文字で入力文字列をコマンドトークン文字列に分割する。
     */
    public sliceIntoToken(input:string):string[] {
        return input.split(" ");
    }

}