import { getLlama, LlamaChatSession, LlamaModel, LlamaCompletion } from "node-llama-cpp";

export class Llama {
    private llama: Llama;
    private model: LlamaModel | undefined;
    //private session: LlamaChatSession | undefined;
    private completion: LlamaCompletion | undefined;

    constructor(llama: Llama, model: LlamaModel, completion: LlamaCompletion) {
        this.llama = llama;
        this.model = model;
        this.completion = completion;
    }

    public static async build(modelPath: string): Promise<Llama> {
        const llama = await getLlama();
        const model = await llama.loadModel({
            modelPath: modelPath,
        }); 
        const context = await model.createContext();
        const completion = new LlamaCompletion({
            contextSequence: context.getSequence(),
        });

        const LlamaInstance = new Llama(llama, model, completion);
        return LlamaInstance;
    }

    // public async createSession(systemPrompt: string) {
    //     const context = await this.model?.createContext();
    //     if (!context) {
    //         throw new Error("Model not initialized");
    //     }
    //     this.completion = new LlamaCompletion({
    //         contextSequence: context.getSequence(),
    //     });
    //     //await this.session.prompt(systemPrompt);
    // }

    public async generateCompletion(prompt: string, maxTokens: number = 100) {
        if (!this.completion) {
            throw new Error("Completion not initialized");
        }
        const response = await this.completion.generateCompletion(prompt, {maxTokens: maxTokens});
        return response;
    }
}