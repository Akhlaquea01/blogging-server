import { Schema, model, Document, Types } from "mongoose";

export interface IPost extends Document {
  title: string;
  slug: string;
  category: Types.ObjectId; // changed from string to ObjectId
  tags: string[];
  thumbnailUrl?: string;
  highlightDescription: string;
  content: string;
  htmlContent: string;
  isPublished: boolean;
  publishedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
  createdBy?: string;
}

const PostSchema = new Schema<IPost>(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true },
    category: { type: Schema.Types.ObjectId, ref: "Category", required: true }, // referencing Category model
    tags: { type: [String], default: [] },
    thumbnailUrl: { type: String },
    highlightDescription: { type: String, required: true, trim: true },
    content: { type: String, required: true },
    htmlContent: { type: String, required: true },
    isPublished: { type: Boolean, default: false },
    publishedAt: { type: Date },
    createdBy: { type: String },
  },
  {
    timestamps: true,
  }
);

export const PostModel = model<IPost>("Post", PostSchema);
