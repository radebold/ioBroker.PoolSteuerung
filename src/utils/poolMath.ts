
export function calcPoolVolumeL(poolVolumeM3: number, poolDiameterM: number, poolWaterHeightM: number): number {
  const configured = Number(poolVolumeM3) || 0;
  if (configured > 0) return configured * 1000;
  return Math.PI * Math.pow((Number(poolDiameterM) || 0) / 2, 2) * (Number(poolWaterHeightM) || 0) * 1000;
}
