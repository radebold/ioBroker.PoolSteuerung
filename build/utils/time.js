
exports.hhmm = () => {
  const d = new Date();
  return `${String(d.getHours()).padStart(2,"0")}:${String(d.getMinutes()).padStart(2,"0")}`;
};
exports.parseTimes = csv => String(csv || "").split(",").map(x => x.trim()).filter(Boolean);
