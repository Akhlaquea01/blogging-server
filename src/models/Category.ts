import { Schema, model, Document } from "mongoose";

export interface ICategory extends Document {
    name: string;
    slug: string;
    description?: string;
    createdAt: Date;
    updatedAt: Date;
}

const CategorySchema = new Schema<ICategory>(
    {
        name: { type: String, required: true, unique: true, trim: true },
        slug: { type: String, required: true, unique: true, lowercase: true },
        description: { type: String },
    },
    {
        timestamps: true,
    }
);

export const CategoryModel = model<ICategory>("Category", CategorySchema);
