import { Schema, model, Types } from "mongoose";

interface INgo {
  _id?: Types.ObjectId;
  name: string;
  email: string;
  whatsapp: string;
  city: string;
  uf: string;
}

const ngoSchema: Schema = new Schema<INgo>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    whatsapp: { type: String, required: true },
    city: { type: String, required: true },
    uf: { type: String, required: true },
  },
  {
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
    versionKey: false,
  }
);

const Ngo = model<INgo>("ngos", ngoSchema);

export { Ngo, INgo };
