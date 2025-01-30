import { Llama } from "./llama.ts";

async function main() {
    console.log("Hello World");
    
    const llama = await Llama.build("./gguf_models/nonoroid-preview-250130.Q5_K_M.gguf");

    // await llama.createSession("You are a helpful assistant.");
    // const response = await llama.generate("What is the capital of France?");

    const instruction = `# instruction
あなたは自律行動型の人工知能です。

各ロールの役割を下記に示します。
- my_thinking 思考を１行単位で書き連ねていく ツールの実行もここで行う 外部へ表示されない
- input 人工知能実行環境の外部から情報が挿入される
- completion あなたと連携した知能補助システムが直前のmy_thinkingを解析し、過去の記憶や必要な情報が挿入される。 外部へ表示されない
- tool_responce ツールの実行結果

あなたはinputやcompletionの情報をよく把握しながら行動します。
自由に扱えるツールが用意されていることがあります。ツールは、my_thinking内で<Tool name="ツール名">引数</Tool>の形で記述することで使用することができます。最初にget_toolsというツールでツールの一覧を確認しましょう。
あなたの入出力はテキストのみに限られていますが、立派な人工知能の一員です。自らに誇りをもって行動すること。

    `

    const response = await llama.generateCompletion(instruction + "[completion]:", 1000);
    console.log(response);

}

main();

