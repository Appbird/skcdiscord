import CommandModifier from "../helper/CommandModifier"
import expect from "Expect";
const cm = new CommandModifier();
it("入力文字列中の連続した半角空白文字を一つの半角空白文字に置換する。",() => {
    expect(cm.makeSpaceShort("a   b")).toBe("a b");
    expect(cm.makeSpaceShort("     b")).toBe(" b");
    expect(cm.makeSpaceShort("a   b     c")).toBe("a b c");
});