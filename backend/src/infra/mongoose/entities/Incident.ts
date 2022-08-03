import { Schema, model, Types } from "mongoose";

interface IIncident {
  title: string;
  description: string;
  value: number;
  ngo: Types.ObjectId;
  tags?: string[];
}

const incidentSchema: Schema = new Schema<IIncident>(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    value: { type: Number, required: true },
    ngo: { type: Schema.Types.ObjectId, ref: "ngos", required: true },
    tags: [String],
  },
  {
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
    versionKey: false,
  }
);

const Incident = model<IIncident>("incidents", incidentSchema);

export { Incident, IIncident };
