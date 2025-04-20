export function checkSquatForm(landmarks) {
    const issues = [];
    const leftHip = landmarks[23];
    const rightHip = landmarks[24];
    const leftKnee = landmarks[25];
    const rightKnee = landmarks[26];
    const leftAnkle = landmarks[27];
    const rightAnkle = landmarks[28];
    const leftShoulder = landmarks[11];
    const rightShoulder = landmarks[12];
    const backAngle = calculateAngle(leftShoulder, leftHip, leftKnee);
    if (backAngle < 160) {
      issues.push({
        joints: [leftShoulder, leftHip, leftKnee],
        message: "Keep your back straighter",
        severity: "high"
      });
    }
    const kneeAlignment = checkKneeOverToes(leftKnee, leftAnkle);
    if (kneeAlignment > 30) {
      issues.push({
        joints: [leftKnee, leftAnkle],
        message: "Keep knees behind toes",
        severity: "medium"
      });
    }
    return issues;
  }