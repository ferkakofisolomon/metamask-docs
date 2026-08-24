import mongoose, { Schema, Document } from "mongoose";

export interface IScanResult extends Document {
  userId?: string;
  result: Record<string, unknown>;
  createdAt: Date;
}

const ScanResultSchema = new Schema({
  userId: { type: String },
  result: { type: Schema.Types.Mixed, required: true },
  createdAt: { type: Date, default: Date.now },
});

export const ScanResultModel =
  mongoose.models.ScanResult || mongoose.model<IScanResult>("ScanResult", ScanResultSchema);