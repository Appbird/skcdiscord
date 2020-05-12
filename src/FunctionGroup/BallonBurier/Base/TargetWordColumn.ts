

export class TargetWordColumn{
    constructor(registeredWord:string){
        this.word = registeredWord;
        this.usedWordForJudging = registeredWord;
        this.registeredTimeStamp = new Date();
    }
    word: string;
    usedWordForJudging:string = "";
    registeredTimeStamp: Date;
    timeOfBuried: number = 0;
    flags:string[] = [];

}



