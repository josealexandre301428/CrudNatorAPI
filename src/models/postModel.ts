import { InferSchemaType, model, Schema } from 'mongoose';

const postSchema = new Schema(
  {
    title: { type: String, required: true },
    content: { type: String, required: true },
    area: { type: String, required: true },
    link: { type: String, required: false }, // Adiciona o campo para o link
  },
  { timestamps: true } // Adiciona campos de criação e atualização automáticos
);

// Definindo o tipo para o Post com base no schema
type Post = InferSchemaType<typeof postSchema>;

// Exportando o modelo para ser usado no controlador
export default model<Post>('Post', postSchema);
